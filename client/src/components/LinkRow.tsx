import { format } from 'date-fns';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import ActiveLinkCopy from '../assets/active-link-copy.svg';
import CopyIcon from '../assets/copy-icon.svg';
import InactiveLinkCopy from '../assets/inactive-link-copy.svg';
import getFavicons from '../utils/getFavicons';
import type { linksDataType } from '../utils/linksData';

const LinkRow = ({ link }: { link: linksDataType }) => {
  const {
    shortlink,
    originallink,
    clicks,
    status, // This is a boolean
    date,
  } = link;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortlink);
      toast.success('Copied to Clipboard', {
        duration: 2500,
      });
    } catch (error) {
      console.error(`Error in writing content to clipboard: ${error}`);
    }
  };

  return (
    <tr className='border-b border-gray-800/50 bg-transparent text-left text-[#C9CED6] drop-shadow-xl backdrop-blur-xl'>
      {/* Short Link */}
      <td className='px-6 py-5 text-sm font-light'>
        <div className='flex items-center gap-2'>
          <Link to={shortlink} className='hover:text-[#144EE3]'>
            {`https://linkly.com/${shortlink.split('/')[3]}`}
          </Link>
          <button className='cursor-pointer' onClick={handleCopy}>
            <img src={CopyIcon} alt='copy' />
          </button>
        </div>
      </td>

      {/* Original Link */}
      <td className='px-6 py-5 text-sm font-light'>
        <div className='justify-left flex items-center gap-2'>
          <img src={getFavicons(originallink)} alt='favicon' />
          <Link
            to={originallink}
            className='max-w-xs truncate hover:text-[#144EE3]'
          >
            {originallink}
          </Link>
        </div>
      </td>

      {/* QR Code */}
      <td className='px-6 py-5 text-sm font-light'>
        <div className='flex justify-center'>
          <Link
            to={`/img?qr=${encodeURIComponent(link.qrcode)}`}
            className='h-14 w-14'
          >
            <img src={link.qrcode} alt={link.qrcodedescription} />
          </Link>
        </div>
      </td>

      {/* Clicks */}
      <td className='px-6 py-5 text-center text-sm font-light'>{clicks}</td>

      {/* Status - Corrected boolean check */}
      <td
        className={`px-6 py-5 text-sm font-light ${
          status ? 'text-[#1EB036]' : 'text-[#B0901E]'
        }`}
      >
        <div className='flex items-center gap-2'>
          <span>{status ? 'Active' : 'Inactive'}</span>
          <button className='cursor-pointer'>
            <img
              src={status ? ActiveLinkCopy : InactiveLinkCopy}
              alt='status-copy-btn'
            />
          </button>
        </div>
      </td>

      {/* Date */}
      <td className='px-6 py-5 text-center text-sm font-light'>
        {format(date, 'dd-MM-yyyy')}
      </td>
    </tr>
  );
};

export default LinkRow;
