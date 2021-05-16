import './index.css';

import React, { useEffect, useReducer, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Table } from 'semantic-ui-react';
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
      return { ...state, selectedRows: [...(action.searchKeys || [])] };
    case tableActions.hiddenColumns:
      return { ...state, hiddenColumns: [...(action.payload || [])] };
    case tableActions.data:
      return { ...state, data: [...(action.payload || [])] };
    case tableActions.rawData:
      return { ...state, rawData: [...(action.payload || [])] };
    default:
      return state;
  }
}

function TableComponent(props) {
  const columnAndKeys = getTableColumns(props.columnDefs);
  const [state, dispatch] = useReducer(reducer, {
    columns: columnAndKeys.columnDefs,
    bulkSelect: false,
    indeterminateSelect: false,
    selectedRows: [],
    searchKeys: columnAndKeys.searchKeys,
    hiddenColumns: columnAndKeys.columnDefs.filter(c => !props.mandatoryFields.includes(c.headerName)),
    data: getTableData(columnAndKeys.columnDefs, [...props.data]),
    rawData: props.data,
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
  }, [props.data, props.columnDefs, props.emptyCellPlaceHolder]); //props.columnDefs

  const enableBulkSelect = useCallback(
    ({ checked }, data = []) => {
      const selectedRows = checked ? data.map(i => i['_id'] || i['id']) : [];
      dispatch({ type: tableActions.bulkSelect, payload: checked });
      dispatch({ type: tableActions.selectedRows, payload: selectedRows });
      dispatch({ type: tableActions.indeterminateSelect, payload: false });
      if (props.getBulkActionState) props.getBulkActionState(checked);
    },
    [props.getBulkActionState]
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
    [state.selectedRows, props.getSelectedOrUnselectedId]
  );

  const toggleColumns = useCallback(
    (columnName, { checked }) => {
      let columns = [...state.columns];
      let updatableColumn = columns.find(c => c.headerName === columnName) || {};
      updatableColumn.isVisible = checked;
      const hiddenColumns = columns.filter(c => !props.mandatoryFields.includes(c.headerName));
      dispatch({ type: tableActions.columns, payload: columns });
      dispatch({ type: tableActions.hiddenColumns, payload: hiddenColumns });
    },
    [state.columns]
  );

  const toggleAllColumns = useCallback(
    checked => {
      const updatedColumns = state.columns.map(column => {
        if (props.mandatoryFields.includes(column.headerName)) {
          return column;
        }
        column.isVisible = checked;
        return column;
      });

      const hiddenColumns = updatedColumns.filter(c => !props.mandatoryFields.includes(c.headerName));
      dispatch({ type: tableActions.columns, payload: updatedColumns });
      dispatch({ type: tableActions.hiddenColumns, payload: hiddenColumns });
    },
    [state.columns, props.mandatoryFields]
  );

  const hasBulkActions = props.showBulkActions && (props.bulkActionDefs || []).length;
  const visibleColumns = state.columns.filter(d => d.isVisible); //TODO: probably this only has visible columns only
  const filterableColumns = visibleColumns.filter(d => d.isFilterable);
  const emptyCellPlaceHolder = props.emptyCellPlaceHolder || '';
  const hiddenColumnCount = state.columns.length - visibleColumns.length;
  console.log('STATE', state, 'PROPS', props);

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
                  <BulkActionList bulkActions={props.bulkActionDefs} selectedRows={state.selectedRows} />
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
                          {props.children ? (
                            <div style={{ display: 'inline-block' }}>
                              {props.children(filterProps.data, searchProps.searchText, visibleColumns)}
                            </div>
                          ) : null}
                          <SortProvider
                            data={filterProps.data}
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
                                    <PaginationContext.Consumer>
                                      {paginationProps => {
                                        return (
                                          <>
                                            <Table.Header style={{ textAlign: 'center' }}>
                                              <Table.Row>
                                                {hasBulkActions ? (
                                                  <Table.HeaderCell className="bulkAction-check" style={{ zIndex: 5 }}>
                                                    <div
                                                      style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        minWidth: '70px',
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
                                                      style={{
                                                        textAlign: 'right',
                                                        margin: '0 auto',
                                                      }}>
                                                      S.No
                                                    </div>
                                                  </Table.HeaderCell>
                                                )}
                                                {visibleColumns.map((column, index) =>
                                                  TableHeader({
                                                    column,
                                                    index,
                                                    sortProps,
                                                    defaultSort: props.defaultSort,
                                                    disabled: !paginationProps.rowCount,
                                                  })
                                                )}
                                                {!props.actionOnHover ? (
                                                  props.includeAction ? (
                                                    <Table.HeaderCell style={{ zIndex: 5 }}>Actions</Table.HeaderCell>
                                                  ) : null
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
                                                            justifyContent: 'space-between',
                                                            flexDirection: props.showStatusIcon ? 'row-reverse' : null,
                                                            alignItems: 'baseline',
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
                                                            <StatusIcon showStatusIcon={props.showStatusIcon(row)} />
                                                          ) : null}
                                                        </div>
                                                      </Table.Cell>
                                                    ) : null}
                                                    {props.isShowSerialNumber && (
                                                      <Table.Cell>
                                                        <div
                                                          style={{
                                                            textAlign: 'right',
                                                            margin: '0 auto',
                                                          }}>
                                                          {paginationProps.startIndex + index1 + 1}
                                                          {props.enableIcon ? props.showIcon(row) : null}
                                                        </div>
                                                      </Table.Cell>
                                                    )}

                                                    {visibleColumns.map((column, index2) =>
                                                      TableCell({
                                                        column,
                                                        index2,
                                                        data: paginationProps.rawData,
                                                        row,
                                                        emptyCellPlaceHolder,
                                                      })
                                                    )}
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
};

TableComponent.defaultProps = {
  resetFilterOnDataChange: true,
  resetHideColumnsOnDataChange: true,
};

export default TableComponent;
