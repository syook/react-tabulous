import { render, screen } from '@testing-library/react';

import InputLabel from '../../../../../reactTabulous/components/widgets/inputLabel';

describe('InputError', () => {
  test('should return null when no props are passed', () => {
    const { container } = render(<InputLabel />);
    expect(container).toBeEmptyDOMElement();
  });

  test('should render correctly when props are passed', () => {
    render(<InputLabel label="Name" required={true} />);
    const errorText = screen.getByText(/name/i);
    expect(errorText).toBeInTheDocument();
  });
});
