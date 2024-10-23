import { type ColumnType } from './columnType';
import { type GridValidRowModel } from '../gridRows';
import { type GridPinnedPosition } from './columnPin';
import { type GridActionsCellItemProps } from '../../components/cell/gridActionsCellItem';
import { OptionInterface } from '../../helpers/select';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface GridBaseColDef<R extends GridValidRowModel = GridValidRowModel, V = any, F = V> {
  /**
   * The column identifier. It's used to map with [[GridRowModel]] values.
   */
  field: string;
  /**
   * The title of the column rendered in the column header cell.
   */
  headerName: string;
  /**
   * Get the values to be displayed in the table cell.
   */
  valueGetter?: (row: any, index?: number) => string | number | boolean;
  /**
   * The cell which has JSX will be displayed.
   */
  renderCell?: HTMLElement | JSX.Element | Element | ((row: any, index: number) => JSX.Element);
  /**
   * The description of the column rendered as tooltip if the column header name is not fully displayed.
   */
  description?: string;
  /**
   * The column is visible or not.
   */
  isVisible?: boolean;
  /**
   * Type allows to merge this object with a default definition [[GridColDef]].
   * @default 'string'
   */
  type?: ColumnType;
  /**
   * Allows column to pin.
   * @default null
   */
  pinned?: GridPinnedPosition | null;
  /**
   * Allows column to set width.
   * @default 'max-content'
   */
  width?: number | string;
  /**
   * The column to search or not.
   */
  isSearchable?: boolean;
  /**
   * The column to sortable or not.
   */
  isSortable?: boolean;
  /**
   * The column to sortable or not.
   */
  isFilterable?: boolean;
  /**
   * The column to show options in filter.
   */
  options?: OptionInterface[];
}

export interface GridActionsColDef<R extends GridValidRowModel = any, V = any, F = V> extends GridBaseColDef<R, V, F> {
  /**
   * Type allows to merge this object with a default definition [[GridColDef]].
   * @default 'actions'
   */
  type: 'actions';
  /**
   * Function that returns the actions to be shown.
   * @param {GridRowParams} params The params for each row.
   * @returns {React.ReactElement<GridActionsCellItemProps>[]} An array of [[GridActionsCell]] elements.
   */
  getActions: () => Array<React.ReactElement<GridActionsCellItemProps>>;
}

export type GridColDef<R extends GridValidRowModel = any, V = any, F = V> =
  | GridBaseColDef<R, V, F>
  | GridActionsColDef<R, V, F>;
// | GridSingleSelectColDef<R, V, F>;
