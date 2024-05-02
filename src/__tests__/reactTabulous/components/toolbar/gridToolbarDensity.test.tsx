import user from '@testing-library/user-event';

import { GridToolbarDensity } from '../../../../reactTabulous/components/toolbar';
import { customRender, screen } from '../../../../reactTabulous/context/test-utils';

describe('GridToolbarDensity', () => {
  test('should render correctly', () => {
    customRender(<GridToolbarDensity />);
    const densityButton = screen.getByRole('button', { name: /density/i });
    expect(densityButton).toBeInTheDocument();
  });

  test('should render correctly and show density options when density button clicked', async () => {
    user.setup();
    customRender(<GridToolbarDensity />);
    const densityButton = screen.getByRole('button', { name: /density/i });
    await user.click(densityButton);
    const [compactButton, standardButton, comfortableButton] = screen.getAllByRole('listitem');
    expect(compactButton).toBeInTheDocument();
    expect(standardButton).toBeInTheDocument();
    expect(comfortableButton).toBeInTheDocument();

    await user.click(compactButton);
    await user.click(standardButton);
    await user.click(comfortableButton);
  });
});
