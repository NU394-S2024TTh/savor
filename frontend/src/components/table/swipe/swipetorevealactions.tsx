/* eslint-disable @typescript-eslint/no-explicit-any */
import "./styles.css";

import PencilIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import React, { CSSProperties, ReactNode, useEffect, useId, useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";

import { AccordionInfo } from "../accordion";
type Props = {
	children: ReactNode;
	actionButtons: {
		content: ReactNode;
		onClick: () => void;
		role?: string;
	}[];
	actionButtonMinWidth: number;
	height?: string;
	containerStyle?: CSSProperties;
	onOpen?: () => void;
	onClose?: () => void;
	hideDotsButton?: boolean;
	dotsBtnAriaLabel?: string;
	name: string;
	expirationInfo: string;
	image: any;
	purchase: number;
};

const SwipeToRevealActions: React.FC<Props> = ({
	children,
	actionButtons,
	containerStyle,
	actionButtonMinWidth,
	hideDotsButton,
	dotsBtnAriaLabel = "Click to reveal actions",
	onOpen,
	onClose,
	name,
	expirationInfo,
	image,
	purchase
}: Props) => {
	const [isScrolling, setIsScrolling] = useState<boolean>(false);
	const [isExpanded, setIsExpanded] = useState<boolean>(false);
	const handlers = useSwipeable({
		onSwiped: () => handlePanEnd(),
		onSwipeStart: (eventData) => handlePanStart(eventData),
		onSwiping: (eventData) => handleSwipe(eventData),
		trackMouse: true
	});
	const id = useId();

	function handlePanStart(e: any) {
		if (e.dir === "Down" || e.dir === "Up") {
			setIsScrolling(true);
		}
	}

	function handlePanEnd() {
		setIsScrolling(false);
	}

	function handleSwipe(e: any) {
		if (!isScrolling) {
			if (e.dir === "Left" && !isExpanded) {
				setIsExpanded(true);
				if (onOpen) {
					onOpen();
				}
			} else if (e.dir === "Right" && isExpanded) {
				setIsExpanded(false);
				if (onClose) {
					onClose();
				}
			}
		}
	}

	function handleActionClicked(callback: () => void) {
		callback();
		setIsExpanded(false);
	}
	const swipeDistancePercentage = 7; // Change this to your desired percentage

	// Calculate swipe distance based on viewport width
	const viewportWidth = window.innerWidth;
	const swipeDistance = (viewportWidth * swipeDistancePercentage) / 100;

	const [parentHeight, setParentHeight] = useState<number>(0);
	const parentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const updateParentHeight = () => {
			if (parentRef.current) {
				setParentHeight(parentRef.current.clientHeight);
			}
		};

		updateParentHeight(); // Update height initially

		window.addEventListener("resize", updateParentHeight); // Update height when window is resized

		return () => {
			window.removeEventListener("resize", updateParentHeight); // Cleanup event listener
		};
	}, [parentRef]);

	return (
		<div className="rstra-container min-h-fit" style={{ ...containerStyle }}>
			<div {...handlers}>
				<div className="flex flex-row" ref={parentRef}>
					<AccordionInfo
						className="rstra-content-container"
						style={{
							transform: `translateX(${isExpanded ? `-${swipeDistance}px` : "0px"})`
						}}
						name={name}
						expirationInfo={expirationInfo}
						image={image}
						purchase={purchase}
					></AccordionInfo>
					<div
						className="rstra-actions-container align-middle"
						style={{
							display: "flex",
							height: "100%",
							opacity: isExpanded ? 1 : 0,
							transform: `translateX(${isExpanded ? 0 : "100%"})`,
							transition: "opacity 0.25s ease, transform 0.25s ease"
						}}
						id={id}
					>
						{actionButtons.map((action, index) => (
							<div key={`actionKey_${index}`} className="pl-">
								<button
									className="rstra-action-button"
									style={{
										minWidth: actionButtonMinWidth
									}}
									role={action.role || "button"}
								>
									{action.content}
								</button>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

{
	/* <div
className="rstra-actions-container align-middle"
style={{
    display: "flex",
    opacity: isExpanded ? 1 : 0,
    transform: `translateX(${isExpanded ? 0 : "100%"})`,
    transition: "opacity 0.25s ease, transform 0.25s ease"
}}
id={id}
>
{actionButtons.map((action, index) => (
    <div key={`actionKey_${index}`} className="pl-">
        <button
            className="rstra-action-button"
            style={{
                minWidth: actionButtonMinWidth
            }}
            role={action.role || "button"}
        >
            {action.content}
        </button>
    </div>
))}
</div> */
}
export default SwipeToRevealActions;
