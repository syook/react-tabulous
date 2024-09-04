import user from '@testing-library/user-event';
import { GridToolbarExport } from '../../../../reactTabulous/components/toolbar/gridToolbarExport';
import { customRender, screen } from '../../../../reactTabulous/context/test-utils';

describe('GridToolbarExport', () => {
  test('should render correctly', () => {
    customRender(<GridToolbarExport />);
    const buttonElement = screen.getByRole('button', { name: /export/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test('should render correctly and show export options when export button clicked', async () => {
    user.setup();
    customRender(<GridToolbarExport />);
    const buttonElement = screen.getByRole('button', { name: /export/i });
    await user.click(buttonElement);
    const [csvButton, excelButton] = screen.getAllByRole('listitem');
    expect(csvButton).toBeInTheDocument();
    expect(excelButton).toBeInTheDocument();

    await user.click(csvButton);
    await user.click(excelButton);
  });
});
