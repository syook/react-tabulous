import styled from '@emotion/styled';

import { Checkbox, Loader, Typography } from '../widgets';
import ColumnCell from '../cell/columnCell';
import { OverlayWrapper } from '../overlayWrapper/overlayWrapper';

import { toCamelCase } from '../../helpers/toCamelCase';
import { densityMapping } from '../../constant';
import { useGridRootProps } from '../../hooks/useGridRootProps';
import { useGridRowSelection } from '../../hooks/useGridRowSelection';
import { type GridColDef } from '../../models';

const ColumnRowStyle = styled.div((props: any) => ({
  display: 'table-row',
  height: props.height,
  minHeight: props.height,
  maxHeight: props.height,
  borderBottom: '1px solid var(--grey-300, #e5e5e5)'
}));

export const ColumnBody: React.FC = () => {
  const {
    rootState: {
      columns,
      data,
      emptyPlaceholder,
      density,
      checkboxSelection,
      selectedRows,
      noRowsOverlay,
      loading,
      isShowSerialNumber,
      page,
      defaultPageSize
    }
  } = useGridRootProps();

  const { handleRowSelect } = useGridRowSelection();

  const rightPinnedColumns = columns.filter((column: GridColDef) => column.pinned === 'right' && column.isVisible);
  const leftPinnedColumns = columns.filter((column: GridColDef) => column.pinned === 'left' && column.isVisible);
  const columnsWithoutPinned = columns.filter((column: GridColDef) => column.pinned === null && column.isVisible);

  if (loading) {
    return (
      <OverlayWrapper>
        <div className="overlayWrapperLoader">
          <Loader />
        </div>
      </OverlayWrapper>
    );
  }

  if (data.length === 0) {
    return (
      <OverlayWrapper>
        {typeof noRowsOverlay === 'string' ? <Typography>{noRowsOverlay}</Typography> : noRowsOverlay}
      </OverlayWrapper>
    );
  }

  return (
    <>
      {data.map((obj: any, index: number) => {
        return (
          <ColumnRowStyle height={densityMapping[density]} className="columnRow" key={index}>
            {checkboxSelection && (
              <ColumnCell key="grid-checkbox" emptyPlaceholder={emptyPlaceholder} rowIndex={index} align={'right'}>
                <Checkbox
                  checked={selectedRows.includes(obj.id) || selectedRows.includes(obj._id)}
                  onChange={() => handleRowSelect(obj.id ?? obj._id)}
                />
              </ColumnCell>
            )}
            {isShowSerialNumber && (
              <ColumnCell key={index} emptyPlaceholder={emptyPlaceholder} rowIndex={index} align={'right'} width={20}>
                {(page - 1) * defaultPageSize + index + 1}
              </ColumnCell>
            )}
            {leftPinnedColumns.map((column: GridColDef, colIndex: number) => {
              const align = column?.align || column?.type === 'number' ? 'right' : 'left';

              return (
                <ColumnCell
                  key={`${column.headerName}-${index}-${colIndex}`}
                  width={column.width}
                  data-field={toCamelCase(column.headerName)}
                  pinned={column.pinned}
                  row={obj}
                  column={column}
                  emptyPlaceholder={emptyPlaceholder}
                  rowIndex={index}
                  align={align}
                />
              );
            })}

            {/* <div> */}
            {columnsWithoutPinned.map((column: GridColDef, colIndex: number) => {
              const align = column?.align ? column.align : column?.type === 'number' ? 'right' : 'left';

              return (
                <ColumnCell
                  key={`${column.headerName}-${index}-${colIndex}`}
                  width={column.width}
                  data-field={toCamelCase(column.headerName)}
                  pinned={column.pinned}
                  row={obj}
                  column={column}
                  emptyPlaceholder={emptyPlaceholder}
                  rowIndex={index}
                  align={align}
                />
              );
            })}
            {/* </div> */}

            {rightPinnedColumns.map((column: GridColDef, colIndex: number) => {
              const align = column?.align || column?.type === 'number' ? 'right' : 'left';

              return (
                <ColumnCell
                  key={`${column.headerName}-${index}-${colIndex}`}
                  width={column.width}
                  data-field={toCamelCase(column.headerName)}
                  pinned={column.pinned}
                  row={obj}
                  column={column}
                  emptyPlaceholder={emptyPlaceholder}
                  rowIndex={index}
                  align={align}
                />
              );
            })}
          </ColumnRowStyle>
        );
      })}
    </>
  );
};
