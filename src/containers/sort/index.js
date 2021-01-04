import React, { PureComponent } from 'react';
import isEqual from 'lodash/isEqual';

import { fetchSortedData } from './utils';

export const SortContext = React.createContext();

export default class SortProvider extends PureComponent {
  state = {
    columnName: null,
    columnType: null,
    data: [...(this.props.data || [])],
    direction: null,
    resetPagination: false,
  };

  componentDidUpdate(prevProps) {
    if (this.props.data && !isEqual(this.props.data, prevProps.data)) {
      const { columnName, columnType, direction } = this.state;

      if (columnName && columnType) {
        if (this.props.fetchOnPageChange) {
          this.setState({ data: [...(this.props.data || [])] });
        } else {
          const sortedData = fetchSortedData({ data: [...this.props.data], columnType, columnName, direction }) || [];
          this.setState({ data: [...sortedData] });
        }
      } else {
        this.setState({ data: [...(this.props.data || [])] });
      }
    }
  }

  handleSort = ({ field: clickedColumn, type: columnType, direction }) => () => {
    direction = direction || 'ascending';

    if (!clickedColumn) return;
    const { columnName, data } = this.state;
    if (columnName !== clickedColumn) {
      direction = 'ascending';
      this.props.updateRowsSortParams(clickedColumn, columnType, direction);
      if (this.props.fetchOnPageChange) {
        this.props.fetchOnPageChange(1, this.props.searchText, null, this.props.rowsPerPageFromSearch, {
          columnName: clickedColumn,
          columnType,
          direction,
        });
        this.setState({
          columnName: clickedColumn,
          columnType,
          direction,
          resetPagination: !this.state.resetPagination,
        });
      } else {
        const sortedData = fetchSortedData({
          data,
          columnType,
          columnName: clickedColumn,
          direction,
        });
        this.setState({
          columnName: clickedColumn,
          columnType,
          data: sortedData,
          direction,
          resetPagination: !this.state.resetPagination,
        });
      }
    } else {
      this.props.updateRowsSortParams(clickedColumn, columnType, direction);

      if (this.props.fetchOnPageChange) {
        this.props.fetchOnPageChange(1, this.props.searchText, null, this.props.rowsPerPageFromSearch, {
          columnName: clickedColumn,
          columnType,
          direction,
        });
        this.setState({
          direction,
          resetPagination: !this.state.resetPagination,
        });
      } else {
        this.setState({
          data: data.reverse(),
          direction,
          resetPagination: !this.state.resetPagination,
        });
      }
    }
  };

  render() {
    const { children } = this.props;
    return (
      <SortContext.Provider
        value={{
          handleSort: this.handleSort,
          ...this.state,
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
