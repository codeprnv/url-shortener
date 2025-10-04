import { useSearchParams } from 'react-router-dom';
import Cubes from '../assets/Cubes.png';
import Swirl from '../assets/Swirl.png';
const QrCode = () => {
  const [params] = useSearchParams();
  const imgUrl = params.get('qr') ?? '';

  if (imgUrl) {
    console.log(`Qr code link: ${imgUrl}`);
  } else {
    console.log('No qr param found');
  }
  return (
    <div className='flex min-h-screen w-screen flex-col items-center justify-center'>
      {/* Background */}
      <div className='pointer-events-none absolute top-0 z-[-1] flex h-screen w-screen items-center justify-center overflow-hidden'>
        <img src={Swirl} alt='swirl-background' />
      </div>
      <div className='pointer-events-none absolute top-0 z-[-1] flex h-screen w-screen items-center justify-center overflow-hidden'>
        <img src={Cubes} alt='cubes-background' />
      </div>

      {/* QR Box */}

      <img
        src={imgUrl}
        alt='QR Code'
        className='h-[25rem] w-[25rem] rounded-2xl bg-blue-600 object-cover text-lg font-medium text-white'
      />
    </div>
  );
};

export default QrCode;
