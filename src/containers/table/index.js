import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Checkbox, Table } from 'semantic-ui-react';

import FilterProvider, { FilterContext } from '../filter';
import PaginationProvider, { PaginationContext } from '../pagination';
import SearchProvider, { SearchContext } from '../search';
import SortProvider, { SortContext } from '../sort';

import BulkActionList from '../../components/table/bulkActionDropdown';
import HeaderSelector from '../../components/table/headerSelector';
import TableActions from '../../components/table/actions';
import TableHeader from '../../components/table/header';
import TableCell from '../../components/table/cell';
import './index.css';

class TableComponent extends Component {
  constructor(props) {
    const searchKeys = {};
    super(props);
    this.state = {
      columns:
        (props.columnDefs || []).map(record => {
          if (record.isSearchable && record.field) {
            searchKeys[record.field] = true;
          }
          record.isVisible = true;
          return record;
        }) || [],
      bulkSelect: false,
      indeterminateSelect: false,
      selectedRows: [],
      searchKeys: searchKeys,
    };
  }

  enableBulkSelect = ({ checked }, data = []) => {
    const selectedRows = checked ? data.map(i => i['_id'] || i['id']) : [];
    this.setState({ bulkSelect: checked, selectedRows, indeterminateSelect: false });
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
  };

  toggleColumns = (columnName, { checked }) => {
    let columns = this.state.columns || [];
    let updatableColumn = this.state.columns.find(c => c.headerName === columnName) || {};
    updatableColumn.isVisible = checked;
    this.setState({ columns: [...columns] });
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
    const hasBulkActions = (props.bulkActionDefs || []).length;
    const visibleColumns = this.state.columns.filter(d => d.isVisible);
    const filterableColumns = visibleColumns.filter(d => d.isFilterable);

    const hiddenColumnCount = this.state.columns.length - visibleColumns.length;
    return (
      <SearchProvider {...props} searchKeys={this.state.searchKeys}>
        <SearchContext.Consumer>
          {searchProps => (
            <div
              className="main-table_layout"
              style={{
                padding: '0 15px',
              }}>
              <HeaderSelector
                hiddenColumnCount={hiddenColumnCount}
                columns={this.state.columns.filter(c => !props.mandatoryFields.includes(c.headerName))}
                toggleColumns={this.toggleColumns}
                toggleAllColumns={this.toggleAllColumns}
              />
              {hasBulkActions && this.state.selectedRows.length ? (
                <BulkActionList bulkActions={props.bulkActionDefs} selectedRows={this.state.selectedRows} />
              ) : null}

              <FilterProvider
                data={searchProps.data || []}
                filterableColumns={filterableColumns}
                columns={this.state.columns}>
                <FilterContext.Consumer>
                  {filterProps => (
                    <>
                      {this.props.children ? (
                        <div style={{ gridColumn: '3/4', gridRow: '1/2', alignSelf: 'center' }}>
                          {this.props.children}
                        </div>
                      ) : null}
                      <SortProvider data={filterProps.data || []}>
                        <SortContext.Consumer>
                          {sortProps => (
                            <PaginationProvider
                              {...props}
                              data={sortProps.data || []}
                              resetPagination={sortProps.resetPagination}
                              resetBulkSelection={this.resetBulkSelection}>
                              <PaginationContext.Consumer>
                                {paginationProps => (
                                  <>
                                    <Table.Header style={{ textAlign: 'center' }}>
                                      <Table.Row>
                                        {hasBulkActions ? (
                                          <Table.HeaderCell>
                                            <Checkbox
                                              checked={this.state.bulkSelect}
                                              disabled={!paginationProps.rowCount}
                                              indeterminate={this.state.indeterminateSelect}
                                              onChange={(e, { checked }) =>
                                                this.enableBulkSelect({ checked }, filterProps.data)
                                              }
                                            />
                                          </Table.HeaderCell>
                                        ) : null}
                                        <Table.HeaderCell>S.No </Table.HeaderCell>
                                        {visibleColumns.map((column, index) =>
                                          TableHeader({
                                            column,
                                            index,
                                            sortProps,
                                            disabled: !paginationProps.rowCount,
                                          })
                                        )}
                                        {props.includeAction ? <Table.HeaderCell> Actions </Table.HeaderCell> : null}
                                      </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                      {paginationProps.data.map((row, index1) => (
                                        <Table.Row key={index1}>
                                          {hasBulkActions ? (
                                            <Table.Cell>
                                              <Checkbox
                                                checked={this.state.selectedRows.includes(row['_id'] || row['id'])}
                                                onChange={(e, { checked }) =>
                                                  this.updateSelectedRows(
                                                    { checked },
                                                    row['_id'] || row['id'],
                                                    paginationProps.rowCount
                                                  )
                                                }
                                              />
                                            </Table.Cell>
                                          ) : null}

                                          <Table.Cell>
                                            <label>{paginationProps.startIndex + index1 + 1}</label>
                                          </Table.Cell>

                                          {visibleColumns.map((column, index2) =>
                                            TableCell({ column, index2, data: paginationProps, row })
                                          )}
                                          {props.includeAction ? (
                                            <Table.Cell style={{ whiteSpace: 'nowrap' }}>
                                              <TableActions actions={props.actionDefs} row={row} />
                                            </Table.Cell>
                                          ) : null}
                                        </Table.Row>
                                      ))}
                                    </Table.Body>
                                  </>
                                )}
                              </PaginationContext.Consumer>
                            </PaginationProvider>
                          )}
                        </SortContext.Consumer>
                      </SortProvider>
                    </>
                  )}
                </FilterContext.Consumer>
              </FilterProvider>
            </div>
          )}
        </SearchContext.Consumer>
      </SearchProvider>
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
      field: PropTypes.string,
      headerName: PropTypes.string,
      isFilterable: PropTypes.bool,
      isSearchable: PropTypes.bool,
      isSortable: PropTypes.bool,
      type: PropTypes.string,
    })
  ),
  data: PropTypes.array,
  includeAction: PropTypes.bool,
  mandatoryFields: PropTypes.arrayOf(PropTypes.string),
  tableFooterName: PropTypes.string,
  tableName: PropTypes.string,
};

export default TableComponent;
