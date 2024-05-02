import { render, screen } from '@testing-library/react';
import { InputCategories } from '../../../../reactTabulous/components/filter/inputCategories';

describe('InputCategories', () => {
  test('should render Input component when type is string', () => {
    render(<InputCategories type="string" value="" rowIndex="1" query="string" onChange={() => {}} options={[]} />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
  });

  test('should render Input component when type is number', () => {
    render(<InputCategories type="number" value="" rowIndex="1" query="number" onChange={() => {}} options={[]} />);
    const inputElement = screen.getByRole('spinbutton');
    expect(inputElement).toBeInTheDocument();
  });

  test('should render select component when type is boolean', () => {
    render(
      <InputCategories
        type="boolean"
        value=""
        rowIndex="1"
        query="number"
        onChange={() => {}}
        options={['true', 'false']}
      />
    );
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
  });

  test('should render select component when type is singleSelect', () => {
    render(
      <InputCategories
        type="singleSelect"
        value=""
        rowIndex="1"
        query="singleSelect"
        onChange={() => {}}
        options={[]}
      />
    );
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
  });

  // test('should render select component when type is date', () => {
  // 	render(
  // 		<InputCategories
  // 			type="date"
  // 			value=""
  // 			rowIndex="1"
  // 			query="date"
  // 			onChange={() => {}}
  // 			options={[]}
  // 		/>
  // 	);
  // 	const inputElement = screen.getByRole('Date');
  // 	expect(inputElement).toBeInTheDocument();
  // });

  // test('should render select component when type is dateTime', () => {
  // 	render(
  // 		<InputCategories
  // 			type="dateTime"
  // 			value=""
  // 			rowIndex="1"
  // 			query="date"
  // 			onChange={() => {}}
  // 			options={[]}
  // 		/>
  // 	);
  // 	const inputElement = screen.getByRole('DateTime');
  // 	expect(inputElement).toBeInTheDocument();
  // });
});
