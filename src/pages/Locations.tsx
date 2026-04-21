import { motion } from 'framer-motion';
import BranchShowcase from '../components/BranchShowcase';

const Locations = () => {
  return (
    <div className="min-h-screen bg-background text-white">
      <div className="container mx-auto px-6 py-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-8xl font-display mb-10 text-center"
        >
          FIND OUR <span className="text-primary">BRANCHES</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-white/40 text-center max-w-2xl mx-auto mb-20 uppercase tracking-widest text-sm"
        >
          Discover 21 outlets across Bangladesh serving the most addictive pizza experience. Find the one nearest to you.
        </motion.p>
      </div>
      <BranchShowcase fullView={true} />
    </div>
  );
};

export default Locations;
