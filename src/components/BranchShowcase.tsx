import { motion } from 'framer-motion';
import { MapPin, Navigation, Phone, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BRANCHES = [
  { name: "Badda", area: "Progoti Shoroni", phone: "01313-030303", hours: "11AM - 11PM", mapLink: "https://www.google.com/maps/search/PizzaBurg+Badda" },
  { name: "Uttara", area: "Sector 3", phone: "01313-040404", hours: "11AM - 11PM", mapLink: "https://www.google.com/maps/search/PizzaBurg+Uttara" },
  { name: "Mirpur 1", area: "Sony Cinema Hall", phone: "01313-050505", hours: "11AM - 11PM", mapLink: "https://www.google.com/maps/search/PizzaBurg+Mirpur+1" },
  { name: "Dhanmondi", area: "Satmasjid Road", phone: "01313-060606", hours: "11AM - 11PM", mapLink: "https://www.google.com/maps/search/PizzaBurg+Dhanmondi" },
  { name: "Wari", area: "Ranking Street", phone: "01313-070707", hours: "11AM - 11PM", mapLink: "https://www.google.com/maps/search/PizzaBurg+Wari" },
  { name: "Banasree", area: "Main Road", phone: "01313-080808", hours: "11AM - 11PM", mapLink: "https://www.google.com/maps/search/PizzaBurg+Banasree" },
  { name: "Khilgaon", area: "Taltola", phone: "01313-090909", hours: "11AM - 11PM", mapLink: "https://www.google.com/maps/search/PizzaBurg+Khilgaon" },
  { name: "Bashundhara", area: "Block C", phone: "01313-101010", hours: "11AM - 11PM", mapLink: "https://www.google.com/maps/search/PizzaBurg+Bashundhara" },
  { name: "Mirpur 12", area: "Bus Stand", phone: "01313-111111", hours: "11AM - 11PM", mapLink: "https://www.google.com/maps/search/PizzaBurg+Mirpur+12" },
  { name: "Mohammadpur", area: "Town Hall", phone: "01313-121212", hours: "11AM - 11PM", mapLink: "https://www.google.com/maps/search/PizzaBurg+Mohammadpur" },
  { name: "Jatrabari", area: "Flyover Area", phone: "01313-131313", hours: "11AM - 11PM", mapLink: "https://www.google.com/maps/search/PizzaBurg+Jatrabari" },
  { name: "Savar", area: "City Center", phone: "01313-141414", hours: "11AM - 11PM", mapLink: "https://www.google.com/maps/search/PizzaBurg+Savar" },
  { name: "Narayanganj", area: "Chashara", phone: "01313-151515", hours: "11AM - 11PM", mapLink: "https://www.google.com/maps/search/PizzaBurg+Narayanganj" },
  { name: "Gazipur", area: "Chowrasta", phone: "01313-161616", hours: "11AM - 11PM", mapLink: "https://www.google.com/maps/search/PizzaBurg+Gazipur" },
  { name: "Moghbazar", area: "Wireless", phone: "01313-171717", hours: "11AM - 11PM", mapLink: "https://www.google.com/maps/search/PizzaBurg+Moghbazar" },
  { name: "Khilgao", area: "Chowdhurypara", phone: "01313-181818", hours: "11AM - 11PM", mapLink: "https://www.google.com/maps/search/PizzaBurg+Khilgao" },
  { name: "Bosila", area: "Main Bridge", phone: "01313-191919", hours: "11AM - 11PM", mapLink: "https://www.google.com/maps/search/PizzaBurg+Bosila" },
  { name: "Keraniganj", area: "Kadamtali", phone: "01313-202020", hours: "11AM - 11PM", mapLink: "https://www.google.com/maps/search/PizzaBurg+Keraniganj" },
  { name: "Tongi", area: "Station Road", phone: "01313-212121", hours: "11AM - 11PM", mapLink: "https://www.google.com/maps/search/PizzaBurg+Tongi" },
  { name: "Bailey Road", area: "Food Street", phone: "01313-222222", hours: "11AM - 11PM", mapLink: "https://www.google.com/maps/search/PizzaBurg+Bailey+Road" },
  { name: "Nikunja", area: "Executive Zone", phone: "01313-232323", hours: "11AM - 11PM", mapLink: "https://www.google.com/maps/search/PizzaBurg+Nikunja" },
];

const BranchShowcase = ({ fullView = false }: { fullView?: boolean }) => {
  const displayBranches = fullView ? BRANCHES : BRANCHES.slice(0, 7);

  return (
    <section className={`py-32 bg-background relative overflow-hidden ${!fullView ? 'border-t border-white/5' : ''}`}>
      {/* High-tech Background Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(var(--color-primary) 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-8 md:w-12 h-[1px] bg-primary" />
              <span className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] md:text-sm">Find Your Nearest Outlet</span>
            </motion.div>
            <h2 className="text-5xl md:text-8xl font-display leading-[0.9]">
              OUR<br />
              <span className="text-red-500">LOCATIONS</span>
            </h2>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 md:p-6 rounded-2xl md:max-w-xs">
            <p className="text-white/60 text-xs md:text-sm leading-relaxed">
              With 21 branches across the city, the most addictive flavors in Bangladesh are always around the corner. Visit us today!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayBranches.map((branch, index) => (
            <a
              key={branch.name}
              href={branch.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="relative bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-primary transition-all duration-500 overflow-hidden h-full"
              >
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary transition-colors duration-500">
                      <MapPin size={24} className="text-primary group-hover:text-white" />
                    </div>
                    <span className="text-[10px] font-bold tracking-widest text-white/20 group-hover:text-primary/40">BRANCH_ID: {String(index + 1).padStart(2, '0')}</span>
                  </div>

                  <h3 className="text-2xl font-display mb-2 group-hover:text-primary transition-colors">{branch.name}</h3>
                  <p className="text-white/40 text-xs mb-6 flex items-center gap-2">
                    <Navigation size={12} /> {branch.area}
                  </p>

                  <div className="space-y-3 pt-6 border-t border-white/5 group-hover:border-primary/20">
                    <div className="flex items-center gap-3 text-white/60 text-[10px] tracking-wider">
                      <Phone size={12} className="text-primary" />
                      {branch.phone}
                    </div>
                    <div className="flex items-center gap-3 text-white/60 text-[10px] tracking-wider mb-4">
                      <Clock size={12} className="text-primary" />
                      {branch.hours}
                    </div>
                    <div className="text-[10px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-tighter">
                      Click to open in Google Maps →
                    </div>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute -inset-2 bg-primary/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </motion.div>
            </a>
          ))}

          {/* View All Card - Only show on Home page */}
          {!fullView && (
            <Link to="/locations" className="contents">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center p-8 border border-primary/20 bg-primary/5 rounded-3xl hover:bg-primary transition-all duration-500 group cursor-pointer relative overflow-hidden"
              >
                <div className="text-center relative z-10">
                  <span className="text-5xl font-display block mb-2 group-hover:scale-110 transition-transform">+{BRANCHES.length - 7}</span>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-60 group-hover:opacity-100">Browse Full Network</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity blur-2xl" />
              </motion.div>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default BranchShowcase;
