/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import RingLoader from "react-spinners/RingLoader";

import cooking from "./bubududu.gif";

function Reload() {
	return (
		<div className="flex h-screen flex-col items-center justify-center space-y-10 bg-[#faf9f6]">
			{" "}
			{/* Center the loader */}
			<img src={cooking} width="40%" alt="loading..." />
			<p className="text-lg text-gray-600">
				Cooking up your recipes, please wait... This may take a few moments.
			</p>{" "}
			{/* Loading message */}
		</div>
	);
}

export default Reload;
