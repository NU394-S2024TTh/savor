import cooking from "./bubududu.gif";

function Reload() {
	return (
		<div className="flex h-screen flex-col items-center justify-center space-y-10 bg-[#faf9f6]">
			{" "}
			{/* Center the loader */}
			<img src={cooking} width="40%" alt="loading..." />
			<p className="text-lg text-gray-600">Cooking up your recipes, please wait...</p>
			<p className="text-lg text-gray-600">This may take a few moments.</p> {/* Loading message */}
		</div>
	);
}

export default Reload;
