import React from 'react';
import { Icon, Table } from 'semantic-ui-react';

const TableHeader = ({ column, index, sortProps, defaultSort, disabled }) => {
  const { isSortable, isResizable = false, headerName, headerMessage, headerMessageColor } = column;
  return (
    <Table.HeaderCell
      style={{ minWidth: 200, whiteSpace: 'normal' }}
      sorted={
        (isSortable && !disabled && sortProps.columnName && sortProps.columnName === headerName) ||
        defaultSort === column.headerName
          ? sortProps.direction || 'ascending'
          : null
      }
      className={`sort-table ${!disabled && isResizable ? ' resizable' : ''}`}
      key={`table-header-cell-${index}`}
      onClick={
        isSortable
          ? sortProps.handleSort({
              ...column,
              direction: sortProps.direction === 'ascending' ? 'descending' : 'ascending',
            })
          : undefined
      }>
      {headerName}
      {isSortable && !disabled && sortProps.columnName !== headerName && defaultSort !== column.headerName && (
        <Icon name="sort" />
      )}{' '}
      <p style={{ color: headerMessageColor || 'blueviolet', display: 'inline-block' }}> {headerMessage} </p>
    </Table.HeaderCell>
  );
};

export default TableHeader;
