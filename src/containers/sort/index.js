import React, { Component } from 'react';
import isEqual from 'lodash/isEqual';

import { fetchSortedData } from './utils';

export const SortContext = React.createContext();

export default class SortProvider extends Component {
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
        const sortedData = fetchSortedData({ data: [...this.props.data], columnType, columnName, direction }) || [];
        this.setState({ data: [...sortedData] });
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
    } else {
      this.setState({
        data: data.reverse(),
        direction,
        resetPagination: !this.state.resetPagination,
      });
    }
  };

  render() {
    const { children } = this.props;
    return (
      <SortContext.Provider value={{ handleSort: this.handleSort, ...this.state }}>{children}</SortContext.Provider>
    );
  }
}
