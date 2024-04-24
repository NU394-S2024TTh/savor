/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import "../../themes/styles.css";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import React, { ReactNode, useRef, useState } from "react";

import ProgressBar from "../fridge/ProgressBar";
import { Notifbutton } from "./notifs";
interface AccordionProps {
	children: ReactNode;
	name: string;
	expirationInfo: string;
	className?: string;
	style?: React.CSSProperties;
	image: any;
	purchase: number;
	expiration: number;
}

export const AccordionInfo = (props: AccordionProps) => {
	const [open, setOpen] = useState(false);
	const eventDateRef = useRef(new Date());
	const timerRef = useRef(0);
	const handleButtonClick = () => {
		setOpen(false);
		window.clearTimeout(timerRef.current);
		timerRef.current = window.setTimeout(() => {
			// eventDateRef.current = TimeDelay(props.expirytime);
			setOpen(true);
		}, 100);
	};
	const calculateExpiryDate = (expiryDays: number) => {
		const currentDate = new Date();
		const expiryDate = new Date(currentDate.getTime() + expiryDays * 24 * 60 * 60 * 1000);

		const month = expiryDate.getMonth() + 1;
		const day = expiryDate.getDate();
		const year = expiryDate.getFullYear() % 100;

		return `${month}/${day}/${year}`;
	};

	return (
		<div
			className={classNames("flex w-1/2 items-center justify-center bg-black", props.className)}
			style={props.style}
		>
			<Accordion.Root
				className="AccordionRoot h-min-fit flex"
				type="single"
				defaultValue="item-2"
				collapsible
			>
				<Accordion.Item className="AccordionItem w-full" value="item-1">
					<AccordionTrigger onClick={handleButtonClick} className="truncate break-all">
						<div className="flex w-full flex-1 flex-col py-4">
							<div className="flex items-center justify-between">
								<div className="w-1/12"></div>
								<div className="itemtitle flex w-10/12 flex-1 items-center justify-center pl-0.5 font-bold outline-none">
									{props.name}
								</div>
								<div className="flex w-1/12 items-center justify-center font-normal">
									<Notifbutton
										daysSincePurchase={props.purchase}
										daysUntilExpiration={props.expiration}
										name={props.name}
										className="z-10 justify-center"
									></Notifbutton>
								</div>
							</div>
							<div className="mt-2">
								<ProgressBar
									daysSincePurchase={props.purchase}
									daysUntilExpiration={CurrentDaysUntilExpiration(props.purchase, props.expiration)}
									image={props.image}
								/>
							</div>
						</div>
					</AccordionTrigger>
					<AccordionContent className="truncate break-all">
						<div className="expirationwrapper">
							<span className="flex items-center justify-center text-center align-middle">
								{props.expirationInfo}
							</span>
						</div>
					</AccordionContent>
				</Accordion.Item>
			</Accordion.Root>
		</div>
	);
};

interface AccordionTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
}

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
	({ children, className, style, ...props }, forwardedRef) => (
		<Accordion.Header className="AccordionHeader">
			<Accordion.Trigger
				className={classNames("AccordionTrigger", className)}
				style={{ height: "auto" }}
				{...props}
				ref={forwardedRef}
			>
				{children}
				<ChevronDownIcon className="AccordionChevron" aria-hidden />
			</Accordion.Trigger>
		</Accordion.Header>
	)
);

interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
	({ children, className, style, ...props }, forwardedRef) => (
		<Accordion.Content
			className={classNames("AccordionContent", className)}
			style={style}
			{...props}
			ref={forwardedRef}
		>
			<div className="AccordionContentText">{children}</div>
		</Accordion.Content>
	)
);

function TimeDelay(time: number) {
	const now = new Date();
	// THIS DATE IS SET TO DELAY IN ONE WEEK. WHEN DOING ACTUAL PRODUCTS, PASS IN THE CORRECT EXPIRY TIMELINE
	const inOneWeek = now.setDate(now.getDate() + time);
	return new Date(inOneWeek);
}

function CurrentDaysUntilExpiration(daysSincePurchase: number, expiration: number) {
	if (daysSincePurchase >= expiration) {
		return 0;
	} else {
		return expiration - daysSincePurchase;
	}
}
