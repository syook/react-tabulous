import { render, screen } from '@testing-library/react';
import { Select } from '../../../../../reactTabulous/components/widgets';

describe('Select', () => {
  test('should render correctly', () => {
    const options = ['Option 1', 'Option 2', 'Option 3'];

    render(<Select options={options} value="Option 1" onChange={() => {}} />);
    const container = screen.getByRole('combobox');
    expect(container).toBeInTheDocument();
  });

  test('should render correctly when options is array of objects', () => {
    const options = [
      { label: 'Option 1', value: 'Option 1' },
      { label: 'Option 2', value: 'Option 2' },
      { label: 'Option 3', value: 'Option 3' }
    ];

    render(<Select options={options} value="Option 1" onChange={() => {}} />);
    const container = screen.getByRole('combobox');
    expect(container).toBeInTheDocument();
  });
});
