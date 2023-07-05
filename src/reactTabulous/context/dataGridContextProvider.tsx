import React, { useEffect, useState } from 'react';

import { DataGridRootPropsContext } from './dataGridRootPropsContext';
import { DATA_GRID_PROPS_DEFAULT_VALUES } from '../hooks/useGridRootProps';
import { type DataGridPropsWithDefaultValues } from '../models/props/dataGridProps';

import { getColumnsAndSearchKeys } from '../helpers/getColumnsAndSearchKeys';

export interface DataGridContextProviderProps {
	props: any;
	children: React.ReactNode;
}

export const DataGridContextProvider: React.FC<DataGridContextProviderProps> = ({
	props,
	children
}) => {
	const [values, setValues] = useState({
		...DATA_GRID_PROPS_DEFAULT_VALUES,
		...props,
		rootData: props.data,
		...getColumnsAndSearchKeys(props.columns),
		filteredAndSortedData: props.data,
		data: []
	});

	useEffect(() => {
		setValues((prev: any) => ({
			...prev,
			data: props.data.slice(
				(values.page - 1) * values.defaultPageSize,
				values.page * values.defaultPageSize
			)
		}));
	}, [props.data, values.page, values.defaultPageSize]);

	const updateValues = (newValues: any): any => {
		setValues({ ...values, ...newValues });
	};

	return (
		<DataGridRootPropsContext.Provider
			value={{
				values: values as unknown as DataGridPropsWithDefaultValues,
				setValues: updateValues
			}}
		>
			{children}
		</DataGridRootPropsContext.Provider>
	);
};
