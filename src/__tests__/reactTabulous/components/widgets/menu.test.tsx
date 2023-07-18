import { render, screen } from '@testing-library/react';
import { MenuItem } from '../../../../reactTabulous/components/widgets';

describe('MenuItem', () => {
  test('should render correctly', () => {
    render(<MenuItem onClick={() => {}} label="Option 1" />);
    const container = screen.getByRole('listitem');
    expect(container).toBeInTheDocument();
  });

  test('should render correctly with className', () => {
    render(<MenuItem onClick={() => {}} label="Option 1" className="test" />);
    const container = screen.getByRole('listitem');
    expect(container).toBeInTheDocument();
  });

  test('should render correctly with className and disabled', () => {
    render(<MenuItem onClick={() => {}} label="Option 1" className="test" disabled />);
    const container = screen.getByRole('listitem');
    expect(container).toBeInTheDocument();
  });

  test('should render correctly with className and disabled and icon', () => {
    render(<MenuItem onClick={() => {}} label="Compact" className="test" disabled icon="compact" />);
    const container = screen.getByRole('listitem');
    expect(container).toBeInTheDocument();
  });
});
