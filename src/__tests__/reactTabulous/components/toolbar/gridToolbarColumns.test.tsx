import user from '@testing-library/user-event';

import { dataSet1Columns, getDataSetBasedOnCountPassed } from '../../../../data';
import { GridToolbarColumns } from '../../../../reactTabulous/components/toolbar';
import { DataGridContextProvider } from '../../../../reactTabulous/context';
import { render, screen } from '../../../../reactTabulous/context/test-utils';

const props = {
  data: getDataSetBasedOnCountPassed(10),
  columns: dataSet1Columns
};

const Wrapper = ({ children }: any) => <DataGridContextProvider props={props}>{children}</DataGridContextProvider>;

describe('GridToolbarColumns', () => {
  test('should render correctly', () => {
    render(<GridToolbarColumns />, { wrapper: Wrapper });
    const columnsButton = screen.getByRole('button', { name: /columns/i });
    expect(columnsButton).toBeInTheDocument();
  });

  test('should render correctly when columns pop up is opened', async () => {
    user.setup();
    render(<GridToolbarColumns />, { wrapper: Wrapper });
    const columnsButton = screen.getByRole('button', { name: /columns/i });
    await user.click(columnsButton);

    const [nameSwitch, emailSwitch] = screen.getAllByRole('checkbox');
    expect(nameSwitch).toBeInTheDocument();
    expect(emailSwitch).toBeInTheDocument();

    const [hideButton, showButton] = screen.getAllByRole('button');
    expect(hideButton).toBeInTheDocument();
    expect(showButton).toBeInTheDocument();

    await user.click(hideButton);
    await user.click(showButton);

    const inputElement = screen.getByRole('searchbox');
    expect(inputElement).toBeInTheDocument();
    await user.type(inputElement, 'name');
    expect(inputElement).toHaveValue('name');
  });

  test('should render correctly when columns pop up is opened and switch widget is clicked', async () => {
    user.setup();

    render(<GridToolbarColumns />, { wrapper: Wrapper });
    const columnsButton = screen.getByRole('button', { name: /columns/i });
    await user.click(columnsButton);

    const [nameSwitch] = screen.getAllByRole('checkbox');
    expect(nameSwitch).toBeChecked();
    await user.click(nameSwitch);
    expect(nameSwitch).not.toBeChecked();
  });
});
