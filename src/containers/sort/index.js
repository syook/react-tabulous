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

  handleSort = ({ headerName: clickedColumn, type: columnType, direction }) => () => {
    direction = direction || 'ascending';

    if (!clickedColumn) return;
    const { columnName } = this.state;
    if (columnName !== clickedColumn) {
      direction = 'ascending';
      this.setState({
        columnName: clickedColumn,
        columnType,
        direction,
        resetPagination: !this.state.resetPagination,
      });
    } else {
      this.setState({
        direction,
        resetPagination: !this.state.resetPagination,
      });
    }
  };

  getSortedData = () => {
    const { columnName, columnType, direction } = this.state;
    if (columnName && columnType) {
      const sortedData = fetchSortedData({ data: [...this.props.data], columnType, columnName, direction }) || [];
      return sortedData;
    } else {
      return this.props.data;
    }
  };

  render() {
    const { children } = this.props;
    const data = this.getSortedData();
    return (
      <SortContext.Provider value={{ handleSort: this.handleSort, ...this.state, data }}>
        {children}
      </SortContext.Provider>
    );
  }
}
