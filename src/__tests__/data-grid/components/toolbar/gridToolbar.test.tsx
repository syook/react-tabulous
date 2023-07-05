import { dataSet1Columns, getDataSetBasedOnCountPassed } from '../../../../data';
import { GridToolbar } from '../../../../data-grid/components/toolbar';
import { DataGridContextProvider } from '../../../../data-grid/context';
import { render, screen } from '../../../../data-grid/context/test-utils';

describe('GridToolbar', () => {
	test('should render correctly when children is not passed', () => {
		const props = {
			data: getDataSetBasedOnCountPassed(10),
			columns: dataSet1Columns,
			children: () => <div>Test</div>
		};

		const Wrapper = ({ children }: any) => (
			<DataGridContextProvider props={props}>{children}</DataGridContextProvider>
		);

		render(<GridToolbar />, { wrapper: Wrapper });
		const columnsButton = screen.getByRole('button', { name: /columns/i });
		expect(columnsButton).toBeInTheDocument();

		const filterButton = screen.getByRole('button', { name: /filters/i });
		expect(filterButton).toBeInTheDocument();

		const densityButton = screen.getByRole('button', { name: /density/i });
		expect(densityButton).toBeInTheDocument();

		const exportElement = screen.getByRole('button', { name: /export/i });
		expect(exportElement).toBeInTheDocument();

		const searchInput = screen.getByRole('searchbox');
		expect(searchInput).toBeInTheDocument();

		const testElement = screen.getByText(/test/i);
		expect(testElement).toBeInTheDocument();
	});

	test('should render correctly and when children is passed', () => {
		const props = {
			data: getDataSetBasedOnCountPassed(10),
			columns: dataSet1Columns,
			disableColumnFilter: true,
			disableColumnSelector: true,
			disableDensitySelector: true,
			fetchOnPageChange: () => {}
		};

		const Wrapper = ({ children }: any) => (
			<DataGridContextProvider props={props}>{children}</DataGridContextProvider>
		);

		render(<GridToolbar />, { wrapper: Wrapper });

		const searchInput = screen.getByRole('searchbox');
		expect(searchInput).toBeInTheDocument();
	});
});
