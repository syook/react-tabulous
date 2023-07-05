import user from '@testing-library/user-event';

import { FilterForm } from '../../../../data-grid/components/filter';
import { customRender, screen } from '../../../../data-grid/context/test-utils';

describe('FilterForm', () => {
	test('should render correctly', () => {
		customRender(<FilterForm />);

		const [closeButton, addFilterButton, clearAllButton, applyButton] = screen.getAllByRole('button');
		expect(closeButton).toBeInTheDocument();
		expect(addFilterButton).toBeInTheDocument();
		expect(clearAllButton).toBeInTheDocument();
		expect(applyButton).toBeInTheDocument();

		const [columnSelect, operatorSelect] = screen.getAllByRole('combobox');

		expect(columnSelect).toBeInTheDocument();
		expect(operatorSelect).toBeInTheDocument();

		const [conditionSelect] = screen.getAllByRole('combobox', { hidden: true });
		expect(conditionSelect).toBeInTheDocument();
	});

	test('should render correctly and show initial values', () => {
		customRender(<FilterForm />);
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
		const [columnSelect, operatorSelect] = screen.getAllByRole('combobox') as HTMLSelectElement[];
		expect(columnSelect.value).toBe('Name');

		// const operatorSelect = screen.getByRole('combobox', { name: 'Operator' });
		expect(operatorSelect.value).toBe('contains');

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
		const [conditionSelect] = screen.getAllByRole('combobox', {
			hidden: true
		}) as HTMLSelectElement[];
		expect(conditionSelect.value).toBe('And');
	});

	test('should render correctly and show updated values', async () => {
		user.setup();
		customRender(<FilterForm />);
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
		const [columnSelect, operatorSelect] = screen.getAllByRole('combobox') as HTMLSelectElement[];
		await user.selectOptions(columnSelect, 'Email');
		expect(columnSelect.value).toBe('Email');

		await user.selectOptions(operatorSelect, 'does not contains');
		expect(operatorSelect.value).toBe('does not contains');

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
		const inputElement = screen.getByRole('textbox') as HTMLInputElement;
		await user.type(inputElement, '45');
		expect(inputElement.value).toBe('45');

		const buttonElements = screen.getAllByRole('button');

		// click on Add Filter button
		await user.click(buttonElements[1]);

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
		const selectElements = screen.getAllByRole('combobox') as HTMLSelectElement[];

		// Change the second filter condition to 'Or'
		await user.selectOptions(selectElements[2], 'Or');
		expect(selectElements[2].value).toBe('Or');

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
		const inputElements = screen.getAllByRole('textbox') as HTMLInputElement[];
		await user.type(inputElements[1], 'test');

		const applyButton = screen.getByRole('button', { name: 'Apply' });
		await user.click(applyButton);

		const clearAllButton = screen.getByRole('button', { name: 'Clear All' });
		await user.click(clearAllButton);

		// remove name first added in the last
		const allButtonElements = screen.getAllByRole('button');
		await user.click(allButtonElements[0]);
	});
});
