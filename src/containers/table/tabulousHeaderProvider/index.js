import React from 'react';
import { Icon } from 'semantic-ui-react';
import TabulousHeaderComponent from '../../../components/table/tableHeader/tabulousHeader';
import './tabulousHeaderProvider.css';
import { formatText } from '../../../components/utils';

const TableHeaderProvider = ({ resizeHandler, column, index, sortProps, defaultSort, disabled, styleSetTo }) => {
  const { isSortable, isResizable = false, headerName, headerMessage, headerMessageColor } = column;
  const headerNameFormatted = formatText(headerName);
  let currentOrder = sortProps.direction === 'ascending' ? 'descending' : 'ascending';
  return (
    <TabulousHeaderComponent
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
            onMouseDown={resizeHandler.bind(this, headerNameFormatted)}
          >
            <span>|</span>
          </div>
        )}
      </div>
    </TabulousHeaderComponent>
  );
};

export default TableHeaderProvider;
