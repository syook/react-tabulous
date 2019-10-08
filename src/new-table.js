import { Checkbox, Icon, Label, Table } from 'semantic-ui-react';
import React, { Component } from 'react';

import BulkActionList from './bulk-action-dropdown';
import HeaderSelector from './header-selector';
import { PaginationContext } from './pagination';
import PaginationProvider from './pagination';
import { SearchContext } from './search-provider';
import SearchProvider from './search-provider';

import { FilterContext } from './filter-provider';
import FilterProvider from './filter-provider';

import { SortContext } from './sort';
import SortProvider from './sort';
import TableActions from './table-actions';

class TableComponent extends Component {
  constructor(props) {
    const searchKeys = {};
    (props.records || []).map(r => {
      if (r.isSearchable) searchKeys[r.column] = true;
      return r;
    });
    super(props);
    this.state = {
      columns:
        (props.records || []).map(record => {
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

  toggleColumns = (column, { checked }) => {
    let columns = this.state.columns;
    let updatedColumn = this.state.columns.find(c => c.heading === column) || {};
    updatedColumn.isVisible = !checked;
    this.setState({ columns });
  };

  render() {
    const props = this.props;
    const hasBulkActions = (props.bulkActions || []).length;
    const visibleColumns = this.state.columns.filter(d => d.isVisible);
    const filterableColumns = visibleColumns.filter(d => d.isFilterable);

    const hiddenColumnCount = this.state.columns.length - visibleColumns.length;
    return (
      <SearchProvider {...props} searchKeys={this.state.searchKeys}>
        <SearchContext.Consumer>
          {searchProps =>
            !!searchProps.data.length && (
              <div>
                <HeaderSelector
                  hiddenColumnCount={hiddenColumnCount}
                  columns={this.state.columns.filter(c => !props.mandatoryFields.includes(c.heading))}
                  toggleColumns={this.toggleColumns}
                />
                {hasBulkActions && this.state.selectedRows.length ? (
                  <BulkActionList bulkActions={props.bulkActions} selectedRows={this.state.selectedRows}/>
                ) : null}
                <FilterProvider
                  data={searchProps.data || []}
                  filterableColumns={filterableColumns}
                  columns={this.state.columns}>
                  <FilterContext.Consumer>
                    {filterProps => (
                      <>
                        <div id="custom-data-holder" style={{ textAlign: 'right' }}/>
                        <SortProvider data={filterProps.data || []}>
                          <SortContext.Consumer>
                            {sortProps =>
                              !!sortProps.data.length && (
                                <PaginationProvider
                                  {...props}
                                  data={sortProps.data || []}
                                  resetBulkSelection={this.resetBulkSelection}>
                                  <PaginationContext.Consumer>
                                    {paginationProps =>
                                      !!paginationProps.data.length && (
                                        <>
                                          <Table.Header>
                                            <Table.Row>
                                              <Table.HeaderCell>
                                                Sl.no{' '}
                                                {hasBulkActions ? (
                                                  <Checkbox
                                                    checked={this.state.bulkSelect}
                                                    indeterminate={this.state.indeterminateSelect}
                                                    onChange={(e, { checked }) =>
                                                      this.enableBulkSelect({ checked }, paginationProps.data)
                                                    }
                                                  />
                                                ) : null}{' '}
                                              </Table.HeaderCell>
                                              {visibleColumns.map((column, index) =>
                                                _TableHeader({ column, index, sortProps }),
                                              )}
                                              {props.includeAction ? (
                                                <Table.HeaderCell> Actions </Table.HeaderCell>
                                              ) : null}
                                            </Table.Row>
                                          </Table.Header>
                                          <Table.Body>
                                            {paginationProps.data.map((row, index1) => (
                                              <Table.Row key={index1}>
                                                <Table.Cell>
                                                  <Label ribbon>{paginationProps.startIndex + index1 + 1}</Label>
                                                  {hasBulkActions ? (
                                                    <Checkbox
                                                      checked={this.state.selectedRows.includes(row._id)}
                                                      onChange={(e, { checked }) =>
                                                        this.updateSelectedRows(
                                                          { checked },
                                                          row._id,
                                                          paginationProps.rowCount,
                                                        )
                                                      }
                                                    />
                                                  ) : null}
                                                </Table.Cell>
                                                {visibleColumns.map((column, index2) =>
                                                  _TableCell({ column, index2, data: paginationProps, row }),
                                                )}
                                                {props.includeAction ? (
                                                  <Table.Cell>
                                                    <TableActions actions={props.actionConfig} row={row}/>
                                                  </Table.Cell>
                                                ) : null}
                                              </Table.Row>
                                            ))}
                                          </Table.Body>
                                        </>
                                      )
                                    }
                                  </PaginationContext.Consumer>
                                </PaginationProvider>
                              )
                            }
                          </SortContext.Consumer>
                        </SortProvider>
                      </>
                    )}
                  </FilterContext.Consumer>
                </FilterProvider>
              </div>
            )
          }
        </SearchContext.Consumer>
      </SearchProvider>
    );
  }
}

const _TableHeader = ({ column, index, sortProps }) => {
  const isAscendingDisabled =
    sortProps.column && sortProps.column === column.column && sortProps.direction === 'ascending';
  const isDescendingDisabled =
    sortProps.column && sortProps.column === column.column && sortProps.direction === 'descending';
  return (
    <Table.HeaderCell
      key={`table-header-cell-${index}`}
      // sorted={column.column === sortProps.column ? sortProps.direction : null}
      onClick={sortProps.handleSort(
        column.column,
        sortProps.direction === 'ascending' ? 'descending' : 'ascending',
        column.type,
      )}>
      <Icon
        name="arrow up"
        color={isAscendingDisabled ? 'blue' : 'grey'}
        // disabled={isAscendingDisabled}
        // onClick={sortProps.handleSort(column.column, 'ascending')}
      />
      <Icon
        name="arrow down"
        color={isDescendingDisabled ? 'blue' : 'grey'}
        // disabled={isDescendingDisabled}
        // onClick={sortProps.handleSort(column.column, 'descending')}
      />
      {column.heading}
    </Table.HeaderCell>
  );
};

const _TableCell = ({ column, index2, data, row }) => {
  return <Table.Cell key={`table-cell-${index2}`}>{column.cell({ row })}</Table.Cell>;
};

export default TableComponent;
