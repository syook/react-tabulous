import user from '@testing-library/user-event';

import { render, screen } from '@testing-library/react';
import ColumnHeaderMenu from '../../../../reactTabulous/components/columnHeaders/columnHeaderMenu';

describe('ColumnHeaderMenu', () => {
  test('should render correctly', () => {
    render(
      <ColumnHeaderMenu
        iconButtonSize={24}
        pinned={null}
        sortBy={null}
        disabledMoveLeft={false}
        disabledMoveRight={false}
        disableColumnFilter={false}
        disableColumnPinning={false}
        disableColumnReorder={false}
        disableColumnSelector={false}
        disableMultipleColumnsSorting={false}
        fetchOnPageChange={false}
        handleAction={() => {}}
      />
    );
    const kebabMenuButton = screen.getByRole('button');
    expect(kebabMenuButton).toBeInTheDocument();
  });

  test('should render correctly when kebab icon is clicked and update on other button click', async () => {
    user.setup();
    render(
      <ColumnHeaderMenu
        iconButtonSize={24}
        pinned={null}
        sortBy={null}
        disabledMoveLeft={false}
        disabledMoveRight={false}
        disableColumnFilter={false}
        disableColumnPinning={false}
        disableColumnReorder={false}
        disableColumnSelector={false}
        disableMultipleColumnsSorting={false}
        fetchOnPageChange={false}
        handleAction={() => {}}
      />
    );
    const kebabMenuButton = screen.getByRole('button');
    await user.click(kebabMenuButton);

    const [sortByAsc, sortByDesc, pinToRight, pinToLeft, moveLeft, moveRight, filter, hideColumn, manageButton] =
      screen.getAllByRole('listitem');

    expect(sortByAsc).toBeInTheDocument();
    expect(sortByDesc).toBeInTheDocument();
    expect(pinToRight).toBeInTheDocument();
    expect(pinToLeft).toBeInTheDocument();
    expect(moveLeft).toBeInTheDocument();
    expect(moveRight).toBeInTheDocument();
    expect(filter).toBeInTheDocument();
    expect(hideColumn).toBeInTheDocument();
    expect(manageButton).toBeInTheDocument();

    await user.click(sortByAsc);
    await user.click(sortByDesc);
    await user.click(pinToRight);
    await user.click(pinToLeft);
    await user.click(moveLeft);
    await user.click(moveRight);
    await user.click(filter);
    await user.click(hideColumn);
    await user.click(manageButton);
  });

  test('should render correctly when kebab icon is clicked and when pin to left is added and sort by is asc', async () => {
    user.setup();
    render(
      <ColumnHeaderMenu
        iconButtonSize={24}
        pinned={'left'}
        sortBy={'asc'}
        disabledMoveLeft={false}
        disabledMoveRight={false}
        disableColumnFilter={false}
        disableColumnPinning={false}
        disableColumnReorder={false}
        disableColumnSelector={false}
        disableMultipleColumnsSorting={false}
        fetchOnPageChange={false}
        handleAction={() => {}}
      />
    );
    const kebabMenuButton = screen.getByRole('button');
    await user.click(kebabMenuButton);

    const [sortByAsc, unSort, pinToLeft, unPin, moveLeft, moveRight, filter, hideColumn] =
      screen.getAllByRole('listitem');

    expect(sortByAsc).toBeInTheDocument();
    expect(unSort).toBeInTheDocument();
    expect(pinToLeft).toBeInTheDocument();
    expect(unPin).toBeInTheDocument();
    expect(moveLeft).toBeInTheDocument();
    expect(moveRight).toBeInTheDocument();
    expect(filter).toBeInTheDocument();
    expect(hideColumn).toBeInTheDocument();

    await user.click(sortByAsc);
    await user.click(unSort);
    await user.click(unPin);
    await user.click(pinToLeft);
    await user.click(moveLeft);
    await user.click(moveRight);
    await user.click(filter);
    await user.click(hideColumn);
  });
});
