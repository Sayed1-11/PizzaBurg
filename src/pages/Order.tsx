import { useEffect } from 'react';
import { motion } from 'framer-motion';
import CinematicHero from '../components/CinematicHero';
import { useCart } from '../context/CartContext';
import { CheckCircle2, Package, MapPin, Utensils, Clock, Users, Building2, Phone, User, LayoutGrid } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface SelectedTable {
  id: string;
  label: string;
  seats: number;
  zone: string;
}

interface BookingState {
  orderMode: 'delivery' | 'dine-in';
  formData: {
    name: string;
    phone: string;
    address: string;
    branch: string;
    paymentMethod: string;
    seats: string;
    arrivalTime: string;
  };
  selectedTable?: SelectedTable | null;
}

const ConfirmationRow = ({
  icon,
  label,
  value,
  accent = 'primary',
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: 'primary' | 'secondary';
}) => (
  <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 text-left">
    <div className={`p-2 rounded-xl ${accent === 'primary' ? 'bg-primary/20 text-primary' : 'bg-secondary/20 text-secondary'}`}>
      {icon}
    </div>
    <div>
      <p className="text-[10px] uppercase tracking-widest text-white/40">{label}</p>
      <p className="font-bold text-white">{value}</p>
    </div>
  </div>
);

const Order = () => {
  const { clearCart, cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as BookingState | null;

  const orderMode = state?.orderMode ?? 'delivery';
  const formData = state?.formData;
  const selectedTable = state?.selectedTable;

  useEffect(() => {
    const timer = setTimeout(() => {
      clearCart();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const isDineIn = orderMode === 'dine-in';
  const accentColor = isDineIn ? 'secondary' : 'primary';
  const refId = `PB-${(Math.random() * 900000 + 100000).toFixed(0)}`;

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-4 py-24 relative overflow-hidden">
      {/* Page hero */}
      <div className="absolute top-0 left-0 w-full">
        <CinematicHero
          eyebrow={isDineIn ? 'Reservation' : 'Order'}
          titleTop={isDineIn ? <>TABLE</> : <>ORDER</>}
          highlight={isDineIn ? <>BOOKED!</> : <>CONFIRMED!</>}
          subtitle={isDineIn ? `Your table at the ${formData?.branch ?? 'selected'} branch is reserved.` : 'Your addictive meal is confirmed and being prepared.'}
          variant="compact"
          size="hero"
        />
      </div>
      {/* Background glow */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <div className={`absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] blur-[180px] rounded-full opacity-10 ${isDineIn ? 'bg-secondary' : 'bg-primary'}`} />
        <div className={`absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] blur-[150px] rounded-full opacity-5 ${isDineIn ? 'bg-primary' : 'bg-secondary'}`} />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-lg w-full bg-white/5 border border-white/10 rounded-[40px] p-10 md:p-14 relative z-10 backdrop-blur-md"
      >
        {/* Success Icon */}
        <div className="flex justify-center mb-10">
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 12, delay: 0.2 }}
            className={`p-6 rounded-full ${isDineIn ? 'bg-secondary/20 border border-secondary/30' : 'bg-primary/20 border border-primary/30'}`}
          >
            {isDineIn ? (
              <Utensils size={56} className="text-secondary" />
            ) : (
              <CheckCircle2 size={56} className="text-primary" />
            )}
          </motion.div>
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-display uppercase tracking-tight leading-none mb-3">
            {isDineIn ? (
              <>Table <span className="text-secondary">Booked!</span></>
            ) : (
              <>Order <span className="text-primary">Confirmed!</span></>
            )}
          </h1>
          <p className="text-white/50 text-sm leading-relaxed">
            {isDineIn
              ? `Your table at the ${formData?.branch ?? 'selected'} branch is reserved. We'll see you at ${formData?.arrivalTime ?? 'the scheduled time'}!`
              : `Your addictive meal is being prepared and will arrive in 30–45 minutes.`
            }
          </p>
        </motion.div>

        {/* Details Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3 mb-10"
        >
          {/* Reference ID */}
          <ConfirmationRow
            icon={<Package size={18} />}
            label={isDineIn ? 'Booking Reference' : 'Order ID'}
            value={`#${refId}`}
            accent={accentColor}
          />

          {/* Name */}
          {formData?.name && (
            <ConfirmationRow
              icon={<User size={18} />}
              label="Guest Name"
              value={formData.name}
              accent={accentColor}
            />
          )}

          {/* Phone */}
          {formData?.phone && (
            <ConfirmationRow
              icon={<Phone size={18} />}
              label="Contact"
              value={formData.phone}
              accent={accentColor}
            />
          )}

          {isDineIn ? (
            <>
              {/* Branch */}
              <ConfirmationRow
                icon={<Building2 size={18} />}
                label="Restaurant Branch"
                value={`${formData?.branch ?? '—'} Branch`}
                accent="secondary"
              />
              {/* Table */}
              {selectedTable && (
                <ConfirmationRow
                  icon={<LayoutGrid size={18} />}
                  label="Reserved Table"
                  value={`Table ${selectedTable.label} · ${selectedTable.seats} seats · ${selectedTable.zone} zone`}
                  accent="secondary"
                />
              )}
              {/* Seats */}
              <ConfirmationRow
                icon={<Users size={18} />}
                label="Reserved Seats"
                value={`${selectedTable?.seats ?? formData?.seats ?? '—'} ${parseInt(String(selectedTable?.seats ?? formData?.seats ?? '1')) === 1 ? 'Person' : 'People'}`}
                accent="secondary"
              />
              {/* Arrival */}
              <ConfirmationRow
                icon={<Clock size={18} />}
                label="Expected Arrival"
                value={formData?.arrivalTime ?? '—'}
                accent="secondary"
              />
              {/* Pre-order note */}
              {cart.length > 0 || state?.formData && (
                <div className="bg-secondary/10 border border-secondary/20 rounded-2xl p-4 text-secondary text-xs tracking-widest uppercase font-bold flex items-start gap-3">
                  <Utensils size={16} className="shrink-0 mt-0.5" />
                  <span>Your food pre-order is attached — we'll have it ready when you arrive.</span>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Delivery address */}
              {formData?.address && (
                <ConfirmationRow
                  icon={<MapPin size={18} />}
                  label="Delivery Address"
                  value={formData.address}
                  accent="primary"
                />
              )}
              {/* Branch / Zone */}
              <ConfirmationRow
                icon={<Building2 size={18} />}
                label="Dispatch Zone"
                value={`${formData?.branch ?? '—'} Branch`}
                accent="primary"
              />
            </>
          )}
        </motion.div>

        {/* ETA Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className={`rounded-2xl p-4 text-center mb-8 text-sm font-bold tracking-widest uppercase ${
            isDineIn
              ? 'bg-secondary/10 border border-secondary/20 text-secondary'
              : 'bg-primary/10 border border-primary/20 text-primary'
          }`}
        >
          {isDineIn
            ? `🍽️  Reservation confirmed for ${formData?.arrivalTime ?? 'your arrival'}`
            : '🚀  Estimated delivery time: 30–45 minutes'
          }
        </motion.div>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          onClick={() => navigate('/')}
          className={`w-full py-5 rounded-2xl font-black text-sm tracking-[0.2em] uppercase transition-all duration-300 ${
            isDineIn
              ? 'bg-secondary text-black hover:bg-white hover:text-black'
              : 'bg-white text-black hover:bg-primary hover:text-white'
          }`}
        >
          Back to Home
        </motion.button>

        {/* Footer note */}
        <p className="mt-6 text-center text-[9px] uppercase tracking-widest text-white/20">
          {isDineIn ? 'Need to modify? Call us at +880 1XXX-XXXXXX' : 'Encrypted Transaction · Core Matrix v4.0'}
        </p>
      </motion.div>
    </div>
  );
};

export default Order;
