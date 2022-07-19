import React, { useEffect, useReducer, useCallback } from 'react';

import Pagination from '../../components/pagination';

import { findPageRange, findCurrentData } from './utils';

export const PaginationContext = React.createContext();

function reducer(state, action) {
  switch (action.type) {
    case 'currentPage':
      return { ...state, currentPage: action.payload };
    case 'data':
      return { ...state, data: [...(action.payload || [])] };
    case 'rowCount':
      return { ...state, rowCount: action.payload };
    case 'rowsPerPage':
      return { ...state, rowsPerPage: action.payload };
    default:
      return state;
  }
}

function PaginationProvider(props) {
  const rowsPerPage = {
    value: props.defaultItemsToDisplay || 10,
    label: props.customPagination ? props.defaultItemsToDisplay || 10 : `${props.defaultItemsToDisplay || 10} Items`,
  };
  const rowCount = typeof props.count === 'number' ? props.count : (props.data || []).length;

  const [state, dispatch] = useReducer(reducer, {
    currentPage: 1,
    data: [...props.data], //TODO:
    rowCount: rowCount,
    rowsPerPage,
    // currentPage, totalItems, itemsPerPage, //currentPage, rowCount, rowsPerPage
  });

  // const portalDiv = document.querySelector('#tabulousDivForPagination');

  const setCurrentPage = useCallback(
    currentPage => {
      dispatch({ type: 'currentPage', payload: currentPage });
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.currentPage]
  );
  const resetToFirstPage = useCallback(() => setCurrentPage(1), [setCurrentPage]);

  const onSelectRowsPerPage = useCallback(
    (selectedRowsPerPage = { value: 10, label: 10 }) => {
      let { currentPage } = state;
      const rowCount = typeof props.count === 'number' ? props.count : (props.data || []).length;

      const numberOfPages = Math.ceil(rowCount / selectedRowsPerPage.value);
      if (numberOfPages < currentPage) currentPage = numberOfPages;
      props.updateRowsPerPage(selectedRowsPerPage.value);
      if (props.fetchOnPageChange)
        props.fetchOnPageChange(currentPage, props.searchText, null, selectedRowsPerPage.value, {
          columnName: props.columnName,
          columnType: props.columnType,
          direction: props.direction,
        });

      const data = findCurrentData(props.data, currentPage, selectedRowsPerPage);
      dispatch({ type: 'data', payload: data });
      dispatch({
        type: 'rowsPerPage',
        payload: selectedRowsPerPage,
      });
      dispatch({
        type: 'currentPage',
        payload: currentPage || 1,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.fetchOnPageChange, state.currentPage, props.searchText, props.columnName, props.columnType, props.direction]
  );

  const handlePageClick = useCallback(
    (_, data) => {
      if (props.fetchOnPageChange)
        props.fetchOnPageChange(+data.page, props.searchText, null, state.rowsPerPage.value, {
          columnName: props.columnName,
          columnType: props.columnType,
          direction: props.direction,
        });
      setCurrentPage(+data.page || 1);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.fetchOnPageChange, state.rowsPerPage, props.searchText, props.columnName, props.columnType, props.direction]
  );

  const handleDirectionClick = useCallback(
    e => {
      const { currentPage } = state;
      const direction = e.currentTarget.dataset['direction'];
      let change = 0;
      const numberOfPages = Math.ceil(rowCount / rowsPerPage.value);
      if (direction === 'LEFT' && currentPage > 1) {
        change = -1;
      } else if (direction === 'RIGHT' && currentPage < numberOfPages) {
        change = 1;
      }
      if (change !== 0) {
        if (props.fetchOnPageChange) {
          props.fetchOnPageChange(currentPage + change || 1, props.searchText, null, state.rowsPerPage.value, {
            columnName: props.columnName,
            columnType: props.columnType,
            direction: props.direction,
          });
        }
        setCurrentPage(currentPage + change || 1);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state, props.fetchOnPageChange]
  );

  useEffect(() => {
    const rowCount = typeof props.count === 'number' ? props.count : props.data.length;

    let { currentPage = 1, rowsPerPage = { value: 10, label: '10 Items' } } = state;
    const numberOfPages = Math.ceil(rowCount / rowsPerPage.value);
    if (numberOfPages < currentPage) currentPage = numberOfPages;

    props.resetBulkSelection();
    dispatch({ type: 'currentPage', payload: currentPage || 1 });

    const data = findCurrentData(props.data, state.currentPage, state.rowsPerPage);
    dispatch({ type: 'data', payload: data });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data, props.count, state.currentPage]);

  useEffect(() => {
    resetToFirstPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.resetPagination]);

  useEffect(() => {
    dispatch({ type: 'rowCount', payload: rowCount });
  }, [rowCount]);

  let { children } = props;
  let pageRange = findPageRange({ ...state });
  const startIndex = (state.currentPage - 1) * state.rowsPerPage.value;

  const applyPaginationChangesHandler = useCallback((currentPage, rowsPerPage) => {
    const data = { page: currentPage };
    onSelectRowsPerPage(rowsPerPage);
    handlePageClick(null, data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const DisplayPaginationComponent = () => {
    return props.customPagination ? (
      <props.customPagination
        {...state}
        onChange={applyPaginationChangesHandler}
        additionalButtons={props.additionalButtons}
      />
    ) : (
      <Pagination
        {...props}
        {...state}
        handleDirectionClick={handleDirectionClick}
        handlePageClick={handlePageClick}
        onSelectRowsPerPage={onSelectRowsPerPage}
        pageRange={pageRange}
        setCurrentPage={setCurrentPage}
      />
    );
  };

  return (
    <>
      {props.paginationPositionTop && DisplayPaginationComponent()}
      <PaginationContext.Provider
        value={{
          rawData: props.rawData,
          ...state,
          startIndex,
          resetToFirstPage: resetToFirstPage,
        }}
      >
        {children}
      </PaginationContext.Provider>
      {!props.paginationPositionTop && DisplayPaginationComponent()}
    </>
  );
}

export default PaginationProvider;
