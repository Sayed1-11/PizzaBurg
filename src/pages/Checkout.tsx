import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { User, MapPin, Building2, CreditCard, ChevronRight, CheckCircle2 } from 'lucide-react';

const BRANCHES = [
  "Badda", "Uttara", "Mirpur 1", "Dhanmondi", "Wari", "Banasree", "Khilgaon", 
  "Bashundhara", "Mirpur 12", "Mohammadpur", "Jatrabari", "Savar", "Narayanganj", 
  "Gazipur", "Moghbazar", "Khilgao", "Bosila", "Keraniganj", "Tongi", "Bailey Road", "Nikunja"
];

const Checkout = () => {
  const { cart, totalPrice } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    branch: 'Badda',
    paymentMethod: 'cod'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd send this data to a backend
    navigate('/order');
  };

  if (cart.length === 0) {
    navigate('/menu');
    return null;
  }

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-32 pb-20 px-4 md:px-6">
      <div className="container mx-auto">
        <h1 className="text-4xl md:text-6xl font-display mb-12 text-center md:text-left">
          DEPLOYMENT <span className="text-primary">INTEL</span>
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Details Form */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-2xl font-display mb-8 flex items-center gap-4">
                  <User className="text-primary" size={24} />
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold tracking-widest text-white/40 uppercase ml-4">Full Name</label>
                    <input 
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g. Mir Mehadi"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-primary outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold tracking-widest text-white/40 uppercase ml-4">Phone Number</label>
                    <input 
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="01XXXXXXXXX"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-primary outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12">
              <h2 className="text-2xl font-display mb-8 flex items-center gap-4">
                <MapPin className="text-primary" size={24} />
                Delivery Deployment
              </h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest text-white/40 uppercase ml-4">Full Delivery Address</label>
                  <textarea 
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    placeholder="Sector, Road, House, Apartment..."
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-primary outline-none transition-all resize-none"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold tracking-widest text-white/40 uppercase ml-4">Select Deployment Zone</label>
                    <div className="grid grid-cols-1 gap-3">
                      <select 
                        value={formData.branch}
                        onChange={(e) => setFormData({...formData, branch: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-primary outline-none transition-all appearance-none cursor-pointer"
                      >
                        {BRANCHES.map(branch => (
                          <option key={branch} value={branch} className="bg-background text-white">{branch} Branch</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold tracking-widest text-white/40 uppercase ml-4">Payment Method</label>
                    <div className="flex gap-4">
                      <button 
                        type="button"
                        onClick={() => setFormData({...formData, paymentMethod: 'cod'})}
                        className={`flex-1 p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${formData.paymentMethod === 'cod' ? 'bg-primary/20 border-primary' : 'bg-white/5 border-white/10 opacity-50'}`}
                      >
                        <Building2 size={24} />
                        <span className="text-[10px] font-bold tracking-widest uppercase">COD</span>
                      </button>
                      <button 
                        type="button"
                        onClick={() => setFormData({...formData, paymentMethod: 'online'})}
                        className={`flex-1 p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${formData.paymentMethod === 'online' ? 'bg-primary/20 border-primary' : 'bg-white/5 border-white/10 opacity-50'}`}
                      >
                        <CreditCard size={24} />
                        <span className="text-[10px] font-bold tracking-widest uppercase">Online</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Order Summary Sticky Sidebar */}
          <div className="lg:sticky lg:top-32 h-fit">
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <CheckCircle2 size={120} className="text-primary" />
              </div>
              
              <h3 className="text-2xl font-display mb-8 uppercase tracking-widest relative z-10">Confirm Summary</h3>
              
              <div className="space-y-6 mb-10 relative z-10">
                <div className="max-h-[30vh] overflow-y-auto pr-2 space-y-4 no-scrollbar">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between items-center text-sm">
                      <span className="text-white/60">
                        {item.quantity}x <span className="text-white font-bold font-display ml-2">{item.name}</span>
                      </span>
                      <span className="font-bold">Tk {(parseInt(item.price.replace(/[^0-9]/g, '')) * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                
                <div className="pt-6 border-t border-white/10 space-y-3">
                  <div className="flex justify-between text-white/40 text-xs">
                    <span>Subtotal</span>
                    <span>Tk {totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-white/40 text-xs">
                    <span>Delivery Fee</span>
                    <span>Tk 60</span>
                  </div>
                  <div className="flex justify-between text-2xl font-bold font-display pt-4">
                    <span>Total</span>
                    <span className="text-primary">Tk {(totalPrice + 60).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-white text-black py-6 rounded-2xl font-black text-sm tracking-[0.2em] group/btn hover:bg-primary hover:text-white transition-all duration-500 flex items-center justify-center gap-4 shadow-[0_20px_40px_rgba(255,255,255,0.05)]"
              >
                AUTHORIZE_ORDER <ChevronRight size={20} className="group-hover/btn:translate-x-2 transition-transform" />
              </button>
              
              <p className="mt-6 text-center text-[9px] uppercase tracking-widest text-white/20">
                Encrypted Transaction via Core Matrix v4.0
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
