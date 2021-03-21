import React, { useState, useEffect } from 'react';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import SearchComponent from '../../components/search';

import { getSearchTextFilteredData } from './utils';
import useDeepCompareMemoize from 'use-deep-compare-effect';

export const SearchContext = React.createContext();

function SearchProvider(props) {
  const [state, setState] = useState({
    searchText: '',
    data: [...(props.tableData || [])],
    rowsPerPage: 10,
    columnName: null,
    columnType: null,
    direction: null,
  });

  const search = debounce(
    searchText => {
      const { tableData, searchKeys } = props;
      if (!searchText || isEmpty(searchKeys)) {
        setState({ ...state, data: [...(tableData || [])] });
      }
      if (props.fetchOnPageChange) {
        props.fetchOnPageChange(1, searchText, searchKeys, state.rowsPerPage, {
          columnName: state.columnName,
          columnType: state.columnType,
          direction: state.direction,
        });
      } else {
        const searchedData = onSearch(searchText);
        setState({ ...state, data: [...(searchedData || [])] });
      }
    },
    props.fetchOnPageChange ? 1200 : 300,
    { leading: true, trailing: true }
  );

  useDeepCompareMemoize(() => {
    console.log('blast');
    if (props.fetchOnPageChange) {
      setState({ ...state, data: [...props.tableData] });
    } else {
      search(state.searchText);
    }
    const a = props;
  }, [props.tableData]);

  const updateRowsPerPage = val => {
    setState({ ...state, rowsPerPage: val });
  };

  const updateRowsSortParams = (columnName, columnType, direction) => {
    setState({ ...state, columnName, columnType, direction });
  };

  const onSearch = searchText => {
    const { tableData, searchKeys } = props;

    const searchedObjects = getSearchTextFilteredData({
      data: tableData,
      searchKeys,
      searchText,
    });
    return searchedObjects;
  };

  const onChangeSearchText = value => {
    const searchText = (value || '').trimStart().toLowerCase();
    const currentSearchText = state.searchText;

    if (searchText === currentSearchText) return;
    setState({ ...state, searchText });
    search(searchText);
  };

  const mainDataCount = props.count || (props.tableData || []).length;
  const stateDataCount = (state.data || []).length;
  console.log('hey', props);
  return (
    <div>
      <SearchContext.Provider
        value={{
          rawData: props.rawData,
          ...state,
          count: props.count,
          rowsPerPageFromSearch: state.rowsPerPage,
          updateRowsPerPage: updateRowsPerPage,
          updateRowsSortParams: updateRowsSortParams,
        }}>
        <SearchComponent
          disabled={!mainDataCount && !state.searchText}
          name={props.tableName}
          onChangeSearchText={onChangeSearchText}
          searchText={state.searchText}
        />
        {props.children}
        {!stateDataCount && (
          <div style={{ padding: '0 15px' }}>
            <div className="noRecordsDiv">
              {!mainDataCount ? `No ${props.tableName || 'data'} to Display` : 'No Results Found'}
            </div>
          </div>
        )}
      </SearchContext.Provider>
    </div>
  );
}

export default SearchProvider;
