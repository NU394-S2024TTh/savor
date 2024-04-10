import "./Fridge.css";
import "../themes/styles.css";

import React, { useState, useEffect } from "react";

import { PlusCircleIcon  } from "@heroicons/react/24/solid"

import { Modal } from "../components/Modal";
import { Table } from "../components/Table";
import { TEST_DATA } from "./TestData";
import { ItemRow } from "../components/Table";

function Fridge() {
  const [modalOpen, setModalOpen] = useState(false);
  // if localStorage.getItem("rows"
	//const [rows, setRows] = useState(TEST_DATA);
  const [rows, setRows] = useState(() => {
    // Try to get the data from localStorage
    const savedRows = localStorage.getItem("rows");
    
    // If there is data in localStorage, parse it; otherwise, use TEST_DATA
    return savedRows ? JSON.parse(savedRows) : TEST_DATA;
  });
	const [rowToEdit, setRowToEdit] = useState(null);

  useEffect(() => {
    // Define the event listener function
    const handleSessionStorageChange = (event: Event) => {
      const customEvent = event as CustomEvent<any>;
      if (customEvent.detail.key === 'rows') {
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
    window.addEventListener('SessionStorageChange', handleSessionStorageChange);

  }, []); 

	const handleDeleteRow = (targetIndex: number) => {
		setRows(rows.filter((_: any, idx: number) => idx !== targetIndex));
    localStorage.setItem("rows", JSON.stringify(rows.filter((_: any, idx: number) => idx !== targetIndex)));
	};

	const handleEditRow = (idx: null) => {
		setRowToEdit(idx);

		setModalOpen(true);
	};

  const handleSubmit = (newRow: any) => {
    if (rowToEdit === null) {
        setRows([...rows, newRow]);
        localStorage.setItem("rows", JSON.stringify([...rows, newRow]))
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
    <div className="Fridge flex flex-col items-center min-h-screen bg-black">
      <div className="flex flex-col items-center justify-center">
        <div className="fridgeTitle font-bold">My Fridge</div>
        <div className="fridgeTooltip font-bold">Check the days since purchase against the recommendation!</div>
        <div className="flex flex-row items-center justify-center swipeTooltip">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
          </svg>
          <span className="fridgeRegular font-normal">Swipe on an item to edit or delete</span>
        </div>
      </div>
      <div className="self-end addBtn">
				<button onClick={() => setModalOpen(true)} className="">
					<PlusCircleIcon className="mb-4 mt-4 mr-6 h-12 w-12 cursor-pointer fill-green-500" aria-hidden="true" />
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
