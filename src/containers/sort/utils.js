import orderBy from 'lodash/orderBy';

const getData = (a, b, columnName = '', isAscending) => {
  let firstValue, secondValue;
  firstValue = (a || {})[columnName] || '';
  secondValue = (b || {})[columnName] || '';
  if (typeof firstValue === 'number' || typeof secondValue === 'number') {
    return isAscending ? +firstValue - +secondValue : +secondValue - +firstValue;
  }
  return isAscending ? firstValue.localeCompare(secondValue) : secondValue.localeCompare(firstValue);
};

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
      return data.sort((a, b) => {
        const foundValue = a[columnName];
        if (foundValue || foundValue === 0) {
          return getData(a, b, columnName, isAscending);
        } else {
          for (const key in a) {
            const value = a[key] || {};
            if (typeof value === 'object' && !!(a[key] || {})[columnName]) {
              return getData(a[key], b[key], columnName, isAscending);
            }
          }
        }
      });

    default:
      return [...orderBy(data, columnName, isAscending ? 'asc' : 'desc')];
  }
};
