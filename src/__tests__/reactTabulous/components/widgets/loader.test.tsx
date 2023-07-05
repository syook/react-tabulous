import { render, screen } from '@testing-library/react';
import { Loader } from '../../../../reactTabulous/components/widgets';

describe('Loader', () => {
	test('should render correctly', () => {
		render(<Loader />);
		const container = screen.getByRole('img');
		expect(container).toBeInTheDocument();
	});
});
