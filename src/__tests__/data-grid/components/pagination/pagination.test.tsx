import user from '@testing-library/user-event';

import { Pagination } from '../../../../data-grid/components/pagination';
import { customRender, screen } from '../../../../data-grid/context/test-utils';

describe('Pagination', () => {
	test('should render correctly', () => {
		customRender(<Pagination />);

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

	test('should render correctly and show initial values', () => {
		customRender(<Pagination />);
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
		const rowPerPageDropdown = screen.getByRole('combobox') as HTMLSelectElement;
		expect(rowPerPageDropdown.value).toBe('25');

		const pageNumber = screen.getByText('1');
		expect(pageNumber).toBeInTheDocument();
	});

	test('should render correctly and show updated page number on next page click and previous page again', async () => {
		user.setup();
		customRender(<Pagination />);
		const paginationButtons = screen.getAllByRole('button');
		await user.click(paginationButtons[2]);
		const pageNumberAfterNextPageClick = screen.getByText('2');
		expect(pageNumberAfterNextPageClick).toBeInTheDocument();

		await user.click(paginationButtons[1]);
		const pageNumberAfterPreviousPageClick = screen.getByText('1');
		expect(pageNumberAfterPreviousPageClick).toBeInTheDocument();
	});

	test('should render correctly and show updated page number on final page click and first page click again', async () => {
		user.setup();
		customRender(<Pagination />);
		const paginationButtons = screen.getAllByRole('button');
		await user.click(paginationButtons[3]);
		const pageNumberAfterLastPageClick = screen.getByText('2');
		expect(pageNumberAfterLastPageClick).toBeInTheDocument();

		await user.click(paginationButtons[0]);
		const pageNumberAfterFirstPageClick = screen.getByText('1');
		expect(pageNumberAfterFirstPageClick).toBeInTheDocument();
	});

	test('should render correctly and change rows per page', async () => {
		user.setup();
		customRender(<Pagination />);
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
		const rowPerPageDropdown = screen.getByRole('combobox') as HTMLSelectElement;
		await user.selectOptions(rowPerPageDropdown, '50');
		expect(rowPerPageDropdown.value).toBe('50');
	});
});
