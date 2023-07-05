import { act, renderHook } from '@testing-library/react';
import { useGridDensity } from '../../../data-grid/hooks/useGridDensity';

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

describe('useGridDensity', () => {
	test('should return default values', () => {
		const wrapper = ({ children }: any) => (
			<DataGridContextProvider props={props}>{children}</DataGridContextProvider>
		);
		renderHook(useGridDensity, { wrapper });
	});

	test('should return default values and update density type', () => {
		const wrapper = ({ children }: any) => (
			<DataGridContextProvider props={props}>{children}</DataGridContextProvider>
		);
		const { result } = renderHook(useGridDensity, { wrapper });
		expect(result.current.density).toBe('standard');
		void act(() => result.current.onChangeDensity('comfortable'));
		expect(result.current.density).toBe('comfortable');
	});
});
