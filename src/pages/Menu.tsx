import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Plus, Minus, Camera, Zap, Flame, ShieldCheck } from 'lucide-react';

const MENU_DATA = [
  { id: '1', name: "BBQ Meat Machine", category: "Pizza", price: "Tk 335", desc: "Beef & chicken with veggies", arSrc: "/pizza.glb", hot: true },
  { id: '2', name: "Meaty Onion", category: "Pizza", price: "Tk 305", desc: "Onion, meat, sausage & spice", arSrc: "/pizza.glb" },
  { id: '3', name: "Sausage Carnival", category: "Pizza", price: "Tk 335", desc: "Big sausage, mushroom, spice", hot: true },
  { id: '4', name: "Cheddar Cream", category: "Pizza", price: "Tk 325", desc: "Salty cheese, chicken favorite", premium: true },
  { id: '5', name: "Tender Beef", category: "Pizza", price: "Tk 325", desc: "Juicy mashed beef & pepperoni" },
  { id: '6', name: "Chicken Cheese Volcano", category: "Burger", price: "Tk 339", desc: "Explosion of cheese", hot: true },
  { id: '7', name: "Beef Tongue Slayer", category: "Burger", price: "Tk 269", desc: "Naga sauce & cheesy beef", premium: true },
  { id: '8', name: "Chicken Lollipop", category: "Snacks", price: "Tk 249", desc: "Crispy batter fried" },
  { id: '9', name: "Killer KitKat", category: "Koken", price: "Tk 349", desc: "Creamy vanilla & KitKat" },
  { id: '10', name: "Blue Ocean", category: "Koken", price: "Tk 249", desc: "Refreshing booster", premium: true },
];

const CATEGORIES = ["ALL", "PIZZA", "BURGER", "SNACKS", "KOKEN"];

const Menu = () => {
  const { cart, addToCart, removeFromCart } = useCart();
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [activeArModel, setActiveArModel] = useState<string | null>(null);

  const filteredMenu = useMemo(() => {
    if (activeCategory === "ALL") return MENU_DATA;
    return MENU_DATA.filter(item => item.category.toUpperCase() === activeCategory);
  }, [activeCategory]);

  const getQuantity = (id: string) => {
    return cart.find(item => item.id === id)?.quantity || 0;
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-24 md:pt-32 pb-20 px-4 md:px-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-primary blur-[150px] rounded-full opacity-20" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-secondary blur-[150px] rounded-full opacity-10" />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Futuristic Header */}
        <div className="mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-4"
          >
            <Zap className="text-primary" size={20} />
            <span className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] md:text-sm">Addictives</span>
          </motion.div>
          <h1 className="text-5xl md:text-9xl font-display leading-[0.85] mb-8">
            FLAVOR<br /><span className="text-red-500">INTERFACE</span>
          </h1>

          {/* Cyberpunk Category Filter - Scrollable on mobile */}
          <div className="flex overflow-x-auto md:flex-wrap gap-2 md:gap-4 border-b border-white/5 pb-6 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-6 md:px-8 py-3 font-display text-lg md:text-xl tracking-wider transition-all duration-300 whitespace-nowrap
                  ${activeCategory === cat ? 'text-primary' : 'text-white/40 hover:text-white'}`}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-primary shadow-[0_0_15px_rgba(255,0,0,0.8)]"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Menu Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredMenu.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-md hover:border-primary/40 transition-all duration-500 overflow-hidden"
              >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                  {item.hot && <Flame className="text-primary" size={24} />}
                  {item.premium && <ShieldCheck className="text-secondary" size={24} />}
                </div>

                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <span className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-bold tracking-[0.2em] uppercase text-white/60">
                      {item.category}
                    </span>
                    <span className="text-2xl font-bold font-display text-primary">{item.price}</span>
                  </div>

                  <h3 className="text-3xl font-display mb-3 group-hover:tracking-wider transition-all duration-500">
                    {item.name}
                  </h3>
                  <p className="text-white/40 text-sm mb-8 leading-relaxed max-w-[80%]">
                    {item.desc}
                  </p>

                  <div className="mt-auto flex flex-col gap-4">
                    {item.arSrc && (
                      <button
                        onClick={() => setActiveArModel(item.arSrc as string)}
                        className="w-full flex items-center justify-center gap-3 py-3 border border-primary/20 rounded-full text-xs font-bold tracking-[0.2em] hover:bg-primary transition-all duration-500 group/btn"
                      >
                        <Camera size={14} className="group-hover/btn:rotate-12 transition-transform" />
                        See Food in AR
                      </button>
                    )}

                    {getQuantity(item.id) > 0 ? (
                      <div className="flex items-center justify-between bg-primary p-1 rounded-full border border-white/10">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-10 h-10 flex items-center justify-center hover:bg-black/20 rounded-full transition-colors"
                        >
                          <Minus size={18} />
                        </button>
                        <span className="font-bold text-lg">{getQuantity(item.id)}</span>
                        <button
                          onClick={() => addToCart(item)}
                          className="w-10 h-10 flex items-center justify-center hover:bg-black/20 rounded-full transition-colors"
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(item)}
                        className="w-full py-4 bg-white text-black font-black text-sm tracking-[0.1em] rounded-full hover:bg-primary hover:text-white transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,0,0,0.4)]"
                      >
                        Order Now
                      </button>
                    )}
                  </div>
                </div>

                {/* Cyber Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* AR Modal - Reusing the stable one from before */}
      {activeArModel && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6">
          <button
            onClick={() => setActiveArModel(null)}
            className="absolute top-8 right-8 text-white/50 hover:text-primary transition-colors cursor-pointer z-50 p-4 bg-white/5 rounded-full"
          >
            <Plus size={32} className="rotate-45" />
          </button>

          <div className="w-full h-full max-w-6xl flex flex-col items-center justify-center">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-display text-primary animate-pulse tracking-[0.5em]">ACTIVE_SCENE</h2>
              <p className="text-xs text-white/40 mt-2 uppercase tracking-widest">Mobile devices support physical surface placement</p>
            </div>
            <div className="w-full h-[60vh] bg-[#0a0a0a] rounded-[3rem] border border-white/10 relative shadow-2xl overflow-hidden p-8">
              <model-viewer
                src={activeArModel}
                ar-modes="webxr scene-viewer quick-look"
                camera-controls
                auto-rotate
                shadow-intensity="1"
                environment-image="neutral"
                style={{ width: '100%', height: '100%', display: 'block' }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
