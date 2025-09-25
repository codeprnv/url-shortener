import type { ComponentProps, ReactNode } from 'react';

// Use this interface to accept all standard button props (like type, disabled, onClick)
interface ButtonProps extends ComponentProps<'button'> {
  children: ReactNode;
}

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      {...props} // Spread all props here (type, disabled, etc.)
      className='lg:h-15 flex h-12 w-full items-center justify-center rounded-2xl bg-[#3053F7] p-3 text-sm font-semibold tracking-wider duration-300 hover:cursor-pointer hover:bg-[#021980] disabled:cursor-not-allowed disabled:bg-gray-600 lg:text-lg'
    >
      {children}
    </button>
  );
};

export default Button;
