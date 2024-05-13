/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
import "./Table.css";

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import React from "react";
// import SwipeToShow from "react-swipe-to-show";

import { AccordionInfo } from "./accordion";
import SwipeToShow from "./swipe/modswipe";
interface TableProps {
	rows: any;
	deleteRow: (index: string) => void;
	editRow: (index: string | null) => void;
}

export interface ItemRow {
	image: any;
	item: string;
	expirationInfo: string;
	daysUntilExpiration: number;
	daysSincePurchase: number;
	id: string;
}

export const Table: React.FC<TableProps> = ({ rows, deleteRow, editRow }) => {
	console.log(rows);
	return (
		<div className="flex flex-col">
			{rows.map((row: ItemRow) => {
				return (
					<div key={row.id} className="flex-row">
						<SwipeToShow
							actionButtons={[
								<PencilSquareIcon
									key="pencil"
									className="h-6 w-6 cursor-pointer fill-green-500"
									aria-hidden="true"
									onClick={() => editRow(row.id)}
								/>,
								<TrashIcon
									key="trash"
									className="h-6 w-6 cursor-pointer fill-green-500"
									aria-hidden="true"
									onClick={() => deleteRow(row.id)}
								/>
							]}
							swipeLength={20}
						>
							<AccordionInfo
								name={row.item}
								expirationInfo={row.expirationInfo}
								image={row.image}
								purchase={row.daysSincePurchase}
								expiration={row.daysUntilExpiration}
							>
								<></>
							</AccordionInfo>
						</SwipeToShow>
					</div>
				);
			})}
		</div>
	);
};
