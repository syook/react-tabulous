import { act, renderHook } from '@testing-library/react';
import { useGridColumn } from '../../../data-grid/hooks/useGridColumn';

import { DataGridContextProvider } from '../../../data-grid/context';
import { dataSet1Columns, getDataSetBasedOnCountPassed } from '../../../data';

const props = {
	data: getDataSetBasedOnCountPassed(50),
	columns: dataSet1Columns
};

describe('useGridColumn', () => {
	test('should return default values', () => {
		const wrapper = ({ children }: any) => (
			<DataGridContextProvider props={props}>{children}</DataGridContextProvider>
		);
		renderHook(useGridColumn, { wrapper });
	});

	test('should return default values and hide column', () => {
		const wrapper = ({ children }: any) => (
			<DataGridContextProvider props={props}>{children}</DataGridContextProvider>
		);
		const { result } = renderHook(useGridColumn, { wrapper });
		void act(() => result.current.onHideColumns('name'));
	});

	test('should return default values and toggle hide or show column', () => {
		const wrapper = ({ children }: any) => (
			<DataGridContextProvider props={props}>{children}</DataGridContextProvider>
		);
		const { result } = renderHook(useGridColumn, { wrapper });
		void act(() => result.current.onToggleColumns(true));
	});

	test('should return default values and toggle column toolbar', () => {
		const wrapper = ({ children }: any) => (
			<DataGridContextProvider props={props}>{children}</DataGridContextProvider>
		);
		const { result } = renderHook(useGridColumn, { wrapper });
		void act(() => result.current.onToggleColumnToolbar());
	});

	test('should return default values and move column to left', () => {
		const wrapper = ({ children }: any) => (
			<DataGridContextProvider props={props}>{children}</DataGridContextProvider>
		);
		const { result } = renderHook(useGridColumn, { wrapper });
		void act(() => result.current.onMoveColumn('email', 'left'));
	});

	test('should return default values and move column to right', () => {
		const wrapper = ({ children }: any) => (
			<DataGridContextProvider props={props}>{children}</DataGridContextProvider>
		);
		const { result } = renderHook(useGridColumn, { wrapper });
		void act(() => result.current.onMoveColumn('name', 'right'));
	});

	test('should return default values and dragging the column', () => {
		const wrapper = ({ children }: any) => (
			<DataGridContextProvider props={props}>{children}</DataGridContextProvider>
		);
		const { result } = renderHook(useGridColumn, { wrapper });
		void act(() => result.current.onDragColumn('name', 'email'));
	});

	test('should return default values and dragging the column when column does not exist', () => {
		const wrapper = ({ children }: any) => (
			<DataGridContextProvider props={props}>{children}</DataGridContextProvider>
		);
		const { result } = renderHook(useGridColumn, { wrapper });
		void act(() => result.current.onDragColumn('name', 'id'));
	});
});
