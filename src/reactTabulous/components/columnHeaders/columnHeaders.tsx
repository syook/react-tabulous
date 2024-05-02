import styled from '@emotion/styled';

import { ColumnHeaderItem } from './columnHeaderItem';
import { ColumnHeaderCheckbox } from './columnHeaderCheckbox';
import { ColumnHeaderSerialNumber } from './columnHeaderSerialNumber';

import { toCamelCase } from '../../helpers/toCamelCase';
import { densityMapping, iconDensityMapping } from '../../constant';
import { useGridPin } from '../../hooks/useGridPin';
import { useGridSort } from '../../hooks/useGridSort';
import { useGridFilter } from '../../hooks/useGridFilter';
import { useGridColumn } from '../../hooks/useGridColumn';
import { useGridResize } from '../../hooks/useGridResize';
import { useGridRootProps } from '../../hooks/useGridRootProps';
import { useGridRowSelection } from '../../hooks/useGridRowSelection';
import { type GridColDef } from '../../models';

const ColumnHeaderStyle = styled.div((props: any) => ({
  display: 'table-row',
  height: props.height,
  minHeight: props.height,
  maxHeight: props.height
  // borderBottom: '1px solid var(--grey-300, #e5e5e5)'
}));

export const ColumnHeaders: React.FC = () => {
  const {
    rootState: {
      columns,
      density,
      sortField,
      sortBy,
      checkboxSelection,
      disableColumnFilter,
      disableColumnMenu,
      disableColumnPinning,
      disableColumnReorder,
      disableColumnResize,
      disableColumnSelector,
      disableMultipleColumnsSorting,
      fetchOnPageChange,
      isShowSerialNumber
    }
  } = useGridRootProps();
  const { handleSort } = useGridSort();
  const { onToggleColumnToolbar, onHideColumns, onMoveColumn, onDragColumn } = useGridColumn();
  const { onToggleFilterToolbar } = useGridFilter();
  const { handlePin } = useGridPin();
  const { handleWidth } = useGridResize();
  const { checkedState, handleBulkRowSelection } = useGridRowSelection();
  const rightPinnedColumns = columns.filter((column: GridColDef) => column.pinned === 'right' && column.isVisible);
  const leftPinnedColumns = columns.filter((column: GridColDef) => column.pinned === 'left' && column.isVisible);
  const columnsWithoutPinned = columns.filter((column: GridColDef) => column.pinned === null && column.isVisible);

  return (
    <ColumnHeaderStyle height={densityMapping[density]} className="columnHeaders">
      {/* add checkbox for select all rows */}
      {checkboxSelection && <ColumnHeaderCheckbox checked={checkedState} onBulkSelect={handleBulkRowSelection} />}
      {/* show serial number for all rows */}
      {isShowSerialNumber && <ColumnHeaderSerialNumber />}
      {leftPinnedColumns.length > 0 && (
        // <div className="pinnedColumnHeaders--left">
        <>
          {leftPinnedColumns.map((obj: any, index: number) => {
            return (
              <ColumnHeaderItem
                disabledMoveLeft
                disabledMoveRight
                columnObj={obj}
                type={obj.type}
                key={`${obj.headerName}-${index}`}
                iconButtonSize={iconDensityMapping[density]}
                headerName={toCamelCase(obj.headerName)}
                sortBy={sortField === obj.field ? sortBy : null}
                pinned={obj.pinned}
                disableColumnFilter={disableColumnFilter || !obj.isFilterable}
                disableColumnMenu={disableColumnMenu}
                disableColumnPinning={disableColumnPinning}
                disableColumnReorder={disableColumnReorder}
                disableColumnResize={disableColumnResize}
                disableColumnSelector={disableColumnSelector}
                disableMultipleColumnsSorting={disableMultipleColumnsSorting || !obj.isSortable}
                fetchOnPageChange={Boolean(fetchOnPageChange)}
                handleSort={handleSort}
                handlePin={handlePin}
                handleMove={onMoveColumn}
                handleWidth={handleWidth}
                onHideColumns={onHideColumns}
                onToggleColumnToolbar={onToggleColumnToolbar}
                onToggleFilterToolbar={onToggleFilterToolbar}
                onDragUpdate={onDragColumn}
              >
                {obj.headerName.toUpperCase()}
              </ColumnHeaderItem>
            );
          })}
        </>
        // </div>
      )}
      {/* <div> */}

      {columnsWithoutPinned.map((obj: any, index: number) => {
        return (
          <ColumnHeaderItem
            disabledMoveLeft={columns.findIndex((column: GridColDef) => column.field === obj.field) === 0}
            disabledMoveRight={
              columns.findIndex((column: GridColDef) => column.field === obj.field) === columns.length - 1 ||
              (columns.some((column: GridColDef) => column.pinned === 'right') && index === columns.length - 2)
            }
            columnObj={obj}
            type={obj.type}
            key={`${obj.headerName}-${index}`}
            iconButtonSize={iconDensityMapping[density]}
            headerName={toCamelCase(obj.headerName)}
            sortBy={sortField === obj.field ? sortBy : null}
            pinned={obj.pinned}
            disableColumnFilter={disableColumnFilter || !obj.isFilterable}
            disableColumnMenu={disableColumnMenu}
            disableColumnPinning={disableColumnPinning}
            disableColumnReorder={disableColumnReorder}
            disableColumnResize={disableColumnResize}
            disableColumnSelector={disableColumnSelector}
            disableMultipleColumnsSorting={disableMultipleColumnsSorting || !obj.isSortable}
            fetchOnPageChange={Boolean(fetchOnPageChange)}
            handleSort={handleSort}
            handlePin={handlePin}
            handleMove={onMoveColumn}
            handleWidth={handleWidth}
            onHideColumns={onHideColumns}
            onToggleColumnToolbar={onToggleColumnToolbar}
            onToggleFilterToolbar={onToggleFilterToolbar}
            onDragUpdate={onDragColumn}
          >
            {obj.headerName.toUpperCase()}
          </ColumnHeaderItem>
        );
      })}
      {/* </div> */}

      {rightPinnedColumns.length > 0 && (
        // <div className="pinnedColumnHeaders--right">
        <>
          {rightPinnedColumns.map((obj: any, index: number) => {
            return (
              <ColumnHeaderItem
                disabledMoveLeft
                disabledMoveRight
                columnObj={obj}
                type={obj.type}
                key={`${obj.headerName}-${index}`}
                iconButtonSize={iconDensityMapping[density]}
                headerName={toCamelCase(obj.headerName)}
                sortBy={sortField === obj.field ? sortBy : null}
                pinned={obj.pinned}
                disableColumnFilter={disableColumnFilter || !obj.isFilterable}
                disableColumnMenu={disableColumnMenu}
                disableColumnPinning={disableColumnPinning}
                disableColumnReorder={disableColumnReorder}
                disableColumnResize={disableColumnResize}
                disableColumnSelector={disableColumnSelector}
                disableMultipleColumnsSorting={disableMultipleColumnsSorting || !obj.isSortable}
                fetchOnPageChange={Boolean(fetchOnPageChange)}
                handleSort={handleSort}
                handlePin={handlePin}
                handleMove={onMoveColumn}
                handleWidth={handleWidth}
                onHideColumns={onHideColumns}
                onToggleColumnToolbar={onToggleColumnToolbar}
                onToggleFilterToolbar={onToggleFilterToolbar}
                onDragUpdate={onDragColumn}
              >
                {obj.headerName.toUpperCase()}
              </ColumnHeaderItem>
            );
          })}
        </>
        // </div>
      )}
    </ColumnHeaderStyle>
  );
};
