import React from 'react';
import './tabulousCell.css';

const TabulousCellComponent = ({ children, styleSetTo, index, headerName }) => {
  return (
    <td key={`table-cell-${index}`} className="tabulousCell">
      <div
        style={{ ...styleSetTo, overflow: `${typeof children === 'object' ? 'visible' : ''}` }}
        className={`tabulousCell_Content column${headerName}`}
      >
        {children}
      </div>
    </td>
  );
};

export default TabulousCellComponent;
