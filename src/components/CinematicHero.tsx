import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import React from 'react';

type Props = {
  eyebrow?: string;
  titleTop: React.ReactNode;
  highlight?: React.ReactNode;
  subtitle?: React.ReactNode;
  ctaLabel?: string;
  ctaLink?: string;
  variant?: 'full' | 'compact';
  size?: 'small' | 'large' | 'hero';
};

const CinematicHero = ({ eyebrow, titleTop, highlight, subtitle, ctaLabel, ctaLink = '/', variant = 'compact', size = 'large' }: Props) => {
  const isFull = variant === 'full';
  const sizeMap: Record<string, string> = {
    small: 'text-4xl md:text-6xl',
    large: 'text-6xl md:text-9xl',
    hero: 'text-7xl md:text-[12vw]'
  };
  const titleClass = isFull ? 'text-7xl md:text-[12vw]' : sizeMap[size] || sizeMap.large;

  return (
    <section className={`relative ${isFull ? 'h-screen' : 'h-[60vh]'} flex items-center justify-center overflow-hidden`}> 
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 text-center px-6">
        {eyebrow && <span className="text-secondary font-bold tracking-[0.5em] uppercase mb-6 block text-sm md:text-base animate-pulse">{eyebrow}</span>}

        <h1 className={`font-display leading-[0.8] mb-6 ${titleClass}`}>
          {titleTop}
          {highlight ? (
            <>
              <br />
              <span className="text-primary italic">{highlight}</span>
            </>
          ) : null}
        </h1>

        {subtitle && <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/60 font-medium">{subtitle}</p>}

        {ctaLabel && (
          <div className="mt-8">
            <Link to={ctaLink} className="inline-block">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="bg-white text-black px-6 py-3 rounded-full font-bold text-base tracking-[0.15em] hover:bg-primary hover:text-white transition-all duration-300">{ctaLabel}</motion.button>
            </Link>
          </div>
        )}
      </motion.div>

      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20 pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--color-primary)_0%,_transparent_70%)] blur-[120px]" />
        </div>
      </div>
    </section>
  );
};

export default CinematicHero;
