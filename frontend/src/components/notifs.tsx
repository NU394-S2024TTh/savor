import * as React from 'react';
import * as Toast from '@radix-ui/react-toast';
import './styles.css';

const NotifButton = () => {
  const [open, setOpen] = React.useState(false);
  const eventDateRef = React.useRef(new Date());
  const timerRef = React.useRef(0);

  React.useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <Toast.Provider swipeDirection="right">
      <button
        className="Button large violet"
        onClick={() => {
          setOpen(false);
          window.clearTimeout(timerRef.current);
          timerRef.current = window.setTimeout(() => {
            // THIS USES A NUMBER AS AN ARGUMENT!!
            eventDateRef.current = TimeDelay(7);
            setOpen(true);
          }, 100);
        }}
      >
        Asparagus expiring in a week or so
      </button>

      <Toast.Root className="ToastRoot" open={open} onOpenChange={setOpen}>
        <Toast.Title className="ToastTitle">Asparagus expires soon!</Toast.Title>
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
  );
};

function TimeDelay(time: number) {
  const now = new Date();
  // THIS DATE IS SET TO DELAY IN ONE WEEK. WHEN DOING ACTUAL PRODUCTS, PASS IN THE CORRECT EXPIRY TIMELINE
  const inOneWeek = now.setDate(now.getDate() + time);
  return new Date(inOneWeek);
}

function prettyDate(date: any) {
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'short' }).format(date);
}

export default NotifButton;
