import user from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { ColumnHeaderItem } from '../../../../reactTabulous/components/columnHeaders/columnHeaderItem';
import { dataSet1Columns, getDataSetBasedOnCountPassed } from '../../../../data';
import { DataGridContextProvider } from '../../../../reactTabulous/context';

describe('ColumnHeaderItem', () => {
	test('should render correctly', () => {
		const props = {
			data: getDataSetBasedOnCountPassed(10),
			columns: dataSet1Columns
		};

		const Wrapper = ({ children }: any) => (
			<DataGridContextProvider props={props}>{children}</DataGridContextProvider>
		);
		render(
			<ColumnHeaderItem
				columnObj={{
					field: 'name',
					headerName: 'Name',
					type: 'string',
					isVisible: true,
					pinned: null,
					width: 'max-content',
					isSearchable: true
				}}
				disabledMoveLeft={true}
				disabledMoveRight={false}
				disableColumnFilter={false}
				disableColumnMenu={false}
				disableColumnPinning={false}
				disableColumnReorder={false}
				disableColumnResize={false}
				disableColumnSelector={false}
				disableMultipleColumnsSorting={false}
				fetchOnPageChange={false}
				headerName={'Name'}
				sortBy={null}
				pinned={null}
				handleSort={() => {}}
				handlePin={() => {}}
				handleMove={() => {}}
				handleWidth={() => {}}
				onHideColumns={() => {}}
				onDragUpdate={() => {}}
				onToggleColumnToolbar={() => {}}
				onToggleFilterToolbar={() => {}}
			>
				Name
			</ColumnHeaderItem>,
			{ wrapper: Wrapper }
		);

		const headerName = screen.getByText('Name');
		expect(headerName).toBeInTheDocument();

		const [sortButton, kebabMenuButton] = screen.getAllByRole('button');
		expect(sortButton).toBeInTheDocument();
		expect(kebabMenuButton).toBeInTheDocument();
	});

	test('should render correctly when all menu item is disabled', () => {
		const props = {
			data: getDataSetBasedOnCountPassed(10),
			columns: dataSet1Columns
		};

		const Wrapper = ({ children }: any) => (
			<DataGridContextProvider props={props}>{children}</DataGridContextProvider>
		);
		render(
			<ColumnHeaderItem
				columnObj={{
					field: 'name',
					headerName: 'Name',
					type: 'string',
					isVisible: true,
					pinned: null,
					width: 'max-content',
					isSearchable: true
				}}
				disabledMoveLeft={true}
				disabledMoveRight={true}
				disableColumnFilter={true}
				disableColumnMenu={true}
				disableColumnPinning={true}
				disableColumnReorder={true}
				disableColumnResize={true}
				disableColumnSelector={true}
				disableMultipleColumnsSorting={false}
				fetchOnPageChange={false}
				headerName={'Name'}
				sortBy={'desc'}
				pinned={null}
				handleSort={() => {}}
				handlePin={() => {}}
				handleMove={() => {}}
				handleWidth={() => {}}
				onHideColumns={() => {}}
				onDragUpdate={() => {}}
				onToggleColumnToolbar={() => {}}
				onToggleFilterToolbar={() => {}}
			>
				Name
			</ColumnHeaderItem>,
			{ wrapper: Wrapper }
		);

		const headerName = screen.getByText('Name');
		expect(headerName).toBeInTheDocument();

		const [sortButton] = screen.getAllByRole('button');
		expect(sortButton).toBeInTheDocument();
	});

	test('should render correctly when kebab icon is clicked and update on other button click', async () => {
		user.setup();
		const props = {
			data: getDataSetBasedOnCountPassed(10),
			columns: dataSet1Columns
		};

		const Wrapper = ({ children }: any) => (
			<DataGridContextProvider props={props}>{children}</DataGridContextProvider>
		);
		render(
			<ColumnHeaderItem
				columnObj={{
					field: 'name',
					headerName: 'Name',
					type: 'string',
					isVisible: true,
					pinned: null,
					width: 'max-content',
					isSearchable: true
				}}
				disabledMoveLeft={true}
				disabledMoveRight={false}
				disableColumnFilter={false}
				disableColumnMenu={false}
				disableColumnPinning={false}
				disableColumnReorder={false}
				disableColumnResize={false}
				disableColumnSelector={false}
				disableMultipleColumnsSorting={false}
				fetchOnPageChange={false}
				headerName={'Name'}
				sortBy={'asc'}
				iconButtonSize={20}
				pinned={null}
				handleSort={() => {}}
				handlePin={() => {}}
				handleMove={() => {}}
				handleWidth={() => {}}
				onHideColumns={() => {}}
				onDragUpdate={() => {}}
				onToggleColumnToolbar={() => {}}
				onToggleFilterToolbar={() => {}}
			>
				Name
			</ColumnHeaderItem>,
			{ wrapper: Wrapper }
		);

		const headerName = screen.getByText('Name');
		expect(headerName).toBeInTheDocument();

		const [sortButton, kebabMenuButton] = screen.getAllByRole('button');

		await user.click(sortButton);
		await user.click(kebabMenuButton);

		const [
			sortByAsc,
			sortByDesc,
			pinToRight,
			pinToLeft,
			moveLeft,
			moveRight,
			filter,
			hideColumn,
			manageButton
		] = screen.getAllByRole('listitem');

		await user.click(sortByAsc);
		await user.click(sortByDesc);
		await user.click(pinToRight);
		await user.click(pinToLeft);
		await user.click(moveLeft);
		await user.click(moveRight);
		await user.click(filter);
		await user.click(hideColumn);
		await user.click(manageButton);
	});
});
