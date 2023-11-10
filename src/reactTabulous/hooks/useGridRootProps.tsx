import { useContext } from 'react';
import { DataGridRootPropsContext } from '../context/dataGridRootPropsContext';
import { type DataGridPropsWithDefaultValues } from '../models';
import NoRowsOverlay from '../constant/noRowsOverlay';

export const DATA_GRID_PROPS_DEFAULT_VALUES = {
  autoHeight: false,
  density: 'standard',
  emptyPlaceholder: '',
  loading: false,
  data: [],
  rootData: [],
  filteredAndSortedData: [],
  defaultPageSize: 10,
  pageSizeOptions: [5, 10, 25, 50],
  page: 1,
  hideFooter: false,
  pagination: true,
  hidePagination: false,
  hideFooterRowCount: false,
  sortField: '',
  sortFieldType: '',
  sortBy: 'asc',
  showColumnToolbar: false,
  showFilterToolbar: false,
  isShowSerialNumber: false,
  filters: [],
  searchText: '',
  checkboxSelection: false,
  selectedRows: [],
  paginatedSelectedRows: [],
  disableColumnFilter: false,
  disableColumnMenu: false,
  disableColumnPinning: false,
  disableColumnReorder: false,
  disableColumnResize: false,
  disableColumnSelector: false,
  disableDensitySelector: false,
  disableMultipleColumnsSorting: false,
  disableSearch: false,
  disableColumnExport: false,
  bulkActions: ['delete'],
  noRowsOverlay: <NoRowsOverlay />,
  children: null,
  isRealTimeDataUpdate: false,
  searchPlaceholder: 'Search',

  // methods
  onBulkActionClick: () => {},
  fetchOnPageChange: null,
  rowsCount: null,
  customExport: null
  // disableMultipleColumnsFiltering: false,
  // disableMultipleRowSelection: false,
  // disableRowSelectionOnClick: false,
  // disableVirtualization: false,

  // autoPageSize: false,
  // checkboxSelectionVisibleOnly: false,
  // columnBuffer: 3,
  // rowBuffer: 3,
  // columnThreshold: 3,
  // rowThreshold: 3,
  // rowSelection: true,
  // editMode: GridEditModes.Cell,
  // filterMode: 'client',
  // columnHeaderHeight: 56,
  // hideFooterPagination: false,
  // hideFooterSelectedRowCount: false,
  // logger: console,
  // logLevel: process.env.NODE_ENV === 'production' ? ('error' as const) : ('warn' as const),
  // paginationMode: 'client',
  // rowHeight: 52,
  // rowSpacingType: 'margin',
  // showCellVerticalBorder: false,
  // showColumnVerticalBorder: false,
  // sortingOrder: ['asc' as const, 'desc' as const, null],
  // sortingMode: 'client',
  // throttleRowsMs: 0,
  // disableColumnReorder: false,
  // disableColumnResize: false,
  // keepNonExistentRowsSelected: false,
  // keepColumnPositionIfDraggedOutside: false,
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useGridRootProps = () => {
  const { values, setValues }: any = useContext(DataGridRootPropsContext);

  return { rootState: values as DataGridPropsWithDefaultValues, updateState: setValues };
};
