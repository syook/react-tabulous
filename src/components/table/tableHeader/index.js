import React from 'react';
import { Icon } from 'semantic-ui-react';
import './tabulousHeader.css';
import { formatText } from '../../utils';

const TableHeader = ({ resizeHandler, column, index, sortProps, defaultSort, disabled, styleSetTo }) => {
  const { isSortable, isResizable = false, headerName, headerMessage, headerMessageColor } = column;
  const headerNameFormatted = formatText(headerName);
  let currentOrder = sortProps.direction === 'ascending' ? 'descending' : 'ascending';
  return (
    <th
      style={{ whiteSpace: 'normal' }}
      className={`sort-table ${!disabled && isResizable ? 'resizable' : ''} __tabulousHeader`}
      key={`table-header-cell-${index}`}
      onMouseDown={
        isSortable
          ? sortProps.handleSort({
              ...column,
              direction: currentOrder,
            })
          : undefined
      }>
      <div
        style={styleSetTo ? { styleSetTo } : { width: '100%' }}
        className={`head${headerNameFormatted} __tabulousHeader_Content`}>
        <span className="__tabulousHeader_Content_Text">{headerName}</span>
        {(isSortable && !disabled && sortProps.columnName !== headerName && defaultSort !== column.headerName && (
          <span className="__sortableIcon">
            <Icon name="sort" />
          </span>
        )) ||
          (isSortable &&
            !disabled &&
            sortProps.columnName === headerName &&
            defaultSort !== column.headerName &&
            (currentOrder === 'ascending' ? (
              <span className="__sortableIcon">
                <Icon name="sort down" />
              </span>
            ) : (
              <span className="__sortableIcon">
                <Icon name="sort up" />
              </span>
            )))}{' '}
        <p style={{ color: headerMessageColor || 'blueviolet', display: 'inline-block' }}> {headerMessage} </p>
        {isResizable && (
          <div
            style={{ height: '100%', position: 'absolute', cursor: 'col-resize', right: '0px', top: '0px' }}
            className="resizable_bar"
            onMouseDown={resizeHandler.bind(this, headerNameFormatted)}>
            <span>|</span>
          </div>
        )}
      </div>
    </th>
  );
};

export default TableHeader;
