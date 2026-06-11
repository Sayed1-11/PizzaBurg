import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import {
  User, MapPin, Building2, CreditCard, ChevronRight,
  CheckCircle2, Utensils, Clock, Users,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TableMap from '../components/TableMap';
import type { TableData } from '../components/TableMap';

const BRANCHES = [
  'Badda', 'Uttara', 'Mirpur 1', 'Dhanmondi', 'Wari', 'Banasree', 'Khilgaon',
  'Bashundhara', 'Mirpur 12', 'Mohammadpur', 'Jatrabari', 'Savar', 'Narayanganj',
  'Gazipur', 'Moghbazar', 'Bosila', 'Keraniganj', 'Tongi', 'Bailey Road', 'Nikunja',
];

// 11:00 AM → 11:00 PM in 30-min steps
const TIME_SLOTS = Array.from({ length: 25 }, (_, i) => {
  const hour   = Math.floor(i / 2) + 11;
  const minute = i % 2 === 0 ? '00' : '30';
  return `${hour > 12 ? hour - 12 : hour}:${minute} ${hour >= 12 ? 'PM' : 'AM'}`;
});

const Checkout = ({ initialMode = 'delivery' }: { initialMode?: 'delivery' | 'dine-in' }) => {
  const { cart, totalPrice } = useCart();
  const navigate = useNavigate();

  const [orderMode, setOrderMode] = useState<'delivery' | 'dine-in'>(initialMode);
  const [selectedTable, setSelectedTable] = useState<TableData | null>(null);

  const [formData, setFormData] = useState({
    name:          '',
    phone:         '',
    address:       '',
    branch:        'Badda',
    paymentMethod: 'cod',
    seats:         '2',
    arrivalTime:   '07:00 PM',
  });

  // Redirect delivery mode with empty cart back to menu
  useEffect(() => {
    if (cart.length === 0 && orderMode === 'delivery') {
      if (initialMode === 'dine-in') {
        setOrderMode('dine-in');
      } else {
        navigate('/menu');
      }
    }
  }, [cart.length, orderMode, initialMode, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/order', { state: { orderMode, formData, selectedTable } });
  };

  if (cart.length === 0 && orderMode === 'delivery') return null;

  const isDineIn = orderMode === 'dine-in';

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-32 pb-20 px-4 md:px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <div className={`absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] blur-[150px] rounded-full opacity-[0.08] transition-colors duration-1000 ${isDineIn ? 'bg-secondary' : 'bg-primary'}`} />
        <div className={`absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] blur-[150px] rounded-full opacity-[0.05] transition-colors duration-1000 ${isDineIn ? 'bg-primary' : 'bg-secondary'}`} />
      </div>

      <div className="container mx-auto relative z-10">

        {/* ── Header ──────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <h1 className="text-4xl md:text-6xl font-display uppercase leading-tight">
            {isDineIn ? 'TABLE ' : 'DEPLOYMENT '}
            <span className={isDineIn ? 'text-secondary' : 'text-primary'}>
              {isDineIn ? 'BOOKING' : 'INTEL'}
            </span>
          </h1>

          {/* Mode toggle */}
          <div className="flex bg-white/5 p-1.5 rounded-full border border-white/10 w-fit backdrop-blur-md">
            <button
              type="button"
              onClick={() => cart.length === 0 ? navigate('/menu') : setOrderMode('delivery')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 ${!isDineIn ? 'bg-primary text-white shadow-[0_0_20px_rgba(255,0,0,0.4)]' : 'text-white/50 hover:text-white'}`}
            >
              <MapPin size={16} /> Delivery
            </button>
            <button
              type="button"
              onClick={() => setOrderMode('dine-in')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 ${isDineIn ? 'bg-secondary text-black shadow-[0_0_20px_rgba(0,255,100,0.4)]' : 'text-white/50 hover:text-white'}`}
            >
              <Utensils size={16} /> Dine-in
            </button>
          </div>
        </div>

        {/* ── Form ─────────────────────────────────────────────────── */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Left: Detail panels */}
          <div className="lg:col-span-2 space-y-8">

            {/* Contact */}
            <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-md">
              <h2 className="text-2xl font-display mb-8 flex items-center gap-4 text-white">
                <User className={isDineIn ? 'text-secondary' : 'text-primary'} size={24} />
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest text-white/40 uppercase ml-4">Full Name</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Mir Mehadi"
                    className={`w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none transition-all ${isDineIn ? 'focus:border-secondary' : 'focus:border-primary'}`}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest text-white/40 uppercase ml-4">Phone Number</label>
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="01XXXXXXXXX"
                    className={`w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none transition-all ${isDineIn ? 'focus:border-secondary' : 'focus:border-primary'}`}
                  />
                </div>
              </div>
            </section>

            {/* ── Mode-specific panels ──────────────────────────── */}
            <AnimatePresence mode="wait">
              {!isDineIn ? (
                /* ── Delivery ────────────────── */
                <motion.section
                  key="delivery"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-md"
                >
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
                        onChange={e => setFormData({ ...formData, address: e.target.value })}
                        placeholder="Sector, Road, House, Apartment..."
                        rows={4}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-primary outline-none transition-all resize-none"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold tracking-widest text-white/40 uppercase ml-4">Select Dispatch Zone</label>
                        <select
                          value={formData.branch}
                          onChange={e => setFormData({ ...formData, branch: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-primary outline-none transition-all appearance-none cursor-pointer"
                        >
                          {BRANCHES.map(b => <option key={b} value={b} className="bg-[#111]">{b} Branch</option>)}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold tracking-widest text-white/40 uppercase ml-4">Payment Method</label>
                        <div className="flex gap-4">
                          {['cod', 'online'].map(method => (
                            <button
                              key={method}
                              type="button"
                              onClick={() => setFormData({ ...formData, paymentMethod: method })}
                              className={`flex-1 p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${formData.paymentMethod === method ? 'bg-primary/20 border-primary' : 'bg-white/5 border-white/10 opacity-50'}`}
                            >
                              {method === 'cod' ? <Building2 size={24} /> : <CreditCard size={24} />}
                              <span className="text-[10px] font-bold tracking-widest uppercase">{method === 'cod' ? 'COD' : 'Online'}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.section>
              ) : (
                /* ── Dine-in ─────────────────── */
                <motion.section
                  key="dine-in"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {/* Branch + arrival time */}
                  <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-md">
                    <h2 className="text-2xl font-display mb-8 flex items-center gap-4">
                      <Utensils className="text-secondary" size={24} />
                      Reservation Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Branch */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold tracking-widest text-white/40 uppercase ml-4">Restaurant Branch</label>
                        <select
                          value={formData.branch}
                          onChange={e => setFormData({ ...formData, branch: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-secondary outline-none transition-all appearance-none cursor-pointer"
                        >
                          {BRANCHES.map(b => <option key={b} value={b} className="bg-[#111]">{b} Branch</option>)}
                        </select>
                      </div>
                      {/* Arrival time */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold tracking-widest text-white/40 uppercase ml-4 flex items-center gap-2">
                          <Clock size={12} /> Expected Arrival
                        </label>
                        <select
                          value={formData.arrivalTime}
                          onChange={e => setFormData({ ...formData, arrivalTime: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-secondary outline-none transition-all appearance-none cursor-pointer"
                        >
                          {TIME_SLOTS.map(t => <option key={t} value={t} className="bg-[#111]">{t}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* ── Interactive Table Map ── */}
                  <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-10 backdrop-blur-md">
                    <h2 className="text-2xl font-display mb-2 flex items-center gap-4">
                      <Users className="text-secondary" size={24} />
                      Pick Your Table
                    </h2>
                    <p className="text-white/30 text-xs tracking-widest uppercase mb-8">
                      Live floor map · tap a table to reserve it
                    </p>
                    <TableMap
                      onSelect={table => {
                        setSelectedTable(table);
                        if (table) setFormData(f => ({ ...f, seats: String(table.seats) }));
                      }}
                      selectedTableId={selectedTable?.id ?? null}
                    />
                  </div>

                  {/* Payment preference */}
                  <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-10 backdrop-blur-md">
                    <h2 className="text-2xl font-display mb-6 flex items-center gap-4">
                      <CreditCard className="text-secondary" size={24} />
                      Payment Preference
                    </h2>
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                        className={`flex-1 p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${formData.paymentMethod === 'cod' ? 'bg-secondary/20 border-secondary' : 'bg-white/5 border-white/10 opacity-50'}`}
                      >
                        <Building2 size={24} />
                        <span className="text-[10px] font-bold tracking-widest uppercase">Pay at Desk</span>
                      </button>
                    </div>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>
          </div>

          {/* ── Right: Summary Sidebar ─────────────────────────── */}
          <div className="lg:sticky lg:top-32 h-fit">
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 overflow-hidden relative group backdrop-blur-md">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <CheckCircle2 size={120} className={isDineIn ? 'text-secondary' : 'text-primary'} />
              </div>

              <h3 className="text-2xl font-display mb-8 uppercase tracking-widest relative z-10">
                {isDineIn ? 'Booking Summary' : 'Order Summary'}
              </h3>

              <div className="space-y-6 mb-10 relative z-10">
                {/* Selected table badge */}
                {isDineIn && (
                  <div className={`rounded-2xl p-4 text-xs font-bold tracking-widest uppercase flex items-start gap-3 transition-all duration-300 ${selectedTable ? 'bg-secondary/20 border border-secondary/30 text-secondary' : 'bg-white/5 border border-white/10 text-white/30'}`}>
                    <Utensils size={16} className="shrink-0 mt-0.5" />
                    {selectedTable
                      ? `Table ${selectedTable.label} · ${selectedTable.seats} seats · ${selectedTable.zone} zone`
                      : 'No table selected yet'}
                  </div>
                )}

                {cart.length > 0 ? (
                  <>
                    {isDineIn && (
                      <div className="bg-white/5 border border-white/10 text-white/40 p-3 rounded-2xl text-xs font-bold tracking-widest uppercase flex items-start gap-3">
                        <CheckCircle2 size={14} className="shrink-0 mt-0.5 text-secondary" />
                        <span>Food pre-order attached — ready on arrival</span>
                      </div>
                    )}
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
                      {!isDineIn && (
                        <div className="flex justify-between text-white/40 text-xs">
                          <span>Delivery Fee</span>
                          <span>Tk 60</span>
                        </div>
                      )}
                      <div className="flex justify-between text-2xl font-bold font-display pt-4">
                        <span>Total</span>
                        <span className={isDineIn ? 'text-secondary' : 'text-primary'}>
                          Tk {(totalPrice + (!isDineIn ? 60 : 0)).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-white/50 text-sm tracking-widest uppercase mb-4">Table Booking Only</p>
                    <button
                      type="button"
                      onClick={() => navigate('/menu')}
                      className="text-secondary font-bold hover:underline text-xs tracking-widest uppercase"
                    >
                      + Pre-order food from menu
                    </button>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className={`w-full text-black py-6 rounded-2xl font-black text-sm tracking-[0.2em] group/btn transition-all duration-500 flex items-center justify-center gap-4 shadow-[0_20px_40px_rgba(255,255,255,0.05)] ${isDineIn ? 'bg-white hover:bg-secondary hover:text-black' : 'bg-white hover:bg-primary hover:text-white'}`}
              >
                {isDineIn ? 'CONFIRM_RESERVATION' : 'AUTHORIZE_ORDER'}
                <ChevronRight size={20} className="group-hover/btn:translate-x-2 transition-transform" />
              </button>

              <p className="mt-6 text-center text-[9px] uppercase tracking-widest text-white/20">
                Encrypted · Core Matrix v4.0
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
