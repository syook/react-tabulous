import { act, renderHook } from '@testing-library/react';
import { filterAllData, queryCondition, useGridFilter } from '../../../reactTabulous/hooks/useGridFilter';
import { DataGridContextProvider } from '../../../reactTabulous/context';
import { dataSet1Columns, getDataSetBasedOnCountPassed } from '../../../data';

describe('filterAllData', () => {
  test('should return data if filter is empty', () => {
    const filters = [
      {
        field: 'name',
        operator: 'contains',
        type: 'string',
        value: ''
      }
    ];
    const data = [
      {
        name: 'test',
        age: 20,
        address: 'test address'
      }
    ];
    expect(filterAllData(filters, data)).toEqual(data);
  });

  test('should return filtered data if filter is not empty', () => {
    const filters = [
      {
        field: 'name',
        operator: 'contains',
        type: 'string',
        value: 'test'
      }
    ];
    const data = [
      {
        name: 'test',
        age: 20,
        address: 'test address'
      },
      {
        name: 'test1',
        age: 21,
        address: 'test address1'
      }
    ];
    expect(filterAllData(filters, data)).toEqual([
      {
        name: 'test',
        age: 20,
        address: 'test address'
      },
      {
        name: 'test1',
        age: 21,
        address: 'test address1'
      }
    ]);
  });

  test('should return filtered data if filter is not empty and has AND condition', () => {
    const filters = [
      {
        field: 'name',
        operator: 'contains',
        type: 'string',
        value: 'test',
        condition: ''
      },
      {
        field: 'age',
        operator: '=',
        type: 'number',
        value: '20',
        condition: 'And'
      },
      {
        field: 'address',
        operator: 'contains',
        type: 'string',
        value: '',
        condition: 'And'
      }
    ];
    const data = [
      {
        name: 'test',
        age: 20,
        address: 'test address'
      },
      {
        name: 'test1',
        age: 21,
        address: 'test address1'
      }
    ];
    expect(filterAllData(filters, data)).toEqual([
      {
        name: 'test',
        age: 20,
        address: 'test address'
      }
    ]);
  });

  test('should return filtered data if filter is not empty and has OR condition', () => {
    const filters = [
      {
        field: 'name',
        operator: 'contains',
        type: 'string',
        value: 'test',
        condition: ''
      },
      {
        field: 'age',
        operator: '=',
        type: 'number',
        value: '20',
        condition: 'Or'
      },
      {
        field: 'address',
        operator: 'contains',
        type: 'string',
        value: '',
        condition: 'Or'
      }
    ];
    const data = [
      {
        name: 'test',
        age: 20,
        address: 'test address'
      },
      {
        name: 'test1',
        age: 21,
        address: 'test address1'
      }
    ];
    expect(filterAllData(filters, data)).toEqual([
      {
        name: 'test',
        age: 20,
        address: 'test address'
      },
      {
        name: 'test1',
        age: 21,
        address: 'test address1'
      }
    ]);
  });
});

