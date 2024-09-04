import { useCallback } from 'react';

import { useGridRootProps } from './useGridRootProps';
import { type ColumnType, type GridSortDirection } from '../models';
import { filterAllData } from './useGridFilter';
import { getColumnsWithValueGetter, searchObj } from './useGridSearch';

export const getSortObjValue = (row: any, field: string, valueGetterOfField: any): string => {
  if (valueGetterOfField[field]) return valueGetterOfField[field](row);
  return row[field];
};

export const sortRecords = (
  data: any,
  field: string,
  type: ColumnType,
  sortOrder: GridSortDirection,
  valueGetterOfField: any
): any => {
  if (field === '') return [];

  if (!sortOrder) return data;

  const isAscending = sortOrder === 'asc';

  switch (type) {
    case 'date':
      return data.sort((a: any, b: any) => {
        const date1: any = new Date(getSortObjValue(a, field, valueGetterOfField));
        const date2: any = new Date(getSortObjValue(b, field, valueGetterOfField));
        return (isAscending ? date1 - date2 : date2 - date1) || 0;
      });

    case 'number':
      return data.sort((a: any, b: any) =>
        isAscending
          ? +getSortObjValue(a, field, valueGetterOfField) - +getSortObjValue(b, field, valueGetterOfField)
          : +getSortObjValue(b, field, valueGetterOfField) - +getSortObjValue(a, field, valueGetterOfField)
      );
    // case 'boolean':
    // 	return data.sort((a, b) => (isAscending ? a[field] - b[field] : b[field] - a[field]));

    // case 'string':
    // case 'singleselect':
    // 	return data.sort((a, b) => {
    // 		const firstValue: string = a[field] || '';
    // 		const secondValue: string = b[field] || '';
    // 		if (typeof firstValue === 'number' || typeof secondValue === 'number') {
    // 			return isAscending ? +firstValue - +secondValue : +secondValue - +firstValue;
    // 		}
    // 		return isAscending
    // 			? firstValue.toString().localeCompare(secondValue)
    // 			: secondValue.toString().localeCompare(firstValue);
    // 	});

    default:
      return data.sort((a: any, b: any) => {
        const firstValue: string = getSortObjValue(a, field, valueGetterOfField) || '';
        const secondValue: string = getSortObjValue(b, field, valueGetterOfField) || '';
        if (typeof firstValue === 'number' || typeof secondValue === 'number') {
          return isAscending ? +firstValue - +secondValue : +secondValue - +firstValue;
        }
        return isAscending
          ? firstValue.toString().localeCompare(secondValue.toString())
          : secondValue.toString().localeCompare(firstValue.toString());
      });
  }
};

export const useGridSort = (): any => {
  const {
    rootState: {
      columns,
      filteredAndSortedData,
      rootData,
      defaultPageSize,
      filters,
      searchText,
      searchKeys,
      fetchOnPageChange,
      page
    },
    updateState
  } = useGridRootProps();

  const handleSort = useCallback(
    (field: string, type: ColumnType, sortType?: any) => {
      let updatedStateData = {};
      if (!fetchOnPageChange) {
        let updatedData = [].concat(sortType ? filteredAndSortedData : rootData) as any;

        if (!sortType) {
          updatedData = filterAllData(filters, updatedData, columns);

          if (searchText) {
            const columnsWithValueGetter = getColumnsWithValueGetter(columns);
            updatedData = updatedData.filter((row: any) => {
              return searchObj(row, searchText, searchKeys, columnsWithValueGetter);
            });
          }
        }

        const valueGetterOfField = columns.reduce((acc: any, col: any) => {
          if (col.field === field) {
            acc[col.field] = col.valueGetter;
          }
          return acc;
        }, {});
        const sortedRecords = sortRecords(updatedData, field, type, sortType, valueGetterOfField);
        const newData = sortedRecords.slice((page - 1) * defaultPageSize, page * defaultPageSize);
        updatedStateData = {
          defaultPageSize,
          filteredAndSortedData: sortedRecords,
          data: newData,
          sortField: field,
          sortFieldType: type,
          sortBy: sortType
        };
      } else {
        fetchOnPageChange(page, defaultPageSize, searchText, field, sortType);
        updatedStateData = { page: 1 };
      }
      updateState({ ...updatedStateData });
    },
    [
      defaultPageSize,
      filteredAndSortedData,
      rootData,
      updateState,
      filters,
      searchText,
      searchKeys,
      columns,
      fetchOnPageChange,
      page
    ]
  );

  return { columns, handleSort };
};
