import user from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { dataSet1Columns, getDataSetBasedOnCountPassed } from '../../../../data';
import { DataGridContextProvider } from '../../../../data-grid/context';
import { ColumnBody } from '../../../../data-grid/components/columnBody';

const props = {
	data: getDataSetBasedOnCountPassed(10),
	columns: dataSet1Columns,
	checkboxSelection: true
};

const Wrapper = ({ children }: any) => (
	<DataGridContextProvider props={props}>{children}</DataGridContextProvider>
);

describe('ColumnBody', () => {
	test('should render correctly', () => {
		render(<ColumnBody />, { wrapper: Wrapper });

		const checkboxCells = screen.getAllByRole('checkbox', { hidden: true });
		expect(checkboxCells).toHaveLength(10);
	});

	test('should render correctly when a column is pinned to left', () => {
		const props = {
			data: getDataSetBasedOnCountPassed(10),
			columns: [
				{
					field: 'name',
					headerName: 'Name',
					sortable: false,
					isVisible: true,
					pinned: 'left'
				},
				{
					field: 'email',
					headerName: 'Email',
					sortable: false,
					isVisible: true
				}
			],
			checkboxSelection: true
		};

		const Wrapper = ({ children }: any) => (
			<DataGridContextProvider props={props}>{children}</DataGridContextProvider>
		);

		render(<ColumnBody />, { wrapper: Wrapper });

		const checkboxCells = screen.getAllByRole('checkbox', { hidden: true });
		expect(checkboxCells).toHaveLength(10);
	});

	test('should render correctly when a column is pinned to right', () => {
		const props = {
			data: getDataSetBasedOnCountPassed(10),
			columns: [
				{
					field: 'name',
					headerName: 'Name',
					sortable: false,
					isVisible: true,
					pinned: 'right'
				},
				{
					field: 'email',
					headerName: 'Email',
					sortable: false,
					isVisible: true
				}
			],
			checkboxSelection: true
		};

		const Wrapper = ({ children }: any) => (
			<DataGridContextProvider props={props}>{children}</DataGridContextProvider>
		);

		render(<ColumnBody />, { wrapper: Wrapper });

		const checkboxCells = screen.getAllByRole('checkbox', { hidden: true });
		expect(checkboxCells).toHaveLength(10);
	});

	test('should render correctly when loading is true', () => {
		const props = {
			data: getDataSetBasedOnCountPassed(10),
			columns: dataSet1Columns,
			checkboxSelection: true,
			loading: true
		};

		const Wrapper = ({ children }: any) => (
			<DataGridContextProvider props={props}>{children}</DataGridContextProvider>
		);

		render(<ColumnBody />, { wrapper: Wrapper });

		const container = screen.getByRole('img');
		expect(container).toBeInTheDocument();
	});

	test('should render correctly when there is no data', () => {
		const NoRowsOverlay = () => <h4>No Data Available</h4>;
		const props = {
			data: [],
			columns: dataSet1Columns,
			noRowsOverlay: <NoRowsOverlay />
		};

		const Wrapper = ({ children }: any) => (
			<DataGridContextProvider props={props}>{children}</DataGridContextProvider>
		);

		render(<ColumnBody />, { wrapper: Wrapper });

		const noDataText = screen.getByText('No Data Available');
		expect(noDataText).toBeInTheDocument();
	});

	test('should render correctly when user clicks on one of the checkbox', async () => {
		user.setup();
		render(<ColumnBody />, { wrapper: Wrapper });

		const checkboxCells = screen.getAllByRole('checkbox', { hidden: true });
		await user.click(checkboxCells[0]);
		expect(checkboxCells[0]).toBeChecked();
	});
});
