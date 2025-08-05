import SelectionArrow from "../assets/Group 16.svg";
import RowDescriptions from "./RowDescriptions";

const InfoTable = () => {
	return (
		<table className="w-full table-auto border-collapse h-full lg:max-w-[75vw] border">
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
			<tbody>
				<RowDescriptions
					shortlink={"https://linkly.com/Bn41aCOlnxj"}
					originallink={"https://www.twitter.com/tweets/8erelCoihu/"}
					qrcode={"/src/assets/qrcode.png"}
					qrcodedescription={"qr-code-1"}
					clicks={1313}
					status={"Active"}
					date={"Oct - 10 -2023"}
				/>
				<RowDescriptions
					shortlink={"https://linkly.com/Bn41aCOlnxj"}
					originallink={"https://www.youtube.com/watch?v=8J7ZmH0lXuk"}
					qrcode={"/src/assets/qrcode.png"}
					qrcodedescription={"qr-code-1"}
					clicks={4313}
					status={"Inactive"}
					date={"Oct - 08 -2023"}
				/>
				<RowDescriptions
					shortlink={"https://linkly.com/Bn41aCOlnxj"}
					originallink={"https://unsplash.com/photos/2KjNwOzFfVQ"}
					qrcode={"/src/assets/qrcode.png"}
					qrcodedescription={"qr-code-1"}
					clicks={1013}
					status={"Active"}
					date={"Oct - 01 -2023"}
				/>
				<RowDescriptions
					shortlink={"https://linkly.com/Bn41aCOlnxj"}
					originallink={"https://vimeo.com/625257654"}
					qrcode={"/src/assets/qrcode.png"}
					qrcodedescription={"qr-code-1"}
					clicks={1313}
					status={"Active"}
					date={"Sep - 20 -2023"}
				/>
			</tbody>
		</table>
	);
};

export default InfoTable;
