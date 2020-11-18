import React from 'react';
import { Table } from 'semantic-ui-react';
import get from 'lodash/get';

const TableCell = ({ column, index2, data, row, emptyCellPlaceHolder }) => {
  return (
    <Table.Cell key={`table-cell-${index2}`}>
      {column.cell
        ? column.cell(data[row.objIndex])
        : typeof column.field === 'function'
        ? column.field(data[row.objIndex])
        : get(data[row.objIndex], column.field) || emptyCellPlaceHolder}
    </Table.Cell>
  );
};

export default TableCell;
