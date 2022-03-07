import React from 'react';
import { Icon, Table } from 'semantic-ui-react';
import { formatText } from '../../utils';

const TableHeader = ({ resizeHandler, column, index, sortProps, defaultSort, disabled, styleSetTo }) => {
  const { isSortable, isResizable = false, headerName, headerMessage, headerMessageColor } = column;
  const headerNameFormatted = formatText(headerName);
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
      className={`sort-table ${!disabled && isResizable ? 'resizable' : ''}`}
      key={`table-header-cell-${index}`}
      onMouseDown={
        isSortable
          ? sortProps.handleSort({
              ...column,
              direction: currentOrder,
            })
          : undefined
      }
    >
      <div style={styleSetTo ? { styleSetTo } : { width: '100%' }} className={`head${headerNameFormatted}`}>
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
            className="resizable_bar"
            onMouseDown={resizeHandler.bind(this, headerNameFormatted)}
          >
            <span>|</span>
          </div>
        )}
      </div>
    </Table.HeaderCell>
  );
};

export default TableHeader;
