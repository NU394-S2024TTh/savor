import SwipeToRevealActions from "./swipe/swipetorevealactions";
import { AccordionInfo } from "./accordion";
import { Notifbutton } from "./notifs";
import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { getComparator, stableSort, Order, EnhancedTableToolbar, EnhancedTableHead } from "./comparator";



interface Data {
  id: number;
  item: string;
  expirationInfo: string;
  daysUntilExpiration: number;
  daysSincePurchase: number;
}

export const TEST_DATA = [
    {   
        id:1,
        item: 'Fresh Broccoli',
        expirationInfo: "Broccolis typically last 3 days in the fridge.",
        daysUntilExpiration: 1,
        daysSincePurchase: 2,
    },
    {
        id:2,
        item: 'Black Grapes',
        expirationInfo: "Black grapes typically last 2 weeks in the fridge.",
        daysUntilExpiration: 11,
        daysSincePurchase: 3,
    },
    {
        id:3,
        item: 'Avocado',
        expirationInfo: "Avocados become ripe in a few days.",
        daysUntilExpiration: 0,
        daysSincePurchase: 3,
    },
  ];



export default function EnhancedTable() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('daysSincePurchase');
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = TEST_DATA.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - TEST_DATA.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(TEST_DATA, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage],
  );

  return (
    <Box sx={{ width: '75%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table>
            <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={TEST_DATA.length}
              />
          </Table>
        </TableContainer>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event: any) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    {/* <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.item}
                    </TableCell>
                    <TableCell align="left">
                      <AccordionInfo name={row.item} expirationInfo={row.expirationInfo}></AccordionInfo>
                    </TableCell>
                    <TableCell align="right">{row.daysUntilExpiration}</TableCell>
                    <TableCell align="right">{row.daysSincePurchase}</TableCell> */}
                    <TableCell scope="row" width="100%">
                    <SwipeToRevealActions
                      actionButtons={[
                      {
                          content: (
                          <div className="your-className-here">
                              <span>EDIT</span>
                          </div>
                          ),
                          onClick: () => alert('Pressed the EDIT button'),
                      },
                      {
                          content: (
                          <div className="your-className-here">
                              <span>DELETE</span>
                          </div>
                          ),
                          onClick: () => alert('Pressed the DELETe button'),
                      },
                      ]}
                      actionButtonMinWidth={70}
                      name={row.item}
                      expirationInfo={row.expirationInfo}
                      >
                        <div></div>
                  </SwipeToRevealActions>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={TEST_DATA.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}




interface TableProps {
	rows: any;
	deleteRow: (index: number) => void;
	editRow: (index: null) => void;
}

export interface ItemRow {
	item: string;
	expirationInfo: string;
	daysUntilExpiration: number;
	daysSincePurchase: number;
}