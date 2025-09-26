import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react';
import Loader from '../common/Loader';

const SSOCallback = () => {
  return (
    <div className='flex h-screen w-full items-center justify-center'>
      {/* 
        This component securely completes the authentication flow.
        It will automatically redirect the user to the correct page 
        (based on your environment variables) upon success.
      */}
      <AuthenticateWithRedirectCallback />
      <Loader size='7rem' />
    </div>
  );
};

export default SSOCallback;
