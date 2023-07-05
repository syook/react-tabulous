import { GridToolbarFilter } from '../../../../data-grid/components/toolbar';
import { customRender, screen } from '../../../../data-grid/context/test-utils';

describe('GridToolbarFilter', () => {
	test('should render correctly', () => {
		customRender(<GridToolbarFilter />);
		const filterButton = screen.getByRole('button', { name: /filters/i });
		expect(filterButton).toBeInTheDocument();
	});
});
