import { filterAllData } from '../hooks/useGridFilter';
import { getColumnsWithValueGetter, searchObj } from '../hooks/useGridSearch';
import { sortRecords } from '../hooks/useGridSort';
import { type FilterFieldProps, type GridSortDirection } from '../models';

export const getUpdatedFormattedData = ({
  rootData,
  fetchOnPageChange,
  searchText,
  columns,
  searchKeys,
  filters,
  sortField,
  sortFieldType,
  sortBy,
  page,
  defaultPageSize
}: {
  rootData: any;
  fetchOnPageChange: null | (() => void);
  searchText: string;
  columns: any;
  searchKeys: string[];
  filters: FilterFieldProps[];
  sortField: string;
  sortFieldType: string;
  sortBy: GridSortDirection;
  page: number;
  defaultPageSize: number;
}) => {
  let updatedData = [].concat(rootData);

  if (!fetchOnPageChange) {
    if (searchText) {
      const columnsWithValueGetter = getColumnsWithValueGetter(columns);
      updatedData = rootData.filter((row: any) => {
        return searchObj(row, searchText, searchKeys, columnsWithValueGetter);
      });
    }

    updatedData = filters.length? filterAllData(filters, updatedData, columns): updatedData;

    if (sortField && sortFieldType && sortBy) {
      const valueGetterOfField = columns.reduce((acc: any, col: any) => {
        if (col.field === sortField) {
          acc[col.field] = col.valueGetter;
        }
        return acc;
      }, {});
      updatedData = sortRecords(updatedData, sortField, sortFieldType, sortBy, valueGetterOfField);
    }
  }

  let pageNumber = page;

  const pages = Math.ceil(updatedData.length / defaultPageSize);

  if (page > pages) {
    pageNumber = 1;
  }

  return {
    filteredAndSortedData: updatedData,
    data: updatedData.slice((pageNumber - 1) * defaultPageSize, pageNumber * defaultPageSize)
  };
};
