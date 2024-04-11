/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import "../../themes/styles.css";

import * as Toast from "@radix-ui/react-toast";
import { useEffect, useRef, useState } from "react";

interface NotifsProps {
	daysSincePurchase: number;
	daysUntilExpiration: number;
	name: string;
}

export const Notifbutton = (props: NotifsProps & { className?: string }) => {
	const [open, setOpen] = useState(false);
	const eventDateRef = useRef(new Date());
	const timerRef = useRef(0);
	const buttontext = `${props.daysSincePurchase} days`;
	useEffect(() => {
		return () => clearTimeout(timerRef.current);
	}, []);

	return (
		<div className={props.className}>
			<Toast.Provider swipeDirection="right">
				<button
					className="Button large default font-thin"
					onClick={() => {
						setOpen(false);
						window.clearTimeout(timerRef.current);
						timerRef.current = window.setTimeout(() => {
							// THIS USES A NUMBER AS AN ARGUMENT!!
							eventDateRef.current = TimeDelay(props.daysSincePurchase);
							setOpen(true);
						}, 100);
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

				<Toast.Root className="ToastRoot" open={open} onOpenChange={setOpen} duration={3000}>
					<Toast.Title className="ToastTitle text-left">Check on your {props.name}!</Toast.Title>
					<Toast.Description asChild className="text-wrap text-left">
						<text className="ToastDescription">
							They have been in the fridge for {props.daysSincePurchase} days!
							{props.daysUntilExpiration - props.daysSincePurchase >= 0
								? ` They might expire in ${props.daysUntilExpiration - props.daysSincePurchase} days! `
								: ` They only last for ${props.daysUntilExpiration}, so it might have expired! `}
						</text>
					</Toast.Description>
					<Toast.Action className="ToastAction" asChild altText="we get it">
						<button className="Button small green">OK</button>
					</Toast.Action>
				</Toast.Root>
				<Toast.Viewport className="ToastViewport" />
			</Toast.Provider>
		</div>
	);
};

function TimeDelay(time: number) {
	const now = new Date();
	// THIS DATE IS SET TO DELAY IN ONE WEEK. WHEN DOING ACTUAL PRODUCTS, PASS IN THE CORRECT EXPIRY TIMELINE
	const inOneWeek = now.setDate(now.getDate() - time);
	return new Date(inOneWeek);
}

function prettyDate(date: any) {
	return new Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "short" }).format(date);
}
