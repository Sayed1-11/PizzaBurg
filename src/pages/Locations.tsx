import BranchShowcase from '../components/BranchShowcase';
import CinematicHero from '../components/CinematicHero';

const Locations = () => {
  return (
    <div className="min-h-screen bg-background text-white">
      <CinematicHero
        eyebrow="Command Network"
        titleTop={<>FIND OUR</>}
        highlight={<>BRANCHES</>}
        subtitle={"Discover 21 outlets across Bangladesh serving the most addictive pizza experience. Find the one nearest to you."}
        variant="compact"
        size="hero"
      />
      <BranchShowcase fullView={true} />
    </div>
  );
};

export default Locations;
