import { render, screen } from '@testing-library/react';
import { IconButton } from '../../../../../reactTabulous/components/widgets';

describe('IconButton', () => {
	test('should render correctly', () => {
		render(<IconButton name="download" />);
		const container = screen.getByRole('button');
		expect(container).toBeInTheDocument();
	});

	test('should render correctly with className', () => {
		render(<IconButton name="download" className="test" />);
		const container = screen.getByRole('button');
		expect(container).toBeInTheDocument();
	});

	test('should render correctly with className and title', () => {
		render(<IconButton name="download" className="test" title="download" />);
		const container = screen.getByRole('button');
		expect(container).toBeInTheDocument();
	});

	test('should render correctly with onClick, size, and type "transparent', () => {
		render(<IconButton name="download" onClick={() => {}} size={14} type="transparent" />);
		const container = screen.getByRole('button');
		expect(container).toBeInTheDocument();
	});
});
