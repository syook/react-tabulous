import React from 'react';
import './tabulousHeader.css';

const TabulousHeaderComponent = ({children, index, isSortable, handleSort, column, direction}) => {
  return (
    <th
      className={`sort-table tabulousHeader`}
      key={`table-header-cell-${index}`}
      onMouseDown={
        isSortable
          ? handleSort({
              ...column,
              direction: direction,
            })
          : undefined
      }
    >
        {children}
    </th>
  );
};

export default TabulousHeaderComponent;
