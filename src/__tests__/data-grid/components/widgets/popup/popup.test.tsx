import { render, screen } from '@testing-library/react';
import { Button, Popup, Menu, MenuItem } from '../../../../../data-grid/components/widgets';

describe('Popup', () => {
	test('should render correctly', () => {
		render(
			<Popup
				open
				noPadding
				trigger={
					<Button variant="text" size="small">
						Click
					</Button>
				}
			>
				<Menu>
					<MenuItem label="Item 1" onClick={() => {}} />
				</Menu>
			</Popup>
		);

		const buttonItem = screen.getByRole('button');
		expect(buttonItem).toBeInTheDocument();

		const listItem1 = screen.getByRole('listitem');
		expect(listItem1).toBeInTheDocument();
	});
});
