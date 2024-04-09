import "../themes/styles.css";

import * as Toast from "@radix-ui/react-toast";
import { useEffect, useRef, useState } from "react";

interface NotifsProps {
	daysSincePurchase: number;
  daysUntilExpiration: number,
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
					{buttontext}
				</button>

				<Toast.Root className="ToastRoot" open={open} onOpenChange={setOpen} duration={3000}>
					<Toast.Title className="ToastTitle text-left">Check on your {props.name}!</Toast.Title>
					<Toast.Description asChild className="text-left text-wrap">
							<text className="ToastDescription">
								They have been in the fridge for {props.daysSincePurchase} days! They might expire in {props.daysUntilExpiration} days!
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
