import React, { Component } from 'react';

import sortBy from 'lodash/sortBy';

export const SortContext = React.createContext();

export default class SortProvider extends Component {
  state = {
    column: null,
    data: [...(this.props || {}).data],
    direction: null,
  };

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.setState({ data: [...this.props.data] });
    }
  }

  handleSort = (clickedColumn, clickedDirection) => () => {
    if (!clickedColumn) return;
    const { column, data, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: sortBy(data, [clickedColumn]),
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
