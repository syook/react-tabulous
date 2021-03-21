import PropTypes from 'prop-types';
import React, { Component } from 'react';
import orderBy from 'lodash/orderBy';
import isEqual from 'lodash/isEqual';
import { Checkbox, Table } from 'semantic-ui-react';

import { getTableData, getTableColumns } from '../../components/utils';
import FilterProvider, { FilterContext } from '../filter';
import PaginationProvider, { PaginationContext } from '../pagination';
import SearchProvider, { SearchContext } from '../search';
import SortProvider, { SortContext } from '../sort';

import BulkActionList from '../../components/table/bulk-action-dropdown';
import HeaderSelector from '../../components/table/header-selector';
import TableActions from '../../components/table/actions';
import TableHeader from '../../components/table/header';
import TableCell from '../../components/table/cell';
import StatusIcon from '../../components/status-icon/status-icon';
import './index.css';

class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: getTableColumns(this.props.columnDefs).columnDefs || [],
      bulkSelect: false,
      indeterminateSelect: false,
      selectedRows: [],
      searchKeys: getTableColumns(this.props.columnDefs).searchKeys || [],
      data: [],
    };
  }

  static getDerivedStateFromProps(props, state) {
    const columns = getTableColumns(props.columnDefs).columnDefs || [];
    return {
      data: getTableData(columns, props.data, props.emptyCellPlaceHolder),
    };
  }

  componentDidUpdate(prevProps) {
    const columnDefs = (this.props.columnDefs || []).map(def => def.headerName);
    const prevColumnDefs = (prevProps.columnDefs || []).map(def => def.headerName);
    const columns = getTableColumns(this.props.columnDefs).columnDefs || [];
    if (!isEqual(columnDefs, prevColumnDefs)) {
      this.setState({
        columns,
        searchKeys: getTableColumns(this.props.columnDefs).searchKeys || [],
        data: getTableData(columns, this.props.data, this.props.emptyCellPlaceHolder),
      });
    }
  }

  enableBulkSelect = ({ checked }, data = []) => {
    const selectedRows = checked ? data.map(i => i['_id'] || i['id']) : [];
    this.setState({ bulkSelect: checked, selectedRows, indeterminateSelect: false });
    this.props.getBulkActionState(checked);
  };

  resetBulkSelection = () => {
    this.setState({ bulkSelect: false, indeterminateSelect: false, selectedRows: [] });
  };

  updateSelectedRows = ({ checked }, row_id, rowCount) => {
    let selectedRows = this.state.selectedRows;
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
    this.setState({ selectedRows, bulkSelect, indeterminateSelect });
    if (this.props.getSelectedOrUnselectedId) this.props.getSelectedOrUnselectedId(checked, row_id);
  };

  toggleColumns = (columnName, { checked }) => {
    let columns = [...this.state.columns];
    let updatableColumn = columns.find(c => c.headerName === columnName) || {};
    updatableColumn.isVisible = checked;
    this.setState({ columns });
  };

  toggleAllColumns = checked => {
    const updatedColumns = this.state.columns.map(column => {
      if (this.props.mandatoryFields.includes(column.headerName)) {
        return column;
      }
      column.isVisible = checked;
      return column;
    });
    this.setState({ columns: updatedColumns });
  };

  render() {
    const props = this.props;
    const hasBulkActions = props.showBulkActions && (props.bulkActionDefs || []).length;
    const visibleColumns = this.state.columns.filter(d => d.isVisible);
    const filterableColumns = visibleColumns.filter(d => d.isFilterable);
    const emptyCellPlaceHolder = this.props.emptyCellPlaceHolder || '';
    const hidableColumns = this.state.columns.filter(c => !props.mandatoryFields.includes(c.headerName));

    const hiddenColumnCount = this.state.columns.length - visibleColumns.length;

    return (
      <div className="table-wrapper">
        <SearchProvider {...props} searchKeys={this.state.searchKeys} tableData={this.state.data}>
          <SearchContext.Consumer>
            {searchProps => {
              return (
                <div
                  className="main-table_layout"
                  style={{
                    padding: '0 15px',
                  }}>
                  {hidableColumns.length ? (
                    <HeaderSelector
                      hiddenColumnCount={hiddenColumnCount}
                      columns={hidableColumns}
                      toggleColumns={this.toggleColumns}
                      toggleAllColumns={this.toggleAllColumns}
                    />
                  ) : null}
                  {hasBulkActions && this.state.selectedRows.length ? (
                    <BulkActionList bulkActions={props.bulkActionDefs} selectedRows={this.state.selectedRows} />
                  ) : null}

                  <FilterProvider
                    count={searchProps.count}
                    data={searchProps.data || []}
                    filterableColumns={filterableColumns}
                    columns={this.state.columns}
                    emptyCellPlaceHolder={emptyCellPlaceHolder}>
                    <FilterContext.Consumer>
                      {filterProps => {
                        return (
                          <>
                            {this.props.children ? (
                              <div style={{ display: 'inline-block' }}>
                                {this.props.children(filterProps.data, visibleColumns)}
                              </div>
                            ) : null}
                            <SortProvider
                              data={orderBy(filterProps.data, ['name'], ['asc'])}
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
                                      data={sortProps.data || []}
                                      count={sortProps.count}
                                      fetchOnPageChange={props.fetchOnPageChange}
                                      searchText={searchProps.searchText}
                                      columnName={sortProps.columnName}
                                      direction={sortProps.direction}
                                      columnType={sortProps.columnType}
                                      updateRowsPerPage={searchProps.updateRowsPerPage}
                                      resetPagination={sortProps.resetPagination}
                                      resetBulkSelection={this.resetBulkSelection}
                                      defaultItemsToDisplay={props.defaultItemsToDisplay}>
                                      <PaginationContext.Consumer>
                                        {paginationProps => {
                                          return (
                                            <>
                                              <Table.Header style={{ textAlign: 'center' }}>
                                                <Table.Row>
                                                  {hasBulkActions ? (
                                                    <Table.HeaderCell
                                                      className="bulkAction-check"
                                                      style={{ zIndex: 5 }}>
                                                      <div
                                                        style={{
                                                          display: 'flex',
                                                          justifyContent: 'space-between',
                                                          alignItems: 'center',
                                                          minWidth: '70px',
                                                        }}>
                                                        <Checkbox
                                                          checked={this.state.bulkSelect}
                                                          disabled={!paginationProps.rowCount}
                                                          indeterminate={this.state.indeterminateSelect}
                                                          onChange={(e, { checked }) =>
                                                            this.enableBulkSelect({ checked }, filterProps.data)
                                                          }
                                                        />
                                                      </div>
                                                    </Table.HeaderCell>
                                                  ) : null}
                                                  {this.props.isShowSerialNumber && (
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
                                                              flexDirection: props.showStatusIcon
                                                                ? 'row-reverse'
                                                                : null,
                                                              alignItems: 'baseline',
                                                            }}>
                                                            <Checkbox
                                                              className="bulkAction_check"
                                                              checked={this.state.selectedRows.includes(
                                                                row['_id'] || row['id']
                                                              )}
                                                              onChange={(e, { checked }) =>
                                                                this.updateSelectedRows(
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
                                                      {this.props.isShowSerialNumber && (
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
                                                          data: this.props.data,
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
                                                            data={this.props.data}
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
  includeAction: PropTypes.bool,
  mandatoryFields: PropTypes.arrayOf(PropTypes.string),
  tableFooterName: PropTypes.string,
  tableName: PropTypes.string,
};

TableComponent.defaultProps = {
  showCheckbox: () => {},
};

export default TableComponent;
