import { type ReactNode } from 'react';
import { type GridColDef } from '../columnDef';
import { type GridDensity } from '../gridDensity';
import { type GridSortDirection } from '../gridSortModel';
import { type Logger } from '../logger';
import { type GridRowId, type GridValidRowModel } from '../gridRows';
import { type FilterFieldProps } from '../gridFiltersModel';

export interface DataGridPropsWithDefaultValues {
  data: any;
  rootData: [];
  filteredAndSortedData: [];
  defaultPageSize: number;
  columns: GridColDef[];
  density: GridDensity;
  emptyPlaceholder: string;
  loading: boolean;
  page: number;
  pageSizeOptions: number[];
  // filterMode: GridFeatureMode;
  sortingOrder: GridSortDirection[];
  sortField: string;
  sortFieldType: string;
  sortBy: GridSortDirection;
  logger: Logger;
  showColumnToolbar: boolean;
  showFilterToolbar: boolean;
  isShowSerialNumber: boolean;
  searchKeys: string[];
  searchText: string;
  /**
   * If `true`, column filters are disabled.
   * @default false
   */
  disableColumnFilter: boolean;
  /**
   * If `true`, the column menu is disabled.
   * @default false
   */
  disableColumnMenu: boolean;
  /**
   * If `true`, the column pinning is disabled.
   * @default false
   */
  disableColumnPinning: boolean;
  /**
   * If `true`, reordering columns is disabled.
   * @default false
   */
  disableColumnReorder: boolean;
  /**
   * If `true`, resizing columns is disabled.
   * @default false
   */
  disableColumnResize: boolean;
  /**
   * If `true`, hiding/showing columns is disabled.
   * @default false
   */
  disableColumnSelector: boolean;
  /**
   * If `true`, the density selector is disabled.
   * @default false
   */
  disableDensitySelector: boolean;
  /**
   * If `true`, sorting with multiple columns is disabled.
   * @default false
   */
  disableMultipleColumnsSorting: boolean;
  /**
   * If `true`, quick search will be disabled.
   * @default false
   */
  disableSearch: boolean;
  /**
   * If `true`, export will be disabled.
   * @default false
   */
  disableColumnExport: boolean;
  /**
   * If `true`, there won't be any footer or pagination.
   * @default false
   */
  hideFooter: boolean;
  /**
   * If `true`, the row count in pagination component in the footer is hidden.
   * @default false
   */
  hideFooterRowCount: boolean;
  /**
   * If `true`, the pagination component in the footer is hidden but row count will be shown.
   * @default false
   */
  hidePagination: boolean;
  /**
   * If `true`, the selected row count in the footer is hidden.
   * @default false
   */
  pagination: boolean;
  /**
   * Pagination can be processed on the server or client-side.
   * Set it to 'client' if you would like to handle the pagination on the client-side.
   * Set it to 'server' if you would like to handle the pagination on the server-side.
   * @default "client"
   */
  filters: FilterFieldProps[];
  /**
   * If `true`, the grid will have checkbox selection.
   * @default false
   */
  checkboxSelection: boolean;
  selectedRows: GridRowId[];
  paginatedSelectedRows: GridRowId[];
  /**
   * If `true`, the columns will be updated with every props - Use it if the data update is real time.
   * @default false
   */
  isRealTimeDataUpdate: boolean;

  /**
   * Bulk actions to be displayed in the toolbar.
   * @default []
   * @example ['delete']
   */
  bulkActions: string[] | any[];
  /**
   * Callback fired when a bulk action is clicked.
   * @param {string} action The action clicked.
   * @param {GridRowId[]} selectedRows The selected rows.
   */
  onBulkActionClick: (action: string, selectedRows: GridRowId[]) => void;
  /**
   * The text to be displayed when the grid is empty.
   * @default 'No rows'
   * @example 'No rows'
   * @example <span>No rows</span>
   * @example <MyEmptyPlaceholder />
   */
  noRowsOverlay: ReactNode | string;
  /**
   * The custom component to render next to search.
   */
  children: null | ((filteredAndSortedData: any, searchText: string, columns: any) => JSX.Element | ReactNode);
  /**
   * Callback fired when the page, page size, sort or sort direction is changed.
   * @param {number} page The page selected.
   * @param {number} pageSize The number of rows in a page.
   * @param {string} sort The field sorted.
   * @param {string} sortDirection The direction of the sort.
   * @param {boolean} fetchOnPageChange If `true`, the callback is fired when the page is changed.
   */
  fetchOnPageChange:
    | null
    | ((page: number, pageSize: number, searchText: string, sort: string, sortDirection: GridSortDirection) => void);
  /**
   * for paginated api as the table does not have all the data to calculate the total number of rows
   */
  rowsCount: null | number;
  /**
   *
   * if the export is custom.
   *
   */
  customExport: null | ((filteredAndSortedData: any, searchText: string, columns: any) => void);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type DataGridProps<R extends GridValidRowModel = any> = Partial<DataGridPropsWithDefaultValues> & {
  pagination?: true;
};
