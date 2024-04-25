import { useState } from "react";

import { Response } from "./UploadPage";
interface PurchaseDateSelectionPageProps {
	setResponse: React.Dispatch<React.SetStateAction<Response | null>>;
	setNoPurchaseDate: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PurchaseDateSelectionPage({
	setResponse,
	setNoPurchaseDate
}: PurchaseDateSelectionPageProps) {
	const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().substring(0, 10));

	const onClick = () => {
		// use the value of the input field to set the purchase date
		// set the purchase date in the response object
		setResponse((response: Response | null) => {
			// when a function is passed to setResponse, the previous state is passed as an argument
			// Instead of returning null, create a new Response object with default fields if needed
			if (response === null) {
				console.error("Response object is null");
				return {
					purchaseDate: purchaseDate.toString(),
					items: [],
					unicodes: [],
					expirationInfo: [],
					expirationDays: []
				};
			}
			// Update the purchaseDate within the existing response object
			console.log("Setting purchase date to", purchaseDate.toString());
			return { ...response, purchaseDate: purchaseDate.toString() };
		});
		// set the noPurchaseDate to false
		setNoPurchaseDate(false);
	};

	return (
		<div className="flex h-screen flex-col items-center">
			<div className="HomePageTitle mt-6 h-1/4"> Confirm Items </div>
			<div className="flex h-1/2 flex-col items-center justify-center">
				<div className="mb-8 text-xl text-black">No purchase date found in the receipt ☹️</div>
				<div className="mb-4 text-lg text-black">Please select a date below</div>
				<input
					name="purchase-date"
					type="date"
					className="mb-4 rounded-2xl py-4 text-black"
					value={purchaseDate.toString()}
					onChange={(e) => setPurchaseDate(e.target.value)}
				/>
			</div>
			<div className="mb-20 flex h-1/4 items-end">
				<button className="rounded-2xl bg-green-500 px-20 py-4" onClick={onClick}>
					Continue
				</button>
			</div>
		</div>
	);
}
