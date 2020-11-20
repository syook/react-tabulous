import React from 'react';
import { Table } from 'semantic-ui-react';

const TableCell = ({ column, index2, data, row, emptyCellPlaceHolder }) => {
  return <Table.Cell key={`table-cell-${index2}`}>{column.cell(row) || emptyCellPlaceHolder}</Table.Cell>;
};

export default TableCell;
