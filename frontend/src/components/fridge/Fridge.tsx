/* eslint-disable @typescript-eslint/no-explicit-any */
import "./Fridge.css";
import "../../themes/styles.css";

import { PlusCircleIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";

import { getItems, saveItems } from "../../items/items";
import { Modal } from "../table/Modal";
import { Table } from "../table/Table";
import { ItemRow } from "../table/Table";

function Fridge() {
	const [modalOpen, setModalOpen] = useState(false);
	// if localStorage.getItem("rows"
	//const [rows, setRows] = useState(TEST_DATA);
	const [rows, setRows] = useState(() => {
		// Try to get the data from localStorage
		const savedRows = localStorage.getItem("rows");

		// If there is data in localStorage, parse it; otherwise, use TEST_DATA
		return savedRows ? JSON.parse(savedRows) : [];
	});
	const [rowToEdit, setRowToEdit] = useState(null);

	useEffect(() => {
		// Define the event listener function
		const handleSessionStorageChange = (event: Event) => {
			const customEvent = event as CustomEvent<any>;
			if (customEvent.detail.key === "rows") {
				// Perform a functional state update to ensure we have the latest state.
				setRows(() => {
					const updatedRows = JSON.parse(customEvent.detail.value);
					console.log("At the listener", updatedRows);
					saveItems(updatedRows);
					// This update will cause a re-render
					return updatedRows;
				});
			}
		};

		// Attach the event listener when the component mounts
		window.addEventListener("SessionStorageChange", handleSessionStorageChange);
	}, []);

	useEffect(() => {
		const loadItems = async () => {
			const items = await getItems();
			if (items != null) {
				setRows(() => {
					const stringifiedRows = JSON.stringify(items);
					localStorage.setItem("rows", stringifiedRows);
					return items;
				});
			}
		};
		loadItems();
	}, []);

	const handleDeleteRow = (targetIndex: number) => {
		const updatedRows = rows.filter((_: any, idx: number) => idx !== targetIndex);
		setRows(updatedRows);
		saveItems(updatedRows);
		localStorage.setItem(
			"rows",
			JSON.stringify(rows.filter((_: any, idx: number) => idx !== targetIndex))
		);
	};

	const handleEditRow = (idx: null) => {
		setRowToEdit(idx);

		setModalOpen(true);
	};

	const handleSubmit = (newRow: any) => {
		if (rowToEdit === null) {
			const allRows = [...rows, newRow];
			setRows(allRows);
			saveItems(allRows);
			localStorage.setItem("rows", JSON.stringify(allRows));
		} else {
			const afterEditRows = rows.map((currRow: ItemRow, idx: number) => {
				if (idx !== rowToEdit) {
					return currRow;
				} else {
					return newRow;
				}
			});
			setRows(afterEditRows);
			saveItems(afterEditRows);
			localStorage.setItem("rows", JSON.stringify(afterEditRows));
		}
	};

	return (
		<div className="Fridge flex min-h-screen flex-col items-center justify-center">
			<div
				className="flex items-start justify-between"
				style={{ width: "70vmax", maxWidth: "80vmax" }}
			>
				<div className="w-1/12"></div>
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
				<button
					onClick={() => setModalOpen(true)}
					className="-mt-2 flex w-1/12 justify-end self-start"
				>
					<PlusCircleIcon
						className="top-0 mb-4 h-12 w-12 cursor-pointer fill-green-500"
						aria-hidden="true"
					/>
				</button>
			</div>
			<Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
			{modalOpen && (
				<Modal
					closeModal={() => {
						setModalOpen(false);
						setRowToEdit(null);
					}}
					onSubmit={handleSubmit}
					defaultValue={rowToEdit !== null && rows[rowToEdit]}
				/>
			)}
		</div>
	);
}

export default Fridge;
