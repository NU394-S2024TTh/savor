import * as React from 'react';
import * as Toast from '@radix-ui/react-toast';
import clsx from "clsx";
import { cva } from "class-variance-authority";
import '../themes/styles.css'
import { useState, useRef, useEffect } from "react";


interface NotifsProps {
  expirationdays: number;
  name: string;
}
const styles = cva("transition-opacity", {
	variants: {
		ready: {
			true: "opacity-100",
			false: "opacity-0"
		}
	}
});
export const Notifbutton = (props: NotifsProps & { className?: string }) => {
  const [open, setOpen] = useState(false);
  const eventDateRef = useRef(new Date());
  const timerRef = useRef(0);
  const buttontext = `${props.expirationdays} days`;
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
            eventDateRef.current = TimeDelay(props.expirationdays);
            setOpen(true);
          }, 100);
        }}
      >
        {buttontext}
      </button>

      <Toast.Root className="ToastRoot" open={open} onOpenChange={setOpen} duration={3000}>
        <Toast.Title className="ToastTitle">{props.name} purchase date:</Toast.Title>
        <Toast.Description asChild>
          <time className="ToastDescription" dateTime={eventDateRef.current.toISOString()}>
            {prettyDate(eventDateRef.current)}
          </time>
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
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'short' }).format(date);
}
