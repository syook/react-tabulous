import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Select from 'react-select';
import { Popup, Button, Icon, List, Grid, Input } from 'semantic-ui-react';

import { findColumnOptions, createPropertyOption } from './utils';

import { predicateOptions, filterQueriesOptions } from './constants';

class TableFilter extends Component {
  render() {
    return (
      // <div style={{ textAlign: 'left' }}>
      <Popup
        trigger={
          <span>
            <Icon name="filter" /> Filter
          </span>
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
  const indexOnePredicate = props.selectedFilters.length > 1 ? props.selectedFilters[1].predicate : null;

  return (
    <div style={{ width: '60em' }}>
      <List divided relaxed>
        {props.selectedFilters.map((column, index) => (
          <List.Item key={index}>
            <List.Content>
              <FilterGrid
                index={index}
                column={column}
                removeFilter={props.removeFilter}
                updateSelectedFilters={props.updateSelectedFilters}
                indexOnePredicate={indexOnePredicate}
                filterableColumns={props.filterableColumns}
              />
            </List.Content>
          </List.Item>
        ))}
      </List>
      <Button primary onClick={props.addFilter}>
        <Icon name="add" /> Add Filter{' '}
      </Button>
      <Button positive onClick={props.applyFilter} disabled={!(props.selectedFilters || []).length}>
        {' '}
        Apply Filter{' '}
      </Button>
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
  } else if (props.column.type === 'Dropdown') {
    return (
      <Select
        options={findColumnOptions(props.filterableColumns, props.column.attribute)}
        value={props.column.value}
        onChange={value => props.updateSelectedFilters('value', value, props.index)}
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
