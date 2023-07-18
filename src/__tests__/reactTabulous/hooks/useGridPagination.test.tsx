import { act, renderHook } from '@testing-library/react';
import { DataGridContextProvider } from '../../../reactTabulous/context';
import { useGridPagination } from '../../../reactTabulous/hooks/useGridPagination';
import { dataSet1Columns, getDataSetBasedOnCountPassed } from '../../../data';

const props = {
  data: getDataSetBasedOnCountPassed(50),
  columns: dataSet1Columns
};

describe('useGridPagination', () => {
  test('should return default values', () => {
    const wrapper = ({ children }: any) => <DataGridContextProvider props={props}>{children}</DataGridContextProvider>;

    renderHook(useGridPagination, { wrapper });
  });

  test('should return default values and update page size', () => {
    const wrapper = ({ children }: any) => <DataGridContextProvider props={props}>{children}</DataGridContextProvider>;

    const { result } = renderHook(useGridPagination, { wrapper });
    void act(() => result.current.onPageSizeChange(50));
  });

  test('should return default values and update page', () => {
    const wrapper = ({ children }: any) => <DataGridContextProvider props={props}>{children}</DataGridContextProvider>;

    const { result } = renderHook(useGridPagination, { wrapper });
    void act(() => result.current.onPageChange(2));
  });
});
