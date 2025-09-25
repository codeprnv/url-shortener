import { format } from 'date-fns';
import React from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import ActiveLinkCopy from '../assets/active-link-copy.svg';
import CopyIcon from '../assets/copy-icon.svg';
import InactiveLinkCopy from '../assets/inactive-link-copy.svg';
import getFavicons from '../utils/getFavicons';
import type { linksDataType } from '../utils/linksData';

// A simple Chevron Icon for the dropdown arrow
const ChevronDownIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className='h-5 w-5 text-[#C9CED6] transition-transform duration-300'
  >
    <polyline points='6 9 12 15 18 9'></polyline>
  </svg>
);

const CardLink = ({ link }: { link: linksDataType }) => {
  // ✨ 1. State to manage the expanded/collapsed view for each card
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleCopy = (e: React.MouseEvent<HTMLElement>) => {
    try {
      e.stopPropagation(); // Prevents the card from collapsing when copying
      navigator.clipboard.writeText(link.shortlink);
      toast.success('Copied to Clipboard', {
        duration: 2500,
      });
    } catch (error) {
      toast.error(`Cannot copy to clipboard: ${error}`, {
        duration: 2500,
      });
      console.error(`Error in writing to clipboard!!: ${error}`);
    }
  };

  return (
    // ✨ 2. The main container keeps the styling, but we'll manage content inside
    <div className='overflow-hidden rounded-lg bg-transparent text-[#C9CED6] drop-shadow-xl backdrop-blur-xl'>
      {/* ✨ 3. The "Header" - Always visible and clickable to toggle the state */}
      <div
        className='flex cursor-pointer items-center justify-between p-4'
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className='flex items-center gap-3'>
          <Link to={link.shortlink} className='font-light focus:text-[#144EE3]'>
            {`https://linkly.com/${link.shortlink.split('/')[3]}`}
          </Link>
          <button
            className='z-10 cursor-pointer'
            onClick={(e) => {
              handleCopy(e);
            }}
          >
            <img src={CopyIcon} alt='copy-icon' />
          </button>
        </div>
        <div
          style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <ChevronDownIcon />
        </div>
      </div>

      {/* ✨ 4. The "Body" - Conditionally rendered based on the isExpanded state */}
      {isExpanded && (
        <div className='flex flex-col gap-3 border-t border-gray-700/50 px-4 pb-4'>
          {/* Original Link */}
          <div className='flex items-center justify-start gap-2 truncate pt-3 font-light'>
            <img
              src={getFavicons(link.originallink)}
              alt='favicon'
              className='flex-shrink-0'
            />
            <span className='truncate'>{link.originallink}</span>
          </div>

          {/* Details Row: QR, Clicks, Status, Date */}
          <div className='mt-2 flex items-center justify-between text-sm font-light'>
            <Link
              to={`/img?qr=${encodeURIComponent(link.qrcode)}`}
              className='h-14 w-14'
            >
              <img src={link.qrcode} alt={link.qrcodedescription} />
            </Link>
            <span className='text-sm'>{link.clicks} clicks</span>
            <div
              className={`flex items-center gap-2 text-sm ${link.status ? 'text-[#1EB036]' : 'text-[#B0901E]'}`}
            >
              <span>{link.status ? 'Active' : 'Inactive'}</span>
              <img
                src={link.status ? ActiveLinkCopy : InactiveLinkCopy}
                alt='status-icon'
                className='h-8 w-8'
              />
            </div>
            <span className='text-sm'>
              {format(link.date, 'dd-MM-yyyy hh:mm aaaa')}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardLink;
