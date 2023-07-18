import { Divider, IconButton, Menu, MenuItem, Popup } from '../widgets';

import { type GridPinnedPosition, type GridSortDirection } from '../../models';

interface ColumnHeaderMenuProps {
  disabledMoveLeft?: boolean;
  disabledMoveRight?: boolean;
  disableColumnFilter: boolean;
  disableColumnPinning: boolean;
  disableColumnReorder: boolean;
  disableColumnSelector: boolean;
  disableMultipleColumnsSorting: boolean;
  fetchOnPageChange: boolean;
  iconButtonSize: number;
  sortBy: GridSortDirection;
  pinned?: GridPinnedPosition;
  handleAction: (actionName: string, value?: any) => void;
}

const ColumnHeaderMenu: React.FC<ColumnHeaderMenuProps> = ({
  iconButtonSize,
  pinned,
  sortBy,
  disabledMoveLeft,
  disabledMoveRight,
  disableColumnFilter,
  disableColumnPinning,
  disableColumnReorder,
  disableColumnSelector,
  disableMultipleColumnsSorting,
  fetchOnPageChange,
  handleAction
}) => {
  return (
    <Popup
      noPadding
      trigger={
        <IconButton
          className="columnHeaderAction menuIcon"
          type="transparent"
          name="kebab-menu"
          size={iconButtonSize}
        />
      }
    >
      <Menu>
        {!disableMultipleColumnsSorting && (
          <>
            {(sortBy === 'desc' || sortBy === null) && (
              <MenuItem
                icon="sort-up"
                label="Sort by Asc"
                onClick={() => {
                  handleAction('sort', 'asc');
                }}
              />
            )}
            {(sortBy === 'asc' || sortBy === null) && (
              <MenuItem
                icon="sort-down"
                label="Sort by Desc"
                onClick={() => {
                  handleAction('sort', 'desc');
                }}
              />
            )}
            {sortBy !== null && (
              <MenuItem
                icon="sort"
                label="Unsort"
                onClick={() => {
                  handleAction('sort', null);
                }}
              />
            )}
            <Divider />
          </>
        )}

        {!disableColumnPinning && (
          <>
            {(pinned === 'right' || pinned === null) && (
              <MenuItem
                icon="pin"
                label="Pin to left"
                iconClass="pinLeft"
                onClick={() => {
                  handleAction('pin', 'left');
                }}
              />
            )}
            {(pinned === 'left' || pinned === null) && (
              <MenuItem
                icon="pin"
                label="Pin to right"
                iconClass="pinRight"
                onClick={() => {
                  handleAction('pin', 'right');
                }}
              />
            )}
            {pinned !== null && (
              <MenuItem
                label="Unpin"
                onClick={() => {
                  handleAction('pin', null);
                }}
              />
            )}
            <Divider />
          </>
        )}

        {!disableColumnReorder && (
          <>
            <MenuItem
              disabled={disabledMoveLeft}
              icon="keyboard-back"
              label="Move left"
              onClick={() => {
                handleAction('move', 'left');
              }}
            />
            <MenuItem
              disabled={disabledMoveRight}
              icon="keyboard-forward"
              label="Move right"
              onClick={() => {
                handleAction('move', 'right');
              }}
            />
            <Divider />
          </>
        )}

        {!disableColumnFilter && !fetchOnPageChange && (
          <>
            <MenuItem
              icon="filter"
              label="Filter"
              onClick={() => {
                handleAction('toggleFilterToolbar', null);
              }}
            />
            <Divider />
          </>
        )}
        {!disableColumnSelector && (
          <>
            <MenuItem
              icon="eye-off"
              label="Hide column"
              onClick={() => {
                handleAction('hideColumn', null);
              }}
            />
            <MenuItem
              icon="column"
              label="Manage Columns"
              onClick={() => {
                handleAction('toggleColumnToolbar', null);
              }}
            />
          </>
        )}
      </Menu>
    </Popup>
  );
};

export default ColumnHeaderMenu;
