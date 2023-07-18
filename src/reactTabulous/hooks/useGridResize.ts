import { useCallback } from 'react';

import { useGridRootProps } from './useGridRootProps';

export const useGridResize = (): any => {
  const {
    rootState: { columns },
    updateState
  } = useGridRootProps();

  const handleWidth = useCallback(
    (field: string, width: number) => {
      const newColumns = [...columns];
      const column = newColumns.find(c => c.field === field);
      if (column) {
        column.width = width;
        updateState({ columns: newColumns });
      }
    },
    [columns, updateState]
  );

  return { handleWidth };
};
