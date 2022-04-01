import './index.css';

import React, { useEffect, useReducer, useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Table, Ref, Button, Icon } from 'semantic-ui-react';
import isEqual from 'lodash/isEqual';

import { getTableData, getTableColumns, formatText } from '../../components/utils';
import FilterProvider, { FilterContext } from '../filter/indexFunctionalComponent';
import PaginationProvider, { PaginationContext } from '../pagination/indexFunctioncalComponent';
import SearchProvider, { SearchContext } from '../search/indexFuntionalComponent';
import SortProvider, { SortContext } from '../sort/indexFunctionalComponent';

import BulkActionList from '../../components/table/bulk-action-dropdown';
import HeaderSelector from '../../components/table/headerSelectorV2/header-selector';
import TableActions from '../../components/table/actions';
import TableHeaderProvider from './tabulousHeaderProvider';
import TableCellProvider from './tabulousCellProvider';
import TabulousHeaderComponent from '../../components/table/tableHeader/tabulousHeader';
import TabulousCellComponent from '../../components/table/tabulousCell/tabulousCell';
import StatusIcon from '../../components/status-icon/status-icon';
import KebabDropdown from '../../components/kebabDropdown';

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
  const [useWrapper, setUseWrapper] = useState(false);
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
    dispatch({ type: tableActions.stylesForTable, payload: state.resetStylesForTable });
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
    [state.columns, props.mandatoryFields] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const getStyleObjectForColumn = (width, columnName) => {
    const newStyleKey = `.column${columnName}`;
    const newStyleObj = {};
    newStyleObj[newStyleKey] = { width: `${width}px` };
    return newStyleObj;
  };

  const resize = useCallback(
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
          element.style.width = state.resetStylesForTable[`.column${col}`].width;
        } else {
          element.style.width = width + 'px';
          const newColumnStyleObj = getStyleObjectForColumn(width, col);
          dispatch({ type: tableActions.stylesForTable, payload: newColumnStyleObj });
        }
      }
    },
    [state.resetStylesForTable]
  );

  const getOriginalPropertyOfElement = (element, property) => {
    return parseFloat(getComputedStyle(element, null).getPropertyValue(property).replace('px', ''));
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
      let allColumns = state.columns.map(eachCol => {
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
    [state.columns] // eslint-disable-line react-hooks/exhaustive-deps
  );

  // There is a Reducer state named "resetStylesForTable". This state on the first render needs to be updated to the width of each Column on the first render.
  // The setResetStylesForTable function helps us achieve this.

  const setResetStylesForTable = useCallback(async () => {
    let allColumns = getAllColumns();
    await allColumns.map(async col => {
      const element = tableElement.current.querySelector(`.head${col.colName}`);
      let original_width = getOriginalPropertyOfElement(element, 'width');

      if (!!col.defaultWidth && original_width !== col.defaultWidth) {
        original_width = col.defaultWidth;
      }

      const newColumnStyleObj = getStyleObjectForColumn(original_width, col.colName);

      dispatch({ type: tableActions.setResetTable, payload: newColumnStyleObj });
    });
  }, [state.columns]); // eslint-disable-line react-hooks/exhaustive-deps

  // The below function sets the inline style for each column after we are done setting the state "resetStylesForTable"
  const setInlineStyle = useCallback(
    () => {
      let allColumns = getAllColumns();
      Promise.all(
        allColumns.map(async col => {
          const element = tableElement.current.querySelector(`.head${col.colName}`);
          return resize(col.colName, element);
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
        setUseWrapper(() => true);
        await setInlineStyle();
        dispatch({ type: tableActions.stylesForTable, payload: state.resetStylesForTable });
      }
    };

    setInlineStyleCaller();
  }, [state.resetStylesForTable, useWrapper]); // eslint-disable-line react-hooks/exhaustive-deps

  const FixedSectionWrapper = useCallback(
    props => {
      const styleObject = {
        zIndex: props.childElement === 'header' ? '3' : '',
        top: props.childElement === 'header' ? '0px' : '',
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
  const visibleColumnsToLeft = state.columns.filter(d => d.isVisible && d.fixed === 'left');
  const visibleColumnsToRight = state.columns.filter(d => d.isVisible && d.fixed === 'right');
  const visibleColumns = state.columns.filter(d => d.isVisible && d.fixed !== 'left' && d.fixed !== 'right'); //TODO: probably this only has visible columns only
  const filterableColumns = [
    ...visibleColumns.filter(d => d.isFilterable),
    ...visibleColumnsToLeft.filter(d => d.isFilterable),
    ...visibleColumnsToRight.filter(d => d.isFilterable),
  ];
  const emptyCellPlaceHolder = props.emptyCellPlaceHolder || '';
  const hiddenColumnCount =
    state.columns.length - visibleColumns.length - visibleColumnsToLeft.length - visibleColumnsToRight.length;

  return (
    <div className="tabulousWrapper">
      <SearchProvider {...props} rawData={state.rawData} searchKeys={state.searchKeys} tableData={state.data}>
        <SearchContext.Consumer>
          {searchProps => {
            return (
              <>
                <FilterProvider
                  rawData={searchProps.rawData}
                  count={searchProps.count}
                  data={searchProps.data}
                  filterableColumns={filterableColumns}
                  columns={state.columns}
                  resetFilterOnDataChange={props.resetFilterOnDataChange}
                  accentColor={props.accentColor}
                  emptyCellPlaceHolder={emptyCellPlaceHolder}
                >
                  <FilterContext.Consumer>
                    {filterProps => {
                      return (
                        <>
                          <KebabDropdown
                            options={[
                              state.hiddenColumns.length ? (
                                <HeaderSelector
                                  hiddenColumnCount={hiddenColumnCount}
                                  columns={state.hiddenColumns}
                                  toggleColumns={toggleColumns}
                                  toggleAllColumns={toggleAllColumns}
                                  accentColor={props.accentColor}
                                />
                              ) : null,
                              hasBulkActions && state.selectedRows.length ? (
                                <BulkActionList
                                  bulkActions={props.bulkActionDefs}
                                  selectedRows={state.selectedRows}
                                  hideBulkCount={props.hideBulkCount}
                                />
                              ) : null,
                            ]}
                            accentColor={props.accentColor}
                          />
                          {!props.customPagination && props.children ? (
                            <div style={{ display: 'inline-block' }}>
                              {props.children(filterProps.data, searchProps.searchText, [
                                ...visibleColumnsToLeft,
                                ...visibleColumns,
                                ...visibleColumnsToRight,
                              ])}
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
                            searchText={searchProps.searchText}
                          >
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
                                    defaultItemsToDisplay={props.defaultItemsToDisplay}
                                    customPagination={props.customPagination}
                                    paginationPositionTop={props.paginationPositionTop}
                                    additionalButtons={
                                      props.children
                                        ? props.children(filterProps.data, searchProps.searchText, [
                                            ...visibleColumnsToLeft,
                                            ...visibleColumns,
                                            ...visibleColumnsToRight,
                                          ])
                                        : null
                                    }
                                  >
                                    <div className="tabulous">
                                      <Ref innerRef={tableElement}>
                                        <table sortable celled className="tabulousTable">
                                          <PaginationContext.Consumer>
                                            {paginationProps => {
                                              return (
                                                <>
                                                  <thead>
                                                    <tr>
                                                      <FixedSectionWrapper
                                                        positionedTo={'left'}
                                                        childElement={'header'}
                                                      >
                                                        {visibleColumnsToLeft.map((column, index) =>
                                                          TableHeaderProvider({
                                                            resizeHandler,
                                                            column,
                                                            index,
                                                            sortProps,
                                                            defaultSort: props.defaultSort,
                                                            disabled: !paginationProps.rowCount,
                                                          })
                                                        )}
                                                      </FixedSectionWrapper>
                                                      {hasBulkActions ? (
                                                        <TabulousHeaderComponent>
                                                          <div
                                                            className="headBulkAction"
                                                            style={{
                                                              width: '100%',
                                                            }}
                                                          >
                                                            <Checkbox
                                                              checked={state.bulkSelect}
                                                              disabled={!paginationProps.rowCount}
                                                              indeterminate={state.indeterminateSelect}
                                                              onChange={(e, { checked }) =>
                                                                enableBulkSelect({ checked }, filterProps.data)
                                                              }
                                                            />
                                                          </div>
                                                        </TabulousHeaderComponent>
                                                      ) : null}
                                                      {props.isShowSerialNumber && (
                                                        <TabulousHeaderComponent>
                                                          <div
                                                            className="headSerialNo"
                                                            style={{
                                                              width: '100%',
                                                            }}
                                                          >
                                                            S.No
                                                          </div>
                                                        </TabulousHeaderComponent>
                                                      )}
                                                      {visibleColumns.map((column, index) =>
                                                        TableHeaderProvider({
                                                          resizeHandler,
                                                          column,
                                                          index,
                                                          sortProps,
                                                          defaultSort: props.defaultSort,
                                                          disabled: !paginationProps.rowCount,
                                                        })
                                                      )}
                                                      {!props.actionOnHover && props.includeAction ? (
                                                        <TabulousHeaderComponent>
                                                          <div
                                                            className="headActions"
                                                            style={{
                                                              width: '100%',
                                                            }}
                                                          >
                                                            Actions
                                                          </div>
                                                        </TabulousHeaderComponent>
                                                      ) : null}
                                                      <FixedSectionWrapper
                                                        positionedTo={'right'}
                                                        childElement={'header'}
                                                      >
                                                        {visibleColumnsToRight.map((column, index) =>
                                                          TableHeaderProvider({
                                                            resizeHandler,
                                                            column,
                                                            index,
                                                            sortProps,
                                                            defaultSort: props.defaultSort,
                                                            disabled: !paginationProps.rowCount,
                                                          })
                                                        )}
                                                      </FixedSectionWrapper>
                                                    </tr>
                                                  </thead>
                                                  <Table.Body>
                                                    {paginationProps.data.map((row, index1) => {
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
                                                              return TableCellProvider({
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
                                                            <TabulousCellComponent>
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
                                                            </TabulousCellComponent>
                                                          ) : null}
                                                          {props.isShowSerialNumber && (
                                                            <TabulousCellComponent>
                                                              {paginationProps.startIndex + index1 + 1}
                                                              {props.enableIcon
                                                                ? props.showIcon(paginationProps.rawData[row.objIndex])
                                                                : null}
                                                            </TabulousCellComponent>
                                                          )}
                                                          {visibleColumns.map((column, index2) => {
                                                            const styleSetTo =
                                                              state.stylesForTable[
                                                                `.column${formatText(column.headerName)}`
                                                              ];
                                                            return TableCellProvider({
                                                              column,
                                                              index2,
                                                              data: paginationProps.rawData,
                                                              row,
                                                              emptyCellPlaceHolder,
                                                              styleSetTo,
                                                            });
                                                          })}
                                                          {props.includeAction ? (
                                                            <TabulousCellComponent>
                                                              <Table.Cell className="table-action_buttons">
                                                                <TableActions
                                                                  actionOnHover={props.actionOnHover}
                                                                  actions={props.actionDefs}
                                                                  row={row}
                                                                  data={paginationProps.rawData}
                                                                />
                                                              </Table.Cell>
                                                            </TabulousCellComponent>
                                                          ) : null}
                                                          <FixedSectionWrapper positionedTo={'right'}>
                                                            {visibleColumnsToRight.map((column, index2) => {
                                                              const styleSetTo =
                                                                state.stylesForTable[
                                                                  `.column${formatText(column.headerName)}`
                                                                ];
                                                              return TableCellProvider({
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
                                        </table>
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
              </>
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
  customPagination: PropTypes.func,
  paginationPositionTop: PropTypes.bool,
  showSearch: PropTypes.bool,
};

TableComponent.defaultProps = {
  resetFilterOnDataChange: true,
  resetHideColumnsOnDataChange: true,
  showSearch: true,
};

export default TableComponent;
