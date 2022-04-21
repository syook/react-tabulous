import './tabulousHeaderProvider.css';

import React from 'react';
import { Icon } from 'semantic-ui-react';
import TabulousHeaderComponent from '../../../components/table/tableHeader/tabulousHeader';
import { formatText } from '../../../components/utils';

const TableHeaderProvider = ({ resizeHandler, column, index, sortProps, defaultSort, disabled, styleSetTo }) => {
  const { isSortable, isResizable = false, headerName, headerMessage, headerMessageColor, fixed } = column;
  const headerNameFormatted = formatText(headerName);
  let currentOrder = sortProps.direction === 'ascending' ? 'descending' : 'ascending';
  return (
    <TabulousHeaderComponent
      key={index}
      index={index}
      isSortable={isSortable}
      handleSort={sortProps.handleSort}
      column={column}
      direction={currentOrder}
    >
      <div
        style={styleSetTo ? { styleSetTo } : { width: '100%' }}
        className={`head${headerNameFormatted} tabulousHeader_Content`}
      >
        <span className="tabulousHeader_Content_Text">{headerName}</span>
        {(isSortable && !disabled && sortProps.columnName !== headerName && defaultSort !== column.headerName && (
          <span className="tabulousHeader_SortIcon">
            <Icon name="sort" />
          </span>
        )) ||
          (isSortable &&
            !disabled &&
            sortProps.columnName === headerName &&
            defaultSort !== column.headerName &&
            (currentOrder === 'ascending' ? (
              <span className="tabulousHeader_SortIcon">
                <Icon name="sort down" />
              </span>
            ) : (
              <span className="tabulousHeader_SortIcon">
                <Icon name="sort up" />
              </span>
            )))}
        <p style={{ color: headerMessageColor || 'blueviolet', display: 'inline-block' }}> {headerMessage} </p>
        {isResizable && (
          <div
            className={`tabulousHeader_resizableBar ${fixed === 'right' ? 'rightFixedResizableBar' : ''}`}
            onMouseDown={resizeHandler.bind(this, headerNameFormatted, fixed === 'right')}
          />
        )}
      </div>
    </TabulousHeaderComponent>
  );
};

export default TableHeaderProvider;
