import { useRef, useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Link } from 'react-router-dom';
import BrandStory from '../components/BrandStory';

import CinematicHero from '../components/CinematicHero';
import { Rocket, Target, Users, Landmark, ChevronLeft, ChevronRight } from 'lucide-react';

const FUTURISTIC_MILESTONES = [
  { year: '2018', title: 'The Ignition', desc: 'Mir Mehadi launches the first PizzaBurg at North South University vicinity.', icon: Rocket },
  { year: '2020', title: 'Market Dominance', desc: "Captured 25% of Dhaka's pizza market share within 24 months.", icon: Target },
  { year: '2022', title: 'Expansion Phase', desc: 'Reached a milestone of 15 branches across the capital city.', icon: Landmark },
  { year: '2025', title: 'Future Tech', desc: 'Integrating AR menu and AI-optimized flavor profiling.', icon: Users },
];

const Story = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // scroll-linked motion values removed (unused)

  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const images = [
    { src: '/Pizzaburg-Rajshahi_627d973eb950209e1a97972c1e02ae9a.jpg', caption: 'Evening Glow', sub: 'Rajshahi flagship at dusk' },
    { src: '/pizzaburg-restru.jpg', caption: 'Woodfire Ambience', sub: 'Warmth behind every crust' },
    { src: '/pizzaburg-restru2.jpg', caption: 'The Craft', sub: 'Handmade, heart-served' },
    { src: '/pizzaburg-restru3.jpg', caption: 'Night Shift', sub: 'Quiet moments, full ovens' },
  ];

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setCurrent((c) => (c + 1) % images.length), 4000);
    return () => clearInterval(id);
  }, [images.length, paused]);

  return (
    <div ref={containerRef} className="bg-background text-white selection:bg-primary selection:text-white">
      {/* Shared Cinematic Hero (page-specific title) */}
      <CinematicHero
        eyebrow="Establishing the Legacy"
        titleTop={<>BEYOND</>}
        highlight={<>CRUST</>}
        subtitle={"A journey from a singular kitchen vision to the digital frontier of Bangladeshi flavor."}
        variant="full"
        size="hero"
      />

      {/* The Core Story (Teaser Component) */}
      <div className="relative z-10">
        <BrandStory />
      </div>

      {/* Futuristic Timeline */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="container mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-8xl font-display mb-4">THE <span className="text-primary">EVOLUTION</span></h2>
            <div className="w-24 h-1 bg-primary mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {FUTURISTIC_MILESTONES.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative p-8 border border-white/5 bg-white/5 rounded-3xl hover:border-primary/50 transition-all duration-500 hover:translate-y-[-10px]"
              >
                <div className="absolute top-0 right-0 p-6 text-6xl font-display text-white/5 select-none transition-colors group-hover:text-primary/10">
                  {m.year}
                </div>
                <m.icon className="text-primary mb-6" size={40} />
                <h3 className="text-2xl font-display mb-4 group-hover:text-primary transition-colors">{m.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Kitchen Gallery Section */}
      <section className="py-32 bg-white/5 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="relative group overflow-hidden rounded-3xl aspect-video border border-white/10">
              {/* Embedded YouTube Video (responsive) */}
              <div className="absolute inset-0">
                <iframe
                  title="PizzaBurg Future Kitchen"
                  src="https://www.youtube.com/embed/WQpC2R968bM?start=406&rel=0"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              {/* Subtle overlay for blending with page style */}
              <div className="absolute inset-0 mix-blend-overlay opacity-30 pointer-events-none bg-black" />
            </div>
            <div>
              <h2 className="text-4xl md:text-6xl font-display mb-8">REDEFINING<br /><span className="text-secondary">CRAFT</span></h2>
              <p className="text-xl text-white/60 leading-relaxed mb-8">
                We believe the future of pizza is interdisciplinary. By combining traditional clay-oven philosophy with data-driven flavor optimization, we ensure every slice is as innovative as it is addictive.
              </p>
              <ul className="space-y-4">
                {['Smart Ingredient Sourcing', 'AI-Driven Delivery Optimization', '3D Flavor Mapping'].map((item) => (
                  <li key={item} className="flex items-center gap-4 text-sm font-bold tracking-widest text-primary">
                    <div className="w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_rgba(255,0,0,0.8)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Visionary Full-Width Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/pizzaburg-restru2.jpg"
            alt="Futuristic glowing city silhouette representing expansion"
            className="w-full h-full object-cover opacity-20 filter grayscale contrast-150"
          />
        </div>
        <div className="container relative z-10 text-center px-6">
          <h2 className="text-5xl md:text-8xl lg:text-[10vw] font-display leading-[0.85] mb-12 uppercase break-words">
            We are the<br />
            <span className="text-red-500">New Standard</span>
          </h2>
          <Link to="/career" className="inline-block">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-8 md:px-12 py-4 md:py-5 rounded-full font-bold text-base md:text-lg tracking-[0.2em] hover:bg-primary hover:text-white transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              JOIN OUR SQUAD
            </motion.button>
          </Link>
        </div>
      </section>

      {/* Realistic Texture Section */}
      <section className="py-20 border-t border-white/5">
        <div className="container mx-auto px-6">
          <h3 className="text-sm uppercase tracking-widest text-white/40 mb-6">Moments From Our Kitchens</h3>

          <div
            className="relative w-full max-w-7xl mx-auto"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >

            <div className="relative rounded-4xl overflow-hidden bg-black/10 lg:h-[70vh] h-[50vh]">
              <img
                src={images[current].src}
                alt={images[current].caption}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-1000 transform-gpu"
                style={{ willChange: 'transform' }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent opacity-80" />

              <div className="absolute left-8 bottom-8 text-left max-w-[60%]">
                <p className="text-3xl md:text-5xl lg:text-6xl font-display font-extrabold text-white leading-tight">{images[current].caption}</p>
                <p className="text-sm md:text-base text-white/70 mt-3">{images[current].sub}</p>
              </div>

              <button
                aria-label="Previous"
                onClick={() => setCurrent((c) => (c - 1 + images.length) % images.length)}
                className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/40 p-3 rounded-full text-white hover:bg-black/60 shadow-lg"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                aria-label="Next"
                onClick={() => setCurrent((c) => (c + 1) % images.length)}
                className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/40 p-3 rounded-full text-white hover:bg-black/60 shadow-lg"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="flex gap-2 justify-center mt-4">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-3 h-3 rounded-full ${i === current ? 'bg-white' : 'bg-white/30'}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Infrastructure Section */}
      <section className="py-32 bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <span className="text-primary font-bold tracking-[0.4em] uppercase mb-6 block">Command Center Data</span>
              <h2 className="text-5xl md:text-7xl font-display mb-10">THE 21 POINT<br /><span className="text-stroke text-white/40">NETWORK</span></h2>
              <p className="text-white/60 text-lg mb-12 max-w-xl">
                Our infrastructure is built for scale. Each of our 21 branches functions as a high-output production node, ensuring the "Addictive" standard is uniform across the entire city grid.
              </p>
              <div className="grid grid-cols-2 gap-8">
                 <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                    <span className="text-4xl font-display text-primary block mb-2">21</span>
                    <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase">Production Nodes</span>
                 </div>
                 <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                    <span className="text-4xl font-display text-primary block mb-2">60MIN</span>
                    <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase">Peak Latency</span>
                 </div>
              </div>
            </div>
            
            <div className="relative">
              {/* High-tech Branch List */}
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
                {[
                  "Badda (Flagship)", "Uttara", "Mirpur 1", "Dhanmondi", "Wari", 
                  "Mirpur 12", "Banasree", "Mohammadpur", "Khilgaon", "Bashundhara R/A", 
                  "Jatrabari", "Savar", "Narayanganj", "Gazipur", "Moghbazar"
                ].map((loc, i) => (
                  <div key={loc} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-xl hover:border-primary/50 transition-all group">
                    <div className="flex items-center gap-4">
                      <span className="text-primary font-mono text-xs opacity-40">[{String(i+1).padStart(2, '0')}]</span>
                      <span className="text-sm font-bold tracking-wider group-hover:text-primary transition-colors">{loc}</span>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                  </div>
                ))}
                <div className="p-4 text-center text-white/20 text-xs tracking-widest uppercase">
                  + 6 Upcoming Deployments
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Grid Line */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </section>
    </div>
  );
};

export default Story;
