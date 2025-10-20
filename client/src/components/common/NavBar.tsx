import { useUser } from '@clerk/clerk-react';
import { Link, useLocation } from 'react-router-dom'; // 1. Import useLocation

import Linkly from '../../assets/Linkly.png';
import SignIn from '../../assets/sign-in.svg';

import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import UserMenu from '../Shadcn/dropdown-menu/UserMenu';
import { Skeleton } from '../ui/skeleton';

const NavBar = () => {
  const isDesktop  = useMediaQuery({ minWidth: '1024px' });
  const { isSignedIn, isLoaded, user } = useUser();
  const location = useLocation();
  const pathname = location.pathname;
  const [scrollHeight, setScrollHeight] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollHeight(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`z-0 mx-5 my-6 flex h-fit min-w-[90vw] items-center justify-between transition-transform duration-200 md:mx-10 ${scrollHeight > 75 && isDesktop ? 'sticky left-0 right-0 top-0 z-20 mx-auto w-full bg-black/80 px-10 py-5' : 'relative'}`}
    >
      <img src={Linkly} alt='Linkly text' className='max-w-[20vw]' />

      <div className='flex items-center justify-center gap-4'>
        {/* --- Loading State --- */}
        {!isLoaded && pathname === '/' && (
          <div className='flex items-center space-x-4'>
            <Skeleton className='h-10 w-10 rounded-full' />
            <div className='space-y-2'>
              <Skeleton className='h-3 w-[80px]' />
            </div>
          </div>
        )}

        {/* --- Signed IN State --- */}
        {isLoaded && isSignedIn && <UserMenu User={user} />}

        {/* --- Signed OUT State --- */}
        {isLoaded && !isSignedIn && (
          <>
            {/* 3. Show Login button if NOT on the login page */}
            {pathname !== '/login' && (
              <Link
                to='/login'
                className='flex h-fit cursor-pointer items-center justify-center gap-2 rounded-[48px] bg-[#181E29] px-5 py-3 text-sm font-semibold text-white outline-1 outline-[#353C4A] drop-shadow-lg transition-colors duration-300 hover:bg-[#0c0f14] hover:outline-[#576279] lg:text-base'
              >
                Login
                <img src={SignIn} alt='signin-icon' />
              </Link>
            )}

            {/* 4. Show Register button if NOT on the signup page */}
            {pathname !== '/signup' && (
              <Link
                to='/signup'
                className='flex h-fit cursor-pointer items-center justify-center gap-2 rounded-[48px] bg-[#144EE3] px-5 py-3 text-sm font-semibold text-white outline-2 outline-[#144EE3] drop-shadow-xl transition-colors duration-300 hover:bg-[#2214e3] hover:outline-[#576279] lg:text-base'
              >
                Register Now
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
