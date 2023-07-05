import { act, renderHook } from '@testing-library/react';
import { dataSet1Columns, getDataSetBasedOnCountPassed } from '../../../data';
import { DataGridContextProvider } from '../../../data-grid/context';
import { sortRecords, useGridSort } from '../../../data-grid/hooks/useGridSort';

describe('sortRecords', () => {
	test('should return empty array if field is empty', () => {
		const data = [
			{
				name: 'test',
				age: 20,
				address: 'test address'
			}
		];
		const field = '';
		const type = 'string';
		const sortOrder = 'asc';
		expect(sortRecords(data, field, type, sortOrder)).toEqual([]);
	});
	test('should return data if sortOrder is empty', () => {
		const data = [
			{
				name: 'test',
				age: 20,
				address: 'test address'
			}
		];
		const field = 'name';
		const type = 'string';
		const sortOrder = null;
		expect(sortRecords(data, field, type, sortOrder)).toEqual(data);
	});
	test('should return sorted data if type is date', () => {
		const data = [
			{
				name: 'test',
				age: 20,
				address: 'test address',
				date: '2020-01-01'
			},
			{
				name: 'test1',
				age: 21,
				address: 'test address1',
				date: '2020-01-02'
			}
		];
		const field = 'date';
		const type = 'date';
		const sortOrder = 'asc';
		expect(sortRecords(data, field, type, sortOrder)).toEqual([
			{
				name: 'test',
				age: 20,
				address: 'test address',
				date: '2020-01-01'
			},
			{
				name: 'test1',
				age: 21,
				address: 'test address1',
				date: '2020-01-02'
			}
		]);
	});
	test('should return sorted data if type is number', () => {
		const data = [
			{
				id: 8838,
				name: 'test2',
				email: 'test2@test.com',
				age: 30,
				mobile: 9057332171,
				isLoggedIn: 'true'
			},
			{
				id: 6098,
				name: 'test1',
				email: 'test1@test.com',
				age: 76,
				mobile: 9912513714,
				isLoggedIn: 'true'
			},
			{
				id: 8739,
				name: 'test4',
				email: 'test4@test.com',
				age: 25,
				mobile: 8947059465,
				isLoggedIn: 'false'
			},
			{
				id: 5975,
				name: 'test5',
				email: 'test5@test.com',
				age: 45,
				mobile: 9013449825,
				isLoggedIn: 'false'
			}
		];
		const field = 'age';
		const type = 'number';
		const sortOrder = 'asc';
		expect(sortRecords(data, field, type, sortOrder)).toEqual([
			{
				id: 8739,
				name: 'test4',
				email: 'test4@test.com',
				age: 25,
				mobile: 8947059465,
				isLoggedIn: 'false'
			},
			{
				id: 8838,
				name: 'test2',
				email: 'test2@test.com',
				age: 30,
				mobile: 9057332171,
				isLoggedIn: 'true'
			},
			{
				id: 5975,
				name: 'test5',
				email: 'test5@test.com',
				age: 45,
				mobile: 9013449825,
				isLoggedIn: 'false'
			},
			{
				id: 6098,
				name: 'test1',
				email: 'test1@test.com',
				age: 76,
				mobile: 9912513714,
				isLoggedIn: 'true'
			}
		]);
	});
	test('should return sorted data if type is string', () => {
		const data = [
			{
				name: 'test',
				age: 20,
				address: 'test address',
				date: '2020-01-01'
			},
			{
				name: 'test1',
				age: 21,
				address: 'test address1',
				date: '2020-01-02'
			}
		];
		const field = 'name';
		const type = 'string';
		const sortOrder = 'asc';
		expect(sortRecords(data, field, type, sortOrder)).toEqual([
			{
				name: 'test',
				age: 20,
				address: 'test address',
				date: '2020-01-01'
			},
			{
				name: 'test1',
				age: 21,
				address: 'test address1',
				date: '2020-01-02'
			}
		]);
	});
	test('should return sorted data if type is string and sortOrder is desc', () => {
		const data = [
			{
				name: 'test',
				age: 20,
				address: 'test address',
				date: '2020-01-01'
			},
			{
				name: 'test1',
				age: 21,
				address: 'test address1',
				date: '2020-01-02'
			}
		];
		const field = 'name';
		const type = 'string';
		const sortOrder = 'desc';
		expect(sortRecords(data, field, type, sortOrder)).toEqual([
			{
				name: 'test1',
				age: 21,
				address: 'test address1',
				date: '2020-01-02'
			},
			{
				name: 'test',
				age: 20,
				address: 'test address',
				date: '2020-01-01'
			}
		]);
	});
});

const props = {
	data: getDataSetBasedOnCountPassed(50),
	columns: dataSet1Columns
};

describe('useGridSort', () => {
	test('should return default values', () => {
		const wrapper = ({ children }: any) => (
			<DataGridContextProvider props={props}>{children}</DataGridContextProvider>
		);
		renderHook(useGridSort, { wrapper });
	});

	test('should return default values and handle sort ascending', () => {
		const wrapper = ({ children }: any) => (
			<DataGridContextProvider props={props}>{children}</DataGridContextProvider>
		);
		const { result } = renderHook(useGridSort, { wrapper });
		void act(() => result.current.handleSort('name', 'string', 'asc'));
	});

	test('should return default values and handle sort when sort type is not passed', () => {
		const wrapper = ({ children }: any) => (
			<DataGridContextProvider props={props}>{children}</DataGridContextProvider>
		);
		const { result } = renderHook(useGridSort, { wrapper });
		void act(() => result.current.handleSort('name', 'string'));
	});
});
