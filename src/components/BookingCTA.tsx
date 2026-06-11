import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Utensils, MapPin, ChevronRight, Clock, Users, Bike } from 'lucide-react';

const BookingCTA = () => {
  return (
    <section className="relative py-32 px-4 md:px-8 overflow-hidden bg-[#060606]">
      {/* Subtle background gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-5%] left-[30%] w-[50vw] h-[50vw] blur-[200px] rounded-full bg-primary opacity-[0.04]" />
        <div className="absolute bottom-0 right-[10%] w-[40vw] h-[40vw] blur-[180px] rounded-full bg-secondary opacity-[0.04]" />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-[10px] font-bold tracking-[0.5em] text-primary uppercase mb-4">
            Experience PizzaBurg
          </p>
          <h2 className="text-5xl md:text-7xl font-display uppercase leading-tight text-white">
            YOUR TABLE,<br />
            <span className="text-primary">YOUR RULES</span>
          </h2>
          <p className="text-white/40 text-base mt-6 max-w-xl mx-auto leading-relaxed">
            Walk in and dine with your crew, or get the addiction delivered straight to your door. 
            The choice is yours.
          </p>
        </motion.div>

        {/* Two Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          
          {/* Dine-in Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Link to="/book" className="group block relative bg-white/[0.04] border border-white/10 rounded-[2.5rem] p-10 overflow-hidden hover:border-secondary/50 transition-all duration-500 hover:bg-white/[0.07]">
              {/* Card background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem]" />
              
              {/* Icon */}
              <div className="relative z-10 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center group-hover:bg-secondary/20 transition-all duration-300">
                  <Utensils size={28} className="text-secondary" />
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 mb-8">
                <h3 className="text-3xl font-display uppercase tracking-tight text-white mb-3">
                  Dine In
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  Reserve your table at any Pizzaburg branch. Choose your seats, pick your arrival time, and even pre-order your meal so it's hot and ready when you walk in.
                </p>
              </div>

              {/* Feature Pills */}
              <div className="relative z-10 flex flex-wrap gap-2 mb-10">
                {[
                  { icon: <Users size={12} />, label: 'Up to 20 seats' },
                  { icon: <Clock size={12} />, label: 'Time slots available' },
                  { icon: <Utensils size={12} />, label: 'Pre-order food' },
                ].map((f) => (
                  <span key={f.label} className="flex items-center gap-1.5 bg-white/5 border border-white/10 text-white/50 text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full">
                    {f.icon} {f.label}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="relative z-10 flex items-center gap-3 text-secondary font-black text-sm tracking-[0.2em] uppercase group-hover:gap-5 transition-all duration-300">
                Book Your Table 
                <ChevronRight size={18} />
              </div>
            </Link>
          </motion.div>

          {/* Delivery Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link to="/menu" className="group block relative bg-white/[0.04] border border-white/10 rounded-[2.5rem] p-10 overflow-hidden hover:border-primary/50 transition-all duration-500 hover:bg-white/[0.07]">
              {/* Card background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem]" />

              {/* Icon */}
              <div className="relative z-10 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                  <Bike size={28} className="text-primary" />
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 mb-8">
                <h3 className="text-3xl font-display uppercase tracking-tight text-white mb-3">
                  Delivery
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  Browse the full menu, add your addictions to the cart, and get blazing-fast delivery straight to your door. Hot, fresh, and unstoppable — just like us.
                </p>
              </div>

              {/* Feature Pills */}
              <div className="relative z-10 flex flex-wrap gap-2 mb-10">
                {[
                  { icon: <Clock size={12} />, label: '30–45 min delivery' },
                  { icon: <MapPin size={12} />, label: '20+ locations' },
                  { icon: <Bike size={12} />, label: 'Live tracking' },
                ].map((f) => (
                  <span key={f.label} className="flex items-center gap-1.5 bg-white/5 border border-white/10 text-white/50 text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full">
                    {f.icon} {f.label}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="relative z-10 flex items-center gap-3 text-primary font-black text-sm tracking-[0.2em] uppercase group-hover:gap-5 transition-all duration-300">
                Order Now
                <ChevronRight size={18} />
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Bottom tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-white/20 text-[10px] tracking-[0.5em] uppercase mt-12"
        >
          Available at all 20+ Pizzaburg locations across Bangladesh
        </motion.p>
      </div>
    </section>
  );
};

export default BookingCTA;