describe('queryCondition', () => {
  test('should return false for "does not contain" operator', () => {
    const columnValue = 'test';
    const operator = 'does not contains';
    const value = 'test2';
    const type = 'string';
    expect(queryCondition(columnValue, operator, value, type)).toEqual(true);
  });

  test('should return true for "does not contain" operator', () => {
    const columnValue = 'test';
    const operator = 'does not contains';
    const value = 'test';
    const type = 'string';
    expect(queryCondition(columnValue, operator, value, type)).toEqual(false);
  });

  test('should return true for "is" operator', () => {
    const columnValue = 'test';
    const operator = 'is';
    const value = 'test';
    const type = 'string';
    expect(queryCondition(columnValue, operator, value, type)).toEqual(true);
  });

  test('should return true for "is" operator and boolean type', () => {
    const columnValue = 'true';
    const operator = 'is';
    const value = 'true';
    const type = 'boolean';
    expect(queryCondition(columnValue, operator, value, type)).toEqual(true);
  });

  test('should return false for "is" operator and boolean type', () => {
    const columnValue = '';
    const operator = 'is';
    const value = '';
    const type = 'boolean';
    expect(queryCondition(columnValue, operator, value, type)).toEqual(true);
  });

  test('should return false for "is" operator and data/date-time type', () => {
    const columnValue = '2021-03-16';
    const operator = 'is';
    const value = '2021-03-17';
    const type = 'date';
    expect(queryCondition(columnValue, operator, value, type)).toEqual(false);
  });

  test('should return false for "is not" operator and data/date-time type', () => {
    const columnValue = '2021-03-16';
    const operator = 'is not';
    const value = '2021-03-17';
    const type = 'date';
    expect(queryCondition(columnValue, operator, value, type)).toEqual(true);
  });

  test('should return true for "is not" operator and string type', () => {
    const columnValue = 'test';
    const operator = 'is not';
    const value = 'test1';
    const type = 'string';
    expect(queryCondition(columnValue, operator, value, type)).toEqual(true);
  });

  test('should return true for "is empty" operator and string type', () => {
    const columnValue = '';
    const operator = 'is empty';
    const value = '';
    const type = 'string';
    expect(queryCondition(columnValue, operator, value, type)).toEqual(true);
  });

  test('should return false for "is empty" operator and date type', () => {
    const columnValue = '2021-03-16';
    const operator = 'is empty';
    const value = '';
    const type = 'date';
    expect(queryCondition(columnValue, operator, value, type)).toEqual(false);
  });

  test('should return false for "is not empty" operator and string type', () => {
    const columnValue = '';
    const operator = 'is not empty';
    const value = '';
    const type = 'string';
    expect(queryCondition(columnValue, operator, value, type)).toEqual(false);
  });

  test('should return true for "is not empty" operator and date type', () => {
    const columnValue = '2021-03-16';
    const operator = 'is not empty';
    const value = '';
    const type = 'date';
    expect(queryCondition(columnValue, operator, value, type)).toEqual(true);
  });

  test('should return true for "=" operator and number type', () => {
    const columnValue = '20';
    const operator = '=';
    const value = '20';
    const type = 'number';
    expect(queryCondition(columnValue, operator, value, type)).toEqual(true);
  });

  test('should return true for "≠" operator and number type', () => {
    const columnValue = '21';
    const operator = '≠';
    const value = '20';
    const type = 'number';
    expect(queryCondition(columnValue, operator, value, type)).toEqual(true);
  });

  test('should return true for "<" operator and number type', () => {
    const columnValue = '20';
    const operator = '<';
    const value = '25';
    const type = 'number';
    expect(queryCondition(columnValue, operator, value, type)).toEqual(true);
  });

  test('should return false for ">" operator and number type', () => {
    const columnValue = '20';
    const operator = '>';
    const value = '28';
    const type = 'number';
    expect(queryCondition(columnValue, operator, value, type)).toEqual(false);
  });

  test('should return true for "≤" operator and number type', () => {
    const columnValue = '21';
    const operator = '≤';
    const value = '29';
    const type = 'number';
    expect(queryCondition(columnValue, operator, value, type)).toEqual(true);
  });

  test('should return false for "≥" operator and number type', () => {
    const columnValue = '21';
    const operator = '≥';
    const value = '27';
    const type = 'number';
    expect(queryCondition(columnValue, operator, value, type)).toEqual(false);
  });

  // Dates tests
  test('should return true for "is before" operator and date/date-time type', () => {
    const columnValue = '2023-07-26';
    const operator = 'is before';
    const value = '2023-08-03';
    const type = 'date';
    expect(queryCondition(columnValue, operator, value, type)).toEqual(true);
  });
  test('should return false for "is after" operator and date/date-time type', () => {
    const columnValue = '2023-08-03';
    const operator = 'is after';
    const value = '2024-01-10';
    const type = 'date';
    expect(queryCondition(columnValue, operator, value, type)).toEqual(false);
  });

  test('should return false for no operator', () => {
    const columnValue = '2023-08-03';
    const operator = '';
    const value = '2024-01-10';
    const type = 'date';
    expect(queryCondition(columnValue, operator, value, type)).toEqual(false);
  });
});

const props = {
  data: getDataSetBasedOnCountPassed(50),
  columns: dataSet1Columns
};

describe('useGridFilter', () => {
  test('should return default values', () => {
    const wrapper = ({ children }: any) => <DataGridContextProvider props={props}>{children}</DataGridContextProvider>;
    renderHook(useGridFilter, { wrapper });
  });

  test('should return default values and toggle filters', () => {
    const wrapper = ({ children }: any) => <DataGridContextProvider props={props}>{children}</DataGridContextProvider>;
    const { result } = renderHook(useGridFilter, { wrapper });
    void act(() => result.current.onToggleFilterToolbar());
  });

  test('should return default values and update filters', () => {
    const wrapper = ({ children }: any) => <DataGridContextProvider props={props}>{children}</DataGridContextProvider>;
    const { result } = renderHook(useGridFilter, { wrapper });
    const filters = [
      {
        field: 'name',
        operator: 'contains',
        type: 'string',
        value: '11',
        condition: ''
      }
    ];
    void act(() => result.current.handleFilterApply(filters));
  });
});
