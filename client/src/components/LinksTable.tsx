import SelectionArrow from "../assets/Group 16.svg";
import LinkRow from "./LinkRow";
import linksData from "../utils/linksData.ts";

const LinksTable = () => {
	return (
		<table className="lg:max-w-[75vw] table-auto border-collapse h-full border">
			<thead>
				<tr className="bg-[#181E29] text-[#C9CED6] font-bold text-[15px] text-left px-6 py-5 backdrop-blur-2xl drop-shadow-2xl">
					<th className="px-4 py-3">Short Link</th>
					<th className="px-4 py-3">Original Link</th>
					<th className="px-4 py-3">QR Code</th>
					<th className="px-4 py-3">Clicks</th>
					<th className="px-4 py-3">Status</th>
					<th className="px-4 py-3">
						<div className="flex justify-center items-center gap-2">
							<span>Date</span>
							<img src={SelectionArrow} alt="date_selection_arrow" />
						</div>
					</th>
				</tr>
			</thead>
			{linksData.map((link: object, index: number) => (
				<LinkRow key={index} link={link} />
			))}
		</table>
	);
};

export default LinksTable;
