import './Table.css';
import {AccordionInfo} from './accordion';
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
    <div className="w-full">
      <table className="table flex-col">
        <thead className="flex-row">
          <tr>
            <th>Item Image</th>
            <th >Item Name</th>
            <th>Days Since Purchase</th>
            <th>Remove or Edit</th>
          </tr>
        </thead>
        <tbody className="flex-row w-full">
          {rows.map((row: Row, idx: any) => { 
            // const statusText = row.status.charAt(0).toUpperCase() + row.status.slice(1);

            return (
              <tr key={idx} className="flex-row w-full">
                <th className="flex-none w-5/12 font-normal">{row.image}</th>
                <th className="flex-1 w-5/12 items-center justify-center font-normal"><AccordionInfo name={row.item} expirytime={row.days}></AccordionInfo></th>
                <th className="flex-none w-5/12 items-center justify-center font-normal">
                  <Notifbutton expirationdays={row.days} name={row.item} className="justify-center"></Notifbutton>
                </th>
                <th className="fit flex-row">
                  <span className="actions">
                    <BsFillTrashFill
                      className="delete-btn"
                      onClick={() => deleteRow(idx)}
                    />
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
