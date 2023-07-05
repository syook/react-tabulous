import { useCallback } from 'react';

import { useGridRootProps } from './useGridRootProps';
import { type GridColDef } from '../models';

export const useGridColumnHeaders = (): any => {
	const {
		rootState: { columns },
		updateState
	} = useGridRootProps();

	const onHideColumns = useCallback(
		(headerName: string) => {
			const newData = columns.map((column: GridColDef) => ({
				...column,
				isVisible: column.headerName !== headerName ? column.isVisible : !column.isVisible
			}));
			updateState({
				columns: newData
			});
		},
		[columns, updateState]
	);

	return { columns, onHideColumns };
};
