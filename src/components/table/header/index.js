import './header.css';

import React from 'react';
import { Icon, Table } from 'semantic-ui-react';

const TableHeader = ({ column, index, sortProps, disabled }) => {
  const { isSortable, isResizable = false, headerName, field } = column;
  const isAscending =
    isSortable && sortProps.columnName && sortProps.columnName === field && sortProps.direction === 'ascending';

  return (
    <Table.HeaderCell
      className={`sort-table ${!disabled && isResizable ? 'resizable' : ''}`}
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
      {isSortable && !disabled && sortProps.columnName && sortProps.columnName === field ? (
        <Icon
          style={{ fontSize: '13px', marginLeft: 5 }}
          className={isAscending ? 'arrowUp' : 'arrowDown'}
          name="sort up"
          color={'blue'}
        />
      ) : (
        // <div style={{ display: 'flex', flexFlow: 'column' }}>
        //   <Icon color="grey" name="chevron up" style={{ fontSize: '11px', marginRight: 0 }} />
        //   <Icon color="grey" name="chevron down" style={{ fontSize: '11px' }} />
        // </div>

        <Icon name="sort" style={{ fontSize: '13px', marginRight: 0 }} />
      )}
    </Table.HeaderCell>
  );
};

export default TableHeader;
