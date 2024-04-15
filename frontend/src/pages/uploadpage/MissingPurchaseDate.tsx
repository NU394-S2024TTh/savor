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
		<div className="flex h-screen flex-col items-center justify-center">
			<div className="text-3xl font-bold">No purchase date found in the receipt ☹️</div>
			<div className="text-2xl font-bold">Select the date below</div>
			<input
				name="purchase-date"
				type="date"
				className="rounded-2xl bg-green-500 px-20 py-4"
				value={purchaseDate.toString()}
				onChange={(e) => setPurchaseDate(e.target.value)}
			/>
			<button className="rounded-2xl bg-green-500 px-20 py-4" onClick={onClick}>
				Submit
			</button>
		</div>
	);
}
