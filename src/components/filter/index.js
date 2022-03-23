import './filter.css';

import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback } from 'react';
import Select from '../select';
import Input from '../input';
import Button from '../button';
import Icons from '../icon';
import { Popup, Icon, Checkbox } from 'semantic-ui-react';

import { createPropertyOption } from '../utils';
import { findColumnOptions } from '../utils';

import DateTimeComponent from '../date-time';
import DateComponent from '../date';

import { predicateOptions, filterOperators } from '../../constants';

const TableFilter = props => {
  const [filters, setFilters] = useState([]);

  const { shouldFilterReset, setSelectedFilters, selectedFilters } = props;

  const resetFilters = useCallback(() => {
    if (!selectedFilters.length && shouldFilterReset) {
      setFilters([]);
      setSelectedFilters([]);
    }
  }, [shouldFilterReset, setSelectedFilters, selectedFilters]);

  useEffect(() => resetFilters(), [props.shouldFilterReset, resetFilters]);

  const addFilter = () => {
    const { columns } = props;

    const firstFilterableAttribute = columns.find(d => d.isFilterable);
    let newFilter = {};
    let predicate = 'Where';
    const filtersLength = filters.length;
    if (filtersLength >= 2) {
      predicate = filters[1].predicate;
    } else if (filtersLength === 1) {
      predicate = 'And';
    }
    newFilter.predicate = predicate;
    newFilter.attribute = firstFilterableAttribute.headerName;
    newFilter.label = firstFilterableAttribute.headerName;
    const newQuery = ((filterOperators[firstFilterableAttribute.type] || [])[0] || {}).value;
    newQuery ? (newFilter.query = newQuery) : (newFilter.query = 'contains');
    newFilter.value = '';
    newFilter.type = firstFilterableAttribute.type;

    setFilters([...filters, newFilter]);
  };

  const removeFilter = index => {
    if (index === 0) index = filters.length - 1;

    const updatedFilters = [...filters];
    updatedFilters.splice(index, 1);

    setFilters([...updatedFilters]);
    props.setSelectedFilters(updatedFilters);
  };

  const clearAllFilter = () => {
    setFilters([]);
    props.setSelectedFilters([]);
  };

  const updateSelectedFilters = (attribute, value, index) => {
    const { columns } = props;
    let filterToBeUpdated = filters[index];
    //to change the predicate of all filters to the first predicate to match the query
    if (index === 1 && attribute === 'predicate') {
      filters.slice(1).forEach(element => (element.predicate = value));
    }

    if (attribute === 'value') {
      filterToBeUpdated[attribute] = value;
    }
    if (attribute === 'attribute') {
      const currentColumn = columns.find(i => i.headerName === value) || {};
      filterToBeUpdated['type'] = currentColumn.type || '';
      filterToBeUpdated.label = currentColumn.headerName;
      filterToBeUpdated.attribute = currentColumn.headerName;
      filterToBeUpdated['value'] = undefined;
      //picks the first query which matches this type
      const newQuery = ((filterOperators[filterToBeUpdated.type] || [])[0] || {}).value;
      if (newQuery) filterToBeUpdated.query = newQuery;
    }

    if (attribute === 'query') {
      filterToBeUpdated.query = value;
    }

    setFilters([...filters]);
  };

  const selectedFiltersAvailable = (filters || []).length;
  let buttonText =
    selectedFiltersAvailable === 1
      ? '1 filter'
      : selectedFiltersAvailable >= 1
      ? `${selectedFiltersAvailable} filters`
      : 'Filter';

  return (
    <div className="rt-filter">
      <Popup
        className="filter-popUp"
        trigger={
          <Button
            variant="outline"
            className="filter-button"
            disabled={props.disabled}
            backgroundColor={props.accentColor}
          >
            <Icons name="filter" className="filter-icon" /> {buttonText}
          </Button>
        }
        content={
          <FilterDiv
            {...props}
            filtersSelected={!!selectedFiltersAvailable}
            updateSelectedFilters={updateSelectedFilters}
            filters={filters}
            addFilter={addFilter}
            removeFilter={removeFilter}
            setSelectedFilters={props.setSelectedFilters}
            clearAllFilter={clearAllFilter}
          />
        }
        on="click"
        positionFixed
        position="bottom left"
      />
    </div>
  );
};

