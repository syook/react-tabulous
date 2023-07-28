import { useCallback } from 'react';
import { useGridRootProps } from './useGridRootProps';
import { filterAllData } from './useGridFilter';
import { sortRecords } from './useGridSort';

import { type GridColDef } from '../models';

export const getSearchObjValue = (
  row: any,
  searchKeys: string[],
  index: number,
  columnsWithValueGetter: any
): string => {
  if (columnsWithValueGetter[searchKeys[index]]) return columnsWithValueGetter[searchKeys[index]](row);
  if (row[searchKeys[index]]) return row[searchKeys[index]];
  return '';
};

// search for a query in an object
export const searchObj = (row: any, searchText: string, searchKeys: string[], columnsWithValueGetter: any): boolean => {
  let found = false;
  for (let i = 0; i < searchKeys.length; i++) {
    const value = getSearchObjValue(row, searchKeys, i, columnsWithValueGetter);
    if (value.toString().toLowerCase().includes(searchText)) {
      found = true;
      return found;
    }
  }
  return found;
};

export const getColumnsWithValueGetter = (columns: GridColDef[]): any => {
  return columns.reduce((acc: any, column: GridColDef) => {
    if (column.valueGetter) {
      acc[column.field] = column.valueGetter;
    }
    return acc;
  }, {});
};

export const useGridSearch = (): any => {
  const {
    rootState: {
      rootData,
      columns,
      searchKeys,
      searchText,
      defaultPageSize,
      page,
      filters,
      sortField,
      sortFieldType,
      sortBy,
      fetchOnPageChange
    },
    updateState
  } = useGridRootProps();

  const handleSearchApply = useCallback(
    (searchText: string) => {
      let updatedData = [].concat(rootData);

      if (!fetchOnPageChange) {
        if (searchText) {
          const columnsWithValueGetter = getColumnsWithValueGetter(columns);
          updatedData = rootData.filter((row: any) => {
            return searchObj(row, searchText, searchKeys, columnsWithValueGetter);
          });
        }

        updatedData = filterAllData(filters, updatedData, columns);

        if (sortField && sortFieldType && sortBy) {
          const valueGetterOfField = columns.reduce((acc: any, col: any) => {
            if (col.field === sortField) {
              acc[col.field] = col.valueGetter;
            }
            return acc;
          }, {});
          updatedData = sortRecords(updatedData, sortField, sortFieldType, sortBy, valueGetterOfField);
        }
      } else {
        fetchOnPageChange(page, defaultPageSize, searchText, sortField, sortBy);
      }

      let pageChanges = {};
      let pageNumber = page;

      const pages = Math.ceil(updatedData.length / defaultPageSize);

      if (page > pages) {
        pageChanges = { page: 1 };
        pageNumber = 1;
      }

      updateState({
        filteredAndSortedData: updatedData,
        data: updatedData.slice((pageNumber - 1) * defaultPageSize, pageNumber * defaultPageSize),
        searchText,
        ...pageChanges
      });
    },
    [
      rootData,
      updateState,
      searchKeys,
      defaultPageSize,
      page,
      filters,
      sortField,
      sortFieldType,
      sortBy,
      fetchOnPageChange,
      columns
    ]
  );

  return { handleSearchApply, searchText };
};
