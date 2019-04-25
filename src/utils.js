import isEmpty from 'lodash/isEmpty';

export const findStartPage = (numberOfPages, currentPage) => {
  let startPage;
  if (numberOfPages <= 3 || currentPage === 1) {
    startPage = 1;
  } else if (currentPage === numberOfPages) {
    startPage = currentPage - 2;
  } else {
    startPage = currentPage - 1;
  }
  return startPage;
};

export const findPageRange = (numberOfPages, startPage) => {
  return Array.from(new Array(Math.min(3, numberOfPages)), (x, i) => i + startPage);
};

// currentdata in paginations
export const findCurrentData = (searchedDataFound, currentPage, rowsPerPage) => {
  if (searchedDataFound.length < rowsPerPage.value) {
    return searchedDataFound;
  }
  return searchedDataFound.slice((currentPage - 1) * rowsPerPage.value, currentPage * rowsPerPage.value);
};

// search for a query in an object
export const searchObj = (obj, query, searchKeys) => {
  let found = false;
  // console.log(obj);
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(searchKeys, key)) {
      const value = obj[key];
      // console.log(key, value, typeof value);
      if (typeof value === 'object') {
        found = searchObj(value, query, searchKeys);
        if (found) {
          return found;
        }
      } else if (
        value
          .toString()
          .toLowerCase()
          .indexOf(query) !== -1
      ) {
        found = true;
        // console.log('property', key, 'value', value);
        return found;
      }
    } // end if key is searchable
  } // end for every key in object
  return found;
}; // end of searchObj

export const createPropertyOption = (valueProperty, labelProperty) => option => {
  return {
    value: option[valueProperty || 'id'],
    label: option[labelProperty || 'name'],
  };
};

export const queryCondition = (attrValue = '', searchValue = '', query = '') => {
  attrValue = (attrValue || '').toLowerCase();
  searchValue = (searchValue || '').toLowerCase();
  switch (query) {
    case 'Contains':
      return attrValue && attrValue.includes(searchValue);
    case 'Does Not Contain':
      return attrValue && !attrValue.includes(searchValue);
    case 'Is':
      return attrValue && attrValue === searchValue;
    case 'IsNot':
      return attrValue && attrValue !== searchValue;
    case 'Is Empty':
      return isEmpty(attrValue);
    case 'Is Not Empty':
      return !isEmpty(attrValue);
    default:
      return;
  }
};

export const filterFunction = (data, attr, searchValue, query) => {
  const val = data.filter(d => queryCondition(d[attr], searchValue, query));
  return val;
};

export const loopFilters = (data, filters) => {
  if (!filters.length) return data;

  if (filters.length === 1) {
    return filterFunction(data, filters[0].attribute, filters[0].value, filters[0].query);
  } else {
    if (filters[1].predicate === 'And') {
      let filteredData = data;
      filters.forEach((filter, index) => {
        filteredData = filterFunction(filteredData, filter.attribute, filter.value, filter.query);
      });
      return filteredData;
    } else if (filters[1].predicate === 'Or') {
      let filteredData = [];
      filters.forEach((filter, index) => {
        const indexedFilter = filterFunction(data, filter.attribute, filter.value, filter.query);
        filteredData = [...filteredData, ...indexedFilter];
      });
      return filteredData;
    }
  }
};

export const findColumnOptions = (columns, attr) => {
  const column = columns.find(c => c.column === attr);
  return column.options || [];
};
