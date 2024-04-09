import "../../themes/styles.css";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import React, { useRef, useState } from "react";
import { Notifbutton } from "./notifs";
{/* <th className="w-5/12 flex-none font-normal">{row.image}</th>
<th className="w-5/12 flex-1 items-center justify-center font-normal">
  <AccordionInfo
    name={row.item}
    expirationInfo={row.expirationInfo}
  ></AccordionInfo>
</th>
<th className="w-5/12 flex-none items-center justify-center font-normal">
  <Notifbutton
    daysSincePurchase={row.daysSincePurchase}
    daysUntilExpiration={row.daysUntilExpiration}
    name={row.item}
    className="justify-center"
  ></Notifbutton>
</th> */}
interface AccordionProps {
  name: string;
  expirationInfo: string;
  className?: string;
  style?: React.CSSProperties;
  image: any;
  purchase: number;
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
    <div className={classNames("flex items-center justify-center w-full", props.className)} style={props.style}>
      <Accordion.Root className="AccordionRoot" type="single" defaultValue="item-2" collapsible>
        <Accordion.Item className="AccordionItem w-full" value="item-1">
          <AccordionTrigger onClick={handleButtonClick} className="truncate break-all">
              <div className="w-5/12 flex flex-1 font-normal items-center justify-center outline-none">{props.image}</div>
              <div className="w-5/12 flex flex-1 items-center justify-center font-normal outline-none">
                  {props.name}
              </div>
              <div className="w-5/12 flex flex-1 items-center justify-center font-normal">
                <Notifbutton
                  daysSincePurchase={props.purchase}
                  daysUntilExpiration={props.purchase}
                  name={props.name}
                  className="justify-center"
                ></Notifbutton>
              </div>
          </AccordionTrigger>
          <AccordionContent className="truncate break-all">
            <span className="flex items-start justify-start break-normal text-wrap">
              {props.expirationInfo}
            </span>
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
        style={style}
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