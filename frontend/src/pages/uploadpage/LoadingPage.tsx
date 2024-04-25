import watermelon from "./kawaii-watermelon.gif";

function LoadingPage() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center align-middle">
			<img src={watermelon} alt="loading..." />
			<p className="text-center text-lg text-gray-600 ">
				Loading, please wait... This may take a few moments.
			</p>
		</div>
	);
}

export default LoadingPage;
