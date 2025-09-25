
// Define the types for the component's props
type LoaderProps = {
  size?: string | number; // e.g., '3rem', 48
  className?: string; // Allow for passing additional Tailwind classes
};

const Loader = ({ size = '3rem', className = '' }: LoaderProps) => {
  // Convert number size to pixels, otherwise use the string value
  const dimension = typeof size === 'number' ? `${size}px` : size;

  return (
    // The main container's size is now dynamic via inline styles.
    // The full-screen centering div has been removed.
    <div
      className={`relative ${className}`}
      style={{ height: dimension, width: dimension }}
    >
      <div
        className='absolute h-full w-full animate-spin rounded-full border-[3px] border-gray-100/10 border-b-[#0ff] border-r-[#0ff]'
        style={{ animationDuration: '3s' }}
      />
      <div
        className='absolute h-full w-full animate-spin rounded-full border-[3px] border-gray-100/10 border-t-[#0ff]'
        style={{ animationDuration: '2s', animationDirection: 'reverse' }}
      />
      <div className='absolute inset-0 animate-pulse rounded-full bg-gradient-to-tr from-[#0ff]/10 via-transparent to-[#0ff]/5 blur-sm' />
    </div>
  );
};

export default Loader;
