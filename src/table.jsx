import React, { useState } from 'react';

const Table = () => {
  const [columnWidths, setColumnWidths] = useState([{ width: 100 }, { width: 150 }, { width: 200 }]);

  const handleColumnResize = (columnIndex, newWidth) => {
    const newColumnWidths = [...columnWidths];
    newColumnWidths[columnIndex].width = newWidth;
    setColumnWidths(newColumnWidths);
  };

  return (
    <div style={{ display: 'table', borderCollapse: 'collapse' }}>
      <div style={{ display: 'table-row' }}>
        <div style={{ position: 'relative', display: 'table-cell', width: `${columnWidths[0].width}px` }}>
          Column 1
          <Divider onResize={(e, data) => handleColumnResize(0, data.width)} />
        </div>
        <div style={{ position: 'relative', display: 'table-cell', width: `${columnWidths[1].width}px` }}>
          Column 2
          <Divider onResize={(e, data) => handleColumnResize(1, data.width)} />
        </div>
        <div style={{ position: 'relative', display: 'table-cell', width: `${columnWidths[2].width}px` }}>
          Column 3
          <Divider onResize={(e, data) => handleColumnResize(2, data.width)} />
        </div>
      </div>
      <div style={{ display: 'table-row' }}>
        <div style={{ display: 'table-cell' }}>Row 1, Cell 1</div>
        <div style={{ display: 'table-cell' }}>Row 1, Cell 2</div>
        <div style={{ display: 'table-cell' }}>Row 1, Cell 3</div>
      </div>
      <div style={{ display: 'table-row' }}>
        <div style={{ display: 'table-cell' }}>Row 2, Cell 1</div>
        <div style={{ display: 'table-cell' }}>Row 2, Cell 2</div>
        <div style={{ display: 'table-cell' }}>Row 2, Cell 3</div>
      </div>
    </div>
  );
};

const Divider = ({ onResize }) => {
  const handleMouseDown = e => {
    e.preventDefault();
    const startX = e.pageX;
    const startWidth = e.target.parentNode.offsetWidth;
    const handleMouseMove = e => {
      const newWidth = startWidth + e.pageX - startX;
      onResize(e, { width: newWidth });
    };
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        width: '5px',
        cursor: 'col-resize',
        zIndex: 1,
        backgroundColor: 'var(--divider-color, rgba(0, 0, 0, 0.1))'
      }}
      onMouseDown={handleMouseDown}
    ></div>
  );
};

export default Table;
