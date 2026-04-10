import { useCallback } from 'react';
import { useGridRootProps } from './useGridRootProps';
import { sortRecords } from './useGridSort';
import { getColumnsWithValueGetter, searchObj } from './useGridSearch';
import { type GridColDef } from '../models';
import { getLowercase, isStringIncludes } from '../helpers/select';

const getValidDate = (dateValue: string): Date | null => {
  const parsedDate = new Date(dateValue);
  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
};

const getDateOnlyTime = (dateValue: Date): number => {
  return new Date(dateValue.getFullYear(), dateValue.getMonth(), dateValue.getDate()).getTime();
};

const getDateTimeToMinuteTime = (dateValue: Date): number => {
  return new Date(
    dateValue.getFullYear(),
    dateValue.getMonth(),
    dateValue.getDate(),
    dateValue.getHours(),
    dateValue.getMinutes(),
    0,
    0
  ).getTime();
};

type TemporalComparators = {
  hasValidTemporalValues: boolean;
  hasValidRangeValues: boolean;
  isSameDate: boolean;
  isSameDateTimeToMinute: boolean;
  compareTime: number;
  compareDate: number;
  compareFrom: number;
  compareTo: number;
  compareDateFrom: number;
  compareDateTo: number;
};

const getTemporalComparators = (columnValue: string, value: string, value2?: string): TemporalComparators => {
  const searchDate = getValidDate(value);
  const columnDateValue = getValidDate(columnValue);
  const fromDate = getValidDate(value);
  const toDate = getValidDate(value2 || value);

  const hasValidTemporalValues = Boolean(searchDate && columnDateValue);
  const hasValidRangeValues = Boolean(columnDateValue && fromDate && toDate);

  const isSameDate = hasValidTemporalValues
    ? getDateOnlyTime(searchDate as Date) === getDateOnlyTime(columnDateValue as Date)
    : false;
  const isSameDateTimeToMinute = hasValidTemporalValues
    ? getDateTimeToMinuteTime(searchDate as Date) === getDateTimeToMinuteTime(columnDateValue as Date)
    : false;

  const compareTime = hasValidTemporalValues
    ? (columnDateValue as Date).getTime() - (searchDate as Date).getTime()
    : NaN;
  const compareDate = hasValidTemporalValues
    ? getDateOnlyTime(columnDateValue as Date) - getDateOnlyTime(searchDate as Date)
    : NaN;

  const compareFrom = hasValidRangeValues ? (columnDateValue as Date).getTime() - (fromDate as Date).getTime() : NaN;
  const compareTo = hasValidRangeValues ? (columnDateValue as Date).getTime() - (toDate as Date).getTime() : NaN;
  const compareDateFrom = hasValidRangeValues
    ? getDateOnlyTime(columnDateValue as Date) - getDateOnlyTime(fromDate as Date)
    : NaN;
  const compareDateTo = hasValidRangeValues
    ? getDateOnlyTime(columnDateValue as Date) - getDateOnlyTime(toDate as Date)
    : NaN;

  return {
    hasValidTemporalValues,
    hasValidRangeValues,
    isSameDate,
    isSameDateTimeToMinute,
    compareTime,
    compareDate,
    compareFrom,
    compareTo,
    compareDateFrom,
    compareDateTo
  };
};

