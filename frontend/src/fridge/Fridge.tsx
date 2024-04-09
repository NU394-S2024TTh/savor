import "./Fridge.css";
import "../themes/styles.css";

import React, { useState, useEffect } from "react";
import ImageUploading from "react-images-uploading";

import { Modal } from "../components/Modal";
import { Table } from "../components/Table";
import processImage from "../process/extract.mjs";
import { TEST_DATA } from "./TestData";
import { ItemRow } from "../components/Table";

function Fridge() {
	const [images, setImages] = useState([]);
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
	const maxNumber = 69;

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
            rows.map((currRow: any, idx: number) => {
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
    <div className="Fridge flex flex-col items-center min-h-screen">
      <button onClick={() => setModalOpen(true)} className="Button large green mt-8 mb-4">
        Add Item
      </button>
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
