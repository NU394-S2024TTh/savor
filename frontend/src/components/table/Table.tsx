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
	console.log(rows);
	return (
		<div className="flex flex-col">
			{rows.map((row: ItemRow, idx: number) => {
				const originalIndex = rows.indexOf(row);
				return (
					<div key={idx} className="flex-row">
						<SwipeToRevealActions
							actionButtons={[
								{
									content: (
										<PencilSquareIcon
											className="h-6 w-6 cursor-pointer fill-green-500"
											aria-hidden="true"
											onClick={() => editRow(originalIndex)}
										/>
									),
									onClick: () => alert("Pressed the EDIT button")
								},
								{
									content: (
										<TrashIcon
											className="h-6 w-6 cursor-pointer fill-green-500"
											aria-hidden="true"
											onClick={() => deleteRow(originalIndex)}
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
			{/* <div>
				<button onClick={toggleSortByDaysUntilExpiration}>Sort by Days Until Expiration</button>
				<button onClick={toggleSortByDaysSincePurchase}>Sort by Days Since Purchase</button>
			</div> */}
		</div>
	);
};

// export const Table: React.FC<TableProps> = ({ rows, deleteRow, editRow }) => {
// 	const [filteredRows, setFilteredRows] = React.useState<ItemRow[]>(rows);
// 	const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc");
// 	const [filterValue, setFilterValue] = React.useState<string | number | null>(null);

// 	// Function to handle sorting by daysUntilExpiration
// 	const handleSortByExpiration = () => {
// 		const sortedRows = [...filteredRows];
// 		sortedRows.sort((a, b) => {
// 			if (a.daysUntilExpiration === b.daysUntilExpiration) return 0;
// 			return sortOrder === "asc"
// 				? a.daysUntilExpiration - b.daysUntilExpiration
// 				: b.daysUntilExpiration - a.daysUntilExpiration;
// 		});
// 		setFilteredRows(sortedRows);
// 		setSortOrder(sortOrder === "asc" ? "desc" : "asc");
// 	};

// 	const handleFilterChange = (value: string | number | null) => {
// 		setFilterValue(value);
// 		if (value === null) {
// 			setFilteredRows(rows);
// 		} else {
// 			const filtered = rows.filter((row: ItemRow) => row.daysUntilExpiration === value);
// 			setFilteredRows(filtered);
// 		}
// 	};

// 	const handleDeleteRow = (idx: number) => {
// 		deleteRow(rows.indexOf(filteredRows[idx]));
// 	};

// 	const handleEditRow = (idx: number) => {
// 		editRow(rows.indexOf(filteredRows[idx]));
// 	};

// 	return (
// 		<div className="flex flex-col">
// 			{/* Sort button */}
// 			<button onClick={handleSortByExpiration}>Sort By Expiration</button>

// 			<select value={filterValue || ""} onChange={(e) => handleFilterChange(e.target.value)}>
// 				<option value="">All</option>
// 				{[...new Set(rows.map((row: ItemRow) => row.daysUntilExpiration))].map((value, index) => (
// 					<option key={index} value={String(value)}>
// 						{String(value)}
// 					</option>
// 				))}
// 			</select>

// 			{filteredRows.map((row: ItemRow, idx: number) => (
// 				<div key={idx} className="flex-row">
// 					<SwipeToRevealActions
// 						actionButtons={[
// 							{
// 								content: (
// 									<PencilSquareIcon
// 										className="h-6 w-6 cursor-pointer fill-green-500"
// 										aria-hidden="true"
// 										onClick={() => handleEditRow(idx)}
// 									/>
// 								),
// 								onClick: () => alert("Pressed the EDIT button")
// 							},
// 							{
// 								content: (
// 									<TrashIcon
// 										className="h-6 w-6 cursor-pointer fill-green-500"
// 										aria-hidden="true"
// 										onClick={() => handleDeleteRow(idx)}
// 									/>
// 								),
// 								onClick: () => alert("Pressed the DELETE button")
// 							}
// 						]}
// 						actionButtonMinWidth={70}
// 						name={row.item}
// 						expirationInfo={row.expirationInfo}
// 						image={row.image}
// 						purchase={row.daysSincePurchase}
// 						expirationtime={row.daysUntilExpiration}
// 					>
// 						<></>
// 					</SwipeToRevealActions>
// 				</div>
// 			))}
// 		</div>
// 	);
// };

// export const Table: React.FC<TableProps> = ({ rows, deleteRow, editRow }) => {
// 	return (
// 		<div className="flex flex-col">
// 			{rows.map((row: ItemRow, idx: any) => {
// 				return (
// 					<div key={idx} className="flex-row">
// 						<SwipeToRevealActions
// 							actionButtons={[
// 								{
// 									content: (
// 										<PencilSquareIcon
// 											className="h-6 w-6 cursor-pointer fill-green-500"
// 											aria-hidden="true"
// 											onClick={() => editRow(idx)}
// 										/>
// 									),
// 									onClick: () => alert("Pressed the EDIT button")
// 								},
// 								{
// 									content: (
// 										<TrashIcon
// 											className="h-6 w-6 cursor-pointer fill-green-500"
// 											aria-hidden="true"
// 											onClick={() => deleteRow(idx)}
// 										/>
// 									),
// 									onClick: () => alert("Pressed the DELETe button")
// 								}
// 							]}
// 							actionButtonMinWidth={70}
// 							name={row.item}
// 							expirationInfo={row.expirationInfo}
// 							image={row.image}
// 							purchase={row.daysSincePurchase}
// 							expirationtime={row.daysUntilExpiration}
// 						>
// 							<></>
// 						</SwipeToRevealActions>
// 					</div>
// 				);
// 			})}
// 		</div>
// 	);
// };
