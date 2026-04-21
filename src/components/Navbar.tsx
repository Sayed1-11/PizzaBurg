import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { totalItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Locations', path: '/locations' },
    { name: 'Story', path: '/story' },
    { name: 'Career', path: '/career' }
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[60] px-4 md:px-8 py-6 md:py-8 transition-all duration-500 bg-background/50 backdrop-blur-md md:bg-transparent">
        <div className="container mx-auto flex justify-between items-center">

          {/* Minimalist Logo */}
          <Link to="/" className="text-2xl md:text-3xl tracking-[0.1em] font-display text-white group cursor-pointer relative z-50">
            PIZZA<span className="text-primary group-hover:text-white transition-colors duration-500">BURG</span>
          </Link>

          {/* Futuristic Navigation Links - Desktop */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-[11px] tracking-[0.3em] font-bold transition-all duration-300 relative uppercase
                           ${pathname === item.path ? 'text-primary' : 'text-white/60 hover:text-white'}
                           after:content-[''] after:absolute after:-bottom-3 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] after:bg-primary hover:after:w-full after:transition-all after:duration-300`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4 md:gap-8">
            {/* Cyberpunk Cart */}
            <Link to="/cart" className="relative group p-2">
              <div className="absolute inset-0 bg-primary/0 rounded-full group-hover:bg-primary/20 blur-md transition-all duration-500" />
              <ShoppingCart size={22} className="text-white relative z-10" strokeWidth={1.5} />

              {totalItems > 0 && (
                <span className="absolute -top-1 -right-2 bg-primary text-white text-[10px] font-bold tracking-widest w-5 h-5 flex items-center justify-center rounded-sm shadow-[0_0_15px_rgba(255,0,0,0.6)] z-20">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative z-50 p-2 text-white hover:text-primary transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[55] bg-black/95 backdrop-blur-2xl md:hidden flex flex-col justify-center items-center p-8"
          >
            <div className="flex flex-col items-center gap-10">
              {navLinks.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-4xl font-display tracking-[0.2em] transition-colors
                               ${pathname === item.path ? 'text-primary' : 'text-white hover:text-primary'}`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-12 flex items-center gap-4 text-primary"
              >
                <Zap size={20} />
                <span className="text-[10px] font-bold tracking-[0.5em] uppercase">Addictive Tech v4.0</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
