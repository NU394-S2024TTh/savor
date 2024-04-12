/* eslint-disable @typescript-eslint/no-explicit-any */
import "./Table.css";

import React from "react";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

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
					<tr key={idx} className="flex-row">
						<SwipeToRevealActions
							actionButtons={[
								{
									content: <BsFillPencilFill className="edit-btn" onClick={() => editRow(idx)} />,
									onClick: () => alert("Pressed the EDIT button")
								},
								{
									content: (
										<BsFillTrashFill className="delete-btn" onClick={() => deleteRow(idx)} />
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
							<div className="flex flex-row">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="delete-btn h-6 w-6 flex-1"
									onClick={() => editRow(idx)}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
									/>
								</svg>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="delete-btn h-6 w-6 flex-1"
									onClick={() => deleteRow(idx)}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
									/>
								</svg>
							</div>
						</SwipeToRevealActions>
					</tr>
				);
			})}
		</div>
	);
};
