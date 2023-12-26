import { useContext } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { Button } from '../../../reactTabulous/components/widgets';

import { DataGridContextProvider } from '../../../reactTabulous/context/dataGridContextProvider';
import { DataGridRootPropsContext } from '../../../reactTabulous/context/dataGridRootPropsContext';

const CustomComponent = () => {
  const { values, setValues }: any = useContext(DataGridRootPropsContext);
  return (
    <div>
      <h4>{values.searchText}</h4>
      <Button onClick={() => setValues({ searchText: 't' })}>Submit</Button>
    </div>
  );
};

describe('DataGridContextProvider', () => {
  test('should render correctly', () => {
    const props = {
      data: [
        { id: '1', name: 'test' },
        { id: '2', name: 'test2' }
      ],
      columns: [
        { field: 'id', headerName: 'ID', isVisible: true },
        { field: 'name', headerName: 'Name', isVisible: true }
      ]
    };
    render(
      <DataGridContextProvider props={props}>
        <h1>Hello</h1>
      </DataGridContextProvider>
    );

    expect(screen.getByRole('heading', { name: /hello/i })).toBeInTheDocument();
  });

  test('should render correctly and update values', () => {
    const props = {
      data: [
        { id: '1', name: 'test' },
        { id: '2', name: 'test2' }
      ],
      columns: [
        { field: 'id', headerName: 'ID', isVisible: true },
        { field: 'name', headerName: 'Name', isVisible: true }
      ]
    };

    render(
      <DataGridContextProvider props={props}>
        <CustomComponent />
      </DataGridContextProvider>
    );
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();

    fireEvent.click(buttonElement);
    expect(screen.getByRole('heading', { name: /t/i })).toBeInTheDocument();
  });
});
