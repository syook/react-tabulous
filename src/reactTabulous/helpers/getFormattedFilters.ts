import { type FilterFieldProps, type GridBaseColDef } from '../models';

export const getFormattedFilters = (filters: FilterFieldProps[], columns: GridBaseColDef[]) => {
  const formattedFilters = [];
  for (let i = 0; i < filters.length; i++) {
    const column = columns.find(col => col.headerName === filters[i].column);
    if (column && (filters[i].value || ['is empty', 'is not empty'].includes(filters[i]?.operator))) {
      const field = column.field ? { field: column.field } : {};
      const filter = { ...filters[i], type: column.type ?? 'string', ...field, options: [] };
      if (column.type === 'singleSelect') {
        const isValueInOptions = (column.options || []).find(option => `${option.value}` === `${filters[i].value}`);
        if (isValueInOptions) {
          formattedFilters.push({ ...filter, options: column.options });
        }
      } else if (column.type === 'date') {
        const dateValue = new Date(filters[i].value);
        if (!isNaN(dateValue.getTime())) {
          formattedFilters.push(filter);
        }
      } else if (column.type === 'dateTime') {
        const dateTimeValue = new Date(filters[i].value);
        if (!isNaN(dateTimeValue.getTime())) {
          formattedFilters.push(filter);
        }
      } else if (column.type === 'number') {
        const numberValue = Number(filters[i].value);
        if (!isNaN(numberValue)) {
          formattedFilters.push({ ...filter, value: `${numberValue}` });
        }
      } else if (column.type === 'boolean') {
        const isBooleanValue = ['true', 'false', true, false].includes(filters[i].value);
        if (isBooleanValue) {
          formattedFilters.push({ ...filter, value: `${filters[i].value}` });
        }
      } else {
        formattedFilters.push(filter);
      }
    }
  }
  return formattedFilters;
};
