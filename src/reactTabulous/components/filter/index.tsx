import React from 'react';
import styled from '@emotion/styled';

import { Button, Icon, IconButton, Select } from '../widgets';
import { InputCategories } from './inputCategories';

import { useGridFilter } from '../../hooks/useGridFilter';
import { useGridRootProps } from '../../hooks/useGridRootProps';

import { type FilterFieldProps } from '../../models/gridFiltersModel';
import { type GridColDef } from '../../models';

export const filterPredicates = ['And', 'Or'];
interface FilterOperators {
  string: string[];
  number: string[];
  date: string[];
  dateTime: string[];
  boolean: string[];
  singleSelect: string[];
  // multiSelect: string[];
}

export const filterOperators: FilterOperators = {
  string: ['contains', 'does not contains', 'is', 'is not', 'is empty', 'is not empty'],
  number: ['=', '≠', '<', '>', '≤', '≥', 'is empty', 'is not empty'],
  date: ['is', 'is not', 'is before', 'is after', 'is empty', 'is not empty'], //, 'is on or before', 'is on or after'
  dateTime: ['is', 'is not', 'is before', 'is after', 'is empty', 'is not empty'],
  boolean: ['is'],
  singleSelect: ['is', 'is not', 'is empty', 'is not empty']
  // singleSelect: ['is', 'is not', 'is any of', 'is none of', 'is empty', 'is not empty']
  // multiSelect: ['has any of', 'has none of', 'is empty', 'is not empty'],
};

const StyledFilterForm = styled.div({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 5,
  '.filterBody': {
    maxHeight: 200,
    overflowY: 'auto',

    '.filterFieldRow': {
      display: 'flex',
      alignItems: 'center',
      padding: 8,
      '& .condition': {
        margin: '0 8px'
      },
      '& .column': {
        width: 150,
        marginRight: 8
      },
      '& .operators': {
        width: 120,
        marginRight: 8
      },
      '& .inputCategories': {
        width: 190,
        marginRight: 8
      },
      '& .inputCategories:last-child': {
        marginRight: 0
      }
    }
  },
  '.filterActions': {
    display: 'flex',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTop: '1px solid var(--grey-300, #e6e6e6)'
  },
  '.otherFilterActions': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export const FilterForm: React.FC = () => {
  const {
    rootState: { columns, filters: gridFilters }
  } = useGridRootProps();

  const { handleFilterApply } = useGridFilter();

  const getFirstCol = (): FilterFieldProps => {
    const firstCol: GridColDef = columns.find((column: GridColDef) => column.isVisible && column.isFilterable) ?? {
      headerName: '',
      field: ''
    };

    const type: keyof FilterOperators = (firstCol.type ?? 'string') as keyof FilterOperators;

    const operator = filterOperators[type][0];

    return {
      condition: 'And',
      column: firstCol.headerName,
      type,
      operator,
      value: '',
      field: firstCol.field
    };
  };

  const [filters, setFilters] = React.useState<FilterFieldProps[]>([getFirstCol()]);

  React.useEffect(() => {
    const hasFilterValues = gridFilters.some(filter => filter.value !== '');
    const newObj = hasFilterValues ? gridFilters : [getFirstCol()];
    setFilters(newObj);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (columns.length === 0) return null;

  const columnOptions = columns.reduce(
    (acc, column) => {
      if (
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        (column.isVisible || gridFilters.some(filter => filter.field === column.field)) &&
        column.isFilterable &&
        column.type !== 'action'
      ) {
        acc.push({ label: column.headerName, value: column.headerName });
      }
      return acc;
      // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter
    },
    [] as Array<{ label: string; value: string }>
  );

  const handleOnchange = (key: keyof FilterFieldProps, value: any, index: number): void => {
    let newFilters: FilterFieldProps[] = [...filters];
    newFilters[index][key] = value;
    if (key === 'column') {
      const col: any = columns.find(c => c.headerName === value);
      const type = col.type ?? 'string';
      newFilters[index].type = type;
      newFilters[index].value = '';
      newFilters[index].field = col.field;
      newFilters[index].operator = filterOperators[type as keyof FilterOperators][0];
      newFilters[index].options = [];
      if (col.type === 'boolean') {
        newFilters[index].value = 'true';
      } else if (col.type === 'singleSelect') {
        newFilters[index].value = '';
        newFilters[index].options = col.options;
      }
    } else if (key === 'condition') {
      newFilters = newFilters.map((filter, i) => ({ ...filter, condition: i === 0 ? '' : value }));
    } else if (key === 'operator') {
      if (value === 'is empty' || value === 'is not empty') {
        newFilters[index].value = '';
      }
    }
    setFilters(newFilters);
  };

  const handleOnAddFilter = (): void => {
    const newObj = getFirstCol();
    setFilters(p => p.concat({ ...newObj, condition: 'And' }));
  };

  const handleClearFilter = () => {
    const newObj = getFirstCol();
    setFilters([newObj]);
    handleFilterApply([newObj]);
  };

  const handleApplyFilter = (): void => {
    handleFilterApply(filters);
  };

  const handleRemoveFilter = (index: number): void => {
    const newFilters = filters.filter((_, i) => i !== index);
    setFilters(newFilters);
  };

  return (
    <StyledFilterForm>
      {columnOptions.length > 0 && (
        <>
          <div className="filterBody scrollStyle">
            {filters.map((filter: FilterFieldProps, index) => {
              return (
                <div key={index} className="filterFieldRow">
                  <IconButton
                    name="close"
                    type="transparent"
                    size={14}
                    disabled={filters.length === 1}
                    onClick={() => {
                      handleRemoveFilter(index);
                    }}
                  />
                  <Select
                    options={filterPredicates}
                    value={filter.condition}
                    style={{ visibility: index === 0 ? 'hidden' : 'visible' }}
                    className="condition"
                    onChange={e => {
                      handleOnchange('condition', e.target.value, index);
                    }}
                    disabled={index > 1}
                  />

                  <Select
                    options={columnOptions}
                    value={filter.column}
                    className="column"
                    onChange={e => {
                      handleOnchange('column', e.target.value, index);
                    }}
                  />

                  <Select
                    options={filterOperators[filter.type]}
                    value={filter.operator}
                    className="operators"
                    onChange={e => {
                      handleOnchange('operator', e.target.value, index);
                    }}
                  />

                  <InputCategories
                    type={filter.type}
                    disabled={['is empty', 'is not empty'].includes(filter.operator)}
                    rowIndex={index}
                    query={filter.operator}
                    options={filter.options}
                    value={filter.value}
                    className="inputCategories"
                    onChange={(value: any) => {
                      handleOnchange('value', value, index);
                    }}
                  />
                </div>
              );
            })}
          </div>

          <div className="filterActions">
            <Button variant="text" size="small" icon={<Icon name="add" size={14} />} onClick={handleOnAddFilter}>
              Add Filter
            </Button>

            <div className="otherFilterActions">
              <Button variant="text" size="small" onClick={handleClearFilter}>
                Clear All
              </Button>

              <Button variant="contained" size="small" onClick={handleApplyFilter}>
                Apply
              </Button>
            </div>
          </div>
        </>
      )}
    </StyledFilterForm>
  );
};
