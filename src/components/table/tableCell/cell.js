import React from 'react';
import { formatText } from '../../utils';
import './tabulousCell.css';

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
    <td key={`table-cell-${index2}`} className="__tabulousCell">
      <div
        style={{ ...styleSetTo, overflow: `${typeof cellData === 'object' ? 'visible' : ''}` }}
        className={`column${headerNameFormatted} __tabulousCell_Content`}>
        {cellData}
      </div>
    </td>
  ) : null;
};

export default TableCell;
