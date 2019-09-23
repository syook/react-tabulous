import PropTypes from 'prop-types';
import React, { Component } from 'react';
import orderBy from 'lodash/orderBy';
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
        (props.columnDefs || [])
          .filter(c => c.omitInHideList !== true)
          .map(record => {
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
    const hasBulkActions = props.showBulkActions && (props.bulkActionDefs || []).length;
    const visibleColumns = this.state.columns.filter(d => d.isVisible);
    const filterableColumns = visibleColumns.filter(d => d.isFilterable);

    const hidableColumns = this.state.columns.filter(c => !props.mandatoryFields.includes(c.headerName));

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
                data={searchProps.data || []}
                filterableColumns={filterableColumns}
                columns={this.state.columns}>
                <FilterContext.Consumer>
                  {filterProps => (
                    <>
                      {this.props.children ? (
                        <div style={{ display: 'inline-block' }}>{this.props.children}</div>
                      ) : null}
                      <SortProvider data={orderBy(filterProps.data, ['name'], ['asc'])}>
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
                                        <Table.HeaderCell className="bulkAction-check" style={{ zIndex: 5 }}>
                                          {hasBulkActions ? (
                                            <Checkbox
                                              checked={this.state.bulkSelect}
                                              disabled={!paginationProps.rowCount}
                                              indeterminate={this.state.indeterminateSelect}
                                              onChange={(e, { checked }) =>
                                                this.enableBulkSelect({ checked }, filterProps.data)
                                              }
                                            />
                                          ) : null}
                                          <span> S.No </span>
                                        </Table.HeaderCell>
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
                                        const includeCheckbox = props.showCheckbox(row);
                                        return (
                                          <Table.Row key={`column-${index1}`} className="main-table-row">
                                            <Table.Cell>
                                              <div
                                                style={{
                                                  display: 'flex',
                                                  justifyContent:
                                                    includeCheckbox !== false ? 'flex-end' : 'space-between',
                                                }}>
                                                {hasBulkActions && includeCheckbox !== false ? (
                                                  <Checkbox
                                                    className="bulkAction_check"
                                                    checked={this.state.selectedRows.includes(row['_id'] || row['id'])}
                                                    onChange={(e, { checked }) =>
                                                      this.updateSelectedRows(
                                                        { checked },
                                                        row['_id'] || row['id'],
                                                        paginationProps.rowCount
                                                      )
                                                    }
                                                  />
                                                ) : null}
                                                <div
                                                  style={{
                                                    textAlign: 'right',
                                                    marginRight: '10px',
                                                  }}>
                                                  {paginationProps.startIndex + index1 + 1}
                                                </div>
                                              </div>
                                            </Table.Cell>

                                            {visibleColumns.map((column, index2) =>
                                              TableCell({ column, index2, data: paginationProps, row })
                                            )}
                                            {props.includeAction ? (
                                              <Table.Cell className="table-action_buttons">
                                                <TableActions
                                                  actionOnHover={props.actionOnHover}
                                                  actions={props.actionDefs}
                                                  row={row}
                                                />
                                              </Table.Cell>
                                            ) : null}
                                          </Table.Row>
                                        );
                                      })}
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

TableComponent.defaultProps = {
  showCheckbox: () => {},
};

export default TableComponent;
