import { render, screen } from '@testing-library/react';
import { Divider } from '../../../../data-grid/components/widgets';

describe('Divider', () => {
	test('should render correctly', () => {
		render(<Divider />);
		const container = screen.getByRole('separator');
		expect(container).toBeInTheDocument();
	});
});
