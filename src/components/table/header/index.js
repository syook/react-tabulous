import React from 'react';
import { Icon, Table } from 'semantic-ui-react';

const TableHeader = ({ column, index, sortProps, disabled }) => {
  const { isSortable, isResizable = false, headerName, field } = column;

  return (
    <Table.HeaderCell
      sorted={
        isSortable && !disabled && sortProps.columnName && sortProps.columnName === field ? sortProps.direction : null
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
      <span>{headerName}</span>
      {isSortable && !disabled && sortProps.columnName !== field && <Icon name="sort" />}
    </Table.HeaderCell>
  );
};

export default TableHeader;
