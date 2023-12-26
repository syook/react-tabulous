import { useState } from 'react';

export type onDragUpdateType = (draggedField: string, dropTargetField: string) => void;

export const useDragHandler = (onDragUpdate: onDragUpdateType) => {
  const [dropTargetField, setDropTargetField] = useState('');

  const onDragStart = (e: any) => {
    const dataField = e.target.dataset.field;
    e.dataTransfer.setData('draggedField', dataField);
  };

  const onDragOver = (e: any) => e.preventDefault();
  const onDragEnter = (e: any) => {
    const dataField = e.target.dataset.field;
    if (dataField) {
      setDropTargetField(dataField);
    }
  };

  const onDrop = (e: any) => {
    const draggedField = e.dataTransfer.getData('draggedField');
    onDragUpdate(draggedField, dropTargetField);
    setDropTargetField('');
  };

  return { dropTargetField, onDragStart, onDragOver, onDrop, onDragEnter };
};
