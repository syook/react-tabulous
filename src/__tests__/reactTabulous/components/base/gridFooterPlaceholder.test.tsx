import { render } from '@testing-library/react';
import { dataSet1Columns, getDataSetBasedOnCountPassed } from '../../../../data';
import { GridFooterPlaceholder } from '../../../../reactTabulous/components/base/gridFooterPlaceholder';
import { DataGridContextProvider } from '../../../../reactTabulous/context';
import { customRender, screen } from '../../../../reactTabulous/context/test-utils';

const props = {
	data: getDataSetBasedOnCountPassed(10),
	columns: dataSet1Columns,
	hideFooter: true
};

const Wrapper = ({ children }: any) => (
	<DataGridContextProvider props={props}>{children}</DataGridContextProvider>
);

describe('GridFooterPlacement', () => {
	test('should render correctly', () => {
		customRender(<GridFooterPlaceholder />);
		const rowPerPageText = screen.getByText(/rows per page/i);
		expect(rowPerPageText).toBeInTheDocument();

		const rowsCountText = screen.getByText(/1 - 25 of 50/i);
		expect(rowsCountText).toBeInTheDocument();

		const rowPerPageDropdown = screen.getByRole('combobox');
		expect(rowPerPageDropdown).toBeInTheDocument();

		const [firstPageButton, previousPageButton, nextPageButton, lastPageButton] =
			screen.getAllByRole('button');
		expect(firstPageButton).toBeInTheDocument();
		expect(previousPageButton).toBeInTheDocument();
		expect(nextPageButton).toBeInTheDocument();
		expect(lastPageButton).toBeInTheDocument();
	});

	test('should render correctly and when hideFooter is true', () => {
		const { container } = render(<GridFooterPlaceholder />, { wrapper: Wrapper });
		expect(container).toBeEmptyDOMElement();
	});
});
