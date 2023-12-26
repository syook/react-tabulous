import { render, screen } from '@testing-library/react';
import { Icon, Input } from '../../../../../reactTabulous/components/widgets';

describe('Input', () => {
  test('should render correctly', () => {
    render(<Input />);
    const container = screen.getByRole('textbox');
    expect(container).toBeInTheDocument();
  });

  test('should render correctly with className', () => {
    render(<Input className="test" />);
    const container = screen.getByRole('textbox');
    expect(container).toBeInTheDocument();
  });

  test('should render correctly with placeholder', () => {
    render(<Input placeholder="test" />);
    const container = screen.getByRole('textbox');
    expect(container).toBeInTheDocument();
  });

  test('should render correctly with value', () => {
    render(<Input value="test" />);
    const container = screen.getByRole('textbox');
    expect(container).toBeInTheDocument();
  });

  test('should render correctly with value and placeholder', () => {
    render(<Input value="test" placeholder="test" />);
    const container = screen.getByRole('textbox');
    expect(container).toBeInTheDocument();
  });

  test('should render correctly with value and className', () => {
    render(<Input value="test" className="test" />);
    const container = screen.getByRole('textbox');
    expect(container).toBeInTheDocument();
  });

  test('should render correctly with value, className and placeholder', () => {
    render(<Input value="test" className="test" placeholder="test" />);
    const container = screen.getByRole('textbox');
    expect(container).toBeInTheDocument();
  });

  test('should render correctly with value, className, placeholder and onChange', () => {
    render(<Input value="test" className="test" placeholder="test" onChange={() => {}} />);
    const container = screen.getByRole('textbox');
    expect(container).toBeInTheDocument();
  });

  test('should render correctly with value, label, className, placeholder and onChange', () => {
    render(<Input value="test" className="test" placeholder="test" onChange={() => {}} label="Test" />);
    const container = screen.getByRole('textbox');
    expect(container).toBeInTheDocument();
  });

  test('should render correctly with value, startAdornment, label, className, placeholder and onChange', () => {
    render(
      <Input
        value="search"
        className="test"
        placeholder="Search..."
        onChange={() => {}}
        label="Search"
        startAdornment={<Icon name="search" size={20} />}
      />
    );
    const container = screen.getByRole('textbox');
    expect(container).toBeInTheDocument();
  });

  test('should render correctly with value, endAdornment, label, className, placeholder and onChange', () => {
    render(
      <Input
        value="search"
        className="test"
        placeholder="Search..."
        onChange={() => {}}
        label="Search"
        endAdornment={<Icon name="close" size={20} />}
      />
    );
    const container = screen.getByRole('textbox');
    expect(container).toBeInTheDocument();
  });

  test('should render correctly with value, label, className, placeholder and onChange when it is multiline', () => {
    render(<Input value="test" className="test" placeholder="test" onChange={() => {}} label="Test" isMultiLine />);
    const container = screen.getByRole('textbox');
    expect(container).toBeInTheDocument();
  });
});
