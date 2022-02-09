import './index.css';

import React, { useEffect, useReducer, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Table, Ref, Button, Icon } from 'semantic-ui-react';
import isEqual from 'lodash/isEqual';

import { getTableData, getTableColumns } from '../../components/utils';
import FilterProvider, { FilterContext } from '../filter/indexFunctionalComponent';
import PaginationProvider, { PaginationContext } from '../pagination/indexFunctioncalComponent';
import SearchProvider, { SearchContext } from '../search/indexFuntionalComponent';
import SortProvider, { SortContext } from '../sort/indexFunctionalComponent';

import BulkActionList from '../../components/table/bulk-action-dropdown';
import HeaderSelector from '../../components/table/header-selector';
import TableActions from '../../components/table/actions';
import TableHeader from '../../components/table/header';
import TableCell from '../../components/table/cell';
import StatusIcon from '../../components/status-icon/status-icon';

import { tableActions } from '../../constants';

function reducer(state, action) {
  switch (action.type) {
    case tableActions.columns:
      return { ...state, columns: [...(action.payload || [])] };
    case tableActions.bulkSelect:
      return { ...state, bulkSelect: action.payload };
    case tableActions.indeterminateSelect:
      return { ...state, indeterminateSelect: action.payload };
    case tableActions.selectedRows:
      return { ...state, selectedRows: [...(action.payload || [])] };
    case tableActions.searchKeys:
      return { ...state, searchKeys: { ...(action.payload || {}) } };
    case tableActions.hiddenColumns:
      return { ...state, hiddenColumns: [...(action.payload || [])] };
    case tableActions.data:
      return { ...state, data: [...(action.payload || [])] };
    case tableActions.rawData:
      return { ...state, rawData: [...(action.payload || [])] };
    case tableActions.stylesForTable:
      return { ...state, stylesForTable: { ...state.stylesForTable, ...action.payload } };
    case tableActions.eraseStyles:
      return { ...state, stylesForTable: {} };
    case tableActions.setResetTable:
      return { ...state, resetStylesForTable: { ...state.resetStylesForTable, ...action.payload } };
    case tableActions.eraseResetStyles:
      return { ...state, resetStylesForTable: {} };
    default:
      return state;
  }
}

