import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, DollarSign, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import CinematicHero from '../components/CinematicHero';

const VACANCIES = [
  {
    id: 1,
    title: "Master Pizza Chef",
    dept: "Kitchen Ops",
    type: "Full-Time",
    salary: "Tk 25k - 35k",
    loc: "Mirpur / Uttara",
    desc: "Seeking culinary artists to maintain the 'Addictive' standard. Experience with wood-fired ovens is a plus."
  },
  {
    id: 2,
    title: "Service Specialist",
    dept: "Customer Experience",
    type: "Part-Time",
    salary: "Tk 12k - 18k",
    loc: "Badda / Dhanmondi",
    desc: "High-energy individuals to deliver a premium dining experience in our high-tech hubs."
  },
  {
    id: 3,
    title: "Branch Commander",
    dept: "Management",
    type: "Full-Time",
    salary: "Tk 45k - 60k",
    loc: "Multiple Locations",
    desc: "Scale our operations. Leadership experience and a passion for data-driven management required."
  },
  {
    id: 4,
    title: "Digital Delivery Pilot",
    dept: "Logistics",
    type: "Shift-Based",
    salary: "Commission Based",
    loc: "City Wide",
    desc: "The fastest link in our chain. Safe, efficient, and tech-savvy riders wanted."
  }
];

const Career = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20">
      <div className="container mx-auto px-6">
        {/* Shared cinematic hero for Career */}
        <CinematicHero
          eyebrow="Human Capital Deployment"
          titleTop={<>JOIN THE</>}
          highlight={<>SQUAD</>}
          subtitle={"We're not just making pizza; we're building a culture of addictive excellence. Join the fastest growing food-tech brand in Bangladesh."}
          variant="compact"
          size="hero"
        />

        {/* Vacancy Grid */}
        <div className="grid gap-6">
          {VACANCIES.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 hover:border-primary/50 transition-all duration-500 relative overflow-hidden"
            >
              <div className="relative z-10 flex flex-col md:flex-row justify-between gap-12">
                <div className="flex-grow">
                  <div className="flex flex-wrap gap-4 mb-6">
                    <span className="px-4 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-[10px] font-bold tracking-widest uppercase">
                      {job.dept}
                    </span>
                    <span className="px-4 py-1 bg-white/5 text-white/40 border border-white/10 rounded-full text-[10px] font-bold tracking-widest uppercase">
                      {job.type}
                    </span>
                  </div>

                  <h2 className="text-4xl md:text-5xl font-display mb-6 group-hover:text-primary transition-colors">
                    {job.title}
                  </h2>
                  <p className="text-white/40 max-w-xl mb-8 leading-relaxed">
                    {job.desc}
                  </p>

                  <div className="flex flex-wrap gap-8">
                    <div className="flex items-center gap-3 text-white/60 text-sm">
                      <MapPin size={16} className="text-primary" />
                      {job.loc}
                    </div>
                    <div className="flex items-center gap-3 text-white/60 text-sm">
                      <DollarSign size={16} className="text-primary" />
                      {job.salary}
                    </div>
                    <div className="flex items-center gap-3 text-white/60 text-sm">
                      <Clock size={16} className="text-primary" />
                      Immediate Start
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center items-start md:items-end">
                  <button className="w-full md:w-auto px-10 md:px-12 py-4 md:py-5 bg-white text-black font-black text-xs md:text-sm tracking-widest rounded-full hover:bg-primary hover:text-white transition-all duration-500 flex items-center justify-center gap-4 group/btn">
                    APPLY_NOW <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                  </button>
                  <span className="mt-4 text-[9px] md:text-[10px] font-bold text-white/20 tracking-widest uppercase">Ref: #PB-CARR-{job.id}</span>
                </div>
              </div>

              {/* Decorative Background ID */}
              <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 text-[20vw] font-display text-white/[0.02] pointer-events-none select-none">
                0{job.id}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="mt-32 pt-32 border-t border-white/5 grid md:grid-cols-3 gap-12">
          <div>
            <ShieldCheck className="text-primary mb-6" size={40} />
            <h3 className="text-2xl font-display mb-4">Secure Future</h3>
            <p className="text-white/40 text-sm leading-relaxed">Competitive salary packages, performance bonuses, and long-term career growth paths within our 21+ branch network.</p>
          </div>
          <div>
            <Zap className="text-primary mb-6" size={40} />
            <h3 className="text-2xl font-display mb-4">Innovation Culture</h3>
            <p className="text-white/40 text-sm leading-relaxed">Work with cutting-edge F&B technology and be part of the brand that's redefining the Bangladeshi food scene.</p>
          </div>
          <div>
            <Briefcase className="text-primary mb-6" size={40} />
            <h3 className="text-2xl font-display mb-4">Skill Building</h3>
            <p className="text-white/40 text-sm leading-relaxed">Rigorous training programs and direct mentorship from industry experts like Mir Mehadi himself.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
