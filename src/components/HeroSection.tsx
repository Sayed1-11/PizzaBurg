import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Scene3D from './Scene3D';

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-background">
      <Scene3D />

      <div className="container relative z-10 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <span className="bg-primary text-white px-3 py-1 font-bold tracking-widest uppercase mb-4 text-xs md:text-sm inline-block">
            ESTABLISHED JANUARY 2018
          </span>
          <h1 className="text-6xl md:text-9xl font-display leading-tight mb-6">
            PIZZA<span className="text-primary">BURG</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl text-foreground font-medium mb-10">
            Classic Italian pizza with a unique Bangladeshi twist.
            <span className="block text-foreground mt-2 font-bold italic">"Beware PizzaBurg is Addictive!"</span>
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/menu" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105">
              ORDER NOW
            </Link>
            <Link to="/menu" className="border border-white/20 hover:bg-white/10 text-foreground px-8 py-4 rounded-full font-bold transition-all">
              EXPLORE MENU
            </Link>
          </div>
        </motion.div>
      </div>

    </section>
  );
};


export default HeroSection;
