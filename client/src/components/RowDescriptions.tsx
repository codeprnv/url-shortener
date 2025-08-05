import CopyIcon from "../assets/copy-icon.svg";
import ActiveLinkCopy from "../assets/active-link-copy.svg";
import InactiveLinkCopy from "../assets/inactive-link-copy.svg";

interface RowDescriptionsType {
	shortlink: string;
	originallink: string;
	qrcode: string;
	qrcodedescription: string;
	clicks: number;
	status: string;
	date: string;
}

const RowDescriptions = ({
	shortlink,
	originallink,
	qrcode,
	qrcodedescription,
	clicks,
	status,
	date,
}: RowDescriptionsType) => {
	const getFavicons = (url: string) => {
		try {
			const domain = new URL(url).hostname;
			return `https://www.google.com/s2/favicons?sz=32&domain=${domain}`;
		} catch (error) {
			console.error(`An error occured fetching favicons: ${error}`);
			return "";
		}
	};
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
					<span>{status}</span>
					<button className="cursor-pointer">
						<img
							src={status === "Inactive" ? InactiveLinkCopy : ActiveLinkCopy}
							alt="status-copy-btn"
						/>
					</button>
				</div>
			</td>
			<td className="px-6 py-5 text-sm font-light">{date}</td>
		</tr>
	);
};

export default RowDescriptions;
