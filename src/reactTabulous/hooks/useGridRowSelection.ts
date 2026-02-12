import { useCallback, useEffect, useState } from 'react';

import { useGridRootProps } from './useGridRootProps';
import { type GridRowId } from '../models';

export const useGridRowSelection = (): any => {
  const {
    rootState: { selectedRows, filteredAndSortedData },
    updateState
  } = useGridRootProps();

  const [checkedState, setCheckedState] = useState<boolean | 'indeterminate'>(false);

  useEffect(() => {
    if (selectedRows.length === 0 || filteredAndSortedData.length === 0) {
      setCheckedState(false);
      updateState({ selectedRows: [] });
    } else if (selectedRows.length === filteredAndSortedData.length) {
      setCheckedState(true);
    } else {
      setCheckedState('indeterminate');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredAndSortedData.length, selectedRows.length]);

  // update row selection
  const handleRowSelect = useCallback(
    (rowId: GridRowId) => {
      // get index of row in selectedRows array
      const index = selectedRows.indexOf(rowId);
      // if row is not selected, add it to selectedRows array
      if (index === -1) {
        updateState({ selectedRows: selectedRows.concat(rowId) });
      } else {
        // if row is selected, remove it from selectedRows array
        updateState({ selectedRows: selectedRows.filter((row: any) => row !== rowId) });
      }
    },
    [selectedRows, updateState]
  );

  // update bulk row selection
  const handleBulkRowSelection = useCallback(() => {
    // get total rows
    const totalRows = filteredAndSortedData.length;
    // get total selected rows
    const totalSelectedRows = selectedRows.length;
    // if all rows are selected, unselect all rows

    if (totalSelectedRows === totalRows) {
      updateState({ selectedRows: [] });
      setCheckedState(false);
    } else {
      const rowIds = filteredAndSortedData.map((row: any) => row.id ?? row._id);
      // if not all rows are selected, select all rows
      updateState({ selectedRows: rowIds });
      setCheckedState(true);
    }
  }, [filteredAndSortedData, selectedRows.length, updateState]);

  const resetSelectedRows = useCallback(() => {
    updateState({ selectedRows: [] });
    setCheckedState(false);
  }, [updateState]);

  return { checkedState, selectedRows, handleRowSelect, handleBulkRowSelection, resetSelectedRows };
};
