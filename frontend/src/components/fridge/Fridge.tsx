/* eslint-disable @typescript-eslint/no-explicit-any */
import "./Fridge.css";
import "../../themes/styles.css";

import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { get, onValue, set, ref } from "firebase/database";
import React, { useEffect, useState } from "react";

import { useUserRef } from "../../firebase/firebasefunctions";
import { Modal } from "../table/Modal";
import { Table } from "../table/Table";
import { ItemRow } from "../table/Table";
import { TEST_DATA } from "./TestData";
import { useAuth } from "../../contexts/authcontexts";
import { database } from "../../firebase/firebase";

function Fridge() {
	const dbUserId = useAuth().currentUser?.uid;
	const dbRef = ref(database, dbUserId);
	//const dbRef = useUserRef();
	const [modalOpen, setModalOpen] = useState(false);
	// if localStorage.getItem("rows"
	//const [rows, setRows] = useState(TEST_DATA);
	const [rows, setRows] = useState(() => {
		// Try to get the data from localStorage
		const savedRows = localStorage.getItem("rows");

		// If there is data in localStorage, parse it; otherwise, use TEST_DATA
		// If there is data in localStorage AND the user is signed in, want to combine
		return savedRows ? JSON.parse(savedRows) : TEST_DATA;
	});
	const [rowToEdit, setRowToEdit] = useState(null);
	useEffect(() => {
		// setting db every time rows changes
		if (rows) {
			set(dbRef, rows);
		}
	}, [rows]);
	useEffect(() => {
		// setting state from DB at first
		get(dbRef)
			.then((snapshot) => {
				if (snapshot.exists()) {
					setRows(snapshot.val());
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);
	useEffect(() => {
		// Define the event listener function

		const handleSessionStorageChange = (event: Event) => {
			const customEvent = event as CustomEvent<any>;
			if (customEvent.detail.key === "rows") {
				// Perform a functional state update to ensure we have the latest state.
				setRows(() => {
					const updatedRows = JSON.parse(customEvent.detail.value);
					console.log("At the listener", updatedRows);
					// This update will cause a re-render
					return updatedRows;
				});
			}
		};

		// Attach the event listener when the component mounts
		window.addEventListener("SessionStorageChange", handleSessionStorageChange);
	}, []);

	const handleDeleteRow = (targetIndex: number) => {
		setRows(rows.filter((_: any, idx: number) => idx !== targetIndex));
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
			setRows([...rows, newRow]);
			localStorage.setItem("rows", JSON.stringify([...rows, newRow]));
		} else {
			setRows(
				rows.map((currRow: ItemRow, idx: number) => {
					if (idx !== rowToEdit) {
						return currRow;
					} else {
						return newRow;
					}
				})
			);
			localStorage.setItem("rows", JSON.stringify(rows));
		}
	};

	return (
		<div className="Fridge flex min-h-screen flex-col items-center bg-black">
			<div className="flex flex-col items-center justify-center">
				<div className="fridgeTitle font-bold">My Fridge</div>
				<div className="fridgeTooltip font-bold">
					Check the days since purchase against the recommendation!
				</div>
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
			<div className="addBtn self-end">
				<button onClick={() => setModalOpen(true)} className="">
					<PlusCircleIcon
						className="mb-4 mr-6 mt-4 h-12 w-12 cursor-pointer fill-green-500"
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
