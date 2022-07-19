/* eslint-disable react-hooks/exhaustive-deps */
import './index.css';
import React, { useReducer, useEffect, useCallback } from 'react';
import { Popup } from 'semantic-ui-react';
import Button from '../button';
import Select from '../select';
import Input from '../input';
import Icon from '../icon';

const rowsPerPageOptions = [5, 10, 20, 50].map(num => ({
  value: num,
  label: num,
}));

function reducer(state, action) {
  switch (action.type) {
    case 'setCurrentPageTo':
      return { ...state, setCurrentPageTo: action.payload };
    case 'pageOptions':
      return { ...state, pageOptions: action.payload };
    case 'setIsOpen':
      return { ...state, isOpen: action.payload };
    case 'updateStateToProps':
      return {
        ...state,
        setCurrentPageTo: action.payload.currentPage,
        setNumberOfPages: action.payload.numberOfPages,
        pageOptions: action.payload.pageOptions,
      };
    case 'updateDropDownStates':
      return {
        ...state,
        setCurrentPageTo: action.payload.currentPage,
        setNumberOfPages: action.payload.numberOfPages,
        setRowsPerPageTo: action.payload.rowsPerPage,
      };
    default:
      return state;
  }
}

const Pagination = props => {
  const lowerLimitForCurrentPage = (props.currentPage - 1) * props.rowsPerPage.value + 1;
  const upperLimitForCurrentPage = props.currentPage * props.rowsPerPage.value;
  const startIndex = lowerLimitForCurrentPage > props.rowCount ? 1 : lowerLimitForCurrentPage;
  const endIndex = upperLimitForCurrentPage > props.rowCount ? props.rowCount : upperLimitForCurrentPage;

  const [state, dispatch] = useReducer(reducer, {
    setCurrentPageTo: 1,
    setRowsPerPageTo: { value: 10, label: 10 },
    setNumberOfPages: Math.ceil(props.rowCount / props.rowsPerPage.value),
    pageOptions: rowsPerPageOptions,
    isOpen: false,
  });

  useEffect(() => {
    const maxRowOptionAvailable = (
      rowsPerPageOptions.find(obj => obj.value >= props.rowCount) || rowsPerPageOptions[rowsPerPageOptions.length - 1]
    ).value;
    const pageOptions = rowsPerPageOptions.filter(obj => +obj.value <= +maxRowOptionAvailable);
    const numberOfPages = Math.ceil(props.rowCount / props.rowsPerPage.value);
    dispatch({
      type: 'updateStateToProps',
      payload: { currentPage: props.currentPage, numberOfPages: numberOfPages, pageOptions: pageOptions },
    });
  }, [props.currentPage, props.rowsPerPage, props.rowCount, props.numberOfPages]);

  const setRowsPerPageHandler = useCallback(
    (selectedRowsPerPage = { value: 10, label: 10 }) => {
      const numberOfPages = Math.ceil(props.rowCount / selectedRowsPerPage.value);
      dispatch({
        type: 'updateDropDownStates',
        payload: { currentPage: 1, numberOfPages: numberOfPages, rowsPerPage: selectedRowsPerPage },
      });
    },
    [props.rowCount]
  );

  const setCurrentPageToHandler = useCallback(e => {
    dispatch({ type: 'setCurrentPageTo', payload: +e.target.value });
  }, []);

  const cancelPaginationChangesHandler = useCallback(() => {
    const numberOfPages = Math.ceil(props.rowCount / props.rowsPerPage.value);
    dispatch({
      type: 'updateDropDownStates',
      payload: { currentPage: props.currentPage, numberOfPages: numberOfPages, rowsPerPage: props.rowsPerPage },
    });
  }, [props.currentPage, props.rowsPerPage, props.rowCount]);

  const onCloseHandler = () => {
    cancelPaginationChangesHandler();
    dispatch({ type: 'setIsOpen', payload: false });
  };

  const onApplyHandler = () => {
    props.onChange(state.setCurrentPageTo, state.setRowsPerPageTo);
    dispatch({ type: 'setIsOpen', payload: false });
  };

  const onPageChangeHandler = useCallback(
    e => {
      if (e.currentTarget.dataset['direction'] === 'RIGHT' && props.currentPage + 1 <= state.setNumberOfPages) {
        props.onChange(props.currentPage + 1, state.setRowsPerPageTo);
      }
      if (e.currentTarget.dataset['direction'] === 'LEFT' && props.currentPage - 1 > 0) {
        props.onChange(props.currentPage - 1, state.setRowsPerPageTo);
      }
    },
    [props.currentPage, state.setNumberOfPages, state.setRowsPerPageTo]
  );

  return (
    <div className="rt-pagination">
      <Button data-direction="LEFT" onClick={onPageChangeHandler} className="pagination-btn" variant="text">
        <Icon name="chevron-left" width={24} height={24} />
      </Button>
      <Button data-direction="RIGHT" onClick={onPageChangeHandler} className="pagination-btn" variant="text">
        <Icon name="chevron-right" width={24} height={24} />
      </Button>
      <Popup
        on="click"
        positionFixed
        position="bottom left"
        trigger={
          <Button variant="outline">
            {startIndex} - {endIndex} of {props.rowCount}
          </Button>
        }
        open={state.isOpen}
        onOpen={() => {
          dispatch({ type: 'setIsOpen', payload: true });
        }}
        onClose={onCloseHandler}
        content={
          <div className="rt-pagination-body">
            <div className="body-row">
              <div className="row-title">Show</div>
              <div className="body-input-container">
                <Select
                  className="body-input-field"
                  defaultValue={props.rowsPerPage}
                  options={state.pageOptions}
                  onChange={setRowsPerPageHandler}
                />
                <span>items</span>
              </div>
            </div>
            <div className="body-row">
              <div className="row-title">Jump to Page</div>
              <div className="body-input-container">
                <Input
                  className="body-input-field"
                  value={
                    state.setRowsPerPageTo.value === props.rowsPerPage ? props.currentPage : state.setCurrentPageTo
                  }
                  type="number"
                  page={'This is a test string'}
                  min={1}
                  max={state.setNumberOfPages}
                  onChange={setCurrentPageToHandler}
                />{' '}
                <span>of {state.setNumberOfPages}</span>
              </div>
            </div>
            <div className="rt-pagination-footer">
              <Button className="rt-pagination-btn-cancel" variant="text" onClick={onCloseHandler}>
                Cancel
              </Button>
              <Button className="rt-pagination-btn-apply" variant="primary" onClick={onApplyHandler}>
                Apply
              </Button>
            </div>
          </div>
        }
      />
      {props.additionalButtons ? <div style={{ display: 'inline-block' }}>{props.additionalButtons}</div> : null}
    </div>
  );
};

export default Pagination;
