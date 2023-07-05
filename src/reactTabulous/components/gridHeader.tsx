import React from 'react';

import { GridToolbar } from './toolbar';
import { BulkActions } from './bulkAction';
import { useGridRootProps } from '../hooks/useGridRootProps';

export const GridHeader: React.FC = () => {
	const {
		rootState: { selectedRows, bulkActions, onBulkActionClick }
	} = useGridRootProps();

	return (
		<div className="gridHeaderContainer">
			{selectedRows.length > 0 ? (
				<BulkActions
					selectedRows={selectedRows}
					bulkActions={bulkActions}
					onBulkActionClick={onBulkActionClick}
				/>
			) : (
				<GridToolbar />
			)}
		</div>
	);
};
