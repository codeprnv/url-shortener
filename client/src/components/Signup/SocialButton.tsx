import type { ComponentProps } from 'react';

interface SocialButtonProps extends ComponentProps<'button'> {
  imgPath: string;
}

const SocialButton = ({ imgPath, ...props }: SocialButtonProps) => {
  return (
    <button
      {...props} // Spread all props, including onClick
      type='button' // Important to prevent form submission
      className='duration-250 rounded-full p-1 outline outline-black transition-colors hover:cursor-pointer hover:shadow-xl hover:shadow-[#3a5efd] hover:outline-[#3a5efd]'
    >
      <img src={imgPath} alt='social-login-icon' className='w-8 object-cover' />
    </button>
  );
};

export default SocialButton;
