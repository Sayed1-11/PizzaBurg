import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PizzaSequenceProps {
  frameCount: number;
  className?: string;
  children?: React.ReactNode;
}

const PizzaSequence: React.FC<PizzaSequenceProps> = ({ frameCount, className, children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const frameObj = useRef({ index: 0 });

  // Frame naming configuration
  const framePrefix = 'ezgif-frame-';
  const extension = '.jpg';

  // Preload images
  useEffect(() => {
    const loadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];
      const imagePromises = [];

      for (let i = 1; i <= frameCount; i++) {
        const frameNumber = i.toString().padStart(3, '0');
        const img = new Image();
        const src = new URL(`../assets/video-animation/${framePrefix}${frameNumber}${extension}`, import.meta.url).href;
        
        img.src = src;
        const promise = new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
        imagePromises.push(promise);
        loadedImages.push(img);
      }

      await Promise.all(imagePromises);
      setImages(loadedImages);
      setIsLoaded(true);
    };

    loadImages();
  }, [frameCount]);

  // Handle canvas rendering
  const renderCanvas = (index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const img = images[Math.floor(index)];

    if (canvas && ctx && img) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;
      
      let drawWidth, drawHeight, x, y;

      if (canvasRatio > imgRatio) {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgRatio;
        x = 0;
        y = (canvas.height - drawHeight) / 2;
      } else {
        drawWidth = canvas.height * imgRatio;
        drawHeight = canvas.height;
        x = (canvas.width - drawWidth) / 2;
        y = 0;
      }
      
      ctx.drawImage(img, x, y, drawWidth, drawHeight);
    }
  };

  // GSAP Animation and Pinning
  useEffect(() => {
    if (!isLoaded || images.length === 0) return;

    const ctx = gsap.context(() => {
      // Initial draw
      renderCanvas(0);

      gsap.to(frameObj.current, {
        index: frameCount - 1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=400%',
          pin: true,
          pinSpacing: false,
          scrub: 0.5,
          onUpdate: (self) => {
            const index = Math.floor(frameObj.current.index);
            renderCanvas(index);
            
            if (contentRef.current) {
              const p = self.progress;
              const opacity = Math.max(0, 1 - p * 3);
              const scale = 1 - p * 0.1;
              const blur = p * 10;
              gsap.set(contentRef.current, { 
                opacity, 
                scale,
                filter: `blur(${blur}px)`
              });
            }
          },
        },
      });
    });

    return () => ctx.revert();
  }, [isLoaded, images, frameCount]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        renderCanvas(frameObj.current.index);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [isLoaded, images]);

  return (
    <div ref={containerRef} className={`relative w-full bg-background z-0 ${className}`}>
      <div className="relative h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full pointer-events-none"
        />
        
        <div 
          ref={contentRef}
          className="relative z-10 w-full h-full flex flex-col items-center justify-center pt-24"
        >
          {children}
        </div>

        {!isLoaded && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-background backdrop-blur-md">
            <div className="flex flex-col items-center gap-6">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent shadow-[0_0_20px_rgba(255,107,0,0.4)]"></div>
              <p className="font-display text-2xl font-bold tracking-widest text-primary animate-pulse">
                BAKING YOUR PIZZA...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


export default PizzaSequence;

