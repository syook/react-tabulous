import { useCallback } from 'react';
import { useGridRootProps } from './useGridRootProps';
import { type GridDensity } from '../models/gridDensity';

export const useGridDensity = (): any => {
	const {
		rootState: { density },
		updateState
	} = useGridRootProps();

	const onChangeDensity = useCallback(
		(density: GridDensity) => {
			updateState({ density });
		},
		[updateState]
	);

	return { density, onChangeDensity };
};