const FilterDiv = props => {
  const selectedFilters = props.filters || [];
  const indexOnePredicate = selectedFilters.length > 1 ? selectedFilters[1].predicate : null;
  const secondarySelectionDisabled = selectedFilters.length > 1;
  return (
    <div className="filter-wrapper">
      {selectedFilters.length ? (
        selectedFilters.map((column, index) => (
          <FilterGrid
            key={index}
            index={index}
            column={column}
            removeFilter={props.removeFilter}
            updateSelectedFilters={props.updateSelectedFilters}
            indexOnePredicate={indexOnePredicate}
            filterableColumns={props.filterableColumns}
            secondarySelectionDisabled={secondarySelectionDisabled}
          />
        ))
      ) : (
        <div style={{ opacity: 0.5, marginBottom: 10 }}>No filters applied</div>
      )}
      <div className="btn-add-wrapper">
        <Button variant="outline" onClick={props.addFilter} className="btn-add">
          Add Filter&nbsp;
          <Icons width={10} height={10} name="plus" className="btn-icon-plus" />
        </Button>
      </div>

      <div className="filter-btns">
        {!props.filtersSelected || props.filterDisabled ? null : (
          <>
            <Button
              variant="primary"
              className="filter-btn-apply"
              onClick={() => props.setSelectedFilters(props.filters)}
              loading={props.filterDisabled}
            >
              Apply Filter
            </Button>
            <Button variant="text" className="filter-btn-clear-all" onClick={() => props.clearAllFilter()}>
              Clear all
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

const FilterGrid = props => {
  let predicateOptionConditions = [];
  if (props.index === 0) {
    predicateOptionConditions = [{ value: 'Where', label: 'Where' }];
  } else if (props.index > 1) {
    predicateOptionConditions = [{ value: props.indexOnePredicate, label: props.indexOnePredicate }];
  } else {
    predicateOptionConditions = predicateOptions;
  }
  const queryOperatorOptions = filterOperators[props.column.type] || [];

  return (
    <div
      className="filter-grid"
      // style={{ display: 'flex', flexFlow: 'row', justifyContent: 'space-between', alignItems: 'center' }}
    >
      <Select
        className="rt_select_group"
        isSearchable={false}
        isDisabled={props.column.predicate === 'Where' || (props.secondarySelectionDisabled && props.index > 1)}
        options={predicateOptionConditions}
        value={{ value: props.column.predicate, label: props.column.predicate }}
        onChange={value => props.updateSelectedFilters('predicate', value.value, props.index)}
        menuPlacement="auto"
      />
      <Select
        className="rt_select_field"
        options={props.filterableColumns.map(createPropertyOption('headerName'))}
        value={{ value: props.column.label, label: props.column.label }}
        onChange={value => props.updateSelectedFilters('attribute', value.value, props.index)}
        menuPlacement="auto"
      />
      <Select
        className="rt_select_filter_type"
        options={queryOperatorOptions}
        isDisabled={queryOperatorOptions.length <= 1}
        value={{ value: props.column.query, label: props.column.query }}
        onChange={value => props.updateSelectedFilters('query', value.value, props.index)}
        menuPlacement="auto"
      />
      {['is empty', 'is not empty'].includes(props.column.query) ? (
        <Input disabled className="text-input" />
      ) : (
        <InputCategories
          className="text-input"
          column={props.column}
          updateSelectedFilters={props.updateSelectedFilters}
          index={props.index}
          filterableColumns={props.filterableColumns}
          menuPlacement="auto"
        />
      )}
      <Icon name="times circle outline" onClick={() => props.removeFilter(props.index)} />
    </div>
  );
};

const InputCategories = props => {
  switch (props.column.type) {
    case 'String':
    case 'Number':
      return (
        <Input
          className={props.className}
          type={props.column.type === 'Number' ? 'number' : 'text'}
          value={props.column.value || ''}
          onChange={e => props.updateSelectedFilters('value', e.target.value, props.index)}
        />
      );
    case 'SingleSelect':
    case 'MultiSelect':
      const isMultiSelect = !['is', 'is not'].includes(props.column.query);
      const selectValue = isMultiSelect
        ? (props.column.value || []).length
          ? props.column.value.map(v => ({ value: v, label: v }))
          : []
        : (props.column.value || []).length === 1
        ? { value: props.column.value[0], label: props.column.value[0] }
        : null;
      return (
        <Select
          className="filter-multi-select"
          isMulti={isMultiSelect}
          closeMenuOnSelect={!isMultiSelect}
          options={findColumnOptions(props.filterableColumns, props.column.attribute)}
          value={selectValue}
          hideSelectedOptions={false}
          onChange={value => {
            const newValue = isMultiSelect
              ? value.map(({ label }) => label)
              : (value || {}).hasOwnProperty('label')
              ? [value.label]
              : [];
            props.updateSelectedFilters('value', newValue, props.index);
          }}
        />
      );
    case 'Boolean':
      return (
        <Checkbox
          checked={props.column.value}
          onChange={(e, { checked }) => props.updateSelectedFilters('value', checked, props.index)}
        />
      );
    case 'DateTime':
      return (
        <DateTimeComponent
          dateFormat="DD-MMM-YYYY"
          value={props.column.value}
          onChange={date => props.updateSelectedFilters('value', date, props.index)}
          showTimeSelect
        />
      );
    case 'Date':
      return (
        <DateComponent
          dateFormat="DD-MMM-YYYY"
          value={props.column.value}
          onChange={date => props.updateSelectedFilters('value', date, props.index)}
        />
      );
    default:
      return null;
  }
};

FilterDiv.propTypes = {
  filterableColumns: PropTypes.array.isRequired,
  selectedFilters: PropTypes.array.isRequired,
  applyFilter: PropTypes.func.isRequired,
  clearAllFilter: PropTypes.func.isRequired,
};

FilterDiv.defaultProps = {
  filterableColumns: [],
  selectedFilters: [],
};

export default TableFilter;
