import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Locations from './pages/Locations';
import Career from './pages/Career';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Order from './pages/Order';
import Story from './pages/Story';

gsap.registerPlugin(ScrollTrigger);

function AppContent() {
  const { pathname } = useLocation();

  return (
    <Layout>
      {/* 
          Force React to completely destroy and rebuild the page instance on every route change.
          This handles the "Context Lost" and orphaned GSAP state perfectly.
      */}
      <div key={pathname}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/career" element={<Career />} />
          <Route path="/story" element={<Story />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order" element={<Order />} />
        </Routes>
      </div>
    </Layout>
  );
}

function App() {
  return (
    <Router>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </Router>
  );
}

export default App;
