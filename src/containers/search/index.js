import React, { Component } from 'react';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import debounce from 'lodash/debounce';

import SearchComponent from '../../components/search';

import { getSearchTextFilteredData } from './utils';

export const SearchContext = React.createContext();

export default class SearchProvider extends Component {
  state = { searchText: '', data: [...(this.props.data || [])], rowsPerPage: 10 };

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.data, this.props.data)) {
      if (this.props.fetchOnPageChange) {
        this.setState({ data: this.props.data });
      } else {
        this.search(this.state.searchText);
      }
    }
  }

  updateRowsPerPage = val => {
    this.setState({ rowsPerPage: val });
  };

  search = debounce(
    searchText => {
      const { data, searchKeys } = this.props;
      if (!searchText || isEmpty(searchKeys)) {
        this.setState({ data: [...(data || [])] });
      }
      if (this.props.fetchOnPageChange) {
        this.props.fetchOnPageChange(1, searchText, searchKeys, this.state.rowsPerPage);
      } else {
        const searchedObjects = getSearchTextFilteredData({ data, searchKeys, searchText });
        this.setState({ data: searchedObjects });
      }
    },
    this.props.fetchOnPageChange ? 1200 : 300,
    { leading: true, trailing: true }
  );

  onChangeSearchText = e => {
    const searchText = (e.target.value || '').trimStart().toLowerCase();
    const currentSearchText = this.state.searchText;
    if (searchText === currentSearchText) return;

    this.setState({ searchText });
    this.search(searchText);
  };

  render() {
    const mainDataCount = this.props.count || (this.props.data || []).length;
    const stateDataCount = (this.state.data || []).length;

    return (
      <div>
        <SearchContext.Provider
          value={{
            ...this.state,
            count: this.props.count,
            searchKeys: this.props.searchKeys,
            updateRowsPerPage: this.updateRowsPerPage,
          }}>
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
