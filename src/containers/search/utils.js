import get from 'lodash/get';

// search for a query in an object
export const searchObj = (obj, query, searchKeys, isAllowDeepSearch) => {
  let found = false;
  for (const key in searchKeys) {
    const value = get(obj, key) || '';
    if (
      value
        .toString()
        .toLowerCase()
        .indexOf(query) !== -1
    ) {
      found = true;
      return found;
    }
  }
  // for (const key in obj) {
  //   const allowDeepSearch = isAllowDeepSearch && typeof obj[key] === 'object';
  //   if (Object.prototype.hasOwnProperty.call(searchKeys, key) || allowDeepSearch) {
  //     console.log('searchObj -> key', key);
  //     console.log(get(obj, 'details.Employee Name'));
  //     const value = obj[key];
  //     if (typeof value === 'object') {
  //       if (Array.isArray(value)) {
  //         let subValue;
  //         for (subValue of value) {
  //           let result = searchObj(subValue, query, searchKeys);
  //           if (result) {
  //             found = true;
  //             break;
  //           }
  //         }

  //         if (found) return found;
  //       } else {
  //         found = searchObj(value, query, searchKeys);
  //         if (found) return found;
  //       }
  //     } else if (
  //       value
  //         .toString()
  //         .toLowerCase()
  //         .indexOf(query) !== -1
  //     ) {
  //       found = true;
  //       return found;
  //     }
  //   }
  // }
  return found;
};

export const getSearchTextFilteredData = ({ data = [], searchText = '', searchKeys = {}, isAllowDeepSearch }) => {
  if (!searchText) return data;
  return (
    (data || []).filter(object => {
      const isFound = searchObj(object, searchText.toLowerCase(), searchKeys, isAllowDeepSearch);
      return isFound;
    }) || []
  );
};