export const queryCondition = (
  columnValue: string,
  operator: string,
  value: string,
  type: string,
  value2?: string
): boolean => {
  const isDateType = type === 'date';
  const isDateTimeType = type === 'dateTime';
  const isTemporalType = isDateType || isDateTimeType;
  let temporalComparators: TemporalComparators | null = null;
  const getTemporalData = (): TemporalComparators => {
    if (!temporalComparators) {
      temporalComparators = getTemporalComparators(columnValue, value, value2);
    }
    return temporalComparators;
  };

  switch (operator) {
    case 'contains':
      return Boolean(columnValue) && isStringIncludes(columnValue, value);
    case 'does not contains':
      return Boolean(columnValue) && !isStringIncludes(columnValue, value);
    case 'is':
      if (isDateType) {
        const { isSameDate } = getTemporalData();
        return Boolean(columnValue) && isSameDate;
      }
      if (isDateTimeType) {
        const { hasValidTemporalValues, isSameDateTimeToMinute } = getTemporalData();
        return Boolean(columnValue) && hasValidTemporalValues && isSameDateTimeToMinute;
      }
      if (type === 'singleSelect') {
        return Boolean(columnValue) && Boolean(value) && columnValue === value;
      }
      if (type === 'boolean') {
        return (columnValue || false) === (value || false);
      }

      return Boolean(columnValue) && getLowercase(columnValue) === getLowercase(value);
    case 'is not':
      if (isDateType) {
        const { hasValidTemporalValues, isSameDate } = getTemporalData();
        return Boolean(columnValue) && hasValidTemporalValues && !isSameDate;
      }
      if (isDateTimeType) {
        const { hasValidTemporalValues, isSameDateTimeToMinute } = getTemporalData();
        return Boolean(columnValue) && hasValidTemporalValues && !isSameDateTimeToMinute;
      }
      if (type === 'singleSelect') {
        return Boolean(columnValue) && Boolean(value) && columnValue !== value;
      }
      return Boolean(columnValue) && getLowercase(columnValue) !== getLowercase(value);
    case 'is empty':
      if (isTemporalType) return !columnValue;
      return columnValue?.toString()?.trim()?.length === 0;
    case 'is not empty':
      if (isTemporalType) return Boolean(columnValue);
      return columnValue?.toString()?.trim()?.length > 0;

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
    case 'is after':
      if (isDateType) {
        const { hasValidTemporalValues, compareDate } = getTemporalData();
        return hasValidTemporalValues && compareDate > 0;
      }
      if (isDateTimeType) {
        const { hasValidTemporalValues, compareTime } = getTemporalData();
        return hasValidTemporalValues && compareTime > 0;
      }
      return false;

    case 'is on or after':
      if (isDateType) {
        const { hasValidTemporalValues, compareDate } = getTemporalData();
        return hasValidTemporalValues && compareDate >= 0;
      }
      if (isDateTimeType) {
        const { hasValidTemporalValues, compareTime } = getTemporalData();
        return hasValidTemporalValues && compareTime >= 0;
      }
      return false;

    case 'is before':
      if (isDateType) {
        const { hasValidTemporalValues, compareDate } = getTemporalData();
        return hasValidTemporalValues && compareDate < 0;
      }
      if (isDateTimeType) {
        const { hasValidTemporalValues, compareTime } = getTemporalData();
        return hasValidTemporalValues && compareTime < 0;
      }
      return false;

    case 'is on or before':
      if (isDateType) {
        const { hasValidTemporalValues, compareDate } = getTemporalData();
        return hasValidTemporalValues && compareDate <= 0;
      }
      if (isDateTimeType) {
        const { hasValidTemporalValues, compareTime } = getTemporalData();
        return hasValidTemporalValues && compareTime <= 0;
      }
      return false;

    // For conditional formatting (and future filter support)
    case 'is between':
      if (type === 'number') {
        return +columnValue >= +value && +columnValue <= +(value2 || value);
      }
      if (isDateType) {
        const { hasValidRangeValues, compareDateFrom, compareDateTo } = getTemporalData();
        return Boolean(columnValue) && hasValidRangeValues && compareDateFrom >= 0 && compareDateTo <= 0;
      }
      if (isDateTimeType) {
        const { hasValidRangeValues, compareFrom, compareTo } = getTemporalData();
        return Boolean(columnValue) && hasValidRangeValues && compareFrom >= 0 && compareTo <= 0;
      }
      return columnValue >= value && columnValue <= (value2 || value);
    case 'is not between':
      if (type === 'number') {
        return +columnValue < +value || +columnValue > +(value2 || value);
      }
      if (isDateType) {
        const { hasValidRangeValues, compareDateFrom, compareDateTo } = getTemporalData();
        return Boolean(columnValue) && hasValidRangeValues && (compareDateFrom < 0 || compareDateTo > 0);
      }
      if (isDateTimeType) {
        const { hasValidRangeValues, compareFrom, compareTo } = getTemporalData();
        return Boolean(columnValue) && hasValidRangeValues && (compareFrom < 0 || compareTo > 0);
      }
      return columnValue < value || columnValue > (value2 || value);

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
  columnDef: GridColDef,
  value2?: string
): any => {
  return data.filter((d: any) => {
    return queryCondition(getQueryValue(d, column, columnDef), operator, value, type, value2);
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
      const { field, operator, type, value, value2 } = filter;
      const columnDef = columns.find((column: any) => column.field === field) as GridColDef;
      updatedData = filterData(updatedData, field, operator, value, type, columnDef, value2);
    });
  } else if (filters.some((filter: any) => (isValueRequire(filter.operator) ? filter.value !== '' : true))) {
    if (filters[1].condition === 'And') {
      filters.forEach((filter: any) => {
        if (isValueRequire(filter.operator) ? filter.value !== '' : true) {
          const { field, operator, type, value, value2 } = filter;
          const columnDef = columns.find((column: any) => column.field === field) as GridColDef;
          updatedData = filterData(updatedData, field, operator, value, type, columnDef, value2);
        }
      });
    } else if (filters[1].condition === 'Or') {
      let orPredicateFilteredData: any = [];
      filters.forEach((filter: any) => {
        if (isValueRequire(filter.operator) ? filter.value !== '' : true) {
          const { field, operator, type, value, value2 } = filter;
          const columnDef = columns.find((column: any) => column.field === field) as GridColDef;
          const currentFilterData = filterData(updatedData, field, operator, value, type, columnDef, value2);
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
        onFilterChange(appliedFilters);
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
