import React, { Component } from 'react';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import debounce from 'lodash/debounce';

import SearchComponent from '../../components/search';

import { getSearchTextFilteredData } from './utils';

export const SearchContext = React.createContext();

export default class SearchProvider extends Component {
  state = { searchText: '', data: [...(this.props.data || [])] };

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.data, this.props.data)) {
      this.setState({ data: [...(this.props.data || [])] });
    }
  }

  search = debounce(
    searchText => {
      const { data, searchKeys } = this.props;
      if (!searchText || isEmpty(searchKeys)) {
        this.setState({ data: [...(data || [])] });
      }

      const searchedObjects = getSearchTextFilteredData({ data, searchKeys, searchText });
      this.setState({ data: searchedObjects });
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
    const mainDataCount = (this.props.data || []).length;
    const stateDataCount = (this.state.data || []).length;

    return (
      <div style={{ textAlign: 'center' }}>
        <SearchContext.Provider value={{ ...this.state }}>
          <SearchComponent
            disabled={!mainDataCount}
            name={this.props.name}
            onChangeSearchText={this.onChangeSearchText}
            searchText={this.state.searchText}
          />
          {this.props.children}
          {!stateDataCount && (
            <div style={{ padding: '0 15px' }}>
              <div
                className="noRecordsDiv"
                style={{
                  fontSize: '1.1em',
                  letterSpacing: '0.5px',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingLeft: 0,
                  paddingRight: 0,
                  margin: 0,
                  borderTop: 'none',
                }}>
                {!mainDataCount ? `No ${this.props.name || 'data'} to Display` : 'No Results Found'}
              </div>
            </div>
          )}
        </SearchContext.Provider>
      </div>
    );
  }
}
