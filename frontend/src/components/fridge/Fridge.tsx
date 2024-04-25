/* eslint-disable @typescript-eslint/no-explicit-any */
import "./Fridge.css";
import "../../themes/styles.css";

import { PlusCircleIcon } from "@heroicons/react/24/solid";
import TextField from "@mui/material/TextField";
import { get, set } from "firebase/database";
import React, { useEffect, useState } from "react";

import { useUserItemsRef } from "../../firebase/firebasefunctions";
import { saveItems } from "../../items/items";
import { Modal } from "../table/Modal";
import { Table } from "../table/Table";
import { ItemRow } from "../table/Table";
import DropdownMenuFlt from "./Filtering/Dropdown";
function Fridge() {
	const dbRef = useUserItemsRef();
	const [modalOpen, setModalOpen] = useState(false);
	const [rows, setRows] = useState<ItemRow[]>([]);
	const [deleting, setDeleting] = useState(false);
	const [rowToEdit, setRowToEdit] = useState<number | null>(null); // Specify the type as number or null
	useEffect(() => {
		// Fetch existing data from the database and set it to rows
		get(dbRef)
			.then((snapshot) => {
				if (snapshot.exists()) {
					setRows(snapshot.val());
				} else {
					console.log("No data available");
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	useEffect(() => {
		if (rows && (rows.length != 0 || deleting)) {
			set(dbRef, rows);
			setDeleting(false);
		}
	}, [rows]);

	const handleDeleteRow = (targetId: number) => {
		const updatedRows = rows.filter((row) => row.id !== targetId);
		setDeleting(true);
		console.log(updatedRows);
		setRows(updatedRows);
		saveItems(updatedRows);
		localStorage.setItem("rows", JSON.stringify(rows.filter((row) => row.id !== targetId)));
	};

	const handleEditRow = (id: number | null) => {
		setRowToEdit(id);
		setModalOpen(true);
	};

	const handleSubmit = (newRow: ItemRow) => {
		if (rowToEdit === null) {
			const allRows: ItemRow[] = [...rows, newRow];
			setRows(allRows);
			saveItems(allRows);
			localStorage.setItem("rows", JSON.stringify(allRows));
		} else {
			const afterEditRows = rows.map((row: ItemRow) => {
				if (row.id !== rowToEdit) {
					return row;
				} else {
					return newRow;
				}
			});
			setRows(afterEditRows);
			saveItems(afterEditRows);
			localStorage.setItem("rows", JSON.stringify(afterEditRows));
		}
	};
	const [sortByDaysUntilExpiration, setSortByDaysUntilExpiration] = useState<boolean>(false);
	const [sortByDaysSincePurchase, setSortByDaysSincePurchase] = useState<boolean>(false);

	const sortedRows = [...rows];

	if (sortByDaysUntilExpiration) {
		sortedRows.sort((a, b) => a.daysUntilExpiration - b.daysUntilExpiration);
	}

	if (sortByDaysSincePurchase) {
		sortedRows.sort((a, b) => a.daysSincePurchase - b.daysSincePurchase);
	}
	const [searchQuery, setSearchQuery] = useState("");

	const handleSearchChange = (event: any) => {
		setSearchQuery(event.target.value);
	};

	const filteredRows = sortedRows.filter((row) =>
		row.item.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div className="Fridge flex min-h-screen flex-col items-center justify-center">
			<div className="fixed right-5 top-5 z-50 px-4 py-2">
				<button onClick={() => setModalOpen(true)} className="-mt-2 flex justify-end self-start">
					<PlusCircleIcon
						className="top-0 mb-4 h-12 w-12 cursor-pointer fill-green-500"
						aria-hidden="true"
					/>
				</button>
			</div>
			<div
				className="flex items-start justify-between"
				style={{ width: "35vmax", maxWidth: "60vmax" }}
			>
				<div className="w-11/12">
					<div className="flex-1 text-center text-xl">
						<div className="fridgeTitle font-bold">My Fridge</div>
						<div className="swipeTooltip flex flex-row items-center justify-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="h-6 w-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
								/>
							</svg>
							<span className="fridgeRegular font-normal">Swipe on an item to edit or delete</span>
						</div>
					</div>
				</div>
			</div>
			{rows.length > 0 && (
				<>
					<div className="flex flex-1 flex-row items-center justify-center">
						<span className="px-20">
							<TextField
								id="filled-basic"
								label="Search"
								variant="filled"
								color="success"
								fullWidth={true}
								value={searchQuery}
								onChange={handleSearchChange}
							/>
						</span>
						<span className="pr-8">
							<DropdownMenuFlt
								expiry={sortByDaysUntilExpiration}
								purchase={sortByDaysSincePurchase}
								expirysort={setSortByDaysUntilExpiration}
								purchasesort={setSortByDaysSincePurchase}
							></DropdownMenuFlt>
						</span>
					</div>

					<Table rows={filteredRows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
				</>
			)}
			{modalOpen && (
				<Modal
					closeModal={() => {
						setModalOpen(false);
						setRowToEdit(null);
					}}
					onSubmit={handleSubmit}
					defaultValue={rowToEdit !== null ? rows.find((row) => row.id === rowToEdit) : null}
				/>
			)}
		</div>
	);
}

export default Fridge;
