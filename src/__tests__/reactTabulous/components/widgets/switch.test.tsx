import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

import { Switch } from '../../../../reactTabulous/components/widgets';

describe('Switch', () => {
  test('should render correctly', () => {
    render(<Switch checked onChange={() => {}} />);
    const container = screen.getByRole('checkbox');
    expect(container).toBeInTheDocument();
  });

  test('should render correctly with size', () => {
    render(<Switch checked onChange={() => {}} size={20} />);
    const container = screen.getByRole('checkbox');
    expect(container).toBeInTheDocument();
  });

  test('should render correctly when the switch is clicked', async () => {
    const onChange = jest.fn();
    render(<Switch checked onChange={onChange} size={20} />);
    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);
    expect(onChange).toHaveBeenCalled();
  });
});
