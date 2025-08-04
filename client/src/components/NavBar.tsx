import Linkly from "../assets/Linkly.png";
import SignIn from "../assets/sign-in.svg";
import { useMediaQuery } from "react-responsive";
const NavBar = () => {
	const isDesktop = useMediaQuery({ minWidth: 1024 });
	return (
		<div className="min-w-[90vw] h-fit z-0 my-10 mx-5 md:mx-10 flex items-center justify-between">
			<img src={Linkly} alt="Linkly text" />
			<div className="flex items-center justify-center gap-4">
				<button className="py-5 px-6 justify-center text-base font-semibold items-center bg-[#181E29] w-[8rem] h-fit flex gap-2 text-white rounded-[48px] outline-1 outline-[#353C4A] drop-shadow-lg cursor-pointer hover:bg-[#0c0f14] hover:outline-[#576279] duration-300 transition-colors">
					Login
					<img src={SignIn} alt="signin-icon" />
				</button>
				{isDesktop && (
					<button className="py-3 justify-center text-base font-semibold items-center bg-[#144EE3] outline-2 outline-[#144EE3] w-[11rem] h-fit flex gap-2 text-white rounded-[48px] drop-shadow-xl cursor-pointer hover:bg-[#2214e3] hover:outline-[#576279] duration-300 transition-colors">
						Register Now
					</button>
				)}
			</div>
		</div>
	);
};

export default NavBar;
