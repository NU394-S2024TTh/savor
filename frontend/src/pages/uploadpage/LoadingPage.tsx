import watermelon from "./kawaii-watermelon.gif";

function LoadingPage() {
	return (
		<div className="flex h-max flex-col items-center justify-center space-y-10 align-middle">
			{" "}
			<img src={watermelon} alt="loading..." />
			<p className="px-4 text-center text-lg text-gray-600 ">
				Loading, please wait... This may take a few moments.
			</p>{" "}
		</div>
	);
}

export default LoadingPage;
