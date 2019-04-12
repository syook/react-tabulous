import { Icon, Input } from 'semantic-ui-react';
import React, { Component } from 'react';

import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import compact from 'lodash/compact';
import { searchObj } from './utils';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: props.searchText || '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.searchText !== this.state.searchText ||
      nextProps.fullData.length !== this.props.fullData.length
    ) {
      const searchText = nextProps.searchText;
      this.setState({ searchText });
      this.search(searchText, nextProps.fullData);
    }
  }

  onChangeSearchText = e => {
    this.setState({ searchText: e.target.value });
    this.search(e.target.value);
  };

  search(searchText, data = this.props.fullData) {
    const fullData = cloneDeep(data);
    if (!fullData.length) return;
    if (searchText === '') {
      const numberOfPages = Math.ceil(
        fullData.length / this.props.rowsPerPage.value
      );

      return this.props.setSearchedData(fullData, numberOfPages, searchText);
    }
    let searchedDataFound = fullData.map(item => {
      const found = searchObj(
        item,
        searchText.toLowerCase(),
        this.props.searchKeys
      );
      if (!found) {
        return null;
      }
      return item;
    });

    searchedDataFound = compact(searchedDataFound);
    const numberOfPages = Math.ceil(
      searchedDataFound.length / this.props.rowsPerPage.value
    );

    return this.props.setSearchedData(
      searchedDataFound,
      numberOfPages,
      searchText,
      1
    );
  }

  render() {
    return (
      <Input
        iconPosition="left"
        placeholder={this.props.placeholder || 'Search...'}
        style={styles.searchInputDiv}
        onChange={this.onChangeSearchText}>
        <Icon name="search" />
        <Icon
          name="close"
          style={styles.closeIcon}
          onClick={() => this.onChangeSearchText({ target: { value: '' } })}
        />
        <input className="searchInput" style={styles.searchInput} />
      </Input>
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
  },
  searchInput: {
    background: '#d6e7f3',
    borderRadius: '0px',
    fontWeight: 'normal',
    border: '1px solid rgb(214, 231, 243)',
  },
};

Search.propTypes = {
  searchText: PropTypes.string.isRequired,
  searchKeys: PropTypes.object.isRequired,
  rowsPerPage: PropTypes.object.isRequired,
  setSearchedData: PropTypes.func.isRequired,
};

export default Search;
