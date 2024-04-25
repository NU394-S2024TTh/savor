/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import "../../themes/styles.css";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import React, { ReactNode, useRef, useState } from "react";

import ProgressBar from "../fridge/ProgressBar";
import NotificationModal from "./NotificationModal";

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
	const [openNotificationModal, setOpenNotificationModal] = useState(false);
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
		<>
			<div
				className={classNames("flex w-2/3 items-center justify-center bg-black", props.className)}
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
								<div className="flex items-center justify-between text-wrap">
									<div className="w-1/12"></div>
									<div className="itemtitle flex w-10/12 flex-1 items-center justify-center pl-0.5 font-bold outline-none">
										{props.name}
									</div>
									<div className="flex w-1/12 items-center justify-center font-normal">
										<button
											className="Button large default font-thin hover:cursor-pointer"
											onClick={() => {
												setOpenNotificationModal(true);
											}}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth="1.5"
												stroke="#20c44c"
												className="h-6 w-6"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
												/>
											</svg>
										</button>
									</div>
								</div>
								<div className="mt-2">
									<ProgressBar
										daysSincePurchase={props.purchase}
										daysUntilExpiration={CurrentDaysUntilExpiration(
											props.purchase,
											props.expiration
										)}
										image={props.image}
									/>
								</div>
							</div>
						</AccordionTrigger>
						<AccordionContent className="truncate break-all">
							<div className="expirationwrapper">
								<span className="flex items-center justify-center text-center align-middle text-base">
									{props.expirationInfo}
								</span>
							</div>
						</AccordionContent>
					</Accordion.Item>
				</Accordion.Root>
			</div>
			{openNotificationModal && (
				<NotificationModal
					daysSincePurchase={props.purchase}
					daysUntilExpiration={props.expiration}
					name={props.name}
					setOpenModal={setOpenNotificationModal}
				></NotificationModal>
			)}
		</>
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

function CurrentDaysUntilExpiration(daysSincePurchase: number, expiration: number) {
	if (daysSincePurchase >= expiration) {
		return 0;
	} else {
		return expiration - daysSincePurchase;
	}
}
