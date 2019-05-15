import orderBy from 'lodash/orderBy';

export const fetchSortedData = ({ data = [], columnType, columnName, direction }) => {
  if (!columnName || !columnType) return [];

  direction = direction || 'ascending';
  const isAscending = direction === 'ascending';

  switch (columnType.toLowerCase()) {
    case 'date':
      let date1, date2;
      return data.sort((a, b) => {
        date1 = new Date(a[columnName]);
        date2 = new Date(b[columnName]);
        return (isAscending ? date1 - date2 : date2 - date1) || 0;
      });

    case 'number':
    case 'boolean':
      return data.sort((a, b) => {
        return isAscending ? +a[columnName] - +b[columnName] : +b[columnName] - +a[columnName];
      });

    case 'string':
    case 'singleselect':
      let firstValue, secondValue;
      return data.sort((a, b) => {
        firstValue = a[columnName] || '';
        secondValue = b[columnName] || '';
        return isAscending ? firstValue.localeCompare(secondValue) : secondValue.localeCompare(firstValue);
      });

    default:
      return [...orderBy(data, columnName, isAscending ? 'asc' : 'desc')];
  }
};
