import { useCallback } from 'react';

import { useGridRootProps } from './useGridRootProps';
import { type GridColDef } from '../models';

export const useGridColumn = (): any => {
  const {
    rootState: { columns, showColumnToolbar },
    updateState
  } = useGridRootProps();

  const onHideColumns = useCallback(
    (field: string) => {
      const searchKeysData: string[] = [];
      const newData = columns.map((column: GridColDef) => {
        const isColumnVisible = column.field !== field ? column.isVisible : !column.isVisible;
        if (isColumnVisible && column.isSearchable && column.headerName) {
          searchKeysData.push(column.field);
        }
        return {
          ...column,
          isVisible: isColumnVisible
        };
      });

      updateState({ columns: newData, searchKeys: searchKeysData });
    },
    [columns, updateState]
  );

  const onToggleColumns = useCallback(
    (isVisible = false) => {
      const newData = columns.map((column: GridColDef) => ({ ...column, isVisible }));
      updateState({ columns: newData });
    },
    [columns, updateState]
  );

  const onToggleColumnToolbar = useCallback(() => {
    updateState({ showColumnToolbar: !showColumnToolbar });
  }, [showColumnToolbar, updateState]);

  const onMoveColumn = useCallback(
    (field: string, direction: string) => {
      // find the index of the column
      const index = columns.findIndex((column: GridColDef) => column.field === field);
      // find the new index of the column
      const newIndex = direction === 'left' ? index - 1 : index + 1;
      // handle condition when column is at the first or last position
      if (newIndex < 0 || newIndex >= columns.length) return;
      // move the column
      const newColumns = columns.slice();
      // swap the column
      newColumns.splice(newIndex, 0, newColumns.splice(index, 1)[0]);
      // update the state
      updateState({ columns: newColumns });
    },
    [columns, updateState]
  );

  const onDragColumn = useCallback(
    (draggedField: string, targetField: string) => {
      // find the index of the column
      const draggedIndex = columns.findIndex((column: GridColDef) => column.field === draggedField);
      // find the new index of the column
      const targetIndex = columns.findIndex((column: GridColDef) => column.field === targetField);

      // handle condition when column is at the first or last position
      if (targetIndex < 0 || targetIndex >= columns.length) return;
      // move the column
      const newColumns = columns.slice();
      // swap the column
      newColumns.splice(targetIndex, 0, newColumns.splice(draggedIndex, 1)[0]);
      // update the state
      updateState({ columns: newColumns });
    },
    [columns, updateState]
  );

  return {
    columns,
    showColumnToolbar,
    onHideColumns,
    onToggleColumns,
    onToggleColumnToolbar,
    onMoveColumn,
    onDragColumn
  };
};
