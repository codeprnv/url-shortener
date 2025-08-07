import CopyIcon from '../assets/copy-icon.svg';
import ActiveLinkCopy from '../assets/active-link-copy.svg';
import InactiveLinkCopy from '../assets/inactive-link-copy.svg';
import getFavicons from '../utils/getFavicons';
import type { linksDataType } from '../utils/linksData';

const LinkRow = ({ link }: { link: linksDataType }) => {
  const {
    shortlink,
    originallink,
    qrcode,
    qrcodedescription,
    clicks,
    status, // This is a boolean
    date,
  } = link;

  return (
    <tr className="border-b border-gray-800/50 bg-transparent text-left text-[#C9CED6] drop-shadow-xl backdrop-blur-xl">
      {/* Short Link */}
      <td className="px-6 py-5 text-sm font-light">
        <div className="flex items-center gap-2">
          <span>{shortlink}</span>
          <button className="cursor-pointer">
            <img src={CopyIcon} alt="copy" />
          </button>
        </div>
      </td>

      {/* Original Link */}
      <td className="px-6 py-5 text-sm font-light">
        <div className="justify-left flex items-center gap-2">
          <img
            src={getFavicons(originallink)}
            alt="favicon"
            className="h-4 w-4"
          />
          <span className="max-w-xs truncate">{originallink}</span>
        </div>
      </td>

      {/* QR Code */}
      <td className="px-6 py-5 text-sm font-light">
        <div className="flex justify-center">
          <img src={qrcode} alt={qrcodedescription} className="h-8 w-8" />
        </div>
      </td>

      {/* Clicks */}
      <td className="px-6 py-5 text-center text-sm font-light">{clicks}</td>

      {/* Status - Corrected boolean check */}
      <td
        className={`px-6 py-5 text-sm font-light ${
          status ? 'text-[#1EB036]' : 'text-[#B0901E]'
        }`}
      >
        <div className="flex items-center gap-2">
          <span>{status ? 'Active' : 'Inactive'}</span>
          <button className="cursor-pointer">
            <img
              src={status ? ActiveLinkCopy : InactiveLinkCopy}
              alt="status-copy-btn"
            />
          </button>
        </div>
      </td>

      {/* Date */}
      <td className="px-6 py-5 text-center text-sm font-light">{date}</td>
    </tr>
  );
};

export default LinkRow;
