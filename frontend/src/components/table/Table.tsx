/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
import "./Table.css";

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import React from "react";

import SwipeToRevealActions from "./swipe/swipetorevealactions";
interface TableProps {
	rows: any;
	deleteRow: (index: number) => void;
	editRow: (index: number | null) => void;
}

export interface ItemRow {
	image: any;
	item: string;
	expirationInfo: string;
	daysUntilExpiration: number;
	daysSincePurchase: number;
	id: number;
}

export const Table: React.FC<TableProps> = ({ rows, deleteRow, editRow }) => {
	console.log(rows);
	return (
		<div className="flex flex-col">
			{rows.map((row: ItemRow) => {
				return (
					<div key={row.id} className="flex-row">
						<SwipeToRevealActions
							actionButtons={[
								{
									content: (
										<PencilSquareIcon
											className="h-6 w-6 cursor-pointer fill-green-500"
											aria-hidden="true"
											onClick={() => editRow(row.id)}
										/>
									),
									onClick: () => alert("Pressed the EDIT button")
								},
								{
									content: (
										<TrashIcon
											className="h-6 w-6 cursor-pointer fill-green-500"
											aria-hidden="true"
											onClick={() => deleteRow(row.id)}
										/>
									),
									onClick: () => alert("Pressed the DELETE button")
								}
							]}
							actionButtonMinWidth={70}
							name={row.item}
							expirationInfo={row.expirationInfo}
							image={row.image}
							purchase={row.daysSincePurchase}
							expirationtime={row.daysUntilExpiration}
						>
							<></>
						</SwipeToRevealActions>
					</div>
				);
			})}
		</div>
	);
};
