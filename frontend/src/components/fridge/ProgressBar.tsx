import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useMemo } from 'react';

interface ProgressBarProps {
  daysSincePurchase: number;
  daysUntilExpiration: number;
  image: any;
}

const MIN_FILLED_PERCENTAGE = 10;
const IMAGE_OFFSET_PERCENTAGE = 0.6;
const EXTRA_IMAGE_OFFSET_PERCENTAGE = 6;

const ProgressBar = ({
  daysSincePurchase,
  daysUntilExpiration,
  image
}: ProgressBarProps) => {
  const totalDays = daysSincePurchase + Number(daysUntilExpiration);
  const filledPercentage = (daysSincePurchase / totalDays) * 100;
  const emptyPercentage = (daysUntilExpiration / totalDays) * 100;

  const imageoffsetStyling = useMemo(() => {
    if (filledPercentage < MIN_FILLED_PERCENTAGE) {
        return `${filledPercentage + IMAGE_OFFSET_PERCENTAGE + EXTRA_IMAGE_OFFSET_PERCENTAGE}%`;
    } else {
		return `${filledPercentage + IMAGE_OFFSET_PERCENTAGE}%`;
	}
  }, [filledPercentage]);

  return (
		<div className="relative mt-8 flex items-center px-16 py-4">
			{/* Shopping cart icon */}
			<div className="mr-6 flex items-center justify-start">
				<FontAwesomeIcon icon={faShoppingCart} className="text-3xl text-green-500" />
			</div>
			<div className="relative flex flex-grow">
				{/* Filled portion of progress bar */}
				<div className="relative" style={{ width: `${filledPercentage}%` }}>
					<div className="h-4 bg-green-500"></div>
					{/* Filled progress bar with rounded corners if desired */}
					<div className="absolute inset-0 -mt-14 flex flex-col items-center font-bold text-green-500">
						{/* Flex container with column direction */}
						<span className="-mb-1 text-4xl">{daysSincePurchase}</span>
						<span className="text-xs">Days</span>
						{/* Centered text */}
					</div>
				</div>

				{/* Broccoli icon overlay, positioned at the end of the filled portion */}
				<div
					role="img"
					aria-label="Broccoli"
					style={{
						left: `${imageoffsetStyling}`,
						transform: "translate(-50%, -45%)"
					}} // Centering the icon on the edge
					className="absolute top-0 z-10 text-5xl"
				>
					{image}
				</div>

				{/* Unfilled portion of progress bar */}
				<div className="relative" style={{ width: `${emptyPercentage}%` }}>
					<div className="h-4 border border-green-500" />
					{/* Filled progress bar with rounded corners if desired */}
					<div className="absolute inset-0 -mt-14 flex flex-col items-center font-bold text-green-500">
						{/* Flex container with column direction */}
						<span className="-mb-1 text-4xl">{daysUntilExpiration}</span>
						<span className="text-xs">Days</span>
						{/* Centered text */}
					</div>
				</div>
			</div>

			{/* Trash icon */}
			<div className="ml-6 flex items-center justify-end">
				<FontAwesomeIcon icon={faTrash} className="text-3xl text-green-500" />
			</div>
		</div>
	);
};

export default ProgressBar;
