import styled from '@emotion/styled';

import { Checkbox, Loader, Typography } from '../widgets';
import ColumnCell from '../cell/columnCell';

import { toCamelCase } from '../../helpers/toCamelCase';
import { densityMapping } from '../../constant';
import { useGridRootProps } from '../../hooks/useGridRootProps';
import { useGridRowSelection } from '../../hooks/useGridRowSelection';
import { type GridColDef } from '../../models';

const ColumnRowStyle = styled.div((props: any) => ({
	display: 'table-row',
	height: props.height,
	minHeight: props.height,
	maxHeight: props.height,
	borderBottom: '1px solid var(--grey-300, #e5e5e5)'
}));

const OverlayWrapperInner = styled.div({
	width: '100%',
	height: '-webkit-fill-available',
	// position: 'absolute',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: 'rgba(0,0,0,.02)',
	'.overlayWrapperLoader': {
		width: 40,
		height: 40,
		display: 'inline-block',
		color: 'var(--primary-400, #115bb2)',
		animation: 'spin 1s linear infinite',
		'@keyframes spin': {
			'0%': { transform: 'rotate(0deg)' },
			'100%': { transform: 'rotate(360deg)' }
		}
	}
});

export const ColumnBody: React.FC = () => {
	const {
		rootState: {
			columns,
			data,
			emptyPlaceholder,
			density,
			checkboxSelection,
			selectedRows,
			noRowsOverlay,
			loading
		}
	} = useGridRootProps();

	const { handleRowSelect } = useGridRowSelection();

	const rightPinnedColumns = columns.filter(
		(column: GridColDef) => column.pinned === 'right' && column.isVisible
	);
	const leftPinnedColumns = columns.filter(
		(column: GridColDef) => column.pinned === 'left' && column.isVisible
	);
	const columnsWithoutPinned = columns.filter(
		(column: GridColDef) => column.pinned === null && column.isVisible
	);

	if (loading) {
		return (
			<OverlayWrapperInner>
				<div className="overlayWrapperLoader">
					<Loader />
				</div>
			</OverlayWrapperInner>
		);
	}

	if (data.length === 0) {
		return (
			<OverlayWrapperInner>
				{typeof noRowsOverlay === 'string' ? <Typography>{noRowsOverlay}</Typography> : noRowsOverlay}
			</OverlayWrapperInner>
		);
	}

	return (
		<>
			{data.map((obj: any, index: number) => {
				return (
					<ColumnRowStyle height={densityMapping[density]} className="columnRow" key={index}>
						{checkboxSelection && (
							<ColumnCell key="grid-checkbox" emptyPlaceholder={emptyPlaceholder} rowIndex={index}>
								<Checkbox
									checked={selectedRows.includes(obj.id) || selectedRows.includes(obj._id)}
									onChange={() => handleRowSelect(obj.id ?? obj._id)}
								/>
							</ColumnCell>
						)}
						{leftPinnedColumns.map((column: GridColDef, colIndex: number) => {
							return (
								<ColumnCell
									key={`${column.headerName}-${index}-${colIndex}`}
									width={column.width}
									data-field={toCamelCase(column.headerName)}
									pinned={column.pinned}
									row={obj}
									column={column}
									emptyPlaceholder={emptyPlaceholder}
									rowIndex={index}
								/>
							);
						})}

						{/* <div> */}
						{columnsWithoutPinned.map((column: GridColDef, colIndex: number) => {
							return (
								<ColumnCell
									key={`${column.headerName}-${index}-${colIndex}`}
									width={column.width}
									data-field={toCamelCase(column.headerName)}
									pinned={column.pinned}
									row={obj}
									column={column}
									emptyPlaceholder={emptyPlaceholder}
									rowIndex={index}
								/>
							);
						})}
						{/* </div> */}

						{rightPinnedColumns.map((column: GridColDef, colIndex: number) => {
							return (
								<ColumnCell
									key={`${column.headerName}-${index}-${colIndex}`}
									width={column.width}
									data-field={toCamelCase(column.headerName)}
									pinned={column.pinned}
									row={obj}
									column={column}
									emptyPlaceholder={emptyPlaceholder}
									rowIndex={index}
								/>
							);
						})}
					</ColumnRowStyle>
				);
			})}
		</>
	);
};
