import React from 'react';
import styled from '@emotion/styled';

import { IconButton, Select, Typography } from '../widgets';
import { StyledSpaceDiv } from '../toolbar';

import { useGridPagination } from '../../hooks/useGridPagination';

const ContainerDiv = styled.div({
	position: 'sticky',
	gap: 4,
	bottom: 0,
	display: 'flex',
	padding: '12px 20px',
	flexWrap: 'wrap',
	alignItems: 'center',
	background: 'var(--white, #fff)',
	justifyContent: 'space-between',
	borderBottomLeftRadius: 4,
	borderBottomRightRadius: 4,
	borderTop: '1px solid var(--grey-300, #e5e5e5)',
	'.paginationArea': {
		gap: 4,
		display: 'flex',
		flexWrap: 'wrap',
		columnGap: 20,
		alignItems: 'center',
		justifyContent: 'center'
	},
	'.paginationActions': {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		columnGap: 8
	},
	'.paginationSelector': {
		display: 'flex',
		alignItems: 'center',
		select: {
			marginLeft: 8
		}
	}
});

export const Pagination: React.FC = () => {
	const {
		pages,
		page,
		defaultPageSize,
		hideFooterRowCount,
		pageSizeOptions,
		onPageChange,
		onPageSizeChange,
		rowCount,
		totalRowCount,
		hidePagination
	} = useGridPagination();

	return (
		<ContainerDiv>
			{!hideFooterRowCount && (
				<Typography>{`${!pages ? pages : page * defaultPageSize - defaultPageSize + 1} - ${
					page * rowCount > totalRowCount ? totalRowCount : page * rowCount
				} of ${totalRowCount}`}</Typography>
			)}

			<StyledSpaceDiv />

			{!hidePagination && (
				<div className="paginationArea">
					<div className="paginationSelector">
						<Typography>Rows per page</Typography>
						<Select
							options={pageSizeOptions}
							value={defaultPageSize}
							onChange={e => onPageSizeChange(e.target.value)}
						/>
					</div>

					<div className="paginationActions">
						<IconButton
							size={24}
							tabIndex={0}
							name="double-arrow-left"
							type="transparent"
							disabled={!pages || page === 1}
							onClick={() => {
								onPageChange(1);
							}}
						/>
						<IconButton
							size={24}
							tabIndex={0}
							name="arrow-left"
							type="transparent"
							disabled={!pages || page === 1}
							onClick={() => {
								onPageChange(+page - 1);
							}}
						/>

						<Typography>{page}</Typography>

						<IconButton
							size={24}
							tabIndex={0}
							name="arrow-right"
							type="transparent"
							disabled={!pages || page === pages}
							onClick={() => {
								onPageChange(+page + 1);
							}}
						/>
						<IconButton
							size={24}
							tabIndex={0}
							name="double-arrow-right"
							type="transparent"
							disabled={!pages || page === pages}
							onClick={() => {
								onPageChange(pages);
							}}
						/>
					</div>
				</div>
			)}
		</ContainerDiv>
	);
};
