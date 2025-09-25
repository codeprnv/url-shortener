import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Arrow_Right from '../assets/arrow-right.svg';
import Link_Icon from '../assets/link.svg';
import Question_Icon from '../assets/question-circle.svg';
import UrlLoader from './common/UrlLoader';

interface HeroSectionProps {
  onShorten: (url: string) => Promise<void>; // It's an async function that takes a string and returns nothing
  loading: boolean;
  error: string | null;
}

const HeroSection = ({ onShorten, loading, error }: HeroSectionProps) => {
  const isMobile = useMediaQuery({ maxWidth: 480 });
  const [url, setUrl] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      return;
    }
    onShorten(url);
    setUrl('');
  };
  return (
    <div className='flex h-full min-w-full flex-col items-center justify-center lg:min-w-[35vw]'>
      <div className='flex h-full max-w-[90vw] flex-col items-center justify-center gap-5 p-4'>
        {/* Title Start */}
        <h1
          className='text-wrap bg-clip-text text-center text-4xl font-extrabold text-transparent xl:text-[60px]'
          style={{
            backgroundImage:
              'linear-gradient(to right, #144EE3 0%, #EB568E 19%, #A353AA 64%, #144EE3 100%)',
          }}
        >
          Shorten Your Loooong Links :)
        </h1>
        <p className='w-full text-wrap text-center text-base font-light text-[#C9CED6] lg:max-w-[30vw]'>
          Linkly is an efficient and easy-to-use URL shortening service that
          streamlines your online experience.
        </p>
        {/* Title End */}
      </div>

      {/* Link Input Field Start */}
      <div className='mt-5 flex h-full w-full max-w-[90vw] flex-col items-center justify-center gap-3 p-3 md:max-w-[75vw] xl:mt-10 xl:max-w-[35vw]'>
        <form className='mx-auto w-full' onSubmit={handleSubmit}>
          <div className='relative'>
            <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3'>
              <img src={Link_Icon} alt='link-icon' />
            </div>
            <input
              type='url'
              id='link-text'
              className='duration-250 block w-full rounded-3xl bg-[#181E29] px-6 py-5 ps-12 text-sm text-[#C9CED6] outline transition-colors focus:outline-[#144EE3]'
              placeholder='Enter the link here'
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={loading}
              required
            />
            <button
              type='submit'
              className='duration-250 absolute bottom-2.5 end-1.5 cursor-pointer rounded-full bg-[#144EE3] px-4 py-3 text-base font-semibold text-white outline-2 outline-[#144EE3] drop-shadow-lg transition-colors hover:bg-[#0516b4] hover:outline-[#0516b4] sm:bottom-1.5 md:rounded-3xl'
              disabled={loading}
            >
              {loading ? (
                <UrlLoader />
              ) : isMobile ? (
                <img src={Arrow_Right} alt='Right Arrow' />
              ) : (
                'Shorten Now!'
              )}
            </button>
          </div>
        </form>
        {/* --- CHANGE HERE: Conditionally display the error message --- */}
        {error && <p className='mt-2 text-red-500'>{error}</p>}
      </div>
      {/* Link Input Field End */}

      {/* Additional Content Start */}
      <div className='flex h-full w-full max-w-[70vw] flex-col items-center justify-center p-3 xl:max-w-[50vw]'>
        {/* Toggle Btn Start */}
        <div className='flex h-fit w-full items-center justify-center gap-5 p-2'>
          <label className='mb-5 inline-flex cursor-pointer items-center'>
            <input type='checkbox' value='' className='peer sr-only' />
            <div className="peer relative h-5 w-9 rounded-full bg-[#181E29] after:absolute after:start-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#144EE3] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#353C4A] rtl:peer-checked:after:-translate-x-full dark:border-[#353C4A]"></div>
            <span className='ms-3 text-sm font-light text-[#C9CED6]'>
              Auto Paste from Clipboard
            </span>
          </label>
        </div>
        {/* Toggle Btn End */}
        <div className='flex min-w-full flex-wrap items-center justify-center gap-2 text-center text-sm font-medium text-[#C9CED6]'>
          <span>
            You can create <span className='text-[#EB568E]'>05</span> more
            links.{' '}
            <button className='cursor-pointer underline hover:text-[#144EE3]'>
              Register Now
            </button>{' '}
            to enjoy Unlimited usage
          </span>
          <button className='cursor-pointer'>
            {!isMobile && (
              <img
                src={Question_Icon}
                alt='question-circle-icon'
                className='h-4 w-4 align-middle'
              />
            )}
          </button>
        </div>
      </div>
      {/* Additional Content End */}
    </div>
  );
};

export default HeroSection;
