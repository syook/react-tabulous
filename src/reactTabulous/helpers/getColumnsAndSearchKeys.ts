import { type GridColDef, type GridBaseColDef, GridPinnedPosition } from '../models';

export const getColumnsAndSearchKeys = (
  columns: GridBaseColDef[]
): {
  columns: GridColDef[];
  searchKeys: string[];
  filters: any;
  searchText: string;
  page: number;
} => {
  const searchKeys: string[] = [];
  const newColumns: GridColDef[] = columns.map((column: GridColDef) => {
    if (column.isSearchable && column.headerName) {
      searchKeys.push(column.field);
    }
    return {
      ...column,
      isVisible: column.isVisible ?? true,
      pinned: column.type === 'action' ? GridPinnedPosition.right : column.pinned ?? null,
      width: column.width ?? 'max-content',
      isSearchable: column.isSearchable ?? false,
      isSortable: column.isSortable ?? false,
      isFilterable: column.isFilterable ?? false
    };
  });
  return {
    columns: newColumns,
    searchKeys,
    filters: [],
    searchText: '',
    page: 1
  };
};
