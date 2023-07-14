import React, { useRef } from 'react';
import { Icon, Input } from '../widgets';

import { useGridSearch } from '../../hooks/useGridSearch';
import { debounce } from '../../helpers/debounce';

export const GridToolbarQuickFilter: React.FC = () => {
	const { handleSearchApply, searchText } = useGridSearch();
	const searchTextRef = useRef(searchText);
	const [searchKey, setSearchKey] = React.useState<string>(searchText);

	React.useEffect(() => {
		if(searchTextRef.current !== searchText){
			setSearchKey(searchText);
			searchTextRef.current = searchText;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchTextRef.current, searchText]);

	const delayQuery = debounce(value => {
		handleSearchApply(value);
		searchTextRef.current = value;
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
