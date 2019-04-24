import React, { Component } from 'react';
import isEqual from 'lodash/isEqual';

import TableFilter from './tableFilter';

import { loopFilters } from './utils';

export const FilterContext = React.createContext();

export default class FilterProvider extends Component {
  state = { data: [...(this.props.data || [])], selectedFilters: [] };

  componentDidUpdate(prevProps) {
    if (this.props.data && !isEqual(this.props.data, prevProps.data)) {
      this.setState({ data: [...(this.props.data || [])] });
    }
  }

  updateSelectedFilters = (attribute, value, index) => {
    const { selectedFilters: filters } = this.state;
    const { columns } = this.props;

    let filterToBeUpdated = filters[index];
    filterToBeUpdated['value'] = null;
    filterToBeUpdated[attribute] = value;
    if (attribute === 'attribute') {
      const attrType = (columns.find(i => i.column === filterToBeUpdated[attribute]) || {}).type;
      filterToBeUpdated['type'] = attrType || '';
    }
    this.setState({ selectedFilters: filters });
  };

  addFilter = () => {
    const { columns } = this.props;

    const firstFilterableAttribute = columns.find(d => d.isFilterable && d.type === 'String');
    const filters = this.state.selectedFilters;
    let newFilter = {};
    newFilter.predicate = filters.length ? 'And' : 'Where';
    newFilter.attribute = firstFilterableAttribute.column;
    newFilter.query = 'Contains';
    newFilter.value = '';
    newFilter.type = firstFilterableAttribute.type;
    filters.push(newFilter);
    this.setState({ selectedFilters: filters });
  };

  removeFilter = index => {
    const filters = this.state.selectedFilters;

    filters.splice(index, 1);
    if (filters.length === 1) {
      filters[0].predicate = 'Where';
    }
    this.setState({ selectedFilters: filters });
    this.applyFilter(filters);
  };

  applyFilter = filters => {
    const selectedFilters = filters && filters.length ? filters : this.state.selectedFilters;
    if (!selectedFilters.length) this.setFilteredData(this.props.data);

    const searchedData = this.props.data || [];
    const filteredData = loopFilters(searchedData, selectedFilters);
    this.setFilteredData(filteredData);
  };

  setFilteredData = (data = []) => this.setState({ data });

  render() {
    const { children, filterableColumns } = this.props;
    return (
      <FilterContext.Provider value={{ ...this.state }}>
        <TableFilter
          filterableColumns={filterableColumns}
          selectedFilters={this.state.selectedFilters}
          addFilter={this.addFilter}
          removeFilter={this.removeFilter}
          applyFilter={this.applyFilter}
          updateSelectedFilters={this.updateSelectedFilters}
        />
        {children}
      </FilterContext.Provider>
    );
  }
}
