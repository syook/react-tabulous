import './search.css';

import React, { useRef, useState, useEffect } from 'react';
import { Icon, Input } from 'semantic-ui-react';
import debounce from 'lodash/debounce';

const SearchComponent = props => {
  const isInitialMount = useRef(true);
  const [searchTerm, setSearchTerm] = useState('');

  const debounceSearch = useRef(
    debounce(
      searchTerm => {
        props.onChangeSearchText(searchTerm);
      },
      300,
      { leading: true, trailing: true }
    )
  );

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (searchTerm) {
      debounceSearch.current(searchTerm);
    } else {
      props.onChangeSearchText(searchTerm);
    }
  }, [searchTerm, props.onChangeSearchText]);

  const onInputChange = event => {
    setSearchTerm(event.target.value);
  };

  const onClearSearchTerm = () => {
    setSearchTerm('');
  };

  return (
    <div>
      {props.name && (
        <div
          style={{
            color: 'rgb(102, 119, 151)',
            fontSize: '24px',
            fontWeight: 'normal',
            paddingLeft: '15px',
            paddingTop: '5px',
            textAlign: 'left',
          }}>
          {props.name}
        </div>
      )}

      <div
        style={{
          position: 'absolute',
          right: '0px',
          top: '-30px',
        }}>
        <Input
          disabled={props.disabled}
          iconPosition="left"
          onChange={onInputChange}
          placeholder={props.placeholder || 'Search...'}
          style={styles.searchInputDiv}>
          <Icon name="search" />
          <input className="searchInput" style={styles.searchInput} value={searchTerm} />
          <Icon disabled={props.disabled} name="close" onClick={onClearSearchTerm} style={styles.closeIcon} />
        </Input>
      </div>
    </div>
  );
};

const styles = {
  searchInputDiv: {
    border: '1px solid rgb(214, 231, 243)',
    color: '#667797',
    position: 'relative',
    top: '35px',
    marginLeft: '10px',
    zIndex: 9,
    right: '15px',
    borderRadius: '3px',
    maxWidth: '300px',
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
    borderRadius: '2px',
    fontWeight: 'normal',
    border: '1px solid rgb(214, 231, 243)',
  },
};

export default SearchComponent;
