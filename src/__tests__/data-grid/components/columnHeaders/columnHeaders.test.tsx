import user from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { dataSet1Columns, getDataSetBasedOnCountPassed } from '../../../../data';
import { DataGridContextProvider } from '../../../../data-grid/context';
import { ColumnHeaders } from '../../../../data-grid/components/columnHeaders';

const props = {
	data: getDataSetBasedOnCountPassed(10),
	columns: dataSet1Columns,
	checkboxSelection: true
};

const Wrapper = ({ children }: any) => (
	<DataGridContextProvider props={props}>{children}</DataGridContextProvider>
);

describe('ColumnHeaders', () => {
	test('should render correctly', () => {
		render(<ColumnHeaders />, { wrapper: Wrapper });

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
	});

	test('should render correctly when columns is pinned to left', async () => {
		user.setup();
		render(<ColumnHeaders />, { wrapper: Wrapper });

		const buttonElements = screen.getAllByRole('button');
		await user.click(buttonElements[3]);

		const emailKebabButtonOptions = screen.getAllByRole('listitem');
		expect(emailKebabButtonOptions).toHaveLength(9);

		await user.click(emailKebabButtonOptions[3]);
	});

	test('should render correctly when columns is pinned to right', async () => {
		user.setup();
		render(<ColumnHeaders />, { wrapper: Wrapper });

		const buttonElements = screen.getAllByRole('button');
		await user.click(buttonElements[1]);

		const emailKebabButtonOptions = screen.getAllByRole('listitem');
		expect(emailKebabButtonOptions).toHaveLength(9);

		await user.click(emailKebabButtonOptions[2]);
	});

	test('should render correctly when columns are sorted', async () => {
		user.setup();
		render(<ColumnHeaders />, { wrapper: Wrapper });

		const buttonElements = screen.getAllByRole('button');
		await user.click(buttonElements[0]);
	});
});
