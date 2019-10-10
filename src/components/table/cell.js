import React from 'react';
import { Table } from 'semantic-ui-react';

const TableCell = ({ column, index2, data, row }) => {
  return <Table.Cell key={`table-cell-${index2}`}>{column.cell(row)}</Table.Cell>;
};

export default TableCell;
