import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';

import SearchComponent from '../../components/search';

import { getSearchTextFilteredData } from './utils';

export const SearchContext = React.createContext();

export default class SearchProvider extends Component {
  state = { searchText: '' };

  search = searchText => {
    const { tableData, searchKeys } = this.props;
    if (!searchText || isEmpty(searchKeys)) {
      return tableData;
    }
    const searchedData = this.onSearch(searchText);
    return searchedData;
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
  };

  render() {
    const mainDataCount = (this.props.tableData || []).length;
    const data = this.search(this.state.searchText);
    const stateDataCount = (data || []).length;
    return (
      <div>
        <SearchContext.Provider value={{ ...this.state, data }}>
          <SearchComponent
            disabled={!mainDataCount}
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
