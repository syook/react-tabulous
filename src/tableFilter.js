import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Select from 'react-select';
import { Popup, Button, Icon, List, Grid, Input } from 'semantic-ui-react';

import { findColumnOptions, createPropertyOption } from './utils';

import { predicateOptions, filterQueriesOptions } from './constants';

class TableFilter extends Component {
  render() {
    const selectedFilters = (this.props.selectedFilters || []).filter(filter => filter.value || '').length;
    let buttonText =
      selectedFilters === 1 ? '1 filter' : selectedFilters >= 1 ? `${selectedFilters} filters` : 'Filter';

    return (
      // <div style={{ textAlign: 'left' }}>
      <Popup
        trigger={
          <Button size="small" style={{ backgroundColor: selectedFilters ? '#d1f7c4' : null }}>
            <Icon name="filter" /> {buttonText}
          </Button>
        }
        content={<FilterDiv {...this.props} />}
        on="click"
        position="bottom center"
      />
      // </div>
    );
  }
}

const FilterDiv = props => {
  const selectedFilters = props.selectedFilters || [];
  const indexOnePredicate = selectedFilters.length > 1 ? selectedFilters[1].predicate : null;
  const secondarySelectionDisabled = selectedFilters.length > 1;
  return (
    <div style={{ width: '60em' }}>
      {selectedFilters.length ? (
        <List divided relaxed>
          {selectedFilters.map((column, index) => (
            <List.Item key={index}>
              <List.Content>
                <FilterGrid
                  index={index}
                  column={column}
                  removeFilter={props.removeFilter}
                  updateSelectedFilters={props.updateSelectedFilters}
                  indexOnePredicate={indexOnePredicate}
                  filterableColumns={props.filterableColumns}
                  secondarySelectionDisabled={secondarySelectionDisabled}
                />
              </List.Content>
            </List.Item>
          ))}
        </List>
      ) : (
        <div style={{ opacity: 0.5 }}>No filters applied to this view</div>
      )}
      <div>
        <Button primary size="small" onClick={props.addFilter}>
          <Icon name="add" /> Add Filter{' '}
        </Button>
        <Button positive size="small" onClick={props.applyFilter} disabled={!(props.selectedFilters || []).length}>
          {' '}
          Apply Filter{' '}
        </Button>
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

  return (
    <Grid columns={5}>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: '40px', paddingTop: 'inherit' }}>
          <Icon name="remove" onClick={() => props.removeFilter(props.index)} />
        </Grid.Column>
        <Grid.Column>
          <Select
            isSearchable={false}
            isDisabled={props.column.predicate === 'Where' || (props.secondarySelectionDisabled && props.index > 1)}
            options={predicateOptionConditions}
            value={{ value: props.column.predicate, label: props.column.predicate }}
            onChange={value => props.updateSelectedFilters('predicate', value.value, props.index)}
          />
        </Grid.Column>
        <Grid.Column>
          <Select
            options={props.filterableColumns.map(createPropertyOption('column', 'heading'))}
            value={{ value: props.column.attribute, label: props.column.attribute }}
            onChange={value => props.updateSelectedFilters('attribute', value.value, props.index)}
          />
        </Grid.Column>
        <Grid.Column>
          <Select
            options={filterQueriesOptions}
            value={{ value: props.column.query, label: props.column.query }}
            onChange={value => props.updateSelectedFilters('query', value.value, props.index)}
          />
        </Grid.Column>
        {['Is Empty', 'Is Not Empty'].includes(props.column.query) ? null : (
          <Grid.Column>
            <InputCategories
              column={props.column}
              updateSelectedFilters={props.updateSelectedFilters}
              index={props.index}
              filterableColumns={props.filterableColumns}
            />
          </Grid.Column>
        )}
      </Grid.Row>
    </Grid>
  );
};

const InputCategories = props => {
  if (props.column.type === 'String') {
    return (
      <Input
        placeholder="Search..."
        value={props.column.value}
        onChange={e => props.updateSelectedFilters('value', e.target.value, props.index)}
      />
    );
  } else if (props.column.type === 'Select') {
    return (
      <Select
        options={findColumnOptions(props.filterableColumns, props.column.attribute)}
        value={{ value: props.column.value, label: props.column.value }}
        onChange={({ value }) => props.updateSelectedFilters('value', value, props.index)}
      />
    );
  } else {
    return null;
  }
};

FilterDiv.propTypes = {
  filterableColumns: PropTypes.array.isRequired,
  selectedFilters: PropTypes.array.isRequired,
  addFilter: PropTypes.func.isRequired,
  removeFilter: PropTypes.func.isRequired,
  applyFilter: PropTypes.func.isRequired,
  updateSelectedFilters: PropTypes.func.isRequired,
};

FilterDiv.defaultProps = {
  filterableColumns: [],
  selectedFilters: [],
};
export default TableFilter;
