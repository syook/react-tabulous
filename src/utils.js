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
  return Array.from(
    new Array(Math.min(3, numberOfPages)),
    (x, i) => i + startPage
  );
};

// currentdata in paginations
export const findCurrentData = (
  searchedDataFound,
  currentPage,
  rowsPerPage
) => {
  if (searchedDataFound.length < rowsPerPage.value) {
    return searchedDataFound;
  }
  return searchedDataFound.slice(
    (currentPage - 1) * rowsPerPage.value,
    currentPage * rowsPerPage.value
  );
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
