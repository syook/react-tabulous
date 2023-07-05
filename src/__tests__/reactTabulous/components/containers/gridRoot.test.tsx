import { render, screen } from '@testing-library/react';
import { GridRoot } from '../../../../reactTabulous/components';

describe('GridRoot', () => {
	test('should render correctly', () => {
		render(
			<GridRoot>
				<h1>Data Table</h1>
			</GridRoot>
		);
		const heading = screen.getByRole('heading', { name: /data table/i });
		expect(heading).toBeInTheDocument();
	});
});
