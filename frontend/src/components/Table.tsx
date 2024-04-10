/* eslint-disable @typescript-eslint/no-explicit-any */
import "./Table.css";

import { Swipe } from "@mui/icons-material";
import React from "react";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

import { AccordionInfo } from "./table/accordion";
import { Notifbutton } from "./table/notifs";
import SwipeToRevealActions from "./table/swipe/swipetorevealactions";
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
			<thead className="w-full flex-row">
				<tr>
					<th className="flex w-full flex-row">
						<div className=" flex-1">Item Image</div>
						<div className=" flex-1">Item Name</div>
						<div className=" flex-1">Days Since Purchase</div>
					</th>
				</tr>
			</thead>
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
						>
							<div className="flex flex-row">
								<BsFillPencilFill className="edit-btn flex-1" onClick={() => editRow(idx)} />
								<BsFillTrashFill className="delete-btn flex-1" onClick={() => deleteRow(idx)} />
							</div>
						</SwipeToRevealActions>
					</tr>
				);
			})}
		</div>
		// <div className="w-70vw">
		// 	<table className="table flex-col">
		// 		<thead className="w-full flex-row">
		// 			<tr>
		// 				<th className="flex w-full flex-row">
		// 					<div className=" flex-1">Item Image</div>
		// 					<div className=" flex-1">Item Name</div>
		// 					<div className=" flex-1">Days Since Purchase</div>
		// 				</th>
		// 			</tr>
		// 		</thead>
		// 		<tbody className="flex-row">
		// 			{rows.map((row: ItemRow, idx: any) => {
		// 				// const statusText = row.status.charAt(0).toUpperCase() + row.status.slice(1);

		// 				return (
		// 					<tr key={idx} className="flex-row">
		// 						<SwipeToRevealActions
		// 							actionButtons={[
		// 								{
		// 									content: (
		// 										<BsFillPencilFill className="edit-btn" onClick={() => editRow(idx)} />
		// 									),
		// 									onClick: () => alert("Pressed the EDIT button")
		// 								},
		// 								{
		// 									content: (
		// 										<BsFillTrashFill className="delete-btn" onClick={() => deleteRow(idx)} />
		// 									),
		// 									onClick: () => alert("Pressed the DELETe button")
		// 								}
		// 							]}
		// 							actionButtonMinWidth={70}
		// 							name={row.item}
		// 							expirationInfo={row.expirationInfo}
		// 							image={row.image}
		// 							purchase={row.daysSincePurchase}
		// 						>
		// 							<div className="flex flex-row">
		// 								<BsFillPencilFill className="edit-btn flex-1" onClick={() => editRow(idx)} />
		// 								<BsFillTrashFill className="delete-btn flex-1" onClick={() => deleteRow(idx)} />
		// 							</div>
		// 						</SwipeToRevealActions>
		// 					</tr>
		// 				);
		// 			})}
		// 		</tbody>
		// 	</table>
		// </div>
	);
};
