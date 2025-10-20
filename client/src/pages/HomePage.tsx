import { Columns } from '@/components/links/Columns.tsx';
import { DataTable } from '@/components/links/DataTable.tsx';
import { useLinks } from '@/hooks/useLinks.ts';
import type { linksDataType } from '@/utils/linksData.ts';
import { useUser } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Cubes from '../assets/Cubes.png';
import Swirl from '../assets/Swirl.png';
import Footer from '../components/common/Footer.tsx';
import NavBar from '../components/common/NavBar.tsx';
import HeroSection from '../components/HeroSection';

const HomePage = () => {
  const { isSignedIn } = useUser();
  const { links, error, isLoading, addLink, deleteLinks } = useLinks();

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

  const handleDelete = async (linkToDelete: linksDataType) => {
    try {
      await deleteLinks([linkToDelete]); // Pass the link object in an array
      toast.success(`Link deleted successfully!`, { duration: 5000 });
    } catch (error) {
      toast.error(`An error occurred while deleting the link.`, {
        duration: 5000,
      });
      console.error(`Deletion failed:`, error);
    }
  };

  const columns = Columns({ handleDelete });

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
        isSignedIn={isSignedIn}
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
          {links && <DataTable columns={columns} data={links} />}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default HomePage;
