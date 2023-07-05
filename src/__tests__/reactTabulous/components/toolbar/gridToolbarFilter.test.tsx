import { GridToolbarFilter } from '../../../../reactTabulous/components/toolbar';
import { customRender, screen } from '../../../../reactTabulous/context/test-utils';

describe('GridToolbarFilter', () => {
	test('should render correctly', () => {
		customRender(<GridToolbarFilter />);
		const filterButton = screen.getByRole('button', { name: /filters/i });
		expect(filterButton).toBeInTheDocument();
	});
});
