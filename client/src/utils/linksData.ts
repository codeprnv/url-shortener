interface linksDataType {
	shortlink: string;
	originallink: string;
	qrcode: string;
	qrcodedescription: string;
	clicks: number;
	status: boolean;
	date: string;
}

const linksData: linksDataType[] = [
	{
		shortlink: "https://linkly.com/Bn41aCOlnxj",
		originallink: "https://www.twitter.com/tweets/8erelCoihu/",
		qrcode: "/src/assets/qrcode.png",
		qrcodedescription: "qr-code-1",
		clicks: 1313,
		status: true,
		date: "Oct - 10 -2023",
	},
	{
		shortlink: "https://linkly.com/Bn41aCOlnxj",
		originallink: "https://www.youtube.com/watch?v=8J7ZmH0lXuk",
		qrcode: "/src/assets/qrcode.png",
		qrcodedescription: "qr-code-2",
		clicks: 4313,
		status: false,
		date: "Oct - 08 -2023",
	},
	{
		shortlink: "https://linkly.com/Bn41aCOlnxj",
		originallink: "https://unsplash.com/photos/2KjNwOzFfVQ",
		qrcode: "/src/assets/qrcode.png",
		qrcodedescription: "qr-code-3",
		clicks: 1013,
		status: true,
		date: "Oct - 01 -2023",
	},
	{
		shortlink: "https://linkly.com/Bn41aCOlnxj",
		originallink: "https://vimeo.com/625257654",
		qrcode: "/src/assets/qrcode.png",
		qrcodedescription: "qr-code-4",
		clicks: 1313,
		status: true,
		date: "Sep - 20 -2023",
	},
];

export default linksData;
