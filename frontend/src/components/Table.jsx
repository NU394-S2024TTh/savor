import './Table.css';

import React from 'react';
import { BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs';

export const Table = ({ rows, deleteRow, editRow }) => {
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Item Image</th>
            <th className="expand">Item Name</th>
            <th>Days Since Purchase</th>
            <th>Remove or Edit</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            // const statusText = row.status.charAt(0).toUpperCase() + row.status.slice(1);

            return (
              <tr key={idx}>
                <td>{row.image}</td>
                <td className="expand">{row.item}</td>
                <td>
                  <span className={`label label-live`}>{row.days}</span>
                </td>
                <td className="fit">
                  <span className="actions">
                    <BsFillTrashFill
                      className="delete-btn"
                      onClick={() => deleteRow(idx)}
                    />
                    <BsFillPencilFill className="edit-btn" onClick={() => editRow(idx)} />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
