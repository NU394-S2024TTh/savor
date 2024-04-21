import "./dropstyles.css";

import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { CheckIcon } from "@radix-ui/react-icons";
import React from "react";

interface DropdownProps {
	expiry: boolean;
	purchase: boolean;
	expirysort: React.Dispatch<React.SetStateAction<boolean>>;
	purchasesort: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropdownMenuFlt = (props: DropdownProps) => {
	const toggleSortByDaysUntilExpiration = () => {
		props.expirysort(!props.expiry);
	};
	const toggleSortByDaysSincePurchase = () => {
		props.purchasesort(!props.purchase);
	};

	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild>
				<button className="IconButton" aria-label="Customise options">
					<AdjustmentsHorizontalIcon className="h-6 w-6 fill-green-500"></AdjustmentsHorizontalIcon>
				</button>
			</DropdownMenu.Trigger>

			<DropdownMenu.Portal>
				<DropdownMenu.Content className="DropdownMenuContent z-20" sideOffset={5}>
					<DropdownMenu.Label className="DropdownMenuLabel">Filter By Key</DropdownMenu.Label>
					<DropdownMenu.CheckboxItem
						className="DropdownMenuCheckboxItem"
						checked={props.expiry}
						onCheckedChange={props.expirysort}
						onClick={toggleSortByDaysUntilExpiration}
					>
						<DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
							<CheckIcon />
						</DropdownMenu.ItemIndicator>
						Sort by Expiration Date
					</DropdownMenu.CheckboxItem>
					<DropdownMenu.CheckboxItem
						className="DropdownMenuCheckboxItem"
						checked={props.purchase}
						onCheckedChange={props.purchasesort}
						onClick={toggleSortByDaysSincePurchase}
					>
						<DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
							<CheckIcon />
						</DropdownMenu.ItemIndicator>
						Sort by Time Since Purchase
					</DropdownMenu.CheckboxItem>

					<DropdownMenu.Arrow className="DropdownMenuArrow" />
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
};

export default DropdownMenuFlt;
