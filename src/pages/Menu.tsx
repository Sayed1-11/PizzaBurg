import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import CinematicHero from '../components/CinematicHero';
import { Plus, Minus, Camera, Zap, Flame, ShieldCheck, ChevronRight, ChevronLeft } from 'lucide-react';

const MENU_DATA = [
  { id: '1', name: "BBQ Meat Machine", category: "Pizza", price: "Tk 335", desc: "Beef & chicken with veggies", arSrc: "/pizza.glb", hot: true, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop" },
  { id: '2', name: "Meaty Onion", category: "Pizza", price: "Tk 305", desc: "Onion, meat, sausage & spice", arSrc: "/pizza.glb", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop" },
  { id: '3', name: "Sausage Carnival", category: "Pizza", price: "Tk 335", desc: "Big sausage, mushroom, spice", hot: true, image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=800&auto=format&fit=crop" },
  { id: '4', name: "Cheddar Cream", category: "Pizza", price: "Tk 325", desc: "Salty cheese, chicken favorite", premium: true, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=800&auto=format&fit=crop" },
  { id: '5', name: "Tender Beef", category: "Pizza", price: "Tk 325", desc: "Juicy mashed beef & pepperoni", image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=800&auto=format&fit=crop" },
  { id: '6', name: "Chicken Cheese Volcano", category: "Burger", price: "Tk 339", desc: "Explosion of cheese", hot: true, image: "https://images.unsplash.com/photo-1586816001966-79b736744398?q=80&w=800&auto=format&fit=crop" },
  { id: '7', name: "Beef Tongue Slayer", category: "Burger", price: "Tk 269", desc: "Naga sauce & cheesy beef", premium: true, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop" },
  { id: '8', name: "Chicken Lollipop", category: "Snacks", price: "Tk 249", desc: "Crispy batter fried", image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=800&auto=format&fit=crop" },
  { id: '9', name: "Killer KitKat", category: "Koken", price: "Tk 349", desc: "Creamy vanilla & KitKat", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=800&auto=format&fit=crop" },
  { id: '10', name: "Blue Ocean", category: "Koken", price: "Tk 249", desc: "Refreshing booster", premium: true, image: "https://images.unsplash.com/photo-1556881286-fc6915169721?q=80&w=800&auto=format&fit=crop" },
];

const CATEGORIES = ["PIZZA", "BURGER", "SNACKS", "KOKEN"];

const getCategoryStyles = (category: string) => {
  switch (category) {
    case 'PIZZA':
      return {
        bgGlow: 'from-orange-500/20 via-red-500/10 to-transparent',
        cardGlow: 'hover:shadow-[0_0_40px_rgba(249,115,22,0.3)]',
        accentText: 'text-orange-500',
        accentBg: 'bg-orange-500',
        hoverAccentBg: 'hover:bg-orange-500',
        borderStyle: 'border-orange-500/20 hover:border-orange-500/50',
        cardBg: 'bg-orange-950/20',
        activeTab: 'bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.8)]'
      };
    case 'BURGER':
      return {
        bgGlow: 'from-amber-500/20 via-yellow-500/10 to-transparent',
        cardGlow: 'hover:shadow-[0_0_40px_rgba(245,158,11,0.3)]',
        accentText: 'text-amber-500',
        accentBg: 'bg-amber-500',
        hoverAccentBg: 'hover:bg-amber-500',
        borderStyle: 'border-amber-500/20 hover:border-amber-500/50',
        cardBg: 'bg-amber-950/20',
        activeTab: 'bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.8)]'
      };
    case 'SNACKS':
      return {
        bgGlow: 'from-purple-500/20 via-pink-500/10 to-transparent',
        cardGlow: 'hover:shadow-[0_0_40px_rgba(168,85,247,0.3)]',
        accentText: 'text-purple-500',
        accentBg: 'bg-purple-500',
        hoverAccentBg: 'hover:bg-purple-500',
        borderStyle: 'border-purple-500/20 hover:border-purple-500/50',
        cardBg: 'bg-purple-950/20',
        activeTab: 'bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.8)]'
      };
    case 'KOKEN':
      return {
        bgGlow: 'from-cyan-500/20 via-blue-500/10 to-transparent',
        cardGlow: 'hover:shadow-[0_0_40px_rgba(6,182,212,0.3)]',
        accentText: 'text-cyan-500',
        accentBg: 'bg-cyan-500',
        hoverAccentBg: 'hover:bg-cyan-500',
        borderStyle: 'border-cyan-500/20 hover:border-cyan-500/50',
        cardBg: 'bg-cyan-950/20',
        activeTab: 'bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)]'
      };
    default:
      return {
        bgGlow: 'from-primary/20 via-secondary/10 to-transparent',
        cardGlow: 'hover:shadow-[0_0_40px_rgba(255,0,0,0.3)]',
        accentText: 'text-primary',
        accentBg: 'bg-primary',
        hoverAccentBg: 'hover:bg-primary',
        borderStyle: 'border-white/10 hover:border-primary/40',
        cardBg: 'bg-white/5',
        activeTab: 'bg-primary shadow-[0_0_15px_rgba(255,0,0,0.8)]'
      };
  }
};

const CategoryCarousel = ({ category, items, activeArModel, setActiveArModel, getQuantity, addToCart, removeFromCart }: any) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const currentStyles = getCategoryStyles(category);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 450 : window.innerWidth * 0.85;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (items.length === 0) return null;

  return (
    <div className="relative mb-24 md:mb-32">
      {/* Category Header */}
      <div className="container mx-auto px-4 md:px-6 flex items-end justify-between mb-8 relative z-20">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Zap className={`${currentStyles.accentText}`} size={16} />
            <span className={`${currentStyles.accentText} font-bold tracking-[0.4em] uppercase text-[10px]`}>
              Signature Collection
            </span>
          </div>
          <h2 className="text-4xl md:text-7xl font-display uppercase">
            {category} <span className={currentStyles.accentText}>MENU</span>
          </h2>
        </div>
        <div className="hidden md:flex gap-4">
           <button onClick={() => scrollCarousel('left')} className="p-3 rounded-full bg-white/5 hover:bg-white/20 border border-white/10 backdrop-blur-md transition-all">
             <ChevronLeft size={24} />
           </button>
           <button onClick={() => scrollCarousel('right')} className="p-3 rounded-full bg-white/5 hover:bg-white/20 border border-white/10 backdrop-blur-md transition-all">
             <ChevronRight size={24} />
           </button>
        </div>
      </div>

      {/* Dynamic Background Ambience for this section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[40vw] pointer-events-none opacity-20">
        <div className={`absolute inset-0 blur-[150px] rounded-full opacity-30 ${currentStyles.accentBg}`} />
      </div>

      {/* Dynamic Horizontal Carousel */}
      <div className="relative w-full z-10">
        <div 
          ref={carouselRef}
          className="flex overflow-x-auto gap-6 md:gap-10 pb-12 pt-4 px-4 md:px-6 snap-x snap-mandatory no-scrollbar container mx-auto"
          style={{ scrollBehavior: 'smooth' }}
        >
          <AnimatePresence mode="popLayout">
            {items.map((item: any, index: number) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8, x: 100 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: -100 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`snap-center shrink-0 w-[85vw] md:w-[420px] min-h-[500px] relative rounded-[2rem] p-8 md:p-10 backdrop-blur-md border transition-all duration-500 group overflow-hidden ${currentStyles.cardBg} ${currentStyles.borderStyle} ${currentStyles.cardGlow}`}
              >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity z-20">
                  {item.hot && <Flame className={currentStyles.accentText} size={28} />}
                  {item.premium && <ShieldCheck className="text-white" size={28} />}
                </div>

                <div className="relative z-10 h-full flex flex-col">
                  <div className="w-full h-48 md:h-56 mb-8 rounded-2xl overflow-hidden shadow-2xl relative border border-white/10 group-hover:border-white/30 transition-colors">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    <span className={`absolute bottom-4 left-4 px-4 py-2 rounded-full border border-white/10 text-[10px] font-bold tracking-[0.2em] uppercase text-white/80 bg-black/50 backdrop-blur-md`}>
                      {item.category}
                    </span>
                  </div>

                  <div className="flex justify-between items-start mb-4 gap-4">
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-display group-hover:tracking-wider transition-all duration-500 leading-tight">
                      {item.name}
                    </h3>
                    <span className={`text-2xl font-bold font-display ${currentStyles.accentText} whitespace-nowrap mt-1`}>{item.price}</span>
                  </div>
                  
                  <p className="text-white/50 text-sm md:text-base mb-10 leading-relaxed font-medium">
                    {item.desc}
                  </p>

                  <div className="mt-auto flex flex-col gap-4">
                    {item.arSrc && (
                      <button
                        onClick={() => setActiveArModel(item.arSrc as string)}
                        className={`w-full flex items-center justify-center gap-3 py-4 border border-white/10 rounded-full text-xs font-bold tracking-[0.2em] ${currentStyles.hoverAccentBg} transition-all duration-500 group/btn bg-black/40 uppercase`}
                      >
                        <Camera size={16} className="group-hover/btn:rotate-12 transition-transform" />
                        View in AR
                      </button>
                    )}

                    {getQuantity(item.id) > 0 ? (
                      <div className={`flex items-center justify-between ${currentStyles.accentBg} p-1.5 rounded-full border border-white/20 shadow-lg text-black transition-colors duration-500`}>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-12 h-12 flex items-center justify-center hover:bg-black/20 rounded-full transition-colors"
                        >
                          <Minus size={20} />
                        </button>
                        <span className="font-black text-xl">{getQuantity(item.id)}</span>
                        <button
                          onClick={() => addToCart(item)}
                          className="w-12 h-12 flex items-center justify-center hover:bg-black/20 rounded-full transition-colors"
                        >
                          <Plus size={20} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(item)}
                        className="w-full py-5 bg-white text-black font-black text-sm tracking-[0.2em] rounded-full hover:bg-black hover:text-white border border-transparent hover:border-white transition-all duration-500 uppercase shadow-lg"
                      >
                        Order Now
                      </button>
                    )}
                  </div>
                </div>

                {/* Hover Glow Effect inside card */}
                <div className={`absolute inset-0 bg-gradient-to-tr ${currentStyles.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Mobile nav controls */}
      <div className="flex md:hidden justify-center gap-4 mt-4 px-4 relative z-20">
         <button onClick={() => scrollCarousel('left')} className="p-3 rounded-full bg-white/5 hover:bg-white/20 border border-white/10 backdrop-blur-md transition-all">
           <ChevronLeft size={20} />
         </button>
         <button onClick={() => scrollCarousel('right')} className="p-3 rounded-full bg-white/5 hover:bg-white/20 border border-white/10 backdrop-blur-md transition-all">
           <ChevronRight size={20} />
         </button>
      </div>
    </div>
  );
};

const Menu = () => {
  const { cart, addToCart, removeFromCart } = useCart();
  const [activeArModel, setActiveArModel] = useState<string | null>(null);

  const getQuantity = (id: string) => {
    return cart.find(item => item.id === id)?.quantity || 0;
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-24 md:pt-32 pb-20 relative overflow-hidden">
      {/* Global Page Ambience */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-primary blur-[150px] rounded-full opacity-20" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-secondary blur-[150px] rounded-full opacity-10" />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Shared cinematic hero for Menu */}
        <CinematicHero
          eyebrow="Masterpiece Collection"
          titleTop={<>FLAVOR</>}
          highlight={<>INTERFACE</>}
          variant="compact"
          size="hero"
        />

        {/* Category Carousels */}
        {CATEGORIES.map(category => {
          const items = MENU_DATA.filter(item => item.category.toUpperCase() === category);
          return (
            <CategoryCarousel
              key={category}
              category={category}
              items={items}
              activeArModel={activeArModel}
              setActiveArModel={setActiveArModel}
              getQuantity={getQuantity}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          );
        })}
      </div>

      {/* AR Modal */}
      {activeArModel && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6">
          <button
            onClick={() => setActiveArModel(null)}
            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors cursor-pointer z-50 p-4 bg-white/5 rounded-full"
          >
            <Plus size={32} className="rotate-45" />
          </button>

          <div className="w-full h-full max-w-6xl flex flex-col items-center justify-center">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-display text-primary animate-pulse tracking-[0.5em]">ACTIVE_SCENE</h2>
              <p className="text-xs text-white/40 mt-2 uppercase tracking-widest">Mobile devices support physical surface placement</p>
            </div>
            <div className="w-full h-[60vh] bg-[#0a0a0a] rounded-[3rem] border border-primary/20 relative shadow-2xl overflow-hidden p-8">
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
