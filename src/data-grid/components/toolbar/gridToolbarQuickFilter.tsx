import React from 'react';
import { Icon, Input } from '../widgets';

import { useGridSearch } from '../../hooks/useGridSearch';
import { debounce } from '../../helpers/debounce';

export const GridToolbarQuickFilter: React.FC = () => {
	const { handleSearchApply, searchText } = useGridSearch();
	const [searchKey, setSearchKey] = React.useState<string>(searchText);

	const delayQuery = debounce(value => {
		handleSearchApply(value);
	}, 500);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setSearchKey(e.target.value);
		delayQuery(e.target.value);
	};

	return (
		<Input
			type="search"
			placeholder="Search"
			className="gridToolbarQuickFilter"
			value={searchKey}
			startAdornment={<Icon name="search" size={20} fill="var(--grey-500, #5f6368)" />}
			onChange={handleChange}
		/>
	);
};
