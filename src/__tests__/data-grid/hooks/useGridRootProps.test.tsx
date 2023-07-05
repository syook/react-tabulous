import { renderHook } from '@testing-library/react';
import { useGridRootProps } from '../../../data-grid/hooks/useGridRootProps';
import { DataGridContextProvider } from '../../../data-grid/context';

describe('useGridRootProps', () => {
	test('should return default values', () => {
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
		const wrapper = ({ children }: any) => (
			<DataGridContextProvider props={props}>{children}</DataGridContextProvider>
		);
		renderHook(useGridRootProps, { wrapper });
	});
});
