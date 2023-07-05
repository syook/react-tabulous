import { render, screen } from '@testing-library/react';
import { Checkbox } from '../../../../reactTabulous/components/widgets';

describe('Checkbox', () => {
	test('should render correctly', () => {
		render(<Checkbox onChange={() => {}} />);
		const container = screen.getByRole('checkbox', { hidden: true });
		expect(container).toBeInTheDocument();
	});

	test('should render correctly with checked', () => {
		render(<Checkbox checked onChange={() => {}} />);
		const container = screen.getByRole('checkbox', { hidden: true });
		expect(container).toBeInTheDocument();
	});

	test('should render correctly with checked as indeterminate', () => {
		render(<Checkbox checked="indeterminate" onChange={() => {}} />);
		const container = screen.getByRole('checkbox', { hidden: true });
		expect(container).toBeInTheDocument();
	});
});
