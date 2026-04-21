import { motion } from 'framer-motion';

const AmbassadorSection = () => {
  return (
    <section className="py-32 bg-background relative overflow-hidden flex flex-col items-center justify-center min-h-[80vh] px-6">
      <div className="absolute inset-0 opacity-10 pointer-events-none select-none overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-[25vw] font-display uppercase mr-20">
              SALMAN MUKTADIR X PIZZABURG
            </span>
          ))}
        </div>
      </div>

      <div className="container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <span className="text-primary font-bold tracking-[0.3em] uppercase mb-8 block text-lg">
            OFFICIAL BRAND AMBASSADOR
          </span>
          <h2 className="text-6xl md:text-[120px] font-display leading-[0.9] mb-10 text-white drop-shadow-2xl">
            SALMAN<br />
            <span className="text-stroke hover:text-white transition-all cursor-default">MUKTADIR</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground font-medium mb-12 max-w-2xl mx-auto">
            The visionary who knows what's "Addictive". Joining forces with the biggest pizza chain to bring you more than just a meal—a lifestyle.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 mt-12">
            <div className="flex flex-col items-center">
              <span className="text-5xl font-display text-primary">26K</span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Instagram Followers</span>
            </div>
            <div className="w-px h-12 bg-white/10 hidden md:block" />
            <div className="flex flex-col items-center">
              <span className="text-5xl font-display text-primary">798K+</span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">FB Fanbase</span>
            </div>
            <div className="w-px h-12 bg-white/10 hidden md:block" />
            <div className="flex flex-col items-center">
              <span className="text-5xl font-display text-primary">#1</span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">In Connection</span>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default AmbassadorSection;
