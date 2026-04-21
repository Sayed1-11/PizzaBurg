import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const BrandStory = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;
    
    // Safety check to prevent double-wrapping spans
    if (!textRef.current.querySelector('.char')) {
      const chars = textRef.current.innerText.split('');
      textRef.current.innerHTML = chars
        .map((char) => `<span class="char">${char}</span>`)
        .join('');
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current!.querySelectorAll('.char'),
        {
          opacity: 0.1,
        },
        {
          opacity: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className="py-20 md:py-32 px-4 md:px-6 bg-background relative z-10 overflow-hidden">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <span className="text-secondary font-bold tracking-widest uppercase mb-4 block text-xs md:text-base">
              OUR STORY
            </span>
            <h2 ref={textRef} className="text-3xl md:text-5xl lg:text-6xl font-display leading-[1.2] mb-8 break-words uppercase">
              From a vision to a million pizzas.
            </h2>
            <p className="text-primary font-bold tracking-[0.2em] text-xs md:text-sm uppercase mb-10 opacity-60">
              Authentic. Affordable. Addictive.
            </p>
          </div>
          <div className="space-y-6 text-muted-foreground text-base md:text-xl leading-relaxed">
            <p>
              Founded in <span className="text-white font-bold">January 2018</span> by Mir Mehadi, a North South University graduate, PizzaBurg was born with a mission to offer authentic pizza tailored to Bangladeshi taste buds.
            </p>
            <p>
              Within two years, we became the leading pizza chain in Bangladesh, serving over <span className="text-secondary font-bold">a quarter of Dhaka's demand</span>. Today, with <span className="text-white font-bold">21 branches</span>, our legacy continues.
            </p>
            <div className="pt-6 grid grid-cols-2 gap-6">
              <div>
                <span className="text-4xl font-display text-primary block">21</span>
                <span className="text-sm uppercase tracking-wider">Branches</span>
              </div>
              <div>
                <span className="text-4xl font-display text-primary block">1M+</span>
                <span className="text-sm uppercase tracking-wider">Pizzas Served</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorative Text */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -rotate-90 origin-left opacity-[0.02] pointer-events-none select-none">
        <span className="text-[20vh] font-black uppercase whitespace-nowrap">
          BEWARE IT IS ADDICTIVE BEWARE IT IS ADDICTIVE
        </span>
      </div>
    </section>
  );
};

export default BrandStory;
