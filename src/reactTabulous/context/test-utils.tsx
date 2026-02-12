import { type ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react';

import { DataGridContextProvider } from './dataGridContextProvider';
import { dataSet1Columns, getDataSetBasedOnCountPassed } from '../../data';

const props = {
  data: getDataSetBasedOnCountPassed(50),
  columns: dataSet1Columns,
  checkboxSelection: true
};

const Wrapper = ({ children }: any) => <DataGridContextProvider props={props}>{children}</DataGridContextProvider>;

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: Wrapper, ...options });

// const customRenderWrapperProps = {
// 	data: [
// 		{ id: '1', name: 'test' },
// 		{ id: '2', name: 'test2' }
// 	],
// 	columns: [
// 		{ field: 'id', headerName: 'ID', isVisible: true },
// 		{ field: 'name', headerName: 'Name', isVisible: true }
// 	]
// };

// const wrapper = ({ children, props: any = customRenderWrapperProps }: any) => (
// 	<DataGridContextProvider props={props}>{children}</DataGridContextProvider>
// );

// const customRenderHook = (customHook: any, options?: Omit<RenderOptions, 'wrapper'>) =>
// 	renderHook(customHook, { wrapper });

export * from '@testing-library/react';
// export { customRender as render };
export { customRender };
