import React from 'react';
import styled from '@emotion/styled';

import { IconButton } from '../widgets';
import ColumnHeaderMenu from './columnHeaderMenu';

import classnames from '../../helpers/classnames';
import { type onDragUpdateType, useDragHandler } from '../../hooks/useDragHandler';
import { type GridPinnedPosition, type GridSortDirection } from '../../models';
import { ColumnAlignment } from '../../models/columnDef/columnAlign';
import { alignMapping } from '../../constant';

interface ColumnObject {
  field: string;
  type: string;
}

interface StyledContainerProps {
  $align: ColumnAlignment;
}

const StyledHeaderContainer = styled('div')<StyledContainerProps>`
  .columnHeaderContainer {
    flex-direction: ${props => alignMapping[props.$align]};
    .columnHeaderTitleContainer {
      flex-direction: ${props => alignMapping[props.$align]};
      .columnHeaderTitle {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
`;

type ColumnHeaderItemProps = React.HTMLAttributes<HTMLDivElement> & {
  columnObj: ColumnObject;
  type: string;
  disabledMoveLeft?: boolean;
  disabledMoveRight?: boolean;
  disableColumnFilter: boolean;
  disableColumnMenu: boolean;
  disableColumnPinning: boolean;
  disableColumnReorder: boolean;
  disableColumnSelector: boolean;
  disableColumnResize: boolean;
  disableMultipleColumnsSorting: boolean;
  fetchOnPageChange: boolean;
  headerName: string;
  sortBy: GridSortDirection;
  iconButtonSize?: number;
  pinned?: GridPinnedPosition;
  fieldWidth?: number | string;
  align: ColumnAlignment;
  onDragUpdate: onDragUpdateType;
  handleSort: (field: string, type: string, value: GridSortDirection | null) => void;
  handlePin: (field: string, value: GridPinnedPosition | null) => void;
  handleMove: (field: string, direction: 'left' | 'right') => void;
  handleWidth: (field: string, value: number) => void;
  onHideColumns: (field: string) => void;
  onToggleColumnToolbar: () => void;
  onToggleFilterToolbar: () => void;
};

export const ColumnHeaderItem: React.FC<ColumnHeaderItemProps> = ({
  children,
  columnObj,
  type,
  disabledMoveLeft,
  disabledMoveRight,
  disableColumnFilter,
  disableColumnMenu,
  disableColumnPinning,
  disableColumnReorder,
  disableColumnResize,
  disableColumnSelector,
  disableMultipleColumnsSorting,
  fetchOnPageChange,
  headerName,
  sortBy,
  iconButtonSize = 24,
  pinned,
  fieldWidth,
  align,
  handleSort,
  handlePin,
  handleMove,
  handleWidth,
  onHideColumns,
  onDragUpdate,
  onToggleColumnToolbar,
  onToggleFilterToolbar
}) => {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  const { onDragStart, onDragOver, onDrop, onDragEnter } = useDragHandler(onDragUpdate);

  const [width, setWidth] = React.useState<number | string>(fieldWidth ?? 'max-content');

  React.useEffect(() => {
    if (width != null && rootRef.current != null) {
      rootRef.current.style.width = `${width}px`;
      rootRef.current.style.minWidth = `${width}px`;
      rootRef.current.style.maxWidth = `${width}px`;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  React.useEffect(() => {
    const content = contentRef.current;
    if (content) {
      const isOverflowing = content.scrollWidth > content.clientWidth;
      if (isOverflowing && typeof children === 'string') {
        content.title = children;
      } else {
        content.removeAttribute('title');
      }
    }
  }, [children, width]);

  const handleColumnResize = (width: number) => {
    const widthToSet = width <= 50 ? 50 : width;
    setWidth(widthToSet);
    handleWidth(columnObj.field, widthToSet);
  };

  const handleAction = (actionName: string, value?: any) => {
    switch (actionName) {
      case 'sort':
        handleSort(columnObj.field, columnObj.type, value);
        break;

      case 'pin':
        handlePin(columnObj.field, value);
        break;

      case 'move':
        handleMove(columnObj.field, value);
        break;

      case 'hideColumn':
        onHideColumns(columnObj.field);
        break;

      case 'toggleColumnToolbar':
        onToggleColumnToolbar();
        break;

      case 'toggleFilterToolbar':
        onToggleFilterToolbar();
        break;

      default:
        break;
    }
  };

  const nextSort = sortBy === 'asc' ? 'desc' : sortBy === 'desc' ? null : 'asc';

  const draggableProps = disableColumnReorder
    ? {}
    : {
        draggable: true,
        onDragStart,
        onDragOver,
        onDrop,
        onDragEnter
      };

  const isAllMenuDisabled =
    disableColumnFilter &&
    disableColumnPinning &&
    disableColumnReorder &&
    disableColumnSelector &&
    disableMultipleColumnsSorting;

  const showMenu = !isAllMenuDisabled && type !== 'action' ? !disableColumnMenu : false;

  return (
    <StyledHeaderContainer
      ref={rootRef}
      role="columnheader"
      className="columnHeader"
      data-field={headerName}
      data-pinned={pinned}
      $align={align}
      {...draggableProps}
    >
      <div className="columnHeaderContainer">
        <div className="columnHeaderTitleContainer">
          <div ref={contentRef} className="columnHeaderTitle">
            {children}
          </div>
          {!disableMultipleColumnsSorting && (
            <IconButton
              className={`columnHeaderAction ${sortBy}`}
              type="transparent"
              name={sortBy === 'asc' ? 'sort-up' : sortBy === 'desc' ? 'sort-down' : 'sort'}
              size={iconButtonSize}
              onClick={() => {
                handleAction('sort', nextSort);
              }}
            />
          )}
        </div>
        {showMenu && (
          <ColumnHeaderMenu
            sortBy={sortBy}
            pinned={pinned}
            disabledMoveLeft={disabledMoveLeft}
            disabledMoveRight={disabledMoveRight}
            disableColumnFilter={disableColumnFilter}
            disableColumnPinning={disableColumnPinning}
            disableColumnReorder={disableColumnReorder}
            disableColumnSelector={disableColumnSelector}
            disableMultipleColumnsSorting={disableMultipleColumnsSorting}
            fetchOnPageChange={fetchOnPageChange}
            iconButtonSize={iconButtonSize}
            handleAction={handleAction}
          />
        )}
      </div>
      <Divider
        disableColumnResize={disableColumnResize}
        onResize={data => {
          handleColumnResize(data.width);
        }}
      />
    </StyledHeaderContainer>
  );
};

interface DividerProps {
  disableColumnResize: boolean;
  onResize: (data: { width: number }) => void;
}

const Divider: React.FC<DividerProps> = ({ disableColumnResize, onResize }) => {
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disableColumnResize) return;
    e.preventDefault();
    const startX = e.pageX;

    const startWidth = (e.target as HTMLElement).parentElement?.offsetWidth;
    if (!startWidth) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = startWidth + e.pageX - startX;
      onResize({ width: newWidth });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      className={classnames('columnSeparator', { 'columnSeparator--resizable': !disableColumnResize })}
      onMouseDown={handleMouseDown}
    ></div>
  );
};
