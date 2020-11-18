import React from 'react';
import { Table } from 'semantic-ui-react';
import get from 'lodash/get';

const TableCell = ({ column, index2, data, row, emptyCellPlaceHolder }) => {
  return (
    <Table.Cell key={`table-cell-${index2}`}>
      {column.cell
        ? column.cell(row.obj)
        : typeof column.field === 'function'
        ? column.field(row.obj)
        : get(row.obj, column.field) || emptyCellPlaceHolder}
    </Table.Cell>
  );
};

export default TableCell;
