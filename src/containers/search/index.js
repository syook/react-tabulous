import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import debounce from 'lodash/debounce';

import SearchComponent from '../../components/search';

import { getSearchTextFilteredData } from './utils';

export const SearchContext = React.createContext();

export default class SearchProvider extends Component {
  state = { searchText: '', data: this.props.tableData };

  comnponentDidMount() {
    this.setState({ data: this.props.tableData });
  }

  static getDerivedStateFromProps(props, state) {
    const search = searchText => {
      const { tableData, searchKeys } = props;
      if (!searchText || isEmpty(searchKeys)) {
        return tableData;
      }
      return getSearchTextFilteredData({ data: tableData, searchKeys, searchText: state.searchText });
    };
    return {
      data: search(state.searchText),
    };
  }

  search = searchText => {
    const { tableData, searchKeys } = this.props;
    if (!searchText || isEmpty(searchKeys)) {
      this.setState({ data: tableData });
    }
    const searchedData = this.onSearch(searchText);
    this.setState({ data: searchedData });
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
    const stateDataCount = (this.state.data || []).length;
    return (
      <div>
        <SearchContext.Provider value={{ ...this.state }}>
          <SearchComponent
            disabled={!mainDataCount}
            name={this.props.tableName}
            onChangeSearchText={this.onChangeSearchText}
            searchText={this.state.searchText}
            onSearch={this.search}
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
