import React from 'react';

const DataGridRootPropsContext = React.createContext<unknown>(undefined);

if (process.env.NODE_ENV !== 'production') {
	DataGridRootPropsContext.displayName = 'DataGridRootPropsContext';
}

export { DataGridRootPropsContext };
