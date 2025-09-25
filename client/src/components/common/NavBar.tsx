// import { useAuth } from '@clerk/clerk-react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import Linkly from '../../assets/Linkly.png';
import SignIn from '../../assets/sign-in.svg';

const NavBar = ({ isLogin }: { isLogin: boolean }) => {
  // const { isSignedIn, isLoaded } = useAuth();
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  return (
    <div className='z-0 mx-5 my-6 flex h-fit min-w-[90vw] items-center justify-between md:mx-10'>
      <img src={Linkly} alt='Linkly text' className='max-w-[20vw]' />
      <div className='flex items-center justify-center gap-4'>
        {!isLogin && (
          <Link
            to='/login'
            className='flex h-fit cursor-pointer items-center justify-center gap-2 rounded-[48px] bg-[#181E29] px-5 py-3 text-sm font-semibold text-white outline-1 outline-[#353C4A] drop-shadow-lg transition-colors duration-300 hover:bg-[#0c0f14] hover:outline-[#576279] lg:text-base'
          >
            Login
            <img src={SignIn} alt='signin-icon' />
          </Link>
        )}
        {(isDesktop || isLogin) && (
          <Link
            to='/signup'
            className='flex h-fit cursor-pointer items-center justify-center gap-2 rounded-[48px] bg-[#144EE3] px-5 py-3 text-sm font-semibold text-white outline-2 outline-[#144EE3] drop-shadow-xl transition-colors duration-300 hover:bg-[#2214e3] hover:outline-[#576279] lg:text-base'
          >
            Register Now
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
