import { useCallback } from 'react';
import { useGridRootProps } from './useGridRootProps';
import { sortRecords } from './useGridSort';
import { getColumnsWithValueGetter, searchObj } from './useGridSearch';
import { type GridColDef } from '../models';
import { getLowercase, isStringIncludes } from '../helpers/select';

export const queryCondition = (columnValue: string, operator: string, value: string, type: string): boolean => {
  const isOperatorTypeDate: boolean = type === 'date' || operator === 'dateTime';

  switch (operator) {
    case 'contains':
      return Boolean(columnValue) && isStringIncludes(columnValue, value);
    case 'does not contains':
      return Boolean(columnValue) && !isStringIncludes(columnValue, value);
    case 'is':
      if (isOperatorTypeDate) {
        const searchDate: any = new Date(value);
        const columnDateValue: any = new Date(columnValue);
        return Boolean(columnValue) && searchDate.toDateString() === columnDateValue.toDateString();
      }
      // TODO: singleselect filter to be added
      // if (attributeType === 'singleselect') {
      // 	if ((searchValue || [])[0] === 0) return isEqual(attrValue, searchValue[0]);
      // 	return (searchValue || [])[0] && isEqual(attrValue, searchValue[0]);
      // }
      if (type === 'boolean') {
        return (columnValue || false) === (value || false);
      }

      return Boolean(columnValue) && getLowercase(columnValue) === getLowercase(value);
    case 'is not':
      if (isOperatorTypeDate) {
        const searchDate: any = new Date(value);
        const columnDateValue: any = new Date(columnValue);
        return Boolean(columnValue) && searchDate.toDateString() !== columnDateValue.toDateString();
      }
      // TODO: singleselect filter to be added
      // 	if (attributeType === 'singleselect') {
      // 		if ((searchValue || [])[0] === 0) return isEqual(attrValue, searchValue[0]);
      // 		return (searchValue || [])[0] && !isEqual(attrValue, searchValue[0]);
      // 	}
      return Boolean(columnValue) && getLowercase(columnValue) !== getLowercase(value);
    case 'is empty':
      if (isOperatorTypeDate) return !columnValue;
      return columnValue.toString().trim().length === 0;
    case 'is not empty':
      if (isOperatorTypeDate) return Boolean(isOperatorTypeDate);
      return columnValue.toString().trim().length > 0;

    // Numbers
    case '=':
      return +columnValue === +value;
    case '≠':
      return +columnValue !== +value;
    case '<':
      return +columnValue < +value;
    case '≤':
      return +columnValue <= +value;
    case '>':
      return +columnValue > +value;
    case '≥':
      return +columnValue >= +value;

    // Dates
    case 'is after': {
      const searchDate: any = new Date(value);
      const columnDateValue: any = new Date(columnValue);
      return searchDate - columnDateValue < 0;
    }

    case 'is on or after': {
      const searchDate: any = new Date(value);
      const columnDateValue: any = new Date(columnValue);
      return searchDate - columnDateValue <= 0;
    }

    case 'is before': {
      const searchDate: any = new Date(value);
      const columnDateValue: any = new Date(columnValue);
      return searchDate - columnDateValue > 0;
    }

    case 'is on or before': {
      const searchDate: any = new Date(value);
      const columnDateValue: any = new Date(columnValue);
      return searchDate - columnDateValue >= 0;
    }

    default:
      return false;
  }
};

export const getQueryValue = (rowObject: any, column: string, columnDef: GridColDef) => {
  if (columnDef.valueGetter) {
    return columnDef.valueGetter(rowObject);
  } else {
    return rowObject[column];
  }
};

export const filterData = (
  data: any,
  column: string,
  operator: string,
  value: string,
  type: string,
  columnDef: GridColDef
): any => {
  return data.filter((d: any) => {
    return queryCondition(getQueryValue(d, column, columnDef), operator, value, type);
  });
};

const isValueRequire = (operator: string): boolean => {
  return !['is empty', 'is not empty'].includes(operator);
};

