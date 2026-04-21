import type { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import SmoothScroll from './SmoothScroll';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24">
          {children}
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default Layout;
