import { customRender, screen } from '../../../../reactTabulous/context/test-utils';

import { ColumnHeaderCheckbox } from '../../../../reactTabulous/components/columnHeaders/columnHeaderCheckbox';

describe('ColumnHeaderCheckbox', () => {
	test('should render correctly', () => {
		customRender(<ColumnHeaderCheckbox checked onBulkSelect={() => {}} />);

		const checkbox = screen.getByRole('checkbox', { hidden: true });
		expect(checkbox).toBeInTheDocument();
	});
});
