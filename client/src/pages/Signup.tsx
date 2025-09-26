import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useSignUp } from '@clerk/clerk-react';
import Cookies from 'js-cookie';
import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import github_icon from '../assets/github-icon.svg';
import google_icon from '../assets/google-icon.svg';
import linkly from '../assets/Linkly.png';
import signupBg from '../assets/login-bg.png';
import Loader from '../components/common/Loader';
import NavBar from '../components/common/NavBar';
import Button from '../components/Signup/Button';
import InputField from '../components/Signup/InputField';
import SocialButton from '../components/Signup/SocialButton';

const Signup = () => {
  const { isLoaded, setActive, signUp } = useSignUp();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pendingVerification, setPendingVerification] =
    useState<boolean>(false);
  const [code, setCode] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    if (code.length === 6) {
      const timer = setTimeout(() => {
        handleVerification();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [code]);

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoaded) return;
    setIsLoading(true);
    try {
      // Create the user with Clerk
      await signUp.create({
        username: username,
        emailAddress: email,
        password: password,
      });
      // After creating signup attempt to create verification
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      // Set pending verification
      setPendingVerification(true);
      toast.success('Verification code sent to your email!');
    } catch (err: any) {
      const errorMessage =
        err.errors?.[0]?.longMessage || 'An unexpected error occured';
      toast.error(errorMessage, {
        duration: 7000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerification = async () => {
    if (!isLoaded) return;
    setIsLoading(true);
    try {
      const result = await signUp.attemptEmailAddressVerification({ code });
      // If the signup is completed then set the active session and redirect
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        toast.success('Account created successfully!', {
          duration: 2800,
        });
        setTimeout(() => {
          navigate('/');
        }, 3500);
      } else {
        console.log('Result: ', result);
      }
    } catch (err: any) {
      const errorMessage =
        err.errors?.[0]?.longMessage || 'Invalid verification code!';
      toast.error(errorMessage, {
        duration: 7000,
      });
    }
  };

  const handleSocialSignUp = (strategy: 'oauth_google' | 'oauth_github') => {
    if (!isLoaded) return;
    Cookies.remove('__client_uat'); 
    signUp.authenticateWithRedirect({
      strategy,
      redirectUrl: '/sso-callback',
      redirectUrlComplete: '/',
    });
  };

  return (
    <div className='flex h-screen w-screen min-w-[#375px] flex-col items-center'>
      <NavBar />
      <img
        src={signupBg}
        alt='signup-bg'
        className='absolute top-0 z-[-1] h-screen w-full min-w-[#375px] object-cover'
      />
      <div className='m-1 flex max-h-fit min-w-[95vw] flex-col items-center gap-2 rounded-3xl bg-[#0D1226] p-5 text-white shadow-2xl shadow-[#1B3582] ring-2 ring-[#1B3582] md:min-w-[65vw] lg:min-w-[55vw] lg:gap-8 lg:p-10 xl:min-w-[30vw]'>
        {!pendingVerification ? (
          <>
            <img
              src={linkly}
              alt='linkly-logo'
              className='relative max-w-[20vw] object-cover text-white'
            />
            <p className='text-lg font-semibold tracking-wider lg:text-2xl'>
              Create your account
            </p>

            {/* Input fields */}
            <form
              className='flex h-full w-full flex-col items-center gap-6 lg:max-w-[50vw]'
              onSubmit={handleSignUp}
            >
              <InputField
                autoComplete='username'
                type='text'
                name='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                id='username'
                label='Username'
              />
              <InputField
                autoComplete='email'
                type='email'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id='email-address'
                label='Email Address'
              />
              <InputField
                autoComplete='current-password'
                type='password'
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id='password'
                label='Password'
              />
              <div id='clerk-captcha' className='w-full'></div>
              <Button type='submit' disabled={isLoading || !isLoaded}>
                {isLoading ? <Loader size='1.5rem' /> : 'Create Account'}
              </Button>

              {/* Socials Login */}

              <div className='flex w-full items-center justify-center gap-5'>
                <SocialButton
                  imgPath={google_icon}
                  onClick={() => handleSocialSignUp('oauth_google')}
                />
                <SocialButton
                  imgPath={github_icon}
                  onClick={() => handleSocialSignUp('oauth_github')}
                />
              </div>

              {/* Forget Password */}
              <div className='flex w-full justify-center gap-5 text-nowrap text-xs lg:text-sm'>
                <p className='font-medium tracking-wider'>
                  Already have an account?
                </p>
                <Link
                  to='/login'
                  className='tracking-wide text-[#3a5efd] underline transition-colors duration-200 hover:cursor-pointer hover:text-[#0627b9]'
                >
                  Login
                </Link>
              </div>
            </form>
          </>
        ) : (
          <>
            <p className='text-lg font-semibold tracking-wider lg:text-2xl'>
              Verify Your Email
            </p>
            <form
              className='flex h-full w-full flex-col items-center gap-6 lg:max-w-[50vw]'
              onSubmit={(e) => {
                e.preventDefault();
                handleVerification();
              }}
            >
              <InputOTP
                maxLength={6}
                value={code}
                onChange={(value) => setCode(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />

                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <Button type='submit' disabled={isLoading || !isLoaded}>
                {isLoading ? <Loader /> : 'Verify and Sign Up'}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;
