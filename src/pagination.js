import { Label, Menu, MenuItem, Table } from 'semantic-ui-react';
import React, { Component } from 'react';

import Select from 'react-select';

export const PaginationContext = React.createContext();

const findStartPage = (numberOfPages, currentPage) => {
  let startPage;
  if (numberOfPages <= 3 || currentPage === 1) {
    startPage = 1;
  } else if (currentPage === numberOfPages) {
    startPage = currentPage - 2;
  } else {
    startPage = currentPage - 1;
  }
  return startPage;
};

const findPageRange = ({ numberOfPages, currentPage }) => {
  const startPage = findStartPage(numberOfPages, currentPage);
  return Array.from(new Array(Math.min(3, numberOfPages)), (x, i) => i + startPage);
};

const rowsPerPageOptions = [5, 10, 20, 50].map(num => ({
  value: num,
  label: `${num} Items`,
}));

const handlePageClick = props => (e, data) => {
  props.setCurrentPage(+data.page || 1);
};

const handleDirectionClick = props => e => {
  const direction = e.currentTarget.dataset['direction'];
  let change = 0;
  if (direction === 'LEFT' && props.currentPage > 1) {
    change = -1;
  } else if (direction === 'RIGHT' && props.currentPage < props.numberOfPages) {
    change = 1;
  }
  if (change !== 0) {
    props.setCurrentPage(props.currentPage + change || 1);
  }
};

export const findCurrentData = (searchedDataFound = [], currentPage, rowsPerPage) => {
  if (searchedDataFound.length < rowsPerPage.value) {
    return searchedDataFound;
  }
  return searchedDataFound.slice((currentPage - 1) * rowsPerPage.value, currentPage * rowsPerPage.value);
};

export default class PaginationProvider extends Component {
  constructor(props) {
    super(props);
    const rowsPerPage = { value: 10, label: '10 Items' };
    const rowCount = (props.data || []).length;
    this.state = {
      currentPage: 1,
      name: this.props.name || '',
      numberOfColumns: 16,
      numberOfPages: Math.ceil(rowCount / rowsPerPage.value),
      rowCount,
      rowsPerPage,
    };
  }

  componentDidUpdate(prevProps) {
    if ((this.props.data || []).length !== (prevProps.data || []).length) {
      const rowCount = this.props.data.length
      const numberOfPages = Math.ceil(rowCount / this.state.rowsPerPage.value);
      this.setState({ numberOfPages, rowCount });
    }
  }

  setCurrentPage = currentPage => {
    this.setState({ currentPage });
  };

  onSelectRowsPerPage = (selectedRowsPerPage = { value: 10, label: '10 Items' }) => {
    let { currentPage, rowCount } = this.state;
    const numberOfPages = Math.ceil(rowCount / selectedRowsPerPage.value);
    if (numberOfPages < currentPage) currentPage = numberOfPages;

    this.setState({
      numberOfPages,
      rowsPerPage: selectedRowsPerPage,
      currentPage,
    });
  };

  render() {
    let { children, data } = this.props;
    let { currentPage, rowsPerPage } = this.state;
    let pageRange = findPageRange({ ...this.state });
    data = findCurrentData(data, currentPage, rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage.value;
    return (
      <PaginationContext.Provider value={{ ...this.state, data, startIndex }}>
        {children}
        <Pagination
          {...this.props}
          {...this.state}
          pageRange={pageRange}
          onSelectRowsPerPage={this.onSelectRowsPerPage}
          setCurrentPage={this.setCurrentPage}
        />
      </PaginationContext.Provider>
    );
  }
}

const Pagination = props => {
  if (!props.data.length) return null;

  const maxRowOptionAvailable = (
    rowsPerPageOptions.find(obj => obj.value >= props.rowCount) || rowsPerPageOptions[rowsPerPageOptions.length - 1]
  ).value;
  const pageOptions = rowsPerPageOptions.filter(obj => +obj.value <= +maxRowOptionAvailable);

  return (
    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell className="paginationFooter" colSpan={props.numberOfColumns}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Label ribbon>
              Total {props.name} : {props.rowCount}
            </Label>
            {props.rowCount > 5 && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span
                  style={{
                    color: '#26547c',
                    fontSize: '13px',
                    fontWeight: 'normal',
                    margin: '0px 15px',
                  }}>
                  Show
                </span>
                <Select
                  style={{
                    width: '115px',
                    fontWeight: 'normal',
                  }}
                  value={props.rowsPerPage}
                  options={pageOptions}
                  onChange={props.onSelectRowsPerPage}
                  isClearable={false}
                  isSearchable={false}
                />
                <Menu floated="right" pagination>
                  <MenuItem icon="angle double left" page={1} onClick={handlePageClick(props)} />
                  <MenuItem data-direction="LEFT" onClick={handleDirectionClick(props)} icon="angle left" />
                  {props.pageRange.map((pageIndex, index) => (
                    <MenuItem
                      key={`table-footer-${index}`}
                      content={`${pageIndex}`}
                      page={pageIndex}
                      onClick={handlePageClick(props)}
                      active={pageIndex === props.currentPage}
                      as="a"
                    />
                  ))}
                  <MenuItem data-direction="RIGHT" onClick={handleDirectionClick(props)} icon="angle right" />
                  <MenuItem icon="angle double right" page={props.numberOfPages} onClick={handlePageClick(props)} />
                </Menu>
              </div>
            )}
          </div>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  );
};
