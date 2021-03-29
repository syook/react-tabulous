import './filter.css';

import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback } from 'react';
import Select from 'react-select';
import { Popup, Button, Icon, Input, Checkbox } from 'semantic-ui-react';

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
    filters.push(newFilter);

    setFilters([...filters]);
  };

  const removeFilter = index => {
    if (index === 0) index = filters.length - 1;

    const updatedFilters = [...filters];
    updatedFilters.splice(index, 1);

    setFilters([...updatedFilters]);
    props.setSelectedFilters(updatedFilters);
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
    <div style={{ display: 'flex', float: 'left' }}>
      <Popup
        className="filter-popUp"
        trigger={
          <Button
            disabled={props.disabled}
            style={{
              backgroundColor: props.accentColor
                ? selectedFiltersAvailable
                  ? props.accentColor
                  : 'rgb(170, 170, 170)'
                : selectedFiltersAvailable
                ? '#FCB400'
                : 'rgba(241, 196, 15, 0.8)',
              color: '#fff',
              marginRight: '10px',
            }}>
            <Icon name="filter" /> {buttonText}
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
        <div>
          {selectedFilters.map((column, index) => (
            <div key={index} style={{ margin: '8px 0' }}>
              <FilterGrid
                index={index}
                column={column}
                removeFilter={props.removeFilter}
                updateSelectedFilters={props.updateSelectedFilters}
                indexOnePredicate={indexOnePredicate}
                filterableColumns={props.filterableColumns}
                secondarySelectionDisabled={secondarySelectionDisabled}
              />
            </div>
          ))}
        </div>
      ) : (
        <div style={{ opacity: 0.5, marginBottom: 10 }}>No filters applied</div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '15px' }} className="filter-btns">
        <Button size="small" onClick={props.addFilter} className="filter_btn add">
          <Icon name="add" size="small" /> Add Filter{' '}
        </Button>
        {!props.filtersSelected || props.filterDisabled ? null : (
          <Button
            positive
            className="filter_btn apply"
            size="small"
            onClick={() => props.setSelectedFilters(props.filters)}
            loading={props.filterDisabled}>
            Apply Filter
          </Button>
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
    <div style={{ display: 'flex', flexFlow: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ maxWidth: '40px', paddingTop: 'inherit', flex: '1 0 auto' }}>
        <Icon name="remove" onClick={() => props.removeFilter(props.index)} />
      </div>
      <div style={{ flex: '1 0 auto', minWidth: '100px', marginLeft: 10 }}>
        <Select
          className="singleSelect"
          isSearchable={false}
          isDisabled={props.column.predicate === 'Where' || (props.secondarySelectionDisabled && props.index > 1)}
          options={predicateOptionConditions}
          value={{ value: props.column.predicate, label: props.column.predicate }}
          onChange={value => props.updateSelectedFilters('predicate', value.value, props.index)}
          menuPlacement="auto"
        />
      </div>
      <div style={{ flex: '2 0 auto', minWidth: '100px', marginLeft: 10 }}>
        <Select
          className="singleSelect"
          options={props.filterableColumns.map(createPropertyOption('headerName'))}
          value={{ value: props.column.label, label: props.column.label }}
          onChange={value => props.updateSelectedFilters('attribute', value.value, props.index)}
          menuPlacement="auto"
        />
      </div>
      <div style={{ flex: '2 0 auto', minWidth: '100px', marginLeft: 10 }}>
        <Select
          className="singleSelect"
          options={queryOperatorOptions}
          isDisabled={queryOperatorOptions.length <= 1}
          value={{ value: props.column.query, label: props.column.query }}
          onChange={value => props.updateSelectedFilters('query', value.value, props.index)}
          menuPlacement="auto"
        />
      </div>
      {['is empty', 'is not empty'].includes(props.column.query) ? null : (
        <div className="text-input" style={{ flex: '1 0 auto', minWidth: '100px', marginLeft: 10 }}>
          <InputCategories
            column={props.column}
            updateSelectedFilters={props.updateSelectedFilters}
            index={props.index}
            filterableColumns={props.filterableColumns}
            menuPlacement="auto"
          />
        </div>
      )}
    </div>
  );
};

const InputCategories = props => {
  switch (props.column.type) {
    case 'String':
    case 'Number':
      return (
        <Input
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
    case 'date':
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
};

FilterDiv.defaultProps = {
  filterableColumns: [],
  selectedFilters: [],
};
export default TableFilter;
