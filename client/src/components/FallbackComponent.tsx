import { useErrorBoundary } from 'react-error-boundary';
import errorPic from '../assets/error.png';

const fallback = ({ error }: { error: Error }) => {
  const { resetBoundary } = useErrorBoundary();
  return (
    <div className='flex h-screen w-screen flex-col items-center justify-center gap-10 text-xl text-white md:text-3xl'>
      {/* <p>Something went wrong...</p> */}
      <div className='m-4 md:m-2'>
        <img
          src={errorPic}
          alt='error-pic'
          className='rounded-2xl object-cover shadow-xl shadow-red-500 outline-2 outline-red-500 lg:max-w-[60rem]'
        />
      </div>
      <pre className='text-red-500'>{error.message}</pre>
      <button
        className='duration-350 h-fit w-fit rounded-2xl border border-red-500 p-3 transition-colors hover:cursor-pointer hover:bg-red-500 md:p-6'
        onClick={resetBoundary}
      >
        Try Again
      </button>
    </div>
  );
};

export default fallback;
