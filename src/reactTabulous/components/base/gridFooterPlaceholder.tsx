import React from 'react';
import { Pagination } from '../pagination';

import { useGridRootProps } from '../../hooks/useGridRootProps';

export const GridFooterPlaceholder: React.FC = () => {
  const {
    rootState: { hideFooter }
  } = useGridRootProps();

  if (hideFooter) {
    return null;
  }

  return <Pagination />;
};
