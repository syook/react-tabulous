/* eslint-disable react-hooks/exhaustive-deps */
import ReactDOM from 'react-dom';
import React, { useEffect, useReducer, useCallback } from 'react';

import Pagination from '../../components/pagination';

import { findPageRange, findCurrentData } from './utils';

export const PaginationContext = React.createContext();

function reducer(state, action) {
  switch (action.type) {
    case 'currentPage':
      return { ...state, currentPage: action.payload };
    case 'numberOfColumns':
      return { ...state, numberOfColumns: action.payload };
    case 'data':
      return { ...state, data: [...(action.payload || [])] };
    case 'numberOfPages':
      return { ...state, numberOfPages: action.payload };
    case 'rowsPerPage':
      return { ...state, rowsPerPage: action.payload };
    case 'setCurrentPageTo':
      return { ...state, setCurrentPageTo: action.payload };
    case 'setRowsPerPageTo':
      return { ...state, setRowsPerPageTo: action.payload };
    case 'startIndexOfCurrentPage':
      return { ...state, startIndexOfCurrentPage: action.payload };
    case 'endIndexOfCurrentPage':
      return { ...state, endIndexOfCurrentPage: action.payload };
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
    data: [...props.data],
    numberOfColumns: 30,
    numberOfPages: Math.ceil(rowCount / rowsPerPage.value),
    rowCount: rowCount,
    rowsPerPage,
    setCurrentPageTo: 1,
    setRowsPerPageTo: {},
    startIndexOfCurrentPage: 1,
    endIndexOfCurrentPage: rowCount,
  });

  const portalDiv = document.querySelector('#tabulousDivForPagination');

  const setCurrentPage = useCallback(
    currentPage => dispatch({ type: 'currentPage', payload: currentPage }),
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
        type: 'numberOfPages',
        payload: numberOfPages,
      });
      dispatch({
        type: 'rowsPerPage',
        payload: selectedRowsPerPage,
      });
      dispatch({
        type: 'currentPage',
        payload: currentPage || 1,
      });
    },
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
    [props.fetchOnPageChange, state.rowsPerPage, props.searchText, props.columnName, props.columnType, props.direction]
  );

  const handleDirectionClick = useCallback(
    e => {
      const { currentPage } = state;
      const direction = e.currentTarget.dataset['direction'];
      let change = 0;
      if (direction === 'LEFT' && currentPage > 1) {
        change = -1;
      } else if (direction === 'RIGHT' && currentPage < state.numberOfPages) {
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
    [state, props.fetchOnPageChange]
  );

  useEffect(() => {
    const rowCount = typeof props.count === 'number' ? props.count : props.data.length;

    let { currentPage = 1, rowsPerPage = { value: 10, label: '10 Items' } } = state;
    const numberOfPages = Math.ceil(rowCount / rowsPerPage.value);
    if (numberOfPages < currentPage) currentPage = numberOfPages;

    props.resetBulkSelection();
    dispatch({ type: 'numberOfPages', payload: numberOfPages });
    dispatch({ type: 'currentPage', payload: currentPage || 1 });

    const data = findCurrentData(props.data, state.currentPage, state.rowsPerPage);
    dispatch({ type: 'data', payload: data });
  }, [props.data, props.count, state.currentPage]);

  useEffect(() => {
    resetToFirstPage();
  }, [props.resetPagination]);

  let { children } = props;
  let pageRange = findPageRange({ ...state });
  const startIndex = (state.currentPage - 1) * state.rowsPerPage.value;

  const setRowsPerPageHandler = useCallback((selectedRowsPerPage = { value: 10, label: 10 }) => {
    dispatch({ type: 'setRowsPerPageTo', payload: selectedRowsPerPage });
  }, []);

  const setCurrentPageToHandler = useCallback(event => {
    dispatch({ type: 'setCurrentPageTo', payload: +event.target.value });
  }, []);

  const applyPaginationChangesHandler = useCallback(() => {
    const data = { page: state.setCurrentPageTo };
    onSelectRowsPerPage(state.setRowsPerPageTo);
    handlePageClick(null, data);
  }, [state.setCurrentPageTo, state.setRowsPerPageTo]);

  const cancelPaginationChangesHandler = useCallback(() => {
    dispatch({ type: 'setRowsPerPageTo', payload: state.rowsPerPage });
    dispatch({ type: 'setCurrentPageTo', payload: state.currentPage });
  }, [state.rowsPerPage, state.currentPage]);

  useEffect(() => {
    const startIndex = (state.currentPage - 1) * state.rowsPerPage.value + 1;
    const upperLimitForCurrentPage = state.currentPage * state.rowsPerPage.value;
    const endIndex = upperLimitForCurrentPage > state.rowCount ? state.rowCount : upperLimitForCurrentPage;
    dispatch({ type: 'startIndexOfCurrentPage', payload: startIndex });
    dispatch({ type: 'endIndexOfCurrentPage', payload: endIndex });
  }, [state.currentPage, state.rowsPerPage, state.rowCount]);

  return (
    <>
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
      {props.customPagination ? (
        portalDiv &&
        ReactDOM.createPortal(
          <props.customPagination
            {...props}
            {...state}
            handleDirectionClick={handleDirectionClick}
            handlePageClick={handlePageClick}
            onSelectRowsPerPage={onSelectRowsPerPage}
            pageRange={pageRange}
            setCurrentPageToHandler={setCurrentPageToHandler}
            setRowsPerPageHandler={setRowsPerPageHandler}
            applyPaginationChangesHandler={applyPaginationChangesHandler}
            cancelPaginationChangesHandler={cancelPaginationChangesHandler}
          />,
          portalDiv
        )
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
      )}
    </>
  );
}

export default PaginationProvider;
