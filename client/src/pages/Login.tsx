import { useSignIn, useSignUp } from '@clerk/clerk-react';
import Cookies from 'js-cookie';
import type { FormEvent } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import github_icon from '../assets/github-icon.svg';
import google_icon from '../assets/google-icon.svg';
import linkly from '../assets/Linkly.png';
import loginBg from '../assets/login-bg.png';
import Loader from '../components/common/Loader';
import NavBar from '../components/common/NavBar';
import Button from '../components/Signup/Button';
import InputField from '../components/Signup/InputField';
import SocialButton from '../components/Signup/SocialButton';

const Login = () => {
  const { signIn, isLoaded: signInLoaded, setActive } = useSignIn();
  const { signUp, isLoaded: signUpLoaded } = useSignUp();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!signInLoaded) return;
    if (!email || !password) {
      return toast.error('Please enter both Email and Password !', {
        duration: 5000,
      });
    }
    setIsLoading(true);
    try {
      const result = await signIn.create({
        identifier: email,
        password: password,
      });

      // If Sign-In is complete then set active session and redirect to homepage
      if (result.status === 'complete') {
        await setActive({ session: result?.createdSessionId });
        toast.success('Login successful !', {
          duration: 3500,
        });
        setTimeout(() => {
          navigate('/');
        }, 3000);
        return;
      } else {
        // This can happen in multi-factor auth flows
        console.log(result);
        toast.error('Multi-factor authentication may be required.');
      }
    } catch (err: any) {
      const errorMessage =
        err.errors?.[0]?.longMessage ||
        'Invalid email or password. Please try again.';
      toast.error(errorMessage);
    } finally {
      if (signIn?.status !== 'complete') {
        setIsLoading(false);
      }
    }
  };

  const handleSocialSignIn = (strategy: 'oauth_google' | 'oauth_github') => {
    if (!signUpLoaded) return;
    Cookies.remove('__client_uat'); 
    signUp.authenticateWithRedirect({
      strategy,
      redirectUrl: '/sso-callback',
      redirectUrlComplete: '/',
    });
  };

  const isLoaded = signInLoaded && signUpLoaded

  return (
    <div className='flex h-screen w-screen min-w-[#375px] flex-col items-center'>
      <NavBar />
      <img
        src={loginBg}
        alt='login-bg'
        className='absolute top-0 z-[-1] h-screen w-full min-w-[#375px] overflow-hidden object-cover'
      />
      <div className='m-1 flex max-h-fit min-w-[90vw] flex-col items-center gap-5 rounded-3xl bg-[#0D1226] p-5 text-white shadow-2xl shadow-[#1B3582] ring-2 ring-[#1B3582] md:min-w-[65vw] lg:min-w-[55vw] lg:gap-8 lg:p-10 xl:min-w-[30vw]'>
        {/* Logo Header */}
        <img
          src={linkly}
          alt='linkly-logo'
          className='relative h-8 object-cover text-white'
        />
        <p className='text-2xl font-semibold tracking-wider md:text-3xl'>
          Welcome Back!
        </p>

        {/* Input fields */}
        <form
          className='flex h-full w-full flex-col items-center gap-10 lg:max-w-[50vw]'
          onSubmit={handleSignIn}
        >
          <InputField
            type='email'
            name='email'
            id='email-address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label='Email Address'
            autoComplete='username' // Helps password managers
          />
          <InputField
            type='password'
            name='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label='Password'
            autoComplete='current-password' // Helps password managers
          />
          <div id='clerk-captcha' className='w-full'></div>
          <Button type='submit' disabled={isLoading || !isLoaded}>
            {isLoading ? <Loader size='1.5rem' /> : 'Login'}
          </Button>

          {/* Socials Login */}

          <div className='flex w-full items-center justify-center gap-5'>
            <SocialButton
              imgPath={google_icon}
              onClick={() => handleSocialSignIn('oauth_google')}
            />
            <SocialButton
              imgPath={github_icon}
              onClick={() => handleSocialSignIn('oauth_github')}
            />
          </div>

          {/* Forget Password */}
          <div className='flex w-full justify-around gap-2 text-nowrap text-xs lg:text-sm'>
            <p className='font-medium tracking-wider'>Forgot Password?</p>
            <div className='flex w-fit flex-col'>
              <p className='font-medium tracking-wider'>
                Don't have an account?
              </p>
              <Link
                to='/signup'
                className='tracking-wide text-[#3a5efd] underline transition-colors duration-200 hover:cursor-pointer hover:text-[#0627b9]'
              >
                Register Now!
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
