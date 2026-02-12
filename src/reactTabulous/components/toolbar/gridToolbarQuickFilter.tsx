import React, { useEffect } from 'react';
import { Icon, Input } from '../widgets';

import { useGridSearch } from '../../hooks/useGridSearch';
import useDebounce from '../../hooks/useDebounce';

export const GridToolbarQuickFilter: React.FC = () => {
  const { handleSearchApply, searchText, searchPlaceholder } = useGridSearch();
  const [searchKey, setSearchKey] = React.useState<string>(searchText);

  const delayValue = useDebounce(searchKey, 500);

  useEffect(() => {
    handleSearchApply(delayValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delayValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchKey(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchKey('');
  };

  return (
    <Input
      placeholder={searchPlaceholder}
      className="gridToolbarQuickFilter"
      value={searchKey}
      startAdornment={<Icon name="search" size={20} fill="var(--grey-500, #5f6368)" />}
      endAdornment={
        searchKey ? <Icon name="close" size={20} fill="var(--grey-500, #5f6368)" onClick={handleClearSearch} /> : null
      }
      onChange={handleChange}
    />
  );
};
