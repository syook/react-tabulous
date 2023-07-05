import { render, screen } from '@testing-library/react';
import { dataSet1Columns, getDataSetBasedOnCountPassed } from '../../../../data';
import { GridBody } from '../../../../reactTabulous/components';
import { DataGridContextProvider } from '../../../../reactTabulous/context';

const props = {
	data: getDataSetBasedOnCountPassed(10),
	columns: dataSet1Columns,
	checkboxSelection: true
};

const Wrapper = ({ children }: any) => (
	<DataGridContextProvider props={props}>{children}</DataGridContextProvider>
);

describe('GridBody', () => {
	test('should render correctly', () => {
		render(<GridBody />, { wrapper: Wrapper });

		const [checkbox, nameHeader, emailHeader] = screen.getAllByRole('columnheader');
		expect(checkbox).toBeInTheDocument();
		expect(nameHeader).toBeInTheDocument();
		expect(emailHeader).toBeInTheDocument();

		const nameHeaderName = screen.getByText('Name');
		const emailHeaderName = screen.getByText('Email');
		expect(nameHeaderName).toBeInTheDocument();
		expect(emailHeaderName).toBeInTheDocument();

		const [nameSortButton, nameKebabButton, emailSortButton, emailKebabButton] =
			screen.getAllByRole('button');
		expect(nameSortButton).toBeInTheDocument();
		expect(nameKebabButton).toBeInTheDocument();
		expect(emailSortButton).toBeInTheDocument();
		expect(emailKebabButton).toBeInTheDocument();

		const checkboxCells = screen.getAllByRole('checkbox', { hidden: true });
		expect(checkboxCells).toHaveLength(11);
	});
});
