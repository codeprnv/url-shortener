import { useSearchParams } from 'react-router-dom';
import Cubes from '../assets/Cubes.png';
import Swirl from '../assets/Swirl.png';
const QrCode = () => {
  const [params] = useSearchParams();
  const qrParam = params.get('qr') ?? '';

  if (qrParam) {
    console.log(qrParam);
  } else {
    console.log('No qr param found');
  }
  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center ">
      {/* Background */}
      <div className="pointer-events-none absolute top-0 z-[-1] flex h-screen w-screen items-center justify-center overflow-hidden">
        <img src={Swirl} alt="swirl-background" />
      </div>
      <div className="pointer-events-none absolute top-0 z-[-1] flex h-screen w-screen items-center justify-center overflow-hidden">
        <img src={Cubes} alt="cubes-background" />
      </div>

      {/* QR Box */}
      <img
        src={qrParam}
        alt={'qr-code'}
        className="h-full w-[25vw] object-cover rounded-2xl"
      />
    </div>
  );
};

export default QrCode;
