import { useMediaQuery } from "react-responsive";
import Link_Icon from "../assets/link.svg";
import Arrow_Right from "../assets/arrow-right.svg";
import Question_Icon from "../assets/question-circle.svg";

const HeroSection = () => {
	const isMobile = useMediaQuery({ maxWidth: 480 });
	return (
		<div className="min-w-full lg:min-w-[35vw] h-full flex flex-col items-center justify-center">
			<div className="max-w-[90vw] h-full p-4 items-center flex flex-col justify-center gap-5">
				{/* Title Start */}
				<h1
					className="text-transparent font-extrabold text-4xl xl:text-[60px] bg-clip-text text-wrap text-center"
					style={{
						backgroundImage:
							"linear-gradient(to right, #144EE3 0%, #EB568E 19%, #A353AA 64%, #144EE3 100%)",
					}}
				>
					Shorten Your Loooong Links :)
				</h1>
				<p className="text-base font-light text-[#C9CED6] text-center text-wrap lg:max-w-[30vw] w-full">
					Linkly is an efficient and easy-to-use URL shortening service that
					streamlines your online experience.
				</p>
				{/* Title End */}
			</div>

			{/* Link Input Field Start */}
			<div className="p-3 w-full max-w-[90vw] md:max-w-[75vw] xl:max-w-[35vw] h-full flex flex-col items-center justify-center gap-3 mt-5 xl:mt-10">
				<form className="w-full mx-auto">
					<div className="relative">
						<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
							<img src={Link_Icon} alt="link-icon" />
						</div>
						<input
							type="text"
							id="link-text"
							className="block w-full px-6 py-5 ps-12 text-sm text-[#C9CED6] bg-[#181E29] outline focus:outline-[#144EE3] rounded-3xl duration-250 transition-colors"
							placeholder="Enter the link here"
							required
						/>
						<button
							type="submit"
							className="cursor-pointer text-white absolute end-1.5 bottom-2.5 sm:bottom-1.5 bg-[#144EE3] px-4 py-3 rounded-full md:rounded-3xl drop-shadow-lg outline-2 outline-[#144EE3] text-base font-semibold hover:bg-[#0516b4] hover:outline-[#0516b4] duration-250 transition-colors"
						>
							{isMobile ? (
								<img src={Arrow_Right} alt="Right Arrow" />
							) : (
								"Shorten Now!"
							)}
						</button>
					</div>
				</form>
			</div>
			{/* Link Input Field End */}

			{/* Additional Content Start */}
			<div className="flex flex-col w-full max-w-[70vw] xl:max-w-[50vw] h-full p-3 items-center justify-center">
				{/* Toggle Btn Start */}
				<div className="flex gap-5 w-full h-fit p-2 items-center justify-center">
					<label className="inline-flex items-center mb-5 cursor-pointer">
						<input type="checkbox" value="" className="sr-only peer" />
						<div className="relative w-9 h-5 bg-[#181E29] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#353C4A] rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-[#353C4A] peer-checked:bg-[#144EE3]"></div>
						<span className="ms-3 text-sm font-light text-[#C9CED6]">
							Auto Paste from Clipboard
						</span>
					</label>
				</div>
				{/* Toggle Btn End */}
				<div className="text-sm font-medium text-[#C9CED6] min-w-full text-center flex-wrap items-center justify-center flex gap-2">
					<span>
						You can create <span className="text-[#EB568E]">05</span> more
						links.{" "}
						<button className="underline cursor-pointer hover:text-[#144EE3]">
							Register Now
						</button>{" "}
						to enjoy Unlimited usage
					</span>
					<button className="cursor-pointer">
						{!isMobile && (
							<img
								src={Question_Icon}
								alt="question-circle-icon"
								className="w-4 h-4 align-middle"
							/>
						)}
					</button>
				</div>
			</div>
			{/* Additional Content End */}
		</div>
	);
};

export default HeroSection;
