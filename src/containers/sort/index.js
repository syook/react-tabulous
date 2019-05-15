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
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (!isEqual(nextProps.data, this.props.data)) {
  //     return true;
  //   }
  //   if (!isEqual(nextState.data, this.state.data)) {
  //     return true;
  //   }
  //   if (nextState.direction !== this.state.direction) {
  //     return true;
  //   }
  //   if (nextState.columnName !== this.state.columnName) {
  //     return true;
  //   }
  //   if (nextState.columnType !== this.state.columnType) {
  //     return true;
  //   }
  //   console.log('Sort not rendering');
  //   return false;
  // }

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
      });
      return;
    }

    this.setState({
      data: data.reverse(),
      direction,
    });
  };

  render() {
    const { children } = this.props;
    return (
      <SortContext.Provider value={{ handleSort: this.handleSort, ...this.state }}>{children}</SortContext.Provider>
    );
  }
}