function TableComponent(props) {
  const tableElement = useRef(null);
  const columnAndKeys = getTableColumns(props.columnDefs);
  const [state, dispatch] = useReducer(reducer, {
    columns: columnAndKeys.columnDefs, //The columns gets array of objects. field isnt proper for this. I am hence using headerName
    bulkSelect: false,
    indeterminateSelect: false,
    selectedRows: [],
    searchKeys: columnAndKeys.searchKeys,
    hiddenColumns: columnAndKeys.columnDefs.filter(c => !props.mandatoryFields.includes(c.headerName)),
    data: getTableData(columnAndKeys.columnDefs, [...props.data]),
    rawData: props.data,
    stylesForTable: {},
    resetStylesForTable: {},
    showResetButton: props.showResetButton && columnAndKeys.columnDefs.some(c => c.isResizable),
  });

  useEffect(() => {
    let columnAndKeys = { searchKeys: { ...(state.searchKeys || {}) }, columnDefs: [...(state.columns || [])] };
    let columns = columnAndKeys.columnDefs || [];
    const columnDefsHeaderNames = (props.columnDefs || []).map(def => def.headerName);
    const stateColumnsHeaderNames = state.columns.map(c => c.headerName);
    if (props.resetHideColumnsOnDataChange || !isEqual(columnDefsHeaderNames, stateColumnsHeaderNames)) {
      columnAndKeys = getTableColumns([...props.columnDefs]);
      columns = columnAndKeys.columnDefs || [];
    }
    const data = getTableData(columns, [...props.data], props.emptyCellPlaceHolder);

    dispatch({ type: tableActions.data, payload: data });
    dispatch({ type: tableActions.rawData, payload: props.data });
    dispatch({ type: tableActions.columns, payload: columns });
    dispatch({ type: tableActions.searchKeys, payload: columnAndKeys.searchKeys });
  }, [props.data, props.columnDefs, props.emptyCellPlaceHolder]); // eslint-disable-line react-hooks/exhaustive-deps

  const enableBulkSelect = useCallback(
    ({ checked }, data = []) => {
      const selectedRows = checked ? data.map(i => i['_id'] || i['id']) : [];
      dispatch({ type: tableActions.bulkSelect, payload: checked });
      dispatch({ type: tableActions.selectedRows, payload: selectedRows });
      dispatch({ type: tableActions.indeterminateSelect, payload: false });
      if (props.getBulkActionState) props.getBulkActionState(checked);
    },
    [props.getBulkActionState] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const resetBulkSelection = useCallback(() => {
    dispatch({ type: tableActions.bulkSelect, payload: false });
    dispatch({ type: tableActions.selectedRows, payload: [] });
    dispatch({ type: tableActions.indeterminateSelect, payload: false });
  }, []);

  const updateSelectedRows = useCallback(
    ({ checked }, row_id, rowCount) => {
      let selectedRows = state.selectedRows;
      const rowIndex = selectedRows.indexOf(row_id);
      if (rowIndex > -1 && !checked) selectedRows.splice(rowIndex, 1);
      if (rowIndex === -1) selectedRows.push(row_id);
      let bulkSelect = false;
      let indeterminateSelect = false;
      const selectedRowsLength = selectedRows.length;
      if (selectedRowsLength && selectedRowsLength !== rowCount) {
        indeterminateSelect = true;
      } else if (selectedRowsLength === rowCount) {
        bulkSelect = true;
      }
      dispatch({ type: tableActions.bulkSelect, payload: bulkSelect });
      dispatch({ type: tableActions.selectedRows, payload: selectedRows });
      dispatch({ type: tableActions.indeterminateSelect, payload: indeterminateSelect });
      if (props.getSelectedOrUnselectedId) props.getSelectedOrUnselectedId(checked, row_id);
    },
    [state.selectedRows, props.getSelectedOrUnselectedId] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const resetHandler = () => {
    dispatch({ type: tableActions.eraseStyles });
    setInlineStyle();
  };

  const toggleColumns = useCallback(
    async (columnName, { checked }) => {
      let columns = [...state.columns];
      let updatableColumn = columns.find(c => c.headerName === columnName) || {};
      updatableColumn.isVisible = checked;
      const hiddenColumns = columns.filter(c => !props.mandatoryFields.includes(c.headerName));
      await dispatch({ type: tableActions.columns, payload: columns });
      await dispatch({ type: tableActions.hiddenColumns, payload: hiddenColumns });
      resetHandler();
    },
    [state.columns] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const toggleAllColumns = useCallback(
    async checked => {
      const updatedColumns = state.columns.map(column => {
        if (props.mandatoryFields.includes(column.headerName)) {
          return column;
        }
        column.isVisible = checked;
        return column;
      });

      const hiddenColumns = updatedColumns.filter(c => !props.mandatoryFields.includes(c.headerName));
      await dispatch({ type: tableActions.columns, payload: updatedColumns });
      await dispatch({ type: tableActions.hiddenColumns, payload: hiddenColumns });
      resetHandler();
    },
    [state.columns, props.mandatoryFields]
  );

  const resize = useCallback(
    async (col, element, original_width = 20, original_mouse_x, e) => {
      if (!element) {
        return;
      }

      let width = 0;
      if (!!e) {
        width = original_width + (e.pageX - original_mouse_x);
      } else {
        width = original_width;
      }
      if (width >= 20) {
        if (!e) {
          element.style.width = state.resetStylesForTable[`.column${col}`].width;
        } else {
          element.style.width = width + 'px';
          const newStyleKey = `.column${col}`;
          const newStyleObj = {};
          newStyleObj[newStyleKey] = { width: `${width}px` };
          dispatch({ type: tableActions.stylesForTable, payload: newStyleObj });
        }
      }
    },
    [state.resetStylesForTable]
  );

  const getOriginalPropertyOfElement = (element, property) => {
    return parseFloat(
      getComputedStyle(element, null)
        .getPropertyValue(property)
        .replace('px', '')
    );
  };

  const resizeHandler = async (col, e) => {
    e.stopPropagation();
    const element = tableElement.current.querySelector(`.head${col}`);
    e.preventDefault();
    let original_width = getOriginalPropertyOfElement(element, 'width');
    let original_mouse_x = e.pageX;

    const refFunc = async e => {
      await resize(col, element, original_width, original_mouse_x, e);
    };
    window.addEventListener('mousemove', refFunc, true);
    window.addEventListener(
      'mouseup',
      () => {
        window.removeEventListener('mousemove', refFunc, true);
      },
      true
    );
  };

  // The getAllColumns function helps us get all the columns including BulkActions, S.No. and Actions columns

  const getAllColumns = useCallback(
    () => {
      let allColumns = state.columns.map(eachCol => eachCol.headerName.replace(/[^a-zA-Z0-9]/g, ''));
      if (props.isShowSerialNumber) {
        allColumns = ['SerialNo', ...allColumns];
      }
      if (hasBulkActions) {
        allColumns = ['BulkAction', ...allColumns];
      }
      if (props.includeAction) {
        allColumns = [...allColumns, 'Actions'];
      }
      return allColumns;
    },
    [state.columns] // eslint-disable-line react-hooks/exhaustive-deps
  );

  // There is a Reducer state named "resetStylesForTable". This state on the first render needs to be updated to the width of each Column on the first render.
  // The setResetStylesForTable function helps us achieve this.

  const setResetStylesForTable = useCallback(async () => {
    let allColumns = getAllColumns();

    await allColumns.map(async col => {
      const element = tableElement.current.querySelector(`.head${col}`);
      let original_width = getOriginalPropertyOfElement(element, 'width');

      const newStyleKey = `.column${col}`;
      const newStyleObj = {};
      newStyleObj[newStyleKey] = { width: `${original_width}px` };

      await dispatch({ type: tableActions.setResetTable, payload: newStyleObj });
    });
  }, [state.columns]); // eslint-disable-line react-hooks/exhaustive-deps

  // The below function sets the inline style for each column after we are done setting the state "resetStylesForTable"
  const setInlineStyle = useCallback(
    async () => {
      let allColumns = getAllColumns();

      Promise.all(
        allColumns.map(async col => {
          const element = tableElement.current.querySelector(`.head${col}`);
          return resize(col, element);
        })
      );
      tableElement.current.style.width = 'fit-content';
    },
    [state.columns] // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(() => {
    const setInlineStyleCaller = async () => {
      let totalCols = getAllColumns().length;
      if (Object.keys(state.resetStylesForTable).length === 0) {
        await setResetStylesForTable();
      }
      if (Object.keys(state.resetStylesForTable).length === totalCols) {
        await setInlineStyle();
      }
    };

    setInlineStyleCaller();
  }, [state.resetStylesForTable]); // eslint-disable-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //   const changeTable = async () => {
  //     let allColumns = getAllColumns();
  //     let totalCols = allColumns.length;
  //     if(Object.keys(state.resetStylesForTable).length !== totalCols){
  //       tableElement.current.style.width = '100%';
  //       await allColumns.map(async col => {
  //         const element = tableElement.current.querySelector(`.head${col}`);
  //         element.removeAttribute("style");
  //       });
  //       dispatch({ type: tableActions.eraseStyles });
  //       dispatch({ type: tableActions.eraseResetStyles });
  //       await setResetStylesForTable();
  //       await setInlineStyle();

  //     }
  //   }
  //   changeTable();

  // }, [state.columns]);

  const hasBulkActions = props.showBulkActions && (props.bulkActionDefs || []).length;
  const visibleColumns = state.columns.filter(d => d.isVisible); //TODO: probably this only has visible columns only
  const filterableColumns = visibleColumns.filter(d => d.isFilterable);
  const emptyCellPlaceHolder = props.emptyCellPlaceHolder || '';
  const hiddenColumnCount = state.columns.length - visibleColumns.length;

  const resetButton = () => {
    return (
      <Button
        disabled={props.disabled}
        style={{
          backgroundColor: props.accentColor ? 'rgb(170, 170, 170)' : 'rgba(241, 196, 15, 0.8)',
          color: '#fff',
          marginRight: '10px',
        }}
        onClick={resetHandler}>
        <Icon name="redo" /> {'Reset'}
      </Button>
    );
  };

  return (
    <div className="table-wrapper">
      <SearchProvider {...props} rawData={state.rawData} searchKeys={state.searchKeys} tableData={state.data}>
        <SearchContext.Consumer>
          {searchProps => {
            return (
              <div
                className="main-table_layout"
                style={{
                  padding: '0 15px',
                  width: '100%',
                }}>
                {state.hiddenColumns.length ? (
                  <HeaderSelector
                    hiddenColumnCount={hiddenColumnCount}
                    columns={state.hiddenColumns}
                    toggleColumns={toggleColumns}
                    toggleAllColumns={toggleAllColumns}
                    accentColor={props.accentColor}
                  />
                ) : null}
                {hasBulkActions && state.selectedRows.length ? (
                  <BulkActionList
                    bulkActions={props.bulkActionDefs}
                    selectedRows={state.selectedRows}
                    hideBulkCount={props.hideBulkCount}
                  />
                ) : null}

                <FilterProvider
                  rawData={searchProps.rawData}
                  count={searchProps.count}
                  data={searchProps.data}
                  filterableColumns={filterableColumns}
                  columns={state.columns}
                  resetFilterOnDataChange={props.resetFilterOnDataChange}
                  accentColor={props.accentColor}
                  emptyCellPlaceHolder={emptyCellPlaceHolder}>
                  <FilterContext.Consumer>
                    {filterProps => {
                      return (
                        <>
                          {state.showResetButton && resetButton()}
                          {props.children ? (
                            <div style={{ display: 'inline-block' }}>
                              {props.children(filterProps.data, searchProps.searchText, visibleColumns)}
                            </div>
                          ) : null}
                          <SortProvider
                            data={filterProps.data}
                            resetPagination={props.resetPagination}
                            rawData={filterProps.rawData}
                            fetchOnPageChange={props.fetchOnPageChange}
                            count={filterProps.count}
                            updateRowsSortParams={searchProps.updateRowsSortParams}
                            rowsPerPageFromSearch={searchProps.rowsPerPageFromSearch}
                            searchText={searchProps.searchText}>
                            <SortContext.Consumer>
                              {sortProps => {
                                return (
                                  <PaginationProvider
                                    {...props}
                                    rawData={filterProps.rawData}
                                    data={sortProps.data}
                                    count={sortProps.count}
                                    fetchOnPageChange={props.fetchOnPageChange}
                                    searchText={searchProps.searchText}
                                    columnName={sortProps.columnName}
                                    direction={sortProps.direction}
                                    columnType={sortProps.columnType}
                                    updateRowsPerPage={searchProps.updateRowsPerPage}
                                    resetPagination={sortProps.resetPagination}
                                    resetBulkSelection={resetBulkSelection}
                                    defaultItemsToDisplay={props.defaultItemsToDisplay}>
                                    <div
                                      className={`scrollable-table tableFixHead ${
                                        props.tableScroll ? 'shouldSroll' : null
                                      }`}
                                      style={{ maxWidth: '100%', marginTop: '10px' }}>
                                      <Ref innerRef={tableElement}>
                                        <Table sortable celled padded className="tableStyle left aligned table-fixed">
                                          <PaginationContext.Consumer>
                                            {paginationProps => {
                                              return (
                                                <>
                                                  <Table.Header style={{ textAlign: 'center' }}>
                                                    <Table.Row>
                                                      {hasBulkActions ? (
                                                        <Table.HeaderCell className="bulkAction-check">
                                                          <div
                                                            className="headBulkAction"
                                                            style={{
                                                              width: '100%',
                                                            }}>
                                                            <Checkbox
                                                              checked={state.bulkSelect}
                                                              disabled={!paginationProps.rowCount}
                                                              indeterminate={state.indeterminateSelect}
                                                              onChange={(e, { checked }) =>
                                                                enableBulkSelect({ checked }, filterProps.data)
                                                              }
                                                            />
                                                          </div>
                                                        </Table.HeaderCell>
                                                      ) : null}
                                                      {props.isShowSerialNumber && (
                                                        <Table.HeaderCell>
                                                          <div
                                                            className="headSerialNo"
                                                            style={{
                                                              width: '100%',
                                                            }}>
                                                            S.No
                                                          </div>
                                                        </Table.HeaderCell>
                                                      )}
                                                      {visibleColumns.map((column, index) =>
                                                        TableHeader({
                                                          resizeHandler,
                                                          column,
                                                          index,
                                                          sortProps,
                                                          defaultSort: props.defaultSort,
                                                          disabled: !paginationProps.rowCount,
                                                        })
                                                      )}
                                                      {!props.actionOnHover && props.includeAction ? (
                                                        <Table.HeaderCell>
                                                          <div
                                                            className="headActions"
                                                            style={{
                                                              width: '100%',
                                                            }}>
                                                            Actions
                                                          </div>
                                                        </Table.HeaderCell>
                                                      ) : null}
                                                    </Table.Row>
                                                  </Table.Header>
                                                  <Table.Body>
                                                    {paginationProps.data.map((row, index1) => {
                                                      const includeCheckbox = props.showCheckbox
                                                        ? props.showCheckbox(row)
                                                        : false;
                                                      return (
                                                        <Table.Row key={`column-${index1}`} className="main-table-row">
                                                          {hasBulkActions && includeCheckbox !== false ? (
                                                            <Table.Cell>
                                                              <div
                                                                style={{
                                                                  display: 'flex',
                                                                  justifyContent: 'center',
                                                                  flexDirection: props.showStatusIcon
                                                                    ? 'row-reverse'
                                                                    : null,
                                                                  alignItems: 'center',
                                                                }}>
                                                                <Checkbox
                                                                  className="bulkAction_check"
                                                                  checked={state.selectedRows.includes(
                                                                    row['_id'] || row['id']
                                                                  )}
                                                                  onChange={(e, { checked }) =>
                                                                    updateSelectedRows(
                                                                      { checked },
                                                                      row['_id'] || row['id'],
                                                                      paginationProps.rowCount
                                                                    )
                                                                  }
                                                                />
                                                                {props.showStatusIcon ? (
                                                                  <StatusIcon
                                                                    showStatusIcon={props.showStatusIcon(row)}
                                                                  />
                                                                ) : null}
                                                              </div>
                                                            </Table.Cell>
                                                          ) : null}
                                                          {props.isShowSerialNumber && (
                                                            <Table.Cell>
                                                              <div
                                                                style={{
                                                                  textAlign: 'center',
                                                                  margin: '0 auto',
                                                                }}>
                                                                {paginationProps.startIndex + index1 + 1}
                                                                {props.enableIcon
                                                                  ? props.showIcon(
                                                                      paginationProps.rawData[row.objIndex]
                                                                    )
                                                                  : null}
                                                              </div>
                                                            </Table.Cell>
                                                          )}
                                                          {visibleColumns.map((column, index2) => {
                                                            const styleSetTo =
                                                              state.stylesForTable[
                                                                `.column${column.headerName.replace(
                                                                  /[^a-zA-Z0-9]/g,
                                                                  ''
                                                                )}`
                                                              ];
                                                            return TableCell({
                                                              column,
                                                              index2,
                                                              data: paginationProps.rawData,
                                                              row,
                                                              emptyCellPlaceHolder,
                                                              styleSetTo,
                                                            });
                                                          })}
                                                          {props.includeAction ? (
                                                            <Table.Cell className="table-action_buttons">
                                                              <TableActions
                                                                actionOnHover={props.actionOnHover}
                                                                actions={props.actionDefs}
                                                                row={row}
                                                                data={paginationProps.rawData}
                                                              />
                                                            </Table.Cell>
                                                          ) : null}
                                                        </Table.Row>
                                                      );
                                                    })}
                                                  </Table.Body>
                                                </>
                                              );
                                            }}
                                          </PaginationContext.Consumer>
                                        </Table>
                                      </Ref>
                                    </div>
                                  </PaginationProvider>
                                );
                              }}
                            </SortContext.Consumer>
                          </SortProvider>
                        </>
                      );
                    }}
                  </FilterContext.Consumer>
                </FilterProvider>
              </div>
            );
          }}
        </SearchContext.Consumer>
      </SearchProvider>
    </div>
  );
}

TableComponent.propTypes = {
  actionDefs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      icon: PropTypes.string,
      color: PropTypes.string,
      isVisible: PropTypes.func,
      isLoading: PropTypes.func,
      isDisabled: PropTypes.func,
      function: PropTypes.func,
    })
  ),
  bulkActionDefs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      function: PropTypes.func,
    })
  ),
  columnDefs: PropTypes.arrayOf(
    PropTypes.shape({
      cell: PropTypes.func,
      field: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
      headerName: PropTypes.string,
      isFilterable: PropTypes.bool,
      isSearchable: PropTypes.bool,
      isSortable: PropTypes.bool,
      type: PropTypes.string,
    })
  ),
  data: PropTypes.array,
  count: PropTypes.number,
  fetchOnPageChange: PropTypes.func,
  resetFilterOnDataChange: PropTypes.bool,
  includeAction: PropTypes.bool,
  mandatoryFields: PropTypes.arrayOf(PropTypes.string),
  tableFooterName: PropTypes.string,
  tableName: PropTypes.string,
  hideBulkCount: PropTypes.bool,
  showResetButton: PropTypes.bool,
};

TableComponent.defaultProps = {
  resetFilterOnDataChange: true,
  resetHideColumnsOnDataChange: true,
  showResetButton: true,
};

export default TableComponent;
