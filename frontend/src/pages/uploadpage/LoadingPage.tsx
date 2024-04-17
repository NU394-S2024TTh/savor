/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import RingLoader from "react-spinners/RingLoader";

import watermelon from "./kawaii-watermelon.gif";
// function LoadingPage() {
// 	return (
// 		<div className="flex h-screen flex-col items-center justify-center space-y-10">
// 			{" "}
// 			{/* Center the loader */}
// 			<RingLoader
// 				size={150}
// 				color={"#3bd636"}
// 				loading={true}
//åç 				speedMultiplier={1.5}
// 				aria-label="Loading Spinner"
// 				data-testid="loader"
// 			/>
// 			<p className="text-lg text-gray-600">Loading, please wait... This may take a few moments.</p>{" "}
// 			{/* Loading message */}
// 		</div>
// 	);
// }

function LoadingPage() {
	return (
		<div className="flex h-screen flex-col items-center justify-center space-y-10">
			{" "}
			{/* Center the loader */}
			<img src={watermelon} alt="loading..." />
			<p className="text-lg text-gray-600">
				Loading, please wait... This may take a few moments.
			</p>{" "}
			{/* Loading message */}
		</div>
	);
}

export default LoadingPage;
