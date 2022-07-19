import './headerSelector.css';
import React, { useRef, useState } from 'react';

import Button from '../../button';
import Icon from '../../icon';

const ColumnList = ({ columns = [], toggleColumns, searchedFor }) => {
  return (
    <ul className="columnListContainer">
      {columns.map((column, index) => {
        if (!column.headerName.toLowerCase().includes(searchedFor.toLowerCase())) {
          return null;
        }
        return (
          <li key={`hide-selector-list-item-${index}`} className="columnListContainer__list__listItem">
            <label className="columnListContainer__list__listItem__label">
              {column.isVisible ? (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="9" cy="9" r="8.5" fill="#4724D8" stroke="white" />
                  <path d="M4.90924 9.27268L8.05609 11.4545L13.0911 6.54541" stroke="white" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="9" cy="9" r="8.5" stroke="#C4C4C4" />
                </svg>
              )}
              <span>{column.headerName}</span>
              <input
                type={'checkbox'}
                checked={column.isVisible}
                onChange={_e => toggleColumns(column.headerName, { checked: _e.target.checked })}
                style={{ display: 'none' }}
              />
            </label>
          </li>
        );
      })}
    </ul>
  );
};

const HeaderSelector = ({ columns = [], hiddenColumnCount, toggleColumns, toggleAllColumns }) => {
  const dropDownStyle = { backgroundColor: '#F9F9F9' };

  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  const hiddenColumnsCount = hiddenColumnCount;

  const searchEl = useRef(null);

  const searchHandler = e => {
    setSearchText(e.target.value);
  };

  return (
    <>
      <div style={!isOpen ? dropDownStyle : {}} className="hideColumnsContainer">
        <div
          className="hideColumnsContainer__button"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <span>Hide Columns</span>
          {isOpen && (
            <div className="hideColumnsContainer__button__toggle__buttons">
              <Button
                disabled={columns.length === hiddenColumnsCount}
                onClick={e => {
                  e.stopPropagation();
                  toggleAllColumns(false);
                }}
              >
                Hide all
              </Button>
              <Button
                disabled={hiddenColumnsCount === 0}
                onClick={e => {
                  e.stopPropagation();
                  toggleAllColumns(true);
                }}
              >
                Show all
              </Button>
            </div>
          )}
          <Icon name={isOpen ? 'chevron-down' : 'chevron-right'} />
        </div>
        {isOpen && (
          <>
            <form onSubmit={e => e.preventDefault()} style={{ position: 'relative' }}>
              <input
                ref={searchEl}
                type="text"
                placeholder="Search"
                className="hideColumnsContainer__searchInput"
                onChange={searchHandler}
              />
              <div className="hideColumnsContainer__searchInput__icon">
                <Icon name="search" size={16} fill="#C4C4C4" />
              </div>
            </form>
            <ColumnList columns={columns} toggleColumns={toggleColumns} searchedFor={searchText} />
          </>
        )}
      </div>
    </>
  );
};

export default HeaderSelector;
