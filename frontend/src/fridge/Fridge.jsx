import './Fridge.css';

import { useState } from 'react';

import { Modal } from './../components/Modal';
import { Table } from './../components/Table';

function Fridge() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([
    {
      image: 'FB',
      item: 'Fresh Broccoli',
      days: '14 Days',
    },
    {
      image: 'BG',
      item: 'Black Grapes',
      days: '7 Days',
    },
    {
      image: 'AV',
      item: 'Avocado',
      days: '3 Days',
    },
  ]);
  const [rowToEdit, setRowToEdit] = useState(null);

  const handleDeleteRow = (targetIndex) => {
    setRows(rows.filter((_, idx) => idx !== targetIndex));
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);

    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    rowToEdit === null
      ? setRows([...rows, newRow])
      : setRows(
          rows.map((currRow, idx) => {
            if (idx !== rowToEdit) return currRow;

            return newRow;
          }),
        );
  };

  return (
    <div className="Fridge">
      <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
      <button onClick={() => setModalOpen(true)} className="btn">
        Add
      </button>
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
