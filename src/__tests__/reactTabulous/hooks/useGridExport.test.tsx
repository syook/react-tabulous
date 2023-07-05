import { act, renderHook } from '@testing-library/react';

import { Select } from '../../../reactTabulous/components/widgets';

import { DataGridContextProvider } from '../../../reactTabulous/context';
import {
	getColumnsData,
	getRowsData,
	useGridExport
} from '../../../reactTabulous/hooks/useGridExport';

const workPlaceOptions = ['Bengaluru', 'Mumbai', 'Delhi', 'Chennai', 'Hyderabad'];

describe('getColumnsData', () => {
	test('should return columns data 1', () => {
		const columns = [
			{
				field: 'id',
				headerName: 'ID',
				isVisible: true
			},
			{
				field: 'name',
				headerName: 'Name',
				isVisible: true
			}
		];
		const result = getColumnsData(columns);
		expect(result).toBe('ID,Name');
	});

	test('should return columns data 2', () => {
		const columns = [
			{
				field: 'id',
				headerName: 'ID',
				isVisible: false
			},
			{
				field: 'name',
				headerName: 'Name',
				isVisible: true
			}
		];
		const result = getColumnsData(columns);
		expect(result).toBe('Name');
	});

	test('should return columns data 3', () => {
		const columns = [
			{
				field: 'id',
				headerName: 'ID',
				isVisible: false
			},
			{
				field: 'name',
				headerName: 'Name',
				isVisible: false
			}
		];
		const result = getColumnsData(columns);
		expect(result).toBe('');
	});
});

describe('getRowsData', () => {
	test('should return rows data 1', () => {
		const rows = [
			{
				id: 1,
				name: 'John',
				workPlace: 'Bengaluru',
				level: 1,
				address: { city: 'New York', country: 'USA' }
			},
			{
				id: 2,
				name: 'Doe',
				workPlace: 'Mumbai',
				level: 2,
				address: { city: 'London', country: 'UK' }
			}
		];
		const columns = [
			{
				field: 'id',
				headerName: 'ID',
				isVisible: true
			},
			{
				field: 'name',
				headerName: 'Name',
				isVisible: true
			},
			{
				field: 'address',
				headerName: 'Address',
				isVisible: true,
				valueGetter: (row: any) => {
					return `${row.address.city}, ${row.address.country}`;
				}
			},
			{
				field: 'level',
				renderCell: (row: any) => {
					const level = row?.level ?? 1;
					const levelText = level === 1 ? 'Beginner' : level === 2 ? 'Intermediate' : 'Advanced';
					const levelColor = level === 1 ? 'green' : level === 2 ? 'orange' : 'red';
					return <span style={{ color: levelColor }}>{levelText}</span>;
				},
				headerName: 'Level',
				type: 'string'
			},
			{
				field: 'workPlace',
				headerName: 'Work Place',
				type: 'string',
				renderCell: (row: any) => {
					const workPlace = row?.workPlace ?? '';

					const onChange = (event: any) => {
						console.log(event.target.value);
					};

					return <Select value={workPlace} options={workPlaceOptions} onChange={onChange} />;
				}
			},
			{
				field: 'action',
				headerName: 'Action',
				type: 'action',
				isVisible: true,
				cellRenderer: () => <div>action</div>
			}
		];
		const result = getRowsData(rows, columns);
		expect(result).toBe(
			'1,John,"New York, USA",Beginner,Bengaluru,\n2,Doe,"London, UK",Intermediate,Mumbai,'
		);
	});
});

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

describe('useGridExport', () => {
	test('should return default values', () => {
		const wrapper = ({ children }: any) => (
			<DataGridContextProvider props={props}>{children}</DataGridContextProvider>
		);
		renderHook(useGridExport, { wrapper });
	});

	test('should return default values and invoke download of csv file', () => {
		const wrapper = ({ children }: any) => (
			<DataGridContextProvider props={props}>{children}</DataGridContextProvider>
		);
		renderHook(useGridExport, { wrapper });
		const { result } = renderHook(useGridExport, { wrapper });
		void act(() => result.current.handleExport('csv'));
	});

	test('should return default values and invoke download of xlsx file', () => {
		const wrapper = ({ children }: any) => (
			<DataGridContextProvider props={props}>{children}</DataGridContextProvider>
		);
		renderHook(useGridExport, { wrapper });
		const { result } = renderHook(useGridExport, { wrapper });
		void act(() => result.current.handleExport('xlsx'));
	});
});
