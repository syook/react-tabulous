import { render } from '@testing-library/react';
import { dataSet1Columns, getDataSetBasedOnCountPassed } from '../../../data';
import { GridHeader } from '../../../reactTabulous/components';
import { DataGridContextProvider } from '../../../reactTabulous/context';

const props = {
	data: getDataSetBasedOnCountPassed(10),
	columns: dataSet1Columns,
	checkboxSelection: true
};

const Wrapper = ({ children }: any) => (
	<DataGridContextProvider props={props}>{children}</DataGridContextProvider>
);

describe('GridHeader', () => {
	test('should render correctly', () => {
		render(<GridHeader />, { wrapper: Wrapper });
	});
});
