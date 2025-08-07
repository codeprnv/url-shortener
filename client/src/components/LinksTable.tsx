import SelectionArrow from '../assets/Group 16.svg';
import LinkRow from './LinkRow';
import linksData from '../utils/linksData.ts';
import CardLink from './CardLink.tsx';

const LinksTable = () => {
  return (
    // ✨ 1. Main wrapper to contain the title and the table/cards
    <div className="flex w-full md:max-w-[90vw] xl:max-w-[85vw] flex-col gap-4">
      {/* ✨ 2. New Title Header */}
      <h1 className="text-2xl font-bold text-[#C9CED6]">Your Links</h1>

      {/* ✨ 3. Existing responsive table/card container */}
      <div className="w-full overflow-x-auto">
        {/* Table view for LARGE screens and up (lg) */}
        <table className="hidden min-w-full border-collapse xl:table">
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
            {linksData.map((link, index) => (
              <LinkRow key={index} link={link} />
            ))}
          </tbody>
        </table>

        {/* Card view for screens SMALLER than large */}
        <div className="flex flex-col gap-4 xl:hidden">
          {linksData.map((link, index) => (
            <CardLink key={index} link={link} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LinksTable;
