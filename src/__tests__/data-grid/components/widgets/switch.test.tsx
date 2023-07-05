import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

import { Switch } from '../../../../data-grid/components/widgets';

describe('Switch', () => {
	test('should render correctly', () => {
		render(<Switch checked onChange={() => {}} />);
		const container = screen.getByRole('checkbox');
		expect(container).toBeInTheDocument();
	});

	test('should render correctly with size', () => {
		render(<Switch checked onChange={() => {}} size={20} />);
		const container = screen.getByRole('checkbox');
		expect(container).toBeInTheDocument();
	});

	test('should render correctly when the switch is clicked', async () => {
		user.setup();
		render(<Switch checked onChange={() => {}} size={20} />);
		const checkbox = screen.getByRole('checkbox');
		await user.click(checkbox);
	});
});
