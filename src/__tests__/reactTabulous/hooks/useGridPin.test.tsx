import { act, renderHook } from '@testing-library/react';

import { DataGridContextProvider } from '../../../reactTabulous/context';
import { useGridPin } from '../../../reactTabulous/hooks/useGridPin';

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

describe('useGridPin', () => {
	test('should return default values', () => {
		const wrapper = ({ children }: any) => (
			<DataGridContextProvider props={props}>{children}</DataGridContextProvider>
		);
		renderHook(useGridPin, { wrapper });
	});

	test('should return default values and update column header isVisible', () => {
		const wrapper = ({ children }: any) => (
			<DataGridContextProvider props={props}>{children}</DataGridContextProvider>
		);
		const { result } = renderHook(useGridPin, { wrapper });

		void act(() => result.current.handlePin('name', 'left'));
	});
});
