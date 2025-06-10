import React from 'react';
import styled from '@emotion/styled';

import { GridToolbarColumns } from './gridToolbarColumns';
import { GridToolbarDensity } from './gridToolbarDensity';
import { GridToolbarExport } from './gridToolbarExport';
import { GridToolbarFilter } from './gridToolbarFilter';
import { GridToolbarQuickFilter } from './gridToolbarQuickFilter';
import { useGridRootProps } from '../../hooks/useGridRootProps';

const GridToolbarContainer = styled.div({
  gap: 6,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  padding: '12px 16px 10px',
  '.gridToolbarQuickFilter.inputV2': {
    width: 250,
    display: 'inline-flex'
  }
});

export const StyledSpaceDiv = styled.div({ flex: 1 });

export const GridToolbar: React.FC = () => {
  const {
    rootState: {
      disableColumnFilter,
      disableColumnSelector,
      disableDensitySelector,
      disableSearch,
      disableColumnExport,
      children,
      fetchOnPageChange,
      filteredAndSortedData,
      searchText,
      columns
    }
  } = useGridRootProps();
  return (
    <GridToolbarContainer>
      {!disableColumnSelector && <GridToolbarColumns />}
      {!disableColumnFilter && !fetchOnPageChange && <GridToolbarFilter />}
      {!disableDensitySelector && <GridToolbarDensity />}
      {!fetchOnPageChange && !disableColumnExport && <GridToolbarExport />}
      <StyledSpaceDiv />
      {!disableSearch && <GridToolbarQuickFilter />}
      <>{children ? children(filteredAndSortedData, searchText, columns) : null}</>
    </GridToolbarContainer>
  );
};
