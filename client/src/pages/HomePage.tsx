import { useState, useEffect } from 'react';
import Cubes from '../assets/Cubes.png';
import Swirl from '../assets/Swirl.png';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import LinksTable from '../components/LinksTable';
import NavBar from '../components/NavBar';
import { shortenUrlApi } from '../services/api.ts';
import type { linksDataType } from '../utils/linksData.ts';
const HomePage = () => {
  const [links, setLinks] = useState<linksDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedLinks = localStorage.getItem('shortenedLinks');
      if (savedLinks) {
        setLinks(JSON.parse(savedLinks));
      }
    } catch (e) {
      console.error(`Failed to load or parse links from localStorage: ${e}`);
      localStorage.removeItem('shortenedLinks');
    }
  }, []);

  // This is the core logic function that will be passed to the HeroSection
  const handleShorten = async (longUrl: string) => {
    setLoading(true);
    setError(null);

    try {
      // The API now returns the complete new link object
      const newLink = await shortenUrlApi(longUrl);

      // Add the new link to the top of our links array
      const updatedLinks = [newLink, ...links];
      setLinks(updatedLinks);

      // Save the updated list to localStorage for persistence
      localStorage.setItem('shortenedLinks', JSON.stringify(updatedLinks));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-start mb-20">
      <NavBar />
      {/* Background */}
      <div className="pointer-events-none absolute top-0 z-[-1] flex h-screen w-screen items-center justify-center overflow-hidden">
        <img src={Swirl} alt="swirl-background" />
      </div>
      <div className="pointer-events-none absolute top-0 z-[-1] flex h-screen w-screen items-center justify-center overflow-hidden">
        <img src={Cubes} alt="cubes-background" />
      </div>
      <HeroSection onShorten={handleShorten} loading={loading} error={error} />
      <LinksTable links={links} />
      <Footer />
    </div>
  );
};

export default HomePage;
