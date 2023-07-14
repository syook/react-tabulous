import { useCallback } from 'react';
import { useGridRootProps } from './useGridRootProps';

export const useGridPagination = (): any => {
	const {
		rootState: {
			hideFooterRowCount,
			hidePagination,
			filteredAndSortedData,
			defaultPageSize,
			page,
			searchText,
			sortField,
			sortBy,
			pageSizeOptions,
			fetchOnPageChange,
			rowsCount: paginatedRowsCount
		},
		updateState
	} = useGridRootProps();

	const pages = Math.ceil(paginatedRowsCount ?? filteredAndSortedData.length / defaultPageSize);

	const onPageChange = useCallback(
		(page: number) => {
			let newData = [] as any;
			if (!fetchOnPageChange) {
				newData = filteredAndSortedData.slice((page - 1) * defaultPageSize, page * defaultPageSize);
				updateState({ page, data: newData });
			} else {
				fetchOnPageChange(page, defaultPageSize, searchText, sortField, sortBy);
			}
			updateState({ page, data: newData });
		},
		[
			defaultPageSize,
			filteredAndSortedData,
			updateState,
			fetchOnPageChange,
			searchText,
			sortField,
			sortBy
		]
	);

	const onPageSizeChange = useCallback(
		(pageSize: number) => {
			let newData = [] as any;
			let updatedPageSize = {};
			if (!fetchOnPageChange) {
				newData = filteredAndSortedData.slice(0, pageSize);
				const pages = Math.ceil(filteredAndSortedData.length / pageSize);
				if (page > pages) {
					updatedPageSize = { page: pages };
				}
			} else {
				fetchOnPageChange(page, pageSize, searchText, sortField, sortBy);
				updatedPageSize = { page: 1 };
			}
			updateState({ defaultPageSize: pageSize, data: newData, ...updatedPageSize });
		},
		[filteredAndSortedData, updateState, page, fetchOnPageChange, searchText, sortField, sortBy]
	);

	return {
		pages,
		page,
		defaultPageSize,
		pageSizeOptions,
		hideFooterRowCount,
		hidePagination,
		onPageChange,
		onPageSizeChange,
		totalRowCount: paginatedRowsCount ?? filteredAndSortedData.length,
		rowCount:
			(paginatedRowsCount ?? filteredAndSortedData.length) > defaultPageSize
				? defaultPageSize
				: paginatedRowsCount ?? filteredAndSortedData.length
	};
};
