import './index.css';

import React, { useEffect, useReducer, useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Table, Ref, Button, Icon } from 'semantic-ui-react';
import isEqual from 'lodash/isEqual';
import { cloneDeep } from 'lodash';

import { getTableData, getTableColumns, formatText } from '../../components/utils';
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

import { useDispatch, useSelector } from 'react-redux';
import { tabulousActions } from '../../store/tabulous-slice';

function reducer(state, action) {
  switch (action.type) {
    case tableActions.stylesForTable:
      return { ...state, stylesForTable: { ...state.stylesForTable, ...action.payload } };
    case tableActions.eraseStyles:
      return { ...state, stylesForTable: {} };
    case tableActions.setResetTable:
      return { ...state, resetStylesForTable: { ...state.resetStylesForTable, ...action.payload } };
    case tableActions.previousResetStyles:
      return { ...state, previousResetStyles: [...state.previousResetStyles, action.payload] };
    default:
      return state;
  }
}

function TableComponent(props) {
  const dispatchRedux = useDispatch();
  const tabulousState = useSelector(state => state.tabulous);

  const tableElement = useRef(null);
  const [useWrapper, setUseWrapper] = useState(false);
  const [state, dispatch] = useReducer(reducer, {
    resetStylesForTable: {},
    stylesForTable: {},
    previousResetStyles: [],
  });
  // showResetButton: true, //props.showResetButton && columnAndKeys.columnDefs.some(c => c.isResizable),

  //My useEffect for above useEffect
  useEffect(() => {
    // let columnAndKeys = {
    //   searchKeys: { ...(tabulousState.searchKeys || {}) },
    //   columnDefs: [...(tabulousState.columns || [])],
    // };
    // let columns = columnAndKeys.columnDefs || [];
    // const columnDefsHeaderNames = (props.columnDefs || []).map(def => def.headerName);
    // const stateColumnsHeaderNames = tabulousState.columns.map(c => c.headerName);
    // if (props.resetHideColumnsOnDataChange || !isEqual(columnDefsHeaderNames, stateColumnsHeaderNames)) {
    const columnAndKeys = getTableColumns([...props.columnDefs]);
    let columns = columnAndKeys.columnDefs || [];
    // }
    const data = getTableData(columns, [...props.data], props.emptyCellPlaceHolder);

    dispatchRedux(
      tabulousActions.setShowResetButton({
        bool: props.showResetButton && columnAndKeys.columnDefs.some(c => c.isResizable),
      })
    );

    dispatchRedux(
      tabulousActions.updateHiddenColumns({
        hiddenColumns: columnAndKeys.columnDefs.filter(c => !props.mandatoryFields.includes(c.headerName)),
      })
    );

    dispatchRedux(
      tabulousActions.updateRawData({
        rawData: props.data,
      })
    );
    dispatchRedux(
      tabulousActions.updateData({
        data: data,
      })
    );
    dispatchRedux(
      tabulousActions.updateColumns({
        col: columns,
      })
    );
    dispatchRedux(
      tabulousActions.updateSearchKeys({
        searchKeys: columnAndKeys.searchKeys,
      })
    );
  }, [props.columnDefs]);

  // My enableBulkSelect function
  const newEnableBulkSelect = useCallback(
    ({ checked }, data = []) => {
      const selectedRows = checked ? data.map(i => i['_id'] || i['id']) : [];
      dispatchRedux(
        tabulousActions.updateBulkSelect({
          bulkSelect: checked,
        })
      );
      dispatchRedux(
        tabulousActions.updateSelectedRows({
          selectedRows: selectedRows,
        })
      );
      dispatchRedux(
        tabulousActions.updateIndeterminateSelect({
          indeterminateSelect: false,
        })
      );

      if (props.getBulkActionState) props.getBulkActionState(checked);
    },
    [props.getBulkActionState] // eslint-disable-line react-hooks/exhaustive-deps
  );

  // My resetBulkSelection function
  const newResetBulkSelection = useCallback(() => {
    dispatchRedux(
      tabulousActions.updateBulkSelect({
        bulkSelect: false,
      })
    );
    dispatchRedux(
      tabulousActions.updateSelectedRows({
        selectedRows: [],
      })
    );
    dispatchRedux(
      tabulousActions.updateIndeterminateSelect({
        indeterminateSelect: false,
      })
    );
  }, []);

  //My updateSelectedRows function
  const newUpdateSelectedRows = useCallback(
    ({ checked }, row_id, rowCount) => {
      let selectedRows = cloneDeep(tabulousState.selectedRows);
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
      dispatchRedux(
        tabulousActions.updateBulkSelect({
          bulkSelect: bulkSelect,
        })
      );
      dispatchRedux(
        tabulousActions.updateSelectedRows({
          selectedRows: selectedRows,
        })
      );
      dispatchRedux(
        tabulousActions.updateIndeterminateSelect({
          indeterminateSelect: indeterminateSelect,
        })
      );
      if (props.getSelectedOrUnselectedId) props.getSelectedOrUnselectedId(checked, row_id);
    },
    [tabulousState.selectedRows, props.getSelectedOrUnselectedId] // eslint-disable-line react-hooks/exhaustive-deps
  );

  //My resetHandler function
  const newResetHandler = () => {
    console.log(tabulousState.hiddenColumns);
    // dispatch({ type: tableActions.eraseStyles });
    // newSetInlineStyle();
    // dispatch({ type: tableActions.stylesForTable, payload: state.resetStylesForTable });
  };

  // My toggleColumns function
  const newToggleColumns = useCallback(
    async (columnName, { checked }) => {
      let columns = cloneDeep(tabulousState.columns);
      let updatableColumn = columns.find(c => c.headerName === columnName) || {};
      updatableColumn.isVisible = checked;
      const hiddenColumns = columns.filter(c => !props.mandatoryFields.includes(c.headerName));
      await dispatchRedux(
        tabulousActions.updateColumns({
          col: columns,
        })
      );
      await dispatchRedux(tabulousActions.updateHiddenColumns({ hiddenColumns: hiddenColumns }));
      newResetHandler();
    },
    [tabulousState.columns] // eslint-disable-line react-hooks/exhaustive-deps
  );

  // My toggleAllColumns function
  const newToggleAllColumns = useCallback(
    async checked => {
      const updatedColumns = tabulousState.columns.map(column => {
        if (props.mandatoryFields.includes(column.headerName)) {
          return column;
        }
        column.isVisible = checked;
        return column;
      });

      const hiddenColumns = updatedColumns.filter(c => !props.mandatoryFields.includes(c.headerName));
      await dispatchRedux(
        tabulousActions.updateColumns({
          col: updatedColumns,
        })
      );
      await dispatchRedux(tabulousActions.updateHiddenColumns({ hiddenColumns: hiddenColumns }));
      newResetHandler();
    },
    [tabulousState.columns, props.mandatoryFields] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const getStyleObjectForColumn = (width, columnName) => {
    const newStyleKey = `.column${columnName}`;
    const newStyleObj = {};
    newStyleObj[newStyleKey] = { width: `${width}px` };
    return newStyleObj;
  };

  // My resize function
  const newResize = useCallback(
    async (col, element, original_width = 20, original_mouse_x, e) => {
      let width = 0;
      if (!element) {
        return;
      }

      if (!!e) {
        width = original_width + (e.pageX - original_mouse_x);
      } else {
        width = original_width;
      }
      if (width >= 20) {
        if (!e) {
          if (!state.resetStylesForTable[`.column${col}`]) {
            console.log(col, state.resetStylesForTable);
            return;
          }
          element.style.width = state.resetStylesForTable[`.column${col}`].width;
        } else {
          element.style.width = width + 'px';
          const newColumnStyleObj = getStyleObjectForColumn(width, col);
          // dispatchRedux(tabulousActions.updateStylesForTable({ stylesForTable: newColumnStyleObj }));
          dispatch({ type: tableActions.stylesForTable, payload: newColumnStyleObj });
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

  // my resizeHandler function
  const newResizeHandler = async (col, e) => {
    e.stopPropagation();
    const element = tableElement.current.querySelector(`.head${col}`);
    e.preventDefault();
    let original_width = getOriginalPropertyOfElement(element, 'width');
    let original_mouse_x = e.pageX;

    const refFunc = async e => {
      await newResize(col, element, original_width, original_mouse_x, e);
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
  // My getAllColumns function
  const newGetAllColumns = useCallback(
    () => {
      let allColumns = tabulousState.columns.map(eachCol => {
        return {
          colName: formatText(eachCol.headerName),
          fixed: eachCol.fixed,
          defaultWidth: eachCol.defaultWidth,
        };
      });
      if (props.isShowSerialNumber) {
        allColumns = [{ colName: 'SerialNo' }, ...allColumns];
      }
      if (hasBulkActions) {
        allColumns = [{ colName: 'BulkAction' }, ...allColumns];
      }
      if (props.includeAction) {
        allColumns = [...allColumns, { colName: 'Actions' }];
      }
      return allColumns;
    },
    [tabulousState.columns] // eslint-disable-line react-hooks/exhaustive-deps
  );

  // There is a Reducer state named "resetStylesForTable". This state on the first render needs to be updated to the width of each Column on the first render.
  // The setResetStylesForTable function helps us achieve this.
  // My setResetStylesForTable Function
  const newSetResetStylesForTable = useCallback(async () => {
    let allColumns = newGetAllColumns();
    await allColumns.map(async col => {
      const element = tableElement.current.querySelector(`.head${col.colName}`);
      let original_width = getOriginalPropertyOfElement(element, 'width');

      if (!!col.defaultWidth && original_width > col.defaultWidth) {
        original_width = col.defaultWidth;
      }

      const newColumnStyleObj = getStyleObjectForColumn(original_width, col.colName);

      dispatch({ type: tableActions.setResetTable, payload: newColumnStyleObj });
    });
  }, [tabulousState.columns]);

  // The below function sets the inline style for each column after we are done setting the state "resetStylesForTable"
  // My setInlineStyle function
  const newSetInlineStyle = useCallback(
    async () => {
      let allColumns = newGetAllColumns();
      Promise.all(
        allColumns.map(async col => {
          const element = tableElement.current.querySelector(`.head${col.colName}`);
          return newResize(col.colName, element);
        })
      );
      tableElement.current.style.width = 'fit-content';
    },
    [tabulousState.columns, state.resetStylesForTable] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const [continueRun, setContinueRun] = useState(true);

  // My useEffect for above
  useEffect(() => {
    const setInlineStyleCaller = async () => {
      let totalCols = newGetAllColumns().length;
      if (tabulousState.columns.length === 0) {
        return;
      }
      // if (Object.keys(state.resetStylesForTable).length < totalCols) {
      //   console.log(">>>");
      //   await newSetResetStylesForTable();
      // }
      if (continueRun) {
        await newSetResetStylesForTable();
      }
      // console.log(state.previousResetStyles);
      // console.log(state.resetStylesForTable);
      if (
        isEqual(state.previousResetStyles.at(-1), state.resetStylesForTable) &&
        Object.keys(state.resetStylesForTable).length !== 0
      ) {
        setContinueRun(() => false);
      }
      // console.log(state.previousResetStyles.at(-1));
      // console.log(state.resetStylesForTable);
      // };
      await dispatch({ type: tableActions.previousResetStyles, payload: state.resetStylesForTable });
      if (Object.keys(state.resetStylesForTable).length === totalCols && !continueRun) {
        setUseWrapper(state => true);
        await newSetInlineStyle();
        // await dispatchRedux(
        //   tabulousActions.updateStylesForTable({ stylesForTable: tabulousState.resetStylesForTable })
        // );
        dispatch({ type: tableActions.stylesForTable, payload: state.resetStylesForTable });
      }
    };

    setInlineStyleCaller();
  }, [tabulousState.columns, state.resetStylesForTable, useWrapper, continueRun]);

  // My resetButton function
  const newResetButton = () => {
    return (
      <Button
        disabled={props.disabled}
        style={{
          backgroundColor: props.accentColor ? 'rgb(170, 170, 170)' : 'rgba(241, 196, 15, 0.8)',
          color: '#fff',
          marginRight: '10px',
        }}
        onClick={newResetHandler}>
        <Icon name="redo" /> {'Reset'}
      </Button>
    );
  };

  const FixedSectionWrapper = useCallback(
    props => {
      const styleObject = {
        zIndex: props?.children[0]?.props.as === 'th' ? '3' : '',
        top: props?.children[0]?.props.as === 'th' ? '0px' : '',
      };
      if (
        props.children.length !== 0 &&
        useWrapper &&
        (props.positionedTo === 'left' || props.positionedTo === 'right')
      )
        return (
          <td className={`fixed-column-${props.positionedTo}`} style={styleObject}>
            <table>
              <tbody>
                <tr>{props.children}</tr>
              </tbody>
            </table>
          </td>
        );
      return props.children;
    },
    [useWrapper]
  );

  const hasBulkActions = props.showBulkActions && (props.bulkActionDefs || []).length;
  const visibleColumnsToLeft = tabulousState.columns.filter(d => d.isVisible && d.fixed === 'left');
  const visibleColumnsToRight = tabulousState.columns.filter(d => d.isVisible && d.fixed === 'right');
  const visibleColumns = tabulousState.columns.filter(d => d.isVisible && d.fixed !== 'left' && d.fixed !== 'right'); //TODO: probably this only has visible columns only
  const filterableColumns = [
    ...visibleColumns.filter(d => d.isFilterable),
    ...visibleColumnsToLeft.filter(d => d.isFilterable),
    ...visibleColumnsToRight.filter(d => d.isFilterable),
  ];
  const emptyCellPlaceHolder = props.emptyCellPlaceHolder || '';
  const hiddenColumnCount =
    tabulousState.columns.length - visibleColumns.length - visibleColumnsToLeft.length - visibleColumnsToRight.length;

  return (
    <div className="table-wrapper">
      <SearchProvider
        {...props}
        rawData={tabulousState.rawData}
        searchKeys={tabulousState.searchKeys}
        tableData={tabulousState.data}>
        <SearchContext.Consumer>
          {searchProps => {
            return (
              <div
                className="main-table_layout"
                style={{
                  padding: '0 15px',
                  width: '100%',
                }}>
                {tabulousState.hiddenColumns.length ? (
                  <HeaderSelector
                    hiddenColumnCount={hiddenColumnCount}
                    columns={tabulousState.hiddenColumns}
                    toggleColumns={newToggleColumns}
                    toggleAllColumns={newToggleAllColumns}
                    accentColor={props.accentColor}
                  />
                ) : null}
                {hasBulkActions && tabulousState.selectedRows.length ? (
                  <BulkActionList
                    bulkActions={props.bulkActionDefs}
                    selectedRows={tabulousState.selectedRows}
                    hideBulkCount={props.hideBulkCount}
                  />
                ) : null}

                <FilterProvider
                  rawData={searchProps.rawData}
                  count={searchProps.count}
                  data={searchProps.data}
                  filterableColumns={filterableColumns}
                  columns={tabulousState.columns}
                  resetFilterOnDataChange={props.resetFilterOnDataChange}
                  accentColor={props.accentColor}
                  emptyCellPlaceHolder={emptyCellPlaceHolder}>
                  <FilterContext.Consumer>
                    {filterProps => {
                      return (
                        <>
                          {tabulousState.showResetButton && newResetButton()}
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
                                    resetBulkSelection={newResetBulkSelection}
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
                                                      <FixedSectionWrapper positionedTo={'left'}>
                                                        {visibleColumnsToLeft.map((column, index) =>
                                                          TableHeader({
                                                            resizeHandler: newResizeHandler,
                                                            column,
                                                            index,
                                                            sortProps,
                                                            defaultSort: props.defaultSort,
                                                            disabled: !paginationProps.rowCount,
                                                          })
                                                        )}
                                                      </FixedSectionWrapper>
                                                      {hasBulkActions ? (
                                                        <Table.HeaderCell className="bulkAction-check">
                                                          <div
                                                            className="headBulkAction"
                                                            style={{
                                                              width: '100%',
                                                            }}>
                                                            <Checkbox
                                                              checked={tabulousState.bulkSelect}
                                                              disabled={!paginationProps.rowCount}
                                                              indeterminate={tabulousState.indeterminateSelect}
                                                              onChange={(e, { checked }) =>
                                                                newEnableBulkSelect({ checked }, filterProps.data)
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
                                                          resizeHandler: newResizeHandler,
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
                                                      <FixedSectionWrapper positionedTo={'right'}>
                                                        {visibleColumnsToRight.map((column, index) =>
                                                          TableHeader({
                                                            resizeHandler: newResizeHandler,
                                                            column,
                                                            index,
                                                            sortProps,
                                                            defaultSort: props.defaultSort,
                                                            disabled: !paginationProps.rowCount,
                                                          })
                                                        )}
                                                      </FixedSectionWrapper>
                                                    </Table.Row>
                                                  </Table.Header>
                                                  <Table.Body>
                                                    {paginationProps.data.map((row, index1) => {
                                                      //This here has the filtered data
                                                      const includeCheckbox = props.showCheckbox
                                                        ? props.showCheckbox(row)
                                                        : false;
                                                      return (
                                                        <Table.Row key={`column-${index1}`} className="main-table-row">
                                                          <FixedSectionWrapper positionedTo={'left'}>
                                                            {visibleColumnsToLeft.map((column, index2) => {
                                                              const styleSetTo =
                                                                state.stylesForTable[
                                                                  `.column${formatText(column.headerName)}`
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
                                                          </FixedSectionWrapper>
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
                                                                  checked={tabulousState.selectedRows.includes(
                                                                    row['_id'] || row['id']
                                                                  )}
                                                                  onChange={(e, { checked }) =>
                                                                    newUpdateSelectedRows(
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
                                                                `.column${formatText(column.headerName)}`
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
                                                          <FixedSectionWrapper positionedTo={'right'}>
                                                            {visibleColumnsToRight.map((column, index2) => {
                                                              const styleSetTo =
                                                                state.stylesForTable[
                                                                  `.column${formatText(column.headerName)}`
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
                                                          </FixedSectionWrapper>
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
      isResizable: PropTypes.bool,
      fixed: PropTypes.string,
      defaultWidth: PropTypes.number,
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
