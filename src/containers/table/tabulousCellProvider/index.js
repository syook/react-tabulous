import React from 'react';
import TabulousCellComponent from '../../../components/table/tabulousCell/tabulousCell';
import { formatText } from '../../../components/utils';

const TableCellProvider = ({ column, index2, data, row, emptyCellPlaceHolder, styleSetTo }) => {
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
    <TabulousCellComponent styleSetTo={styleSetTo} index={index2} headerName={headerNameFormatted}>
      {cellData}
    </TabulousCellComponent>
  ) : null;
};

export default TableCellProvider;
