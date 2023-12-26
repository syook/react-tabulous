import { act, renderHook } from '@testing-library/react';
import { dataSet1Columns, getDataSetBasedOnCountPassed } from '../../../data';
import { searchObj, useGridSearch } from '../../../reactTabulous/hooks/useGridSearch';
import { DataGridContextProvider } from '../../../reactTabulous/context';

describe('searchObj', () => {
  test('should return true if searchText is found in any of the searchKeys', () => {
    const row = {
      name: 'test',
      age: 20,
      address: 'test address'
    };
    const searchText = 'test';
    const searchKeys = ['name', 'age', 'address'];
    expect(searchObj(row, searchText, searchKeys)).toBe(true);
  });

  test('should return false if searchText is not found in any of the searchKeys', () => {
    const row = {
      name: 'test',
      age: 20,
      address: 'test address'
    };
    const searchText = 'test1';
    const searchKeys = ['name', 'age', 'address'];
    expect(searchObj(row, searchText, searchKeys)).toBe(false);
  });

  test('should return true if searchText is found in any of the searchKeys even if the value is null', () => {
    const row = {
      age: 20,
      address: null
    };
    const searchText = 'test';
    const searchKeys = ['name', 'age', 'address'];
    expect(searchObj(row, searchText, searchKeys)).toBe(false);
  });
});

const props = {
  data: getDataSetBasedOnCountPassed(50),
  columns: dataSet1Columns
};

describe('useGridSearch', () => {
  test('should return default values', () => {
    const wrapper = ({ children }: any) => <DataGridContextProvider props={props}>{children}</DataGridContextProvider>;
    renderHook(useGridSearch, { wrapper });
  });

  test('should return default values and toggle filters', () => {
    const wrapper = ({ children }: any) => <DataGridContextProvider props={props}>{children}</DataGridContextProvider>;
    const { result } = renderHook(useGridSearch, { wrapper });
    void act(() => result.current.handleSearchApply('11'));
  });
});
