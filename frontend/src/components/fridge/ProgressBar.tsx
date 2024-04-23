import { faShoppingCart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo } from "react";

interface ProgressBarProps {
	daysSincePurchase: number;
	daysUntilExpiration: number;
	image: string;
}

// Offset to center image at border of filled and unfilled
const IMAGE_OFFSET_PERCENTAGE = 0.6;

// Offsets to account for when image is very far away from expiration so images don't overlap with days since purchase
const MIN_FILLED_PERCENTAGE = 10;
const EXTRA_IMAGE_OFFSET_PERCENTAGE_FILLED = 6;

// Offsets to account for when image is very close to expiration so images don't overlap with days until expiration
const MIN_EMPTY_PERCENTAGE = 6;
const EXTRA_IMAGE_OFFSET_PERCENTAGE_EMPTY = -4;

const ProgressBar = ({ daysSincePurchase, daysUntilExpiration, image }: ProgressBarProps) => {
	const totalDays = Number(daysSincePurchase) + Number(daysUntilExpiration);
	const filledPercentage = (daysSincePurchase / totalDays) * 100;
	const emptyPercentage = (daysUntilExpiration / totalDays) * 100;

	// Variable styling for when the filled percentage is too low and needs to offset image a bit to the right
	const imageoffsetStyling = useMemo(() => {
		if (filledPercentage < MIN_FILLED_PERCENTAGE) {
			return `${filledPercentage + IMAGE_OFFSET_PERCENTAGE + EXTRA_IMAGE_OFFSET_PERCENTAGE_FILLED}%`;
		} else if (emptyPercentage < MIN_EMPTY_PERCENTAGE) {
			return `${filledPercentage + EXTRA_IMAGE_OFFSET_PERCENTAGE_EMPTY}%`;
		} else {
			return `${filledPercentage + IMAGE_OFFSET_PERCENTAGE}%`;
		}
	}, [filledPercentage]);

	// Tracks whether item is in the fridge for too long/is likely expired
	const isExpired = useMemo(() => daysUntilExpiration <= 0, [daysUntilExpiration]);

	return (
		<div className="relative mt-8 flex items-center px-1 py-4">
			{/* Shopping cart icon */}
			<div className="mr-6 flex items-center justify-start">
				{/* Change icon color to red if expired */}
				<FontAwesomeIcon
					icon={faShoppingCart}
					className={`text-1xl ${isExpired ? "text-red-500" : "text-green-500"}`}
				/>
			</div>
			{!isExpired && (
				<div className="relative flex flex-grow">
					{/* Filled portion of progress bar */}
					<div className="relative" style={{ width: `${filledPercentage}%` }}>
						<div className="h-4 bg-green-500"></div>
						<div className="absolute inset-0 -mt-14 flex flex-col items-center font-bold text-green-500">
							<span className="-mb-1 text-2xl">{daysSincePurchase}</span>
							<span className="text-xs">Days</span>
						</div>
					</div>

					<div
						role="img"
						aria-label="Image"
						style={{
							left: `${imageoffsetStyling}`,
							transform: "translate(-50%, -45%)"
						}}
						className="absolute top-1 z-10 text-3xl"
					>
						{image}
					</div>

					{/* Unfilled portion of progress bar */}
					<div className="relative" style={{ width: `${emptyPercentage}%` }}>
						<div className="h-4 border border-green-500" />
						<div className="absolute inset-0 -mt-14 flex flex-col items-center font-bold text-green-500">
							<span className="-mb-1 text-2xl">{daysUntilExpiration}</span>
							<span className="text-xs">Days</span>
						</div>
					</div>
				</div>
			)}
			{isExpired && (
				<div className="relative flex flex-grow">
					<div className="relative w-full">
						<div className="h-4 bg-red-500"></div>
						<div className="absolute inset-0 -mt-14 flex flex-col items-center font-bold text-red-500">
							<div className="flex flex-row">
								<div className="flex flex-col items-center">
									<span className="-mb-1 text-4xl">{daysUntilExpiration}</span>
									<span className="text-xs">Days</span>
								</div>
								<span className="-mb-1 ml-2 flex items-center text-xl">(Likely Expired)</span>
							</div>
						</div>
					</div>
					<div
						role="img"
						aria-label="Image"
						style={{
							left: "99%",
							transform: "translate(-50%, -45%)"
						}}
						className="absolute top-0 z-10 text-5xl"
					>
						{image}
					</div>
				</div>
			)}

			{/* Trash icon */}
			<div className="ml-6 flex items-center justify-end">
				{/* Change icon color to red if expired */}
				<FontAwesomeIcon
					icon={faTrash}
					className={`text-1xl ${isExpired ? "text-red-500" : "text-green-500"}`}
				/>
			</div>
		</div>
	);
};

export default ProgressBar;
