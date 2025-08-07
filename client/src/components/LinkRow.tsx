import React from "react";
import CopyIcon from "../assets/copy-icon.svg";
import ActiveLinkCopy from "../assets/active-link-copy.svg";
import InactiveLinkCopy from "../assets/inactive-link-copy.svg";
import getFavicons from "../utils/getFavicons";

const LinkRow = ({ link }) => {
	const [isExpanded, setIsExpanded] = React.useState<boolean>(false);
	
	const {
		shortlink,
		originallink,
		qrcode,
		qrcodedescription,
		clicks,
		status,
		date,
	} = link;

	return (
		<tr className="text-[#C9CED6] font-bold bg-transparent text-left backdrop-blur-xl drop-shadow-xl">
			<td className="px-6 py-5 text-sm font-light">
				<div className="flex gap-2 items-center">
					<span>{shortlink}</span>
					<button className="cursor-pointer">
						<img src={CopyIcon} alt="copy" />
					</button>
				</div>
			</td>
			<td className="px-6 py-5 text-sm font-light">
				<div className="flex gap-2 items-center justify-left">
					<img src={getFavicons(originallink)} alt="favicon" />
					<span>{originallink}</span>
				</div>
			</td>
			<td className="px-6 py-5 text-sm font-light">
				<img src={qrcode} alt={qrcodedescription} className="mx-auto w-8 h-8" />
			</td>
			<td className="px-6 py-5 text-sm font-light">{clicks}</td>
			<td
				className={`px-6 py-5 text-sm font-light ${
					status === "Inactive" ? "text-[#B0901E]" : "text-[#1EB036]"
				}`}
			>
				<div className="flex gap-2 items-center justify-right">
					<span>{status === true ? "Active" : "Inactive"}</span>
					<button className="cursor-pointer">
						<img
							src={status === false ? InactiveLinkCopy : ActiveLinkCopy}
							alt="status-copy-btn"
						/>
					</button>
				</div>
			</td>
			<td className="px-6 py-5 text-sm font-light">{date}</td>
		</tr>
	);
};

export default LinkRow;
