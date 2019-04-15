import React, { Component } from 'react';

import sortBy from 'lodash/sortBy';
import isEqual from 'lodash/isEqual';

export const SortContext = React.createContext();

export default class SortProvider extends Component {
  state = {
    column: null,
    data: [...(this.props.data || [])],
    direction: null,
  };

  componentDidUpdate(prevProps) {
    if (this.props.data && !isEqual(this.props.data, prevProps.data)) {
      this.setState({ data: [...(this.props.data || [])] });
    }
  }

  fetchSortedData = ({ data = [], columnType, columnName }) => {
    switch (columnType.toLowerCase()) {
      case 'date':
        return data.sort((a, b) => {
          const date1 = new Date(b[columnName]);
          const date2 = new Date(a[columnName]);
          return date1 - date2;
        });

      default:
        return sortBy(data, [columnName]);
    }
  };

  handleSort = (clickedColumn, clickedDirection = 'ascending', columnType = 'String') => () => {
    if (!clickedColumn) return;
    const { column, data, direction } = this.state;

    if (column !== clickedColumn) {
      const sortedData = this.fetchSortedData({ data, columnType, columnName: clickedColumn });
      this.setState({
        column: clickedColumn,
        data: sortedData,
        direction: clickedDirection,
      });
      return;
    }

    this.setState({
      data: data.reverse(),
      direction: clickedDirection,
    });
  };

  render() {
    const { children } = this.props;
    return (
      <SortContext.Provider value={{ handleSort: this.handleSort, ...this.state }}>{children}</SortContext.Provider>
    );
  }
}
