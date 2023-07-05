import { customRender, screen } from '../../../../data-grid/context/test-utils';

import { ColumnHeaderCheckbox } from '../../../../data-grid/components/columnHeaders/columnHeaderCheckbox';

describe('ColumnHeaderCheckbox', () => {
	test('should render correctly', () => {
		customRender(<ColumnHeaderCheckbox checked onBulkSelect={() => {}} />);

		const checkbox = screen.getByRole('checkbox', { hidden: true });
		expect(checkbox).toBeInTheDocument();
	});
});