export const filterAllData = (filters: any, data: any, columns: GridColDef[]): any => {
  let updatedData = [].concat(data) as any;

  if (
    filters.length === 1 &&
    filters.some((filter: any) => (isValueRequire(filter.operator) ? filter.value !== '' : true))
  ) {
    filters.forEach((filter: any) => {
      const { field, operator, type, value } = filter;
      const columnDef = columns.find((column: any) => column.field === field) as GridColDef;
      updatedData = filterData(updatedData, field, operator, value, type, columnDef);
    });
  } else if (filters.some((filter: any) => (isValueRequire(filter.operator) ? filter.value !== '' : true))) {
    if (filters[1].condition === 'And') {
      filters.forEach((filter: any) => {
        if (isValueRequire(filter.operator) ? filter.value !== '' : true) {
          const { field, operator, type, value } = filter;
          const columnDef = columns.find((column: any) => column.field === field) as GridColDef;
          updatedData = filterData(updatedData, field, operator, value, type, columnDef);
        }
      });
    } else if (filters[1].condition === 'Or') {
      let orPredicateFilteredData: any = [];
      filters.forEach((filter: any) => {
        if (isValueRequire(filter.operator) ? filter.value !== '' : true) {
          const { field, operator, type, value } = filter;
          const columnDef = columns.find((column: any) => column.field === field) as GridColDef;
          const currentFilterData = filterData(updatedData, field, operator, value, type, columnDef);
          orPredicateFilteredData = [...new Set([...orPredicateFilteredData, ...currentFilterData])];
        }
      });
      updatedData = orPredicateFilteredData;
    }
  }
  return updatedData;
};

export const useGridFilter = (): any => {
  const {
    rootState: {
      columns,
      rootData,
      showFilterToolbar,
      defaultPageSize,
      page,
      sortField,
      sortFieldType,
      sortBy,
      searchText,
      searchKeys,
      filters,
      onFilterChange
    },
    updateState
  } = useGridRootProps();

  const handleFilterApply = useCallback(
    (appliedFilters: any) => {
      let updatedData = [].concat(rootData) as any;

      updatedData = filterAllData(appliedFilters, updatedData, columns);

      if (onFilterChange) {
        const formattedFilters = appliedFilters.map((filter: any) => ({
          column: filter.field,
          operator: filter.operator,
          value: filter.value,
          condition: filter.condition
        }));
        onFilterChange(formattedFilters);
      }
      if (searchText) {
        const columnsWithValueGetter = getColumnsWithValueGetter(columns);
        updatedData = updatedData.filter((row: any) => {
          return searchObj(row, searchText, searchKeys, columnsWithValueGetter);
        });
      }

      if (sortField && sortFieldType && sortBy) {
        const valueGetterOfField = columns.reduce((acc: any, col: any) => {
          if (col.field === sortField) {
            acc[col.field] = col.valueGetter;
          }
          return acc;
        }, {});
        updatedData = sortRecords(updatedData, sortField, sortFieldType, sortBy, valueGetterOfField);
      }

      const pages = Math.ceil(updatedData.length / defaultPageSize);
      let pageChanges = {};
      let pageNumber = page;

      if (page > pages) {
        pageChanges = { page: 1 };
        pageNumber = 1;
      }

      updateState({
        filters: appliedFilters,
        filteredAndSortedData: updatedData,
        data: updatedData.slice((pageNumber - 1) * defaultPageSize, pageNumber * defaultPageSize),
        ...pageChanges
      });
    },
    [
      updateState,
      rootData,
      defaultPageSize,
      page,
      sortField,
      sortFieldType,
      sortBy,
      searchText,
      searchKeys,
      columns,
      onFilterChange
    ]
  );

  const onToggleFilterToolbar = useCallback(() => {
    updateState({ showFilterToolbar: !showFilterToolbar });
  }, [showFilterToolbar, updateState]);

  return { showFilterToolbar, columns, filters, handleFilterApply, onToggleFilterToolbar };
};
