import "./Table.css";

import React from "react";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

import { AccordionInfo } from "./accordion";
import { Notifbutton } from "./notifs";
interface TableProps {
	rows: any;
	deleteRow: (index: number) => void;
	editRow: (index: null) => void;
}
interface Row {
	image: string;
	item: string;
	expirationInfo: string;
	purchaseDate: Date;
}

function dateDiff(date1: Date, date2: Date) {
	return Math.round((date1.getTime() - date2.getTime()) / (1000 * 3600 * 24));
}

export const Table: React.FC<TableProps> = ({ rows, deleteRow, editRow }) => {
	return (
		<div className="w-full">
			<table className="table flex-col">
				<thead className="flex-row">
					<tr>
						<th>Item Image</th>
						<th>Item Name</th>
						<th>Days Since Purchase</th>
						<th>Remove or Edit</th>
					</tr>
				</thead>
				<tbody className="w-full flex-row">
					{rows.map((row: Row, idx: any) => {
						// const statusText = row.status.charAt(0).toUpperCase() + row.status.slice(1);

						return (
							<tr key={idx} className="w-full flex-row">
								<th className="w-5/12 flex-none font-normal">{row.image}</th>
								<th className="w-5/12 flex-1 items-center justify-center font-normal">
									<AccordionInfo
										name={row.item}
										expirationInfo={row.expirationInfo}
									></AccordionInfo>
								</th>
								<th className="w-5/12 flex-none items-center justify-center font-normal">
									<Notifbutton
										expirationdays={dateDiff(new Date(), new Date(row.purchaseDate))}
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
