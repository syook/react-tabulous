import React from 'react';
import { Icon, Table } from 'semantic-ui-react';

const TableHeader = ({ resizeHandler, column, index, sortProps, defaultSort, disabled, styleSetTo }) => {
  const { isSortable, isResizable = false, headerName, headerMessage, headerMessageColor } = column;
  const headerNameTemp = headerName
    .replaceAll('(', '')
    .replaceAll(')', '')
    .replaceAll(' ', '_');
  let currentOrder = sortProps.direction === 'ascending' ? 'descending' : 'ascending';
  return (
    <Table.HeaderCell
      style={{ whiteSpace: 'normal' }}
      sorted={
        (isSortable && !disabled && sortProps.columnName && sortProps.columnName === headerName) ||
        defaultSort === column.headerName
          ? sortProps.direction || 'ascending'
          : null
      }
      className={`sort-table ${!disabled && isResizable ? ' resizable' : ''}`}
      key={`table-header-cell-${index}`}
      onMouseDown={
        isSortable
          ? sortProps.handleSort({
              ...column,
              direction: currentOrder,
            })
          : undefined
      }>
      <div style={{ width: '100%' }} className={`head${headerNameTemp}`}>
        {headerName}
        {(isSortable && !disabled && sortProps.columnName !== headerName && defaultSort !== column.headerName && (
          <Icon name="sort" />
        )) ||
          (isSortable &&
            !disabled &&
            sortProps.columnName === headerName &&
            defaultSort !== column.headerName &&
            (currentOrder === 'ascending' ? <Icon name="sort down" /> : <Icon name="sort up" />))}{' '}
        <p style={{ color: headerMessageColor || 'blueviolet', display: 'inline-block' }}> {headerMessage} </p>
        {isResizable && (
          <div
            style={{ height: '100%', position: 'absolute', cursor: 'col-resize', right: '0px', top: '0px' }}
            className="bar"
            onMouseDown={resizeHandler.bind(
              this,
              headerName
                .replaceAll('(', '')
                .replaceAll(')', '')
                .replaceAll(' ', '_')
            )}>
            <span>|</span>
          </div>
        )}
      </div>
    </Table.HeaderCell>
  );
};

export default TableHeader;
