import './search.css';

import React, { useState, useEffect } from 'react';
import { Icon, Input } from 'semantic-ui-react';

const SearchComponent = ({ onChangeSearchText, name, disabled, placeholder }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    onChangeSearchText(searchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const onInputChange = event => {
    setSearchTerm(event.target.value);
  };

  const onClearSearchTerm = () => {
    setSearchTerm('');
  };

  return (
    <>
      {name && (
        <div
          style={{
            color: 'rgb(102, 119, 151)',
            fontSize: '24px',
            fontWeight: 'normal',
            paddingLeft: '15px',
            paddingTop: '5px',
            textAlign: 'left',
          }}
        >
          {name}
        </div>
      )}
      <Input
        disabled={disabled}
        iconPosition="left"
        onChange={onInputChange}
        placeholder={placeholder || 'Search...'}
        style={styles.searchInputDiv}
      >
        <Icon name="search" />
        <input className="tabulous-searchInput" value={searchTerm} />
        <Icon disabled={disabled} name="close" onClick={onClearSearchTerm} style={styles.closeIcon} />
      </Input>
    </>
  );
};

const styles = {
  searchInputDiv: {
    color: '#667797',
    position: 'absolute',
    marginLeft: '10px',
    right: '15px',
    borderRadius: '3px',
    maxWidth: '250px',
  },
  closeIcon: {
    position: 'absolute',
    right: '0px',
    left: 'unset',
    cursor: 'pointer',
    pointerEvents: 'auto',
  },
};

export default SearchComponent;
