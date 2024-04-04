import './Fridge.css';

import { useState } from 'react';

import { Modal } from '../components/Modal';
import { Table } from '../components/Table';
import '../themes/styles.css'
function Fridge() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([
    {
      image: 'FB',
      item: 'Fresh Broccoli',
      days: 14,
    },
    {
      image: 'BG',
      item: 'Black Grapes',
      days: 7,
    },
    {
      image: 'AV',
      item: 'Avocado',
      days: 7,
    },
  ]);
  const [rowToEdit, setRowToEdit] = useState(null);

  const handleDeleteRow = (targetIndex: number) => {
    setRows(rows.filter((_, idx) => idx !== targetIndex));
  };

  const handleEditRow = (idx: null) => {
    setRowToEdit(idx);

    setModalOpen(true);
  };

  const handleSubmit = (newRow: any) => {
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
      <button onClick={() => setModalOpen(true)} className="Button large green mt-8">
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
