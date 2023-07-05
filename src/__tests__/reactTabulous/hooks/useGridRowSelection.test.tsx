import { act, renderHook } from '@testing-library/react';
import { DataGridContextProvider } from '../../../reactTabulous/context';
import { useGridRowSelection } from '../../../reactTabulous/hooks/useGridRowSelection';
import { dataSet1Columns, getDataSetBasedOnCountPassed } from '../../../data';

const props = {
	data: getDataSetBasedOnCountPassed(50),
	columns: dataSet1Columns
};

describe('useGridRowSelection', () => {
	test('should return default values', () => {
		const wrapper = ({ children }: any) => (
			<DataGridContextProvider props={props}>{children}</DataGridContextProvider>
		);
		renderHook(useGridRowSelection, { wrapper });
	});

	test('should return default values and handle row select', () => {
		const wrapper = ({ children }: any) => (
			<DataGridContextProvider props={props}>{children}</DataGridContextProvider>
		);
		const { result } = renderHook(useGridRowSelection, { wrapper });
		void act(() => result.current.handleRowSelect('2'));
	});

	test('should return default values and handle bulk row select', () => {
		const wrapper = ({ children }: any) => (
			<DataGridContextProvider props={props}>{children}</DataGridContextProvider>
		);
		const { result } = renderHook(useGridRowSelection, { wrapper });
		void act(() => result.current.handleBulkRowSelection());
	});
});
