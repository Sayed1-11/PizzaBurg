import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { X, Camera, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const MENU_ITEMS = [
  { id: '1', name: "BBQ Meat Machine", category: "Pizza", price: "Tk 335", features: ["Beef", "Chicken", "Veggies"], arSrc: "/pizza.glb", desc: "Beef & chicken with veggies", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop" },
  { id: '2', name: "Meaty Onion", category: "Pizza", price: "Tk 305", features: ["Onion", "Meat", "Sausage"], arSrc: "/pizza.glb", desc: "Onion, meat, sausage & spice", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop" },
  { id: '3', name: "Sausage Carnival", category: "Pizza", price: "Tk 335", features: ["Mushroom", "Big Sausage"], desc: "Big sausage, mushroom, spice", image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=800&auto=format&fit=crop" },
  { id: '7', name: "Tongue Slayer", category: "Burger", price: "Tk 229", features: ["Naga Sauce", "Tender Chicken"], desc: "Naga sauce & cheesy beef", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop" },
  { id: '6', name: "Cheese Volcano", category: "Burger", price: "Tk 339", features: ["Cheese Explosion", "Juicy Patty"], desc: "Explosion of cheese", image: "https://images.unsplash.com/photo-1586816001966-79b736744398?q=80&w=800&auto=format&fit=crop" },
  { id: '9', name: "Killer KitKat", category: "Koken", price: "Tk 349", features: ["Vanilla", "KitKat Milkshake"], desc: "Creamy vanilla & KitKat", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=800&auto=format&fit=crop" },
];

const MenuShowcase = () => {
  const horizontalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [activeArModel, setActiveArModel] = useState<string | null>(null);
  const { cart, addToCart, removeFromCart } = useCart();

  const getQuantity = (id: string) => {
    return cart.find(item => item.id === id)?.quantity || 0;
  };

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 0px)", () => {
      const isMobile = window.innerWidth < 1024;

      gsap.fromTo(
        horizontalRef.current,
        { translateX: 0 },
        {
          translateX: "-300vw",
          ease: "none",
          duration: 1,
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: isMobile ? "1500 top" : "2500 top", // Shorter scroll on mobile for snappiness
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            snap: {
              snapTo: 1 / 3, // Snap to each slide
              duration: 0.5,
              ease: "power2.inOut"
            }
          },
        }
      );
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <>
      <section ref={triggerRef} className="overflow-hidden bg-[#080808]">
        <div ref={horizontalRef} className="h-screen flex items-center w-[400vw]">
          {/* Intro Slide */}
          <div className="w-screen h-full flex items-center justify-center px-6 md:px-20 relative">
            {/* Decorative Background Text - Scaled for Mobile */}
            <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] md:text-[15vw] font-display text-stroke opacity-10 select-none pointer-events-none whitespace-nowrap">
              SIGNATURE
            </h2>
            <div className="max-w-4xl text-center relative z-10">
              <h3 className="text-4xl md:text-7xl lg:text-9xl font-display text-primary leading-[0.85]">
                CRAFTED<br />FLAVORS
              </h3>
              <p className="mt-6 text-[10px] md:text-sm tracking-[0.4em] uppercase text-white/40">Scroll to explore</p>
            </div>
          </div>

          {/* Menu Items */}
          {MENU_ITEMS.map((item, index) => (
            <div key={index} className="w-screen h-full flex items-center justify-center px-4 md:px-10">
              <div className="relative group p-6 md:p-12 border border-white/5 bg-white/5 rounded-3xl backdrop-blur-md hover:border-primary/50 transition-all duration-500 w-full max-w-sm md:max-w-2xl overflow-hidden">
                <span className="absolute top-0 left-0 p-4 text-4xl md:text-8xl font-display text-white/5 select-none pointer-events-none">
                  0{index + 1}
                </span>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-full h-48 md:h-64 mb-6 rounded-2xl overflow-hidden shadow-2xl relative border border-white/10 group-hover:border-primary/30 transition-colors">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    <span className="absolute bottom-4 left-4 text-secondary font-bold uppercase tracking-widest text-[10px] md:text-xs z-10 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/10">
                      {item.category}
                    </span>
                  </div>

                  <div className="flex justify-between items-start mb-4 gap-4">
                     <h3 className="text-3xl md:text-5xl lg:text-6xl font-display group-hover:text-primary transition-colors leading-tight">
                       {item.name}
                     </h3>
                     <span className="text-2xl md:text-4xl font-bold font-display text-primary whitespace-nowrap mt-1">{item.price}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {item.features.map((f, i) => (
                      <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[8px] md:text-[10px] uppercase font-bold text-white/40">
                        {f}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col gap-3 md:flex-row md:items-center mt-10">
                    {item.arSrc && (
                      <button
                        onClick={() => setActiveArModel(item.arSrc as string)}
                        className="flex-1 flex items-center justify-center gap-2 border border-white/20 text-white px-6 py-4 rounded-full font-bold hover:bg-white hover:text-black transition-all cursor-pointer text-[10px] tracking-widest uppercase"
                      >
                        <Camera size={14} /> See your food
                      </button>
                    )}
                    {getQuantity(item.id) > 0 ? (
                      <div className="flex-1 flex items-center justify-between bg-primary p-1 rounded-full border border-white/10 h-[50px]">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-10 h-10 flex items-center justify-center hover:bg-black/20 rounded-full transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="font-bold text-sm">{getQuantity(item.id)}</span>
                        <button
                          onClick={() => addToCart(item as any)}
                          className="w-10 h-10 flex items-center justify-center hover:bg-black/20 rounded-full transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => addToCart(item as any)}
                        className="flex-1 bg-white text-black px-6 py-4 rounded-full font-bold hover:bg-primary hover:text-white transition-all text-[10px] tracking-widest uppercase h-[50px] cursor-pointer"
                      >
                        Order Now
                      </button>
                    )}
                  </div>
                </div>

                {/* Cyber Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            </div>
          ))}

          {/* Categories Slide - At the end of the menu */}
          <div className="w-screen h-full flex items-center justify-center px-4 md:px-10 bg-[#0a0a0a] relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-primary/20 blur-[150px] rounded-full opacity-30 translate-x-1/2 translate-y-1/2" />

            <div className="text-center relative z-10 w-full">
              <span className="text-primary font-bold tracking-[0.5em] uppercase text-[10px] md:text-sm mb-6 block">Strategic Expansion</span>
              <h2 className="text-3xl md:text-7xl lg:text-[10vw] font-display text-white mb-10 leading-none uppercase">WANT MORE?</h2>
              <div className="flex flex-wrap justify-center gap-3 md:gap-8 max-w-lg mx-auto">
                {["PIZZA", "BURGERS", "RICE", "SNACKS", "KOKEN"].map((cat) => (
                  <button key={cat} className="text-xl md:text-4xl lg:text-5xl font-display hover:scale-110 transition-transform text-white/30 hover:text-white uppercase tracking-tighter hover:text-primary whitespace-nowrap">
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-Platform Dynamic AR Modal */}
      {activeArModel && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center">
          <button
            onClick={() => setActiveArModel(null)}
            className="absolute top-8 right-8 text-white/50 hover:text-primary transition-colors cursor-pointer z-50 p-3 bg-white/5 rounded-full"
          >
            <X size={32} />
          </button>

          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 sm:p-10 z-40 pointer-events-none">
            <div className="text-center mb-8">
              <span className="text-primary font-bold tracking-[0.3em] uppercase drop-shadow-md">
                3D Interactive Simulation
              </span>
              <p className="text-white/40 text-sm tracking-widest mt-2 max-w-md mx-auto">
                Desktop users: Drag to rotate the 3D model.
                <br /><br />
                <strong className="text-white/80">To view in your physical room, open this website on an iPhone or Android phone!</strong>
              </p>
            </div>

            <div className="w-full h-[60vh] max-w-4xl border border-white/10 rounded-3xl relative shadow-[0_0_100px_rgba(255,0,0,0.1)] bg-[#111] pointer-events-auto overflow-hidden">
              <model-viewer
                src={activeArModel}
                ar
                ar-modes="webxr scene-viewer quick-look"
                camera-controls
                auto-rotate
                shadow-intensity="1"
                environment-image="neutral"
                style={{ width: '100%', height: '100%', display: 'block' }}
                alt="Interactive Pizza"
              >
                <div slot="poster" className="absolute inset-0 flex items-center justify-center text-primary font-bold animate-pulse">
                  Loading 3D Model...
                </div>
              </model-viewer>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuShowcase;
