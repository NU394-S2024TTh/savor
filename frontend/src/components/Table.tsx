import './Table.css';

import React from 'react';
import { BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs';
import {Notifbutton} from './notifs';
interface TableProps {
  rows: any;
  deleteRow: (index: number) => void;
  editRow: (index: null) => void;
}
interface Row {
  image: string;
  item: string;
  days: number;
}
export const Table: React.FC<TableProps> = ({ rows, deleteRow, editRow }) => {
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
          {rows.map((row: Row, idx: any) => {
            // const statusText = row.status.charAt(0).toUpperCase() + row.status.slice(1);

            return (
              <tr key={idx}>
                <td>{row.image}</td>
                <td className="expand">{row.item}</td>
                <td>
                  <Notifbutton expirationdays={row.days} name={row.item} className="justify-center"></Notifbutton>
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
