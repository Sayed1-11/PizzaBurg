import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { CheckCircle2, Package, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Order = () => {
  const { clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    // Clear cart after order is "placed"
    const timer = setTimeout(() => {
      clearCart();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto px-6 py-24 flex justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl w-full bg-white/5 border border-white/10 rounded-[40px] p-12 text-center"
      >
        <div className="flex justify-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 10, delay: 0.2 }}
            className="bg-primary p-6 rounded-full"
          >
            <CheckCircle2 size={60} className="text-white" />
          </motion.div>
        </div>
        
        <h1 className="text-5xl font-display mb-4 uppercase tracking-tight leading-none">Order <span className="text-primary">Success!</span></h1>
        <p className="text-muted-foreground text-lg mb-12">Thank you! Your addictive meal is being prepared. It'll be there in 30-45 minutes.</p>

        <div className="space-y-4 mb-12">
          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 text-left">
            <Package size={20} className="text-primary" />
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Order ID</p>
              <p className="font-bold">#PB-{(Math.random() * 100000).toFixed(0)}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 text-left">
            <MapPin size={20} className="text-secondary" />
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Delivery To</p>
              <p className="font-bold">Current Location / Dhaka</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate('/')}
          className="w-full bg-white text-black py-5 rounded-2xl font-bold transition-all hover:bg-primary hover:text-white uppercase tracking-widest"
        >
          BACK TO HOME
        </button>
      </motion.div>
    </div>
  );
};

export default Order;
