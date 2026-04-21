import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from 'lucide-react';

const Cart = () => {
  const { cart, addToCart, removeFromCart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-6 py-24 text-center">
        <div className="flex justify-center mb-8">
          <div className="bg-white/5 p-12 rounded-full">
            <ShoppingBag size={80} className="text-muted-foreground opacity-20" />
          </div>
        </div>
        <h2 className="text-4xl font-display mb-4">Your cart is empty</h2>
        <p className="text-muted-foreground mb-12">Looks like you haven't added any addictive pizzas yet.</p>
        <button
          onClick={() => navigate('/menu')}
          className="bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-full font-bold transition-all"
        >
          GO TO MENU
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-5xl font-display mb-12 text-center md:text-left">YOUR <span className="text-primary">CART</span></h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col md:flex-row items-center gap-6">
              <div className="bg-primary/20 w-24 h-24 rounded-2xl flex items-center justify-center font-display text-4xl text-primary">
                {item.name.charAt(0)}
              </div>
              <div className="flex-grow text-center md:text-left">
                <h3 className="text-xl font-bold mb-1">{item.name}</h3>
                <p className="text-muted-foreground text-sm uppercase tracking-widest">{item.category}</p>
              </div>
              <div className="flex items-center gap-6 bg-black/40 px-6 py-3 rounded-2xl border border-white/5">
                <button onClick={() => removeFromCart(item.id)} className="hover:text-primary transition-colors">
                  <Minus size={18} />
                </button>
                <span className="text-xl font-bold min-w-[30px] text-center">{item.quantity}</span>
                <button onClick={() => addToCart(item)} className="hover:text-primary transition-colors">
                  <Plus size={18} />
                </button>
              </div>
              <div className="text-2xl font-bold min-w-[120px] text-center md:text-right">
                Tk {(parseInt(item.price.replace(/[^0-9]/g, '')) * item.quantity).toLocaleString()}
              </div>
            </div>
          ))}

          <button
            onClick={clearCart}
            className="text-muted-foreground hover:text-red-500 flex items-center gap-2 transition-colors ml-auto md:mr-0"
          >
            <Trash2 size={16} /> Clear Cart
          </button>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 h-fit lg:sticky lg:top-32">
          <h3 className="text-2xl font-bold mb-8 uppercase tracking-widest">Order Summary</h3>
          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>Tk {totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Delivery Fee</span>
              <span>Tk 60</span>
            </div>
            <div className="pt-4 border-t border-white/10 flex justify-between text-2xl font-bold">
              <span>Total</span>
              <span className="text-primary">Tk {(totalPrice + 60).toLocaleString()}</span>
            </div>
          </div>
          <button
            onClick={() => navigate('/checkout')}
            className="w-full bg-primary hover:bg-primary/90 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all"
          >
            CONFIRM ORDER <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
