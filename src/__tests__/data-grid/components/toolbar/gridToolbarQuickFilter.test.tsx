import user from '@testing-library/user-event';

import { customRender, screen } from '../../../../data-grid/context/test-utils';
import { GridToolbarQuickFilter } from '../../../../data-grid/components/toolbar';

describe('GridToolbarQuickFilter', () => {
	test('should render correctly', () => {
		customRender(<GridToolbarQuickFilter />);

		const searchInput = screen.getByRole('searchbox');
		expect(searchInput).toBeInTheDocument();
	});

	test('should render correctly and update search text', async () => {
		user.setup();
		customRender(<GridToolbarQuickFilter />);
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
		const searchInput = screen.getByRole('searchbox') as HTMLInputElement;

		await user.type(searchInput, 'test');
		expect(searchInput.value).toBe('test');
	});
});
