import React, { Component } from 'react';
import isEqual from 'lodash/isEqual';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';

import SearchComponent from '../../components/search';

import { getSearchTextFilteredData } from './utils';

export const SearchContext = React.createContext();

export default class SearchProvider extends Component {
  state = {
    searchText: '',
    data: [...(this.props.tableData || [])],
    rowsPerPage: 10,
    columnName: null,
    columnType: null,
    direction: null,
  };

  search = debounce(
    searchText => {
      const { tableData, searchKeys } = this.props;
      if (!searchText || isEmpty(searchKeys)) {
        this.setState({ data: [...(tableData || [])] });
      }
      if (this.props.fetchOnPageChange) {
        this.props.fetchOnPageChange(1, searchText, searchKeys, this.state.rowsPerPage, {
          columnName: this.state.columnName,
          columnType: this.state.columnType,
          direction: this.state.direction,
        });
      } else {
        const searchedData = this.onSearch(searchText);
        this.setState({ data: [...(searchedData || [])] });
      }
    },
    this.props.fetchOnPageChange ? 1200 : 300,
    { leading: true, trailing: true }
  );

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.tableData, this.props.tableData)) {
      if (this.props.fetchOnPageChange) {
        this.setState({ data: this.props.tableData });
      } else {
        this.search(this.state.searchText);
      }
    }
  }

  updateRowsPerPage = val => {
    this.setState({ rowsPerPage: val });
  };

  updateRowsSortParams = (columnName, columnType, direction) => {
    this.setState({ columnName, columnType, direction });
  };

  onSearch = searchText => {
    const { tableData, searchKeys } = this.props;

    const searchedObjects = getSearchTextFilteredData({
      data: tableData,
      searchKeys,
      searchText,
    });
    return searchedObjects;
  };

  onChangeSearchText = value => {
    const searchText = (value || '').trimStart().toLowerCase();
    const currentSearchText = this.state.searchText;

    if (searchText === currentSearchText) return;
    this.setState({ searchText });
    this.search(searchText);
  };

  render() {
    const mainDataCount = this.props.count || (this.props.tableData || []).length;
    const stateDataCount = (this.state.data || []).length;
    return (
      <div>
        <SearchContext.Provider
          value={{
            ...this.state,

            count: this.props.count,
            rowsPerPageFromSearch: this.state.rowsPerPage,
            updateRowsPerPage: this.updateRowsPerPage,
            updateRowsSortParams: this.updateRowsSortParams,
          }}>
          <SearchComponent
            disabled={!mainDataCount && !this.state.searchText}
            name={this.props.tableName}
            onChangeSearchText={this.onChangeSearchText}
            searchText={this.state.searchText}
          />
          {this.props.children}
          {!stateDataCount && (
            <div style={{ padding: '0 15px' }}>
              <div className="noRecordsDiv">
                {!mainDataCount ? `No ${this.props.tableName || 'data'} to Display` : 'No Results Found'}
              </div>
            </div>
          )}
        </SearchContext.Provider>
      </div>
    );
  }
}
