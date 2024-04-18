/* eslint-disable @typescript-eslint/no-explicit-any */
import "./Table.css";

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import React from "react";

import SwipeToRevealActions from "./swipe/swipetorevealactions";
interface TableProps {
	rows: any;
	deleteRow: (index: number) => void;
	editRow: (index: null) => void;
}

export interface ItemRow {
	image: any;
	item: string;
	expirationInfo: string;
	daysUntilExpiration: number;
	daysSincePurchase: number;
}

export const Table: React.FC<TableProps> = ({ rows, deleteRow, editRow }) => {
	return (
		<div className="flex flex-col">
			{rows.map((row: ItemRow, idx: any) => {
				return (
					<div key={idx} className="flex-row">
						<SwipeToRevealActions
							actionButtons={[
								{
									content: (
										<PencilSquareIcon
											className="h-6 w-6 cursor-pointer fill-green-500"
											aria-hidden="true"
											onClick={() => editRow(idx)}
										/>
									),
									onClick: () => alert("Pressed the EDIT button")
								},
								{
									content: (
										<TrashIcon
											className="h-6 w-6 cursor-pointer fill-green-500"
											aria-hidden="true"
											onClick={() => deleteRow(idx)}
										/>
									),
									onClick: () => alert("Pressed the DELETe button")
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
