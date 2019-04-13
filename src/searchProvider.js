import React, { PureComponent } from 'react';
import isEqual from 'lodash/isEqual';
import { Icon, Input } from 'semantic-ui-react';

import { searchObj } from './utils';

export const SearchContext = React.createContext();

export default class SearchProvider extends PureComponent {
  state = { searchText: '', data: this.props.data };

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.data, this.props.data)) {
      this.setState({ data: this.props.data });
    }
  }

  search = searchText => {
    let searchedObjects = this.props.data.map(object => {
      const isFound = searchObj(object, searchText.toLowerCase(), this.props.searchKeys);
      return isFound ? object : null;
    });

    // let currentSearchText = this.state.searchText;
    // if (searchText !== currentSearchText) return;

    let data = searchedObjects.filter(searchedObject => searchedObject);
    this.setState({ data });
  };

  onChangeSearchText = e => {
    const searchText = (e.target.value || '').trim();
    const currentSearchText = this.state.searchText;
    if (searchText === currentSearchText) return;
    this.setState({ searchText });
    this.search(searchText);
  };

  render() {
    return (
      <SearchContext.Provider value={{ ...this.state }}>
        <div className='tableMenuHeader'>
          <span
            style={{
              fontSize: '24px',
              fontWeight: 'normal',
              color: 'rgb(102, 119, 151)',
            }}
          >
            {this.props.name}
          </span>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <div id='tableButtons' />
            <Input
              iconPosition='left'
              placeholder={this.props.placeholder || 'Search...'}
              style={styles.searchInputDiv}
              onChange={this.onChangeSearchText}
            >
              <Icon name='search' />
              <input className='searchInput' style={styles.searchInput} value={this.state.searchText} />
              <Icon
                name='close'
                style={styles.closeIcon}
                onClick={() => this.onChangeSearchText({ target: { value: '' } })}
              />
            </Input>
          </div>
        </div>
        {!this.state.data.length && (
          <div className='noRecordsDiv'>{!this.props.data.length ? this.props.noDataText : 'No Results Found'}</div>
        )}
        {!!this.state.data.length && this.props.children}
      </SearchContext.Provider>
    );
  }
}

const styles = {
  searchInputDiv: {
    border: '1px solid rgb(214, 231, 243)',
    color: '#667797',
    position: 'relative',
    marginLeft: '10px',
  },
  closeIcon: {
    position: 'absolute',
    right: '0px',
    left: 'unset',
    cursor: 'pointer',
    pointerEvents: 'auto',
  },
  searchInput: {
    background: '#d6e7f3',
    borderRadius: '0px',
    fontWeight: 'normal',
    border: '1px solid rgb(214, 231, 243)',
  },
};
