import { useCallback } from 'react';

import { useGridRootProps } from './useGridRootProps';
import { type GridPinnedPosition } from '../models';

export const useGridPin = (): any => {
	const {
		rootState: { columns },
		updateState
	} = useGridRootProps();

	const handlePin = useCallback(
		(field: string, pinDirection: GridPinnedPosition) => {
			const newColumns = [...columns];
			const column = newColumns.find(c => c.field === field);
			if (column) {
				column.pinned = pinDirection;
				updateState({ columns: newColumns });
			}
		},
		[columns, updateState]
	);

	return { handlePin };
};
