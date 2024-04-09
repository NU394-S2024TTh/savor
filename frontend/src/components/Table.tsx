import "./Table.css";

import React from "react";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

import { AccordionInfo } from "./table/accordion";
import { Notifbutton } from "./table/notifs";
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
		<div className="w-full">
			<table className="table flex-col">
				<thead className="flex-row">
					<tr>
						<th>Item Name</th>
						<th>Days Since Purchase</th>
						<th>Remove or Edit</th>
					</tr>
				</thead>
				<tbody className="w-full flex-row">
					{rows.map((row: ItemRow, idx: any) => {
						// const statusText = row.status.charAt(0).toUpperCase() + row.status.slice(1);

						return (
							<tr key={idx} className="w-full flex-row">
								<th className="w-5/12 flex-1 items-center justify-center font-normal">
									<AccordionInfo
										name={row.item}
										expirationInfo={row.expirationInfo}
									></AccordionInfo>
								</th>
								<th className="w-5/12 flex-none items-center justify-center font-normal">
									<Notifbutton
										daysSincePurchase={row.daysSincePurchase}
										daysUntilExpiration={row.daysUntilExpiration}
										name={row.item}
										className="justify-center"
									></Notifbutton>
								</th>
								<th className="fit flex-row">
									<span className="actions">
										<BsFillTrashFill className="delete-btn" onClick={() => deleteRow(idx)} />
										<BsFillPencilFill className="edit-btn" onClick={() => editRow(idx)} />
									</span>
								</th>
							</tr>

						);
					})}
				</tbody>
			</table>
		</div>
	);
};
