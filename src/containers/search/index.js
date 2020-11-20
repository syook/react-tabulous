import React, { Component } from 'react';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import debounce from 'lodash/debounce';
import { Popup, Button, Icon } from 'semantic-ui-react';

import SearchComponent from '../../components/search';

import { getSearchTextFilteredData } from './utils';

export const SearchContext = React.createContext();

export default class SearchProvider extends Component {
  state = { searchText: '' };

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.tableData, this.props.tableData)) {
      this.search(this.state.searchText);
    }
  }

  search = debounce(
    searchText => {
      const { tableData, searchKeys, isAllowDeepSearch } = this.props;
      if (!searchText || isEmpty(searchKeys)) {
        return tableData;
      }

      const searchedObjects = getSearchTextFilteredData({
        data: tableData,
        searchKeys,
        searchText,
        isAllowDeepSearch,
      });
      return searchedObjects;
    },
    300,
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
