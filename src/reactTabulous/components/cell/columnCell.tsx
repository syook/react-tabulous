import styled from '@emotion/styled';
import { type GridPinnedPosition } from '../../models';
import { ColumnAlignment } from '../../models/columnDef/columnAlign';

type ColumnCellProps = React.HTMLAttributes<HTMLDivElement> & {
  width?: number | string;
  pinned?: GridPinnedPosition | null;
  row?: any;
  column?: any;
  emptyPlaceholder: string;
  rowIndex: number;
  align: ColumnAlignment;
};

const getCellData = (children: any, row: any, column: any, emptyPlaceholder: string, rowIndex: number) => {
  if (children) {
    return children;
  } else if (column.renderCell) {
    return column.renderCell(row, rowIndex);
  } else if (column.valueGetter) {
    return column.valueGetter(row, rowIndex) || emptyPlaceholder;
  } else if (row[column.field]) {
    return `${row[column.field]}`;
  } else {
    return emptyPlaceholder;
  }
};

interface StyledContainerProps {
  $align: ColumnAlignment;
}

const StyledCell = styled('div')<StyledContainerProps>`
  text-align: ${props => props.$align};
`;

const ColumnCell: React.FC<ColumnCellProps> = ({
  children,
  width,
  pinned,
  row,
  column,
  emptyPlaceholder,
  rowIndex,
  align
}) => {
  const style = width != null ? { width, minWidth: width, maxWidth: width } : {};

  const data = getCellData(children, row, column, emptyPlaceholder, rowIndex);
  const extraProps = typeof data === 'string' ? { title: data } : {};

  return (
    <StyledCell className="columnCell" style={style} data-pinned={pinned} $align={align} {...extraProps}>
      {data}
    </StyledCell>
  );
};

export default ColumnCell;
