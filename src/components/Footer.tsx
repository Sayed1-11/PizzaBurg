import { Mail, Phone, MapPin, Globe, Share2, Send } from 'lucide-react';

const BRANCHES = [
  "Dhanmondi", "Gulshan 1", "Wari", "Khilgaon", "Bashundhara", 
  "Baily Road", "Chittagong", "Mirpur", "Uttara", "Banasree", 
  "Shyamoli", "DOHS"
];

const Footer = () => {
  return (
    <footer className="bg-[#050505] pt-24 pb-12 px-6 border-t border-white/5">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand Info */}
          <div className="space-y-8">
            <h2 className="text-4xl font-display text-white">PIZZA<span className="text-primary">BURG</span></h2>
            <p className="text-muted-foreground text-lg">
              Serving more than a million pizzas since 2018. The most loved pizza chain in Bangladesh.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com/pizzaburgbd" target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-primary transition-colors">
                <Globe size={20} />
              </a>
              <a href="https://instagram.com/pizzaburgofficial" target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-primary transition-colors">
                <Share2 size={20} />
              </a>
              <a href="mailto:pizzaburgofficial@gmail.com" className="p-3 bg-white/5 rounded-full hover:bg-primary transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links / Branches */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-8 text-white uppercase tracking-widest">Our Branches</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8">
              {BRANCHES.map((branch) => (
                <a key={branch} href="#" className="text-muted-foreground hover:text-secondary transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  {branch}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-8">
            <h3 className="text-xl font-bold mb-8 text-white uppercase tracking-widest">Get In Touch</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Phone className="text-primary mt-1" size={20} />
                <div>
                  <p className="text-white font-medium">+8801705-219509</p>
                  <p className="text-muted-foreground text-sm">Gulshan: +880 1404-461233</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="text-primary mt-1" size={20} />
                <p className="text-muted-foreground">Office: House No. 754, Satmasjid Road, Dhanmondi, Dhaka</p>
              </div>
              <div className="flex items-start gap-4">
                <Send className="text-primary mt-1" size={20} />
                <p className="text-muted-foreground">Open daily: 12:00 PM – 11:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
          <p>© 2026 PizzaBurg Bangladesh. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Career</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
