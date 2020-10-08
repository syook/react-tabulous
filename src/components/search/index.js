import './search.css';

import React from 'react';
import { Icon, Input } from 'semantic-ui-react';

const SearchComponent = props => {
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
        <Input
          disabled={props.disabled}
          iconPosition="left"
          onChange={props.onChangeSearchText}
          placeholder={props.placeholder || 'Search...'}
          style={styles.searchInputDiv}>
          <Icon name="search" />
          <input className="searchInput" style={styles.searchInput} value={props.searchText} />
          <Icon
            disabled={props.disabled}
            name="close"
            onClick={() => props.onChangeSearchText({ target: { value: '' } })}
            style={styles.closeIcon}
          />
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
