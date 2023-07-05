import { render, screen } from '@testing-library/react';
import { Icon } from '../../../../reactTabulous/components/widgets';

describe('Icon', () => {
	test('should render correctly', () => {
		render(<Icon name="download" />);
		const container = screen.getByRole('img');
		expect(container).toBeInTheDocument();
	});

	test('should render correctly with className', () => {
		render(<Icon name="download" size={14} className="test" />);
		const container = screen.getByRole('img');
		expect(container).toBeInTheDocument();
	});

	test('should render correctly with className and title', () => {
		render(<Icon name="download" size={14} className="test" title="download" />);
		const container = screen.getByRole('img');
		expect(container).toBeInTheDocument();
	});
});
