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
    const rowsPerPage = {
      value: this.props.defaultItemsToDisplay || 10,
      label: `${this.props.defaultItemsToDisplay || 10} Items`,
    };
    const rowCount = (props.data || []).length;
    this.state = {
      currentPage: 1,
      numberOfColumns: 30,
      numberOfPages: Math.ceil(rowCount / rowsPerPage.value),
      rowsPerPage,
    };
  }

  componentDidUpdate(prevProps) {
    if ((this.props.data || []) && !isEqual(this.props.data, prevProps.data)) {
      const rowCount = this.props.data.length;

      let { currentPage = 1, rowsPerPage = { value: 10, label: '10 Items' } } = this.state;
      const numberOfPages = Math.ceil(rowCount / rowsPerPage.value);
      if (numberOfPages < currentPage) currentPage = numberOfPages;

      this.props.resetBulkSelection();
      this.setState({ currentPage: currentPage || 1, numberOfPages });
    }
    if (prevProps.resetPagination !== this.props.resetPagination && this.state.currentPage !== 1) {
      this.resetToFirstPage();
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

  handleDirectionClick = e => {
    const { currentPage } = this.state;
    const direction = e.currentTarget.dataset['direction'];
    let change = 0;
    if (direction === 'LEFT' && currentPage > 1) {
      change = -1;
    } else if (direction === 'RIGHT' && currentPage < this.state.numberOfPages) {
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
      <>
        <div
          className={`scrollable-table tableFixHead ${this.props.tableScroll ? 'shouldSroll' : null}`}
          style={{ maxWidth: '100%', marginTop: '10px' }}>
          <Table sortable celled padded className="tableStyle left aligned table-fixed">
            <PaginationContext.Provider
              value={{ ...this.state, data, startIndex, rowCount, resetToFirstPage: this.resetToFirstPage }}>
              {children}
            </PaginationContext.Provider>
          </Table>
        </div>
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
      </>
    );
  }
}

// resizable

// resizableGrid = table => {
//   const row = table.getElementsByTagName('tr')[0];
//   const cols = row ? row.children : undefined;
//   if (!cols) return;

//   table.style.overflow = 'hidden';
//   const tableHeight = table.offsetHeight;

//   for (let i = 0; i < cols.length; i++) {
//     const div = this.createDiv(tableHeight);
//     let currentColumn = cols[i];
//     if (currentColumn.innerText && !['Actions', 'S.No'].includes(currentColumn.innerText)) {
//       cols[i].appendChild(div);
//       cols[i].style.position = 'relative';
//       this.setListeners(div);
//     }
//   }
// };

// setListeners = div => {
//   let pageX, curCol, nxtCol, curColWidth, nxtColWidth;

//   div.addEventListener('mousedown', e => {
//     curCol = e.target.parentElement;
//     nxtCol = curCol.nextElementSibling;
//     pageX = e.pageX;

//     const padding = this.paddingDiff(curCol);

//     curColWidth = curCol.offsetWidth - padding;
//     if (nxtCol) nxtColWidth = nxtCol.offsetWidth - padding;
//   });

//   div.addEventListener('mouseover', e => {
//     e.target.style.borderRight = '2px solid #0000ff';
//   });

//   div.addEventListener('mouseout', e => {
//     e.target.style.borderRight = '';
//   });

//   document.addEventListener('mousemove', e => {
//     if (curCol) {
//       const diffX = e.pageX - pageX;

//       if (nxtCol) nxtCol.style.width = nxtColWidth - diffX + 'px';

//       curCol.style.minWidth = curColWidth + diffX + 'px';
//     }
//   });

//   document.addEventListener('mouseup', e => {
//     curCol = undefined;
//     nxtCol = undefined;
//     pageX = undefined;
//     nxtColWidth = undefined;
//     curColWidth = undefined;
//   });
// };

// createDiv = height => {
//   let div = document.createElement('div');
//   div.style.top = 0;
//   div.style.right = 0;
//   div.style.width = '5px';
//   div.style.position = 'absolute';
//   div.style.cursor = 'col-resize';
//   div.style.userSelect = 'none';
//   div.style.height = height + 'px';
//   return div;
// };

// paddingDiff = col => {
//   if (this.getStyleVal(col, 'box-sizing') === 'border-box') {
//     return 0;
//   }

//   const padLeft = this.getStyleVal(col, 'padding-left');
//   const padRight = this.getStyleVal(col, 'padding-right');
//   return +padLeft + +padRight;
// };

// getStyleVal = (elm, css) => {
//   return window.getComputedStyle(elm, null).getPropertyValue(css);
// };

// componentDidMount() {
// let table = document.querySelector('.tableStyle');
// this.resizableGrid(table);
// }
