import { useCallback } from 'react';

interface NotifsProps {
  daysSincePurchase: number;
  daysUntilExpiration: number;
  name: string;
  setOpenModal: (isOpen: boolean) => void;
}

export const NotificationModal = (props: NotifsProps) => {
    const handleClose = useCallback(() => {
			props.setOpenModal(false);
		}, [props.setOpenModal]);

  return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75 text-center">
			<div className="mx-8 rounded-lg bg-white px-4 py-4 shadow-lg">
				<h2 className="text-xl font-bold pb-2">Check on your {props.name}!</h2>
				<p className="mt-2 text-center text-sm pb-2">
					They've been in the fridge for {props.daysSincePurchase} days.
					{props.daysUntilExpiration - props.daysSincePurchase >= 0
						? ` They might expire in ${props.daysUntilExpiration - props.daysSincePurchase} days!`
						: ` They only last for ${props.daysUntilExpiration} days, so it might have expired!`}
				</p>
				<div className="mt-4 flex justify-center">
					<button
						className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-700 hover:cursor-pointer"
						onClick={handleClose}
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
};

export default NotificationModal;

