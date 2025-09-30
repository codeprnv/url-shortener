import { LinksTable } from '@/components/links/LinksTable.tsx';
import { useLinks } from '@/hooks/useLinks.ts';
import { useEffect, useState } from 'react';
import Cubes from '../assets/Cubes.png';
import Swirl from '../assets/Swirl.png';
import Footer from '../components/common/Footer.tsx';
import NavBar from '../components/common/NavBar.tsx';
import HeroSection from '../components/HeroSection';
// import LinksTable from '../components/LinksTable';
import { Columns } from '@/components/links/Columns.tsx';
import { useUser } from '@clerk/clerk-react';

const HomePage = () => {
  const { isSignedIn } = useUser();
  const { links, error, isLoading, addLink } = useLinks();

  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (links?.length !== 0) {
      console.log('Links: ', links);
    }
  }, [links]);

  // This is the core logic function that will be passed to the HeroSection
  const handleShorten = async (longUrl: string) => {
    setFormError(null);

    try {
      await addLink(longUrl);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setFormError(err.message);
    }
  };

  return (
    <div className='mb-20 flex min-h-screen w-full flex-col items-center justify-start'>
      <NavBar />
      {/* Background */}
      <div className='pointer-events-none absolute top-0 z-[-1] flex h-screen w-screen items-center justify-center overflow-hidden'>
        <img src={Swirl} alt='swirl-background' />
      </div>
      <div className='pointer-events-none absolute top-0 z-[-1] flex h-screen w-screen items-center justify-center overflow-hidden'>
        <img src={Cubes} alt='cubes-background' />
      </div>
      <HeroSection
        onShorten={handleShorten}
        loading={isLoading}
        error={formError}
      />
      {isSignedIn && (
        <div className='relative top-10 h-full w-full max-w-[90vw]'>
          {isLoading && (
            <p className='text-center text-blue-400'>Loading your links...</p>
          )}
          {error && (
            <p className='text-center text-red-500'>
              Error loading links: {error.message}
            </p>
          )}
          {links && <LinksTable columns={Columns} data={links} />}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default HomePage;
