import React from 'react';
import { Table } from 'semantic-ui-react';

const TableCell = ({ column, index2, data, row, emptyCellPlaceHolder }) => {
  const currentItem = data[row.objIndex];
  return currentItem ? (
    <Table.Cell key={`table-cell-${index2}`}>
      {column.cell
        ? column.cell(currentItem, row.objIndex)
        : !row[column.headerName]
        ? emptyCellPlaceHolder
        : row[column.headerName]}
    </Table.Cell>
  ) : null;
};

export default TableCell;
