import { render, screen } from '@testing-library/react';
import ColumnCell from '../../../../reactTabulous/components/cell/columnCell';

describe('ColumnCell', () => {
  test('should render correctly', () => {
    render(
      <ColumnCell emptyPlaceholder="N/A">
        <h4>Name</h4>
      </ColumnCell>
    );
    const heading = screen.getByRole('heading', { name: /name/i });
    expect(heading).toBeInTheDocument();
  });

  test('should render correctly when value of the cell is JSX', () => {
    const column = {
      field: 'level',
      headerName: 'Level',
      isVisible: true,
      renderCell: (row: any) => {
        const level = row?.level ?? 1;
        const levelText = level === 1 ? 'Beginner' : level === 2 ? 'Intermediate' : 'Advanced';
        const levelColor = level === 1 ? 'green' : level === 2 ? 'orange' : 'red';
        return <span style={{ color: levelColor }}>{levelText}</span>;
      }
    };
    const row = {
      id: '1',
      name: 'test',
      level: 3
    };
    render(<ColumnCell emptyPlaceholder="N/A" row={row} column={column} />);
    const spanElement = screen.getByText('Advanced');
    expect(spanElement).toBeInTheDocument();
  });

  test('should render correctly when value of the cell value is valueGetter', () => {
    const column = {
      field: 'address',
      headerName: 'Address',
      isVisible: true,
      valueGetter: (row: any) => `${row.address.city}, ${row.address.state}, ${row.address.country}`
    };
    const row = {
      id: '1',
      name: 'test',
      address: { city: 'Bengaluru', state: 'Karnataka', country: 'India' }
    };
    render(<ColumnCell emptyPlaceholder="N/A" column={column} row={row} />);
    const divElement = screen.getByText('Bengaluru, Karnataka, India');
    expect(divElement).toBeInTheDocument();
  });

  test('should render correctly when value of the cell is empty', () => {
    render(
      <ColumnCell
        emptyPlaceholder="N/A"
        column={{ field: 'name', headerName: 'Name', isVisible: true }}
        row={{ id: '1' }}
      />
    );
    const divElement = screen.getByText('N/A');
    expect(divElement).toBeInTheDocument();
  });

  test('should render correctly when value of the row in the cell', () => {
    render(
      <ColumnCell
        emptyPlaceholder="N/A"
        row={{ id: '1', name: 'test' }}
        column={{ field: 'name', headerName: 'Name', isVisible: true }}
      />
    );
    const divElement = screen.getByText('test');
    expect(divElement).toBeInTheDocument();
  });

  test('should render correctly when value of the cell is empty and width props is passed', () => {
    render(
      <ColumnCell
        emptyPlaceholder="N/A"
        width={100}
        column={{ field: 'name', headerName: 'Name', isVisible: true }}
        row={{ id: '1' }}
      />
    );
    const divElement = screen.getByText('N/A');
    expect(divElement).toBeInTheDocument();
  });

  // Conditional formatting tested via full integration (rules in context); basic cell render verified above.
});
