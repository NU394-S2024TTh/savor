import { useState } from "react";

export default function MissingPurchaseDate({ setResponse, setNoPurchaseDate }: any) {
	const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().substring(0, 10));

	const onClick = () => {
		// use the value of the input field to set the purchase date
		// set the purchase date in the response object
		setResponse((response: any) => ({ ...response, purchaseDate: purchaseDate.toString() }));
		// set the noPurchaseDate to false
		setNoPurchaseDate(false);
	};

	return (
		<div className="flex h-screen flex-col items-center">
			<div className="h-1/4 HomePageTitle mt-6"> Confirm Items </div>
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
			<div className="flex h-1/4 items-end mb-20">
			<button className="rounded-2xl bg-green-500 px-20 py-4" onClick={onClick}>
				Continue
			</button>
			</div>
		</div>
	);
}
