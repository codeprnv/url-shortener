import Cubes from '../assets/Cubes.png';
import Swirl from '../assets/Swirl.png';
import Footer from '../components/Footer.tsx';
import HeroSection from '../components/HeroSection.tsx';
import LinksTable from '../components/LinksTable.tsx';
import NavBar from '../components/NavBar.tsx';
const App = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <NavBar />
      {/* Background */}
      <div className="pointer-events-none absolute top-0 z-[-1] flex h-screen w-screen items-center justify-center overflow-hidden">
        <img src={Swirl} alt="swirl-background" />
      </div>
      <div className="pointer-events-none absolute top-0 z-[-1] flex h-screen w-screen items-center justify-center overflow-hidden">
        <img src={Cubes} alt="cubes-background" />
      </div>
      <HeroSection />
      <LinksTable />
      <Footer />
    </div>
  );
};

export default App;
