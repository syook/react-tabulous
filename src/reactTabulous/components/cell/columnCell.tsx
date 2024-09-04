import { type GridPinnedPosition } from '../../models';

type ColumnCellProps = React.HTMLAttributes<HTMLDivElement> & {
  width?: number | string;
  pinned?: GridPinnedPosition | null;
  row?: any;
  column?: any;
  emptyPlaceholder: string;
  rowIndex: number;
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

const ColumnCell: React.FC<ColumnCellProps> = ({
  children,
  width,
  pinned,
  row,
  column,
  emptyPlaceholder,
  rowIndex
}) => {
  const style = width != null ? { width, minWidth: width, maxWidth: width } : {};

  const data = getCellData(children, row, column, emptyPlaceholder, rowIndex);
  const extraProps = typeof data === 'string' ? { title: data } : {};

  return (
    <div className="columnCell" style={style} data-pinned={pinned} {...extraProps}>
      {data}
    </div>
  );
};

export default ColumnCell;
