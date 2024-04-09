import "./Table.css";

import React from "react";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import SwipeToRevealActions from "./table/swipe/swipetorevealactions";
import { AccordionInfo } from "./table/accordion";
import { Notifbutton } from "./table/notifs";
import { Swipe } from "@mui/icons-material";
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
		<div className="w-fit">
			<table className="table flex-col w-min">
				<thead className="flex-row w-full">
					<tr>
						<th className="flex-row w-full flex">
							<div className="flex-1 w-5/12">Item Image</div>
							<div className="flex-1 w-5/12">Item Name</div>
							<div className="flex-1 w-5/12">Days Since Purchase</div>
						</th>
					</tr>
				</thead>
				<tbody className="w-full flex-row">
					{rows.map((row: ItemRow, idx: any) => {
						// const statusText = row.status.charAt(0).toUpperCase() + row.status.slice(1);

						return (
						<tr key={idx} className="w-full flex-row">
							<SwipeToRevealActions actionButtons={[
								{
									content: (
									<BsFillPencilFill className="edit-btn" onClick={() => editRow(idx)} />
									),
									onClick: () => alert('Pressed the EDIT button'),
								},
								{
									content: (
										<BsFillTrashFill className="delete-btn" onClick={() => deleteRow(idx)} />
									),
									onClick: () => alert('Pressed the DELETe button'),
								},
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
							// <tr key={idx} className="w-full flex-row">z
							// 	<th className="w-5/12 flex-none font-normal">{row.image}</th>
							// 	<th className="w-5/12 flex-1 items-center justify-center font-normal">
							// 		<AccordionInfo
							// 			name={row.item}
							// 			expirationInfo={row.expirationInfo}
							// 		></AccordionInfo>
							// 	</th>
							// 	<th className="w-5/12 flex-none items-center justify-center font-normal">
							// 		<Notifbutton
							// 			daysSincePurchase={row.daysSincePurchase}
							// 			daysUntilExpiration={row.daysUntilExpiration}
							// 			name={row.item}
							// 			className="justify-center"
							// 		></Notifbutton>
							// 	</th>
							// 	<th className="fit flex-row">
							// 		<span className="actions">
							// 			<BsFillTrashFill className="delete-btn" onClick={() => deleteRow(idx)} />
							// 			<BsFillPencilFill className="edit-btn" onClick={() => editRow(idx)} />
							// 		</span>
							// 	</th>
							// </tr>

						);
					})}
				</tbody>
			</table>
		</div>
	);
};
