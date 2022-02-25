import React from 'react';
import { Table } from 'semantic-ui-react';
import { formatText } from '../utils';

const TableCell = ({ column, index2, data, row, emptyCellPlaceHolder, styleSetTo }) => {
  const currentItem = data[row.objIndex];
  const headerNameFormatted = formatText(column.headerName);
  const cellData = currentItem
    ? column.cell
      ? column.cell(currentItem, row.objIndex)
      : !row[column.headerName]
      ? emptyCellPlaceHolder
      : row[column.headerName]
    : null;
  return currentItem ? (
    <Table.Cell key={`table-cell-${index2}`}>
      <div
        style={{ ...styleSetTo, overflow: `${typeof cellData === 'object' ? 'visible' : ''}` }}
        className={`column${headerNameFormatted}`}
      >
        {cellData}
      </div>
    </Table.Cell>
  ) : null;
};

export default TableCell;
