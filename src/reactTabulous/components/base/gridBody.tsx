import React from 'react';

import { ColumnHeaders } from '../columnHeaders';
import { ColumnBody } from '../columnBody';

export const GridBody: React.FC = () => {
	return (
		<div className="gridBodyContainer scrollStyle">
			<div className="gridBody">
				<ColumnHeaders />
				<ColumnBody />
			</div>
		</div>
	);
};
