import Linkly from '../assets/Linkly.png';
import SignIn from '../assets/sign-in.svg';
import { useMediaQuery } from 'react-responsive';
const NavBar = () => {
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  return (
    <div className="z-0 mx-5 my-10 flex h-fit min-w-[90vw] items-center justify-between md:mx-10">
      <img src={Linkly} alt="Linkly text" />
      <div className="flex items-center justify-center gap-4">
        <button className="flex h-fit w-[8rem] cursor-pointer items-center justify-center gap-2 rounded-[48px] bg-[#181E29] px-6 py-5 text-base font-semibold text-white outline-1 outline-[#353C4A] drop-shadow-lg transition-colors duration-300 hover:bg-[#0c0f14] hover:outline-[#576279]">
          Login
          <img src={SignIn} alt="signin-icon" />
        </button>
        {isDesktop && (
          <button className="flex h-fit w-[11rem] cursor-pointer items-center justify-center gap-2 rounded-[48px] bg-[#144EE3] py-3 text-base font-semibold text-white outline-2 outline-[#144EE3] drop-shadow-xl transition-colors duration-300 hover:bg-[#2214e3] hover:outline-[#576279]">
            Register Now
          </button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
