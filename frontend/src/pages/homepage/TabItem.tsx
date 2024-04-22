import "../../components/fridge/Fridge.css";
import "../../themes/styles.css";

import * as Popover from "@radix-ui/react-popover";

import { logOut } from "../../firebase/firebasefunctions";
// Define prop types for TabItem using TypeScript interface
interface TabItemProps {
	IconName: React.ElementType;
	active: boolean;
	onClick: () => void;
}

export function TabItem({ IconName, active, onClick }: TabItemProps) {
	const iconClass = active ? "stroke-green-500 min-h-8 min-w-8" : "stroke-gray-500 min-h-8 min-w-8";
	return (
		<button onClick={onClick}>
			<IconName className={iconClass} />
		</button>
	);
}
export function TabItemWithPopover({ IconName, active }: TabItemProps) {
	const iconClass = active ? "stroke-green-500 min-h-8 min-w-8" : "stroke-gray-500 min-h-8 min-w-8";
	const buttonClass = "Button small green my-1";

	const onLogoutClick = async () => {
		try {
			logOut(); // Use Firebase's signOut method to log the user out
			console.log("User logged out successfully");
		} catch (error) {
			console.error("Failed to log out", error);
		}
	};

	return (
		<Popover.Root>
			<Popover.Trigger asChild>
				<button>
					<IconName className={iconClass} />
				</button>
			</Popover.Trigger>

			<Popover.Content>
				<button className={buttonClass} onClick={onLogoutClick}>
					Log Out
				</button>
			</Popover.Content>
		</Popover.Root>
	);
}
