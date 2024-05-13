/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import "./styles.css";

import React, { CSSProperties, ReactNode, useEffect, useId, useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";
type Props = {
	children: ReactNode;
	actionButtons: ReactNode[];
	containerStyle?: CSSProperties;
	onOpen?: () => void;
	onClose?: () => void;
	swipeLength: number;
};

const SwipeToShow: React.FC<Props> = ({
	children,
	actionButtons,
	containerStyle,
	onOpen,
	onClose,
	swipeLength
}: Props) => {
	const [isScrolling, setIsScrolling] = useState<boolean>(false);
	const [isExpanded, setIsExpanded] = useState<boolean>(false);
	const handlers = useSwipeable({
		onSwiped: () => handlePanEnd(),
		onSwipeStart: (eventData: any) => handlePanStart(eventData),
		onSwiping: (eventData: any) => handleSwipe(eventData),
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
	const viewportWidth = window.innerWidth;
	const viewportHeight = window.innerHeight;
	const smallerDimension = Math.min(viewportWidth, viewportHeight);
	const swipeDistance = (smallerDimension * swipeLength) / 100;

	const actionEndDistance = -(100 + 0.5 * swipeDistance);
	const actionStartDistance = 100 - 0.5 * swipeDistance;

	const [parentHeight, setParentHeight] = useState<number>(0);
	const parentRef = useRef<HTMLDivElement>(null);
	const StyledChildren = React.Children.map(children, (child) =>
		React.cloneElement(child as React.ReactElement, {
			style: {
				...((child as React.ReactElement).props.style || {}),
				width: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				top: 0,
				left: 0,
				transition: "all 0.25s ease",
				background: "transparent",
				boxSizing: "border-box",
				paddingTop: "1rem",
				paddingBottom: "1rem",
				zIndex: 1,
				transform: `translateX(${isExpanded ? `-${swipeDistance}px` : "0px"})`
			}
		})
	);
	useEffect(() => {
		const updateParentHeight = () => {
			if (parentRef.current) {
				setParentHeight(parentRef.current.clientHeight);
			}
		};

		updateParentHeight();

		window.addEventListener("resize", updateParentHeight);

		return () => {
			window.removeEventListener("resize", updateParentHeight);
		};
	}, [parentRef]);

	return (
		<div className="swipeable-container" style={{ ...containerStyle }}>
			<div {...handlers}>
				<div style={{ display: "flex", flexDirection: "row" }} ref={parentRef}>
					{StyledChildren}
					<div
						className="swipe-actions-container"
						style={{
							display: "flex",
							opacity: isExpanded ? 1 : 0,
							transform: `translateX(${isExpanded ? `${actionEndDistance.toString()}%` : `${actionStartDistance.toString()}%`})`,
							transition: "opacity 0.25s ease, transform 0.25s ease",
							width: "11%",
							top: 0,
							right: 0,
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "center",
							zIndex: 1,
							boxSizing: "border-box",
							paddingTop: "1rem",
							paddingBottom: "1rem",
							paddingRight: "6rem",
							verticalAlign: "middle"
						}}
						id={id}
					>
						{actionButtons.map((action, index) => (
							<div key={`actionKey_${index}`} className="pl-">
								<button
									style={{
										paddingLeft: "2rem",
										paddingRight: "1rem",
										appearance: "none",
										margin: 0,
										border: "none",
										boxSizing: "border-box",
										cursor: "pointer",
										WebkitUserSelect: "none",
										WebkitTouchCallout: "none",
										MozUserSelect: "none",
										msUserSelect: "none",
										userSelect: "none"
									}}
								>
									{action}
								</button>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
export default SwipeToShow;
