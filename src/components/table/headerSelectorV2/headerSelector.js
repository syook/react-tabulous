import './headerSelector.css';
import React, { useRef, useState } from 'react';
import Button from '../../button';

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
          {isOpen ? (
            <svg width="8" height="12" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0L5 5L10 0L0 0Z" fill="#333333" />
            </svg>
          ) : (
            <svg width="5" height="10" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.5 10.5L5.5 5.5L0.5 0.5L0.5 10.5Z" fill="#333333" />
            </svg>
          )}
        </div>
        {isOpen && (
          <>
            <form style={{ position: 'relative' }}>
              <input
                ref={searchEl}
                type="text"
                placeholder="Search"
                className="hideColumnsContainer__searchInput"
                onChange={searchHandler}
              />
              <div className="hideColumnsContainer__searchInput__icon">
                <svg width="12" height="12" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9.86111 9.61416L7.97283 7.61343C8.58207 6.78861 8.91264 5.77007 8.91142 4.72151C8.91142 3.78768 8.65084 2.87483 8.16263 2.09838C7.67443 1.32193 6.98053 0.716764 6.16867 0.359405C5.35682 0.00204574 4.46348 -0.0914558 3.60162 0.0907245C2.73976 0.272905 1.94809 0.722584 1.32672 1.3829C0.705354 2.04321 0.282198 2.8845 0.110764 3.80039C-0.0606707 4.71627 0.0273157 5.6656 0.363597 6.52835C0.699878 7.39109 1.26935 8.12849 2 8.64729C2.73065 9.1661 3.58966 9.44301 4.4684 9.44301C5.45512 9.44431 6.41359 9.09302 7.18975 8.44559L9.07248 10.4522C9.12411 10.5075 9.18553 10.5515 9.25321 10.5814C9.32089 10.6114 9.39348 10.6268 9.46679 10.6268C9.54011 10.6268 9.6127 10.6114 9.68038 10.5814C9.74806 10.5515 9.80948 10.5075 9.86111 10.4522C9.91317 10.3974 9.95448 10.3321 9.98268 10.2602C10.0109 10.1882 10.0254 10.1111 10.0254 10.0332C10.0254 9.95528 10.0109 9.87814 9.98268 9.80622C9.95448 9.7343 9.91317 9.66903 9.86111 9.61416ZM1.13615 4.72151C1.13615 4.02114 1.33158 3.3365 1.69773 2.75416C2.06389 2.17182 2.58431 1.71795 3.1932 1.44993C3.8021 1.18191 4.4721 1.11178 5.1185 1.24842C5.76489 1.38505 6.35864 1.72231 6.82467 2.21755C7.29069 2.71279 7.60806 3.34375 7.73664 4.03067C7.86521 4.71758 7.79922 5.42958 7.54701 6.07664C7.2948 6.72369 6.8677 7.27674 6.31971 7.66584C5.77172 8.05495 5.12746 8.26263 4.4684 8.26263C3.58463 8.26263 2.73706 7.88955 2.11214 7.22546C1.48722 6.56137 1.13615 5.66067 1.13615 4.72151Z"
                    fill="#C4C4C4"
                  />
                </svg>
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
