import React, { useEffect, useState } from 'react';

import { DataGridRootPropsContext } from './dataGridRootPropsContext';
import { DATA_GRID_PROPS_DEFAULT_VALUES } from '../hooks/useGridRootProps';
import { type DataGridPropsWithDefaultValues } from '../models/props/dataGridProps';

import { getColumnsAndSearchKeys } from '../helpers/getColumnsAndSearchKeys';
import { getUpdatedFormattedData } from '../helpers/getUpdatedData';
import isEqual from '../helpers/isEqual';

export interface DataGridContextProviderProps {
  props: any;
  children: React.ReactNode;
}

export const DataGridContextProvider: React.FC<DataGridContextProviderProps> = ({ props, children }) => {
  const columnPropsRef = React.useRef(props.columns);
  const [values, setValues] = useState({
    ...DATA_GRID_PROPS_DEFAULT_VALUES,
    ...props,
    rootData: props.data,
    ...getColumnsAndSearchKeys(props.columns),
    filteredAndSortedData: props.data,
    data: []
  });

  useEffect(() => {
    setValues((prev: any) => ({
      ...prev,
      rootData: props.data,
      ...getUpdatedFormattedData({
        rootData: props.data,
        fetchOnPageChange: prev.fetchOnPageChange,
        searchText: prev.searchText,
        columns: prev.columns,
        searchKeys: prev.searchKeys,
        filters: prev.filters,
        sortField: prev.sortField,
        sortFieldType: prev.sortFieldType,
        sortBy: prev.sortBy,
        page: props.page ?? prev.page,
        defaultPageSize: prev.defaultPageSize
      }),
      fetchOnPageChange: props.fetchOnPageChange ?? null,
      page: props.page ?? prev.page
    }));
  }, [props.data, props.fetchOnPageChange, props.page]);

  useEffect(() => {
    setValues((prev: any) => ({
      ...prev,
      loading: props.loading,
      customExport: props.customExport ?? null,
      onBulkActionClick: props.onBulkActionClick ?? null,
      rowsCount: props.rowsCount ?? null,
      children: props.children ?? null
    }));
  }, [props.loading, props.customExport, props.onBulkActionClick, props.rowsCount, props.children]);

  useEffect(() => {
    setValues((prev: any) => ({
      ...prev,
      selectedRows: props.selectedRows ?? []
    }));
  }, [props.selectedRows]);

  useEffect(() => {
    if (isEqual(props.columns, columnPropsRef.current) && !props.isRealTimeDataUpdate) return;
    setValues((prev: any) => ({
      ...prev,
      ...getColumnsAndSearchKeys(props.columns),
      children: props.children ?? null
    }));
    columnPropsRef.current = props.columns;
  }, [props.columns, props.children, props.isRealTimeDataUpdate]);

  const updateValues = (newValues: any): any => {
    setValues({ ...values, ...newValues });
  };

  return (
    <DataGridRootPropsContext.Provider
      value={{
        values: values as unknown as DataGridPropsWithDefaultValues,
        setValues: updateValues
      }}
    >
      {children}
    </DataGridRootPropsContext.Provider>
  );
};
