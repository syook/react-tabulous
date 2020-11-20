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
