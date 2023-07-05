import { act, renderHook } from '@testing-library/react';
import { useGridColumnHeaders } from '../../../data-grid/hooks/useGridColumnHeaders';

import { DataGridContextProvider } from '../../../data-grid/context';

const props = {
	data: [
		{ id: '1', name: 'test' },
		{ id: '2', name: 'test2' }
	],
	columns: [
		{ field: 'id', headerName: 'ID', isVisible: true },
		{ field: 'name', headerName: 'Name', isVisible: true }
	]
};

describe('useGridColumnHeaders', () => {
	test('should return default values', () => {
		const wrapper = ({ children }: any) => (
			<DataGridContextProvider props={props}>{children}</DataGridContextProvider>
		);
		renderHook(useGridColumnHeaders, { wrapper });
	});

	test('should return default values and update column header isVisible', () => {
		const wrapper = ({ children }: any) => (
			<DataGridContextProvider props={props}>{children}</DataGridContextProvider>
		);
		const { result } = renderHook(useGridColumnHeaders, { wrapper });
		const columns = [
			{
				field: 'id',
				headerName: 'ID',
				isVisible: true,
				isSearchable: false,
				pinned: null,
				width: 'max-content'
			},
			{
				field: 'name',
				headerName: 'Name',
				isVisible: true,
				isSearchable: false,
				pinned: null,
				width: 'max-content'
			}
		];
		expect(result.current.columns).toEqual(columns);
		void act(() => result.current.onHideColumns('ID'));
		const updatedColumns = [
			{
				field: 'id',
				headerName: 'ID',
				isVisible: false,
				isSearchable: false,
				pinned: null,
				width: 'max-content'
			},
			{
				field: 'name',
				headerName: 'Name',
				isVisible: true,
				isSearchable: false,
				pinned: null,
				width: 'max-content'
			}
		];
		expect(result.current.columns).toEqual(updatedColumns);
	});
});
