import { useCallback } from 'react';
import { useGridRootProps } from './useGridRootProps';

export const getColumnsData = (columns: any) => {
  return columns
    .reduce((acc: any, column: any) => {
      if (column.isVisible && column.type !== 'action') {
        acc.push(column.headerName);
      }
      return acc;
    }, [])
    .join(',');
};

export const getRowsData = (rows: any, columns: any, emptyPlaceholder: string) => {
  return rows
    .map((row: any) => {
      return columns
        .reduce((acc: any, column: any) => {
          let value = '';
          if (column.valueGetter) {
            value = column.valueGetter(row) || emptyPlaceholder;
          } else if (column.renderCell && column.type !== 'action') {
            value = column.renderCell(row)?.props?.children ?? column.renderCell(row)?.props?.value;
          } else if (column.type !== 'action') {
            value = row[column.field] || emptyPlaceholder;
          }
          if (`${value}`.includes(`,`)) {
            value = `"${value}"`;
          }
          acc.push(value);
          return acc;
        }, [])
        .join(',');
    })
    .join('\n');
};

export const useGridExport = (): any => {
  const {
    rootState: { filteredAndSortedData, columns, searchText, customExport, emptyPlaceholder }
  } = useGridRootProps();

  const handleExport = useCallback(
    (type: string) => {
      const columnsData = getColumnsData(columns);
      const dataToDisplay = getRowsData(filteredAndSortedData, columns, emptyPlaceholder);

      const dataStr = `data:text/csv;charset=utf-8,${columnsData}\n${dataToDisplay}`;

      const link = document.createElement('a');
      const encodedUri = encodeURI(dataStr);
      link.setAttribute('href', encodedUri);

      if (type === 'csv') {
        link.setAttribute('download', 'data.csv');
      } else if (type === 'xlsx') {
        link.setAttribute('download', 'data.xlsx');
      }
      document.body.appendChild(link); // Required for FF
      link.click();
    },
    [filteredAndSortedData, columns, emptyPlaceholder]
  );

  return { handleExport, filteredAndSortedData, columns, searchText, customExport };
};
