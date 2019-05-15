import './table.css';
import React, { PureComponent } from 'react';
import isEqual from 'lodash/isEqual';
import { Table } from 'semantic-ui-react';

import Pagination from '../../components/pagination';

import { findPageRange, findCurrentData } from './utils';

export const PaginationContext = React.createContext();

export default class PaginationProvider extends PureComponent {
  constructor(props) {
    super(props);
    const rowsPerPage = { value: 10, label: '10 Items' };
    const rowCount = (props.data || []).length;
    this.state = {
      currentPage: 1,
      numberOfColumns: 30,
      numberOfPages: Math.ceil(rowCount / rowsPerPage.value),
      rowsPerPage,
    };
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (!isEqual(nextProps.data, this.props.data)) {
  //     return true;
  //   }
  //   if (nextState.currentPage !== this.state.currentPage) {
  //     return true;
  //   }
  //   if (nextState.numberOfPages !== this.state.numberOfPages) {
  //     return true;
  //   }
  //   if ((nextState.rowsPerPage || {}).value !== (this.state.rowsPerPage || {}).value) {
  //     return true;
  //   }
  //   return false;
  // }

  componentDidUpdate(prevProps) {
    if ((this.props.data || []) && !isEqual(this.props.data, prevProps.data)) {
      const rowCount = this.props.data.length;

      let { currentPage = 1, rowsPerPage = { value: 10, label: '10 Items' } } = this.state;
      const numberOfPages = Math.ceil(rowCount / rowsPerPage.value);
      if (numberOfPages < currentPage) currentPage = numberOfPages;

      this.props.resetBulkSelection();
      this.setState({ currentPage: currentPage || 1, numberOfPages });
    }
  }

  setCurrentPage = currentPage => this.setState({ currentPage });

  resetToFirstPage = () => this.setCurrentPage(1);

  onSelectRowsPerPage = (selectedRowsPerPage = { value: 10, label: '10 Items' }) => {
    let { currentPage } = this.state;
    const rowCount = (this.props.data || []).length;

    const numberOfPages = Math.ceil(rowCount / selectedRowsPerPage.value);
    if (numberOfPages < currentPage) currentPage = numberOfPages;

    this.setState({
      numberOfPages,
      rowsPerPage: selectedRowsPerPage,
      currentPage: currentPage || 1,
    });
  };

  handlePageClick = (_e, data) => {
    this.setCurrentPage(+data.page || 1);
  };

  handleDirectionClick = props => e => {
    const { currentPage } = this.state;
    const direction = e.currentTarget.dataset['direction'];
    let change = 0;
    if (direction === 'LEFT' && currentPage > 1) {
      change = -1;
    } else if (direction === 'RIGHT' && currentPage < props.numberOfPages) {
      change = 1;
    }
    if (change !== 0) {
      this.setCurrentPage(currentPage + change || 1);
    }
  };

  render() {
    let { children, data } = this.props;
    let { currentPage = 1, rowsPerPage = 5 } = this.state;
    let pageRange = findPageRange({ ...this.state });
    data = findCurrentData(data, currentPage, rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage.value;
    const rowCount = (this.props.data || []).length;

    return (
      <div className="scrollable-table" style={{ maxWidth: '100vw', overflow: 'auto hidden', marginTop: '10px' }}>
        <Table sortable celled padded className="tableStyle left aligned">
          <PaginationContext.Provider
            value={{ ...this.state, data, startIndex, rowCount, resetToFirstPage: this.resetToFirstPage }}>
            {children}
            <Pagination
              {...this.props}
              {...this.state}
              handleDirectionClick={this.handleDirectionClick}
              handlePageClick={this.handlePageClick}
              onSelectRowsPerPage={this.onSelectRowsPerPage}
              pageRange={pageRange}
              rowCount={rowCount}
              setCurrentPage={this.setCurrentPage}
            />
          </PaginationContext.Provider>
        </Table>
      </div>
    );
  }
}
