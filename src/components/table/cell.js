import React from 'react';
import { Table } from 'semantic-ui-react';

const TableCell = ({ column, index2, data, row, emptyCellPlaceHolder }) => {
  // console.log(row, row.objIndex, data);
  if (!row || !column) debugger;
  return (
    <Table.Cell key={`table-cell-${index2}`}>
      {column.cell ? column.cell(data[row.objIndex] || {}, row.objIndex) : row[column.headerName]}
    </Table.Cell>
  );
};

export default TableCell;
