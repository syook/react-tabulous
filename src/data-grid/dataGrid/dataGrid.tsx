import React from 'react';

import { GridBody, GridFooterPlaceholder, GridHeader, GridRoot } from '../components';
import { DataGridStyle } from './dataGridStyle';

import { DataGridContextProvider } from '../context';
import { type DataGridProps, type GridValidRowModel } from '../models';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DataGridRaw = React.forwardRef(function DataGrid<R extends GridValidRowModel>(
	props: DataGridProps<R>,
	ref: React.Ref<HTMLDivElement>
) {
	return (
		<DataGridContextProvider props={props}>
			<DataGridStyle>
				<GridRoot ref={ref}>
					<GridHeader />
					<GridBody />
					<GridFooterPlaceholder />
				</GridRoot>
			</DataGridStyle>
		</DataGridContextProvider>
	);
});

type DataGridComponent = React.ForwardRefExoticComponent<
	DataGridProps<GridValidRowModel> & React.RefAttributes<HTMLDivElement>
>;

export const DataGrid = React.memo(DataGridRaw) as DataGridComponent;
