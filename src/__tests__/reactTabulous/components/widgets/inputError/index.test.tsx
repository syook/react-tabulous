import { render, screen } from '@testing-library/react';
import InputError from '../../../../../reactTabulous/components/widgets/inputError';

describe('InputError', () => {
  test('should return null when no props are passed', () => {
    const { container } = render(<InputError />);
    expect(container).toBeEmptyDOMElement();
  });

  test('should render correctly when props are passed', () => {
    render(<InputError helperText="Required Field" />);
    const errorText = screen.getByText(/required field/i);
    expect(errorText).toBeInTheDocument();
  });
});
