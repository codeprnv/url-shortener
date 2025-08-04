import Cubes from "../assets/Cubes.png";
import Swirl from "../assets/Swirl.png";
import Footer from "../components/Footer.tsx";
import HeroSection from "../components/HeroSection.tsx";
import NavBar from "../components/NavBar.tsx";
const App = () => {
	return (
		<div className="h-full w-full flex flex-col items-center justify-center">
			<NavBar />
			{/* Background */}
			<div className="absolute top-0 flex items-center z-[-1] justify-center h-screen overflow-hidden w-screen pointer-events-none">
				<img src={Swirl} alt="swirl-background" />
			</div>
			<div className="absolute top-0 flex items-center z-[-1] justify-center h-screen overflow-hidden w-screen pointer-events-none">
				<img src={Cubes} alt="cubes-background" />
			</div>
			<HeroSection />
			<Footer/>
		</div>
	);
};

export default App;
