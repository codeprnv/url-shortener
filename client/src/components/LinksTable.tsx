import SelectionArrow from '../assets/Group 16.svg';
import LinkRow from './LinkRow';
// import linksData from '../utils/linksData.ts';
import { useMediaQuery } from 'react-responsive';
import type { linksDataType } from '../utils/linksData.ts';
import CardLink from './CardLink';

const LinksTable = ({ links }: { links: linksDataType[] }) => {
  const isMobile = useMediaQuery({ maxWidth: 1279 });
  return (
    // ✨ 1. Main wrapper to contain the title and the table/cards
    <div className="flex w-full flex-col gap-4 md:max-w-[90vw] xl:max-w-[85vw]">
      {/* Conditionally render the title only if there are links */}
      {links.length > 0 && (
        <h1 className="text-2xl font-bold text-[#C9CED6] px-4 ">Your Links</h1>
      )}

      {/* ✨ 3. Existing responsive table/card container */}
      <div className="w-full overflow-x-auto">
        {links.length === 0 ? (
          <div className="py-10 text-center text-gray-500">
            <p>You haven't shortened any links yet.</p>
            <p>Use the form above to get started!</p>
          </div>
        ) : isMobile ? (
          <div className="flex flex-col gap-4 p-2">
            {links.map((link) => (
              <CardLink key={link.shortlink} link={link} />
            ))}
          </div>
        ) : (
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-[#181E29] text-left text-[15px] font-bold text-[#C9CED6]">
                <th className="px-6 py-3">Short Link</th>
                <th className="px-6 py-3">Original Link</th>
                <th className="px-6 py-3 text-center">QR Code</th>
                <th className="px-6 py-3 text-center">Clicks</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">
                  <div className="flex items-center justify-center gap-2">
                    <span>Date</span>
                    <img src={SelectionArrow} alt="date_selection_arrow" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {links.map((link) => (
                <LinkRow key={link.shortlink} link={link} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default LinksTable;
