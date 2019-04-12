import React, { Component } from 'react';
import {  Table, Label, Menu, Checkbox, Icon} from 'semantic-ui-react'
import TableActions from './tableActions';
import BulkActionList from './bulkActionDropdown';
import HeaderSelector from './headerSelector';
import SearchProvider from './searchProvider';
import { SearchContext } from './searchProvider';
import PaginationProvider from './pagination'
import { PaginationContext } from './pagination';
import SortProvider from './sort'
import { SortContext } from './sort';

class TableComponent  extends Component {
  constructor(props){
    const searchkeys = {}
    props.records.map(r => {
      if(r.isSearchable) searchkeys[r.column] = true
      return r;
    })
    super(props);
    this.state = {
      columns: props.records.map(record => {
         record.isVisible = true
         return record
      }),
      bulkSelect: false,
      selectedRows: [],
      searchKeys: searchkeys
    };
  }

  enableBulkSelect = ({checked}) => {
    const selectedRows = checked ? this.props.data.map(i => i._id) : []
    this.setState({bulkSelect: checked, selectedRows})
  }

  updateSelectedRows = ({checked}, row_id) => {
    let selectedRows = this.state.selectedRows
    const rowIndex = selectedRows.indexOf(row_id);
    if (rowIndex > -1 && !checked) selectedRows.splice(rowIndex, 1);
    if (rowIndex === -1) selectedRows.push(row_id);
    this.setState({ selectedRows });
  }

  toggleColumns = (column, {checked}) => {
    let columns = this.state.columns
    let updatedColumn = this.state.columns.find(c => c.heading === column) || {}
    updatedColumn.isVisible = !checked
    this.setState({ columns })
  }

  render(){
    const props = this.props
    const hasBulkActions = props.bulkActions.length
    const visibleColumns = this.state.columns.filter(d => d.isVisible)
    const hiddenColumnCount = this.state.columns.length - visibleColumns.length
    return(
      <SearchProvider {...props} searchKeys={this.state.searchKeys}>
        <SearchContext.Consumer>
          {searchProps =>
            !!searchProps.data.length && (
            <div>
              <HeaderSelector hiddenColumnCount = {hiddenColumnCount} columns={this.state.columns.filter(c => !props.mandatoryFeilds.includes(c.heading))} toggleColumns={this.toggleColumns}/>
              {hasBulkActions && this.state.selectedRows.length ? <BulkActionList bulkActions={this.props.bulkActions} selectedRows={this.state.selectedRows}/> : null}
              <SortProvider data={searchProps.data || []}>
                <SortContext.Consumer>
                  {sortProps => !!sortProps.data.length && (
                  <PaginationProvider {...props} data={sortProps.data || []}>
                    <PaginationContext.Consumer>
                      {paginationProps => !!paginationProps.data.length && (
                      <Table celled>
                        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell>{hasBulkActions ? <Checkbox checked={this.state.bulkSelect} onChange={(e, {checked}) => this.enableBulkSelect({checked})}/> : null } Sl.no
                            </Table.HeaderCell>
                            {visibleColumns.map((column, index) => _TableHeader({column, index, sortProps}))}
                            {props.includeAction ?  <Table.HeaderCell> Actions </Table.HeaderCell> : null}
                          </Table.Row>
                        </Table.Header>
                        <Table.Body>
                          {paginationProps.data.map((row, index1) => (
                            <Table.Row key={index1}>
                              <Table.Cell>
                                <Label ribbon>
                                  {paginationProps.startIndex + index1 + 1}
                                </Label>
                                {hasBulkActions ? <Checkbox checked={this.state.selectedRows.includes(row._id)} onChange={(e, {checked}) => this.updateSelectedRows({checked}, row._id)}/> :  null}
                              </Table.Cell>
                              {visibleColumns.map((column, index2) => _TableCell({column, index2, data: paginationProps, row}))}
                              {props.includeAction ?
                              <Table.Cell>
                                <TableActions actions={props.actionConfig} row={row} />
                              </Table.Cell> : null }
                            </Table.Row>
                            ))
                          }
                        </Table.Body>
                      </Table>
                    )}
                    </PaginationContext.Consumer>
                  </PaginationProvider>
                  )}
                </SortContext.Consumer>
              </SortProvider>
            </div>
          )}
        </SearchContext.Consumer>
      </SearchProvider>
    );
  }
}

const _TableHeader = ({column, index, sortProps}) => {
  return <Table.HeaderCell
          key={`table-header-cell-${index}`}>
            <Icon name="arrow circle up" disabled={(sortProps.column !== column.column || sortProps.direction !== 'ascending')} onClick={sortProps.handleSort(column.column, 'ascending')}></Icon>
            <Icon name="arrow circle down" disabled={(sortProps.column !== column.column || sortProps.direction !== 'descending')} onClick={sortProps.handleSort(column.column, 'descending')}></Icon>
           {column.heading}
        </Table.HeaderCell>
}

const _TableCell = ({column, index2, data, row}) => {
  return (
    <Table.Cell
            key={`table-cell-${index2}`}
          >
            {column.cell({row})}
    </Table.Cell>
  )
}

export default TableComponent;
