import React, { PureComponent } from 'react';

import { fetchSortedData } from './utils';

export const SortContext = React.createContext();

export default class SortProvider extends PureComponent {
  state = {
    columnName: null,
    columnType: null,
    direction: null,
    resetPagination: false,
  };

  //  componentDidUpdate(prevProps) {
  //    if (this.props.data && !isEqual(this.props.data, prevProps.data)) {
  //      const { columnName, columnType, direction } = this.state;

  //      if (columnName && columnType) {
  //        if (this.props.fetchOnPageChange) {
  //          this.setState({ data: [...(this.props.data || [])] });
  //        } else {
  //          const sortedData =
  //            fetchSortedData({ data: [...this.props.data], columnType, columnName, direction }) || [];
  //          this.setState({ data: [...sortedData] });
  //        }
  //      } else {
  //        this.setState({ data: [...(this.props.data || [])] });
  //      }
  //    }
  //  }

  handleSort = ({ headerName: clickedColumn, type: columnType, direction, field }) => () => {
    direction = direction || 'ascending';

    if (!clickedColumn) return;
    const { columnName } = this.state;
    if (columnName !== clickedColumn) {
      direction = 'ascending';
      this.props.updateRowsSortParams(field, columnType, direction);
      if (this.props.fetchOnPageChange) {
        this.props.fetchOnPageChange(1, this.props.searchText, null, this.props.rowsPerPageFromSearch, {
          columnName: field,
          columnType,
          direction,
        });
      }
      this.setState({
        columnName: clickedColumn,
        columnType,
        direction,
        resetPagination: !this.state.resetPagination,
      });
    } else {
      this.props.updateRowsSortParams(field, columnType, direction);

      if (this.props.fetchOnPageChange) {
        this.props.fetchOnPageChange(1, this.props.searchText, null, this.props.rowsPerPageFromSearch, {
          columnName: field,
          columnType,
          direction,
        });
      }
      this.setState({
        direction,
        resetPagination: !this.state.resetPagination,
      });
    }
  };

  getSortedData = () => {
    const { columnName, columnType, direction } = this.state;
    if (columnName && columnType) {
      if (this.props.fetchOnPageChange) {
        return this.props.data;
      } else {
        const sortedData = fetchSortedData({ data: [...this.props.data], columnType, columnName, direction }) || [];
        return sortedData;
      }
    }
    return this.props.data;
  };

  render() {
    const { children } = this.props;
    const data = this.getSortedData();
    return (
      <SortContext.Provider
        value={{
          handleSort: this.handleSort,
          ...this.state,
          data,
          count: this.props.count,
          direction: this.state.direction,
          columnName: this.state.columnName,
          columnType: this.state.columnType,
        }}>
        {children}
      </SortContext.Provider>
    );
  }
}
