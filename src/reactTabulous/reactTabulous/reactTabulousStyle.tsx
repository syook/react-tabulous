import styled from '@emotion/styled';

export const DataGridStyle = styled.div(() => ({
	height: '100%',
	'.scrollStyle': {
		'::-webkit-scrollbar': {
			background: 'var(--grey-200, #f2f2f2)',
			height: 8,
			width: 8
		},
		'::-webkit-scrollbar-track': {
			backgroundColor: 'transparent'
		},
		'::-webkit-scrollbar-thumb': {
			borderRadius: 4,
			background: 'var(--grey-400, #b1b1b1)'
		}
	},
	'.gridRoot': {
		flex: '1 1 0%',
		boxSizing: 'border-box',
		position: 'relative',
		border: '1px solid #E5E5E5',
		borderRadius: '4px',
		fontFamily: 'var(--font-family, Roboto, Helvetica, Arial, sans-serif)',
		fontWeight: '400',
		fontSize: '14px',
		lineHeight: '1.43',
		letterSpacing: '0.01071em',
		outline: 'none',
		height: '100%',
		display: 'flex',
		flexDirection: 'column'
	},
	'.gridHeaderContainer': {
		background: 'var(--grey-100, #fafafa)'
	},
	'.gridBodyContainer': {
		display: 'flex',
		flex: 1,
		overflow: 'auto',
		'.gridBody': {
			width: '100%',
			position: 'relative',
			flex: 1,
			// display: 'flex',
			flexDirection: 'column',
			overflow: 'auto',
			display: 'table',
			borderCollapse: 'collapse'
		},
		'.footerContainer': {
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			minHeight: '40px',
			borderTop: '1px solid rgb(81, 81, 81)'
		},
		'.columnHeaders': {
			position: 'sticky',
			top: 0,
			zIndex: 2,
			alignItems: 'center',
			background: 'var(--grey-100, #fafafa)',
			display: 'table-row',
			fontSize: '12px',
			fontWeight: 500,
			boxShadow: '0px 1px 0px 0px var(--grey-300, #e5e5e5)',
			// '& .pinnedColumnHeaders--left': {
			// 	position: 'sticky',
			// 	left: 0,
			// 	zIndex: 1,
			// },
			// '& .pinnedColumnHeaders--right': {
			// 	position: 'sticky',
			// 	right: 0,
			// 	zIndex: 1,
			// },
			'& .columnHeader': {
				verticalAlign: 'middle',
				background: 'inherit',
				"&[data-field='checkbox']": {
					width: '48px'
				},
				"&[data-pinned='left']": {
					position: 'sticky',
					top: 0,
					left: 0,
					zIndex: 1
				},
				"&[data-pinned='right']": {
					position: 'sticky',
					top: 0,
					right: 0,
					zIndex: 1
				},
				'& .columnHeaderContainer': {
					display: 'flex',
					alignItems: 'center',
					".popupTrigger[data-active='true']": {
						'& .columnHeaderAction': {
							display: 'block'
						}
					}
				},
				'& .columnHeaderTitleContainer': {
					display: 'flex',
					alignItems: 'center',
					minWidth: '0px',
					flex: 1,
					whiteSpace: 'nowrap',
					overflow: 'hidden',
					position: 'relative',

					'.columnHeaderTitle': {
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						whiteSpace: 'nowrap',
						lineHeight: '32px'
					}
				},
				display: 'table-cell',
				alignItems: 'center',
				padding: '0px 10px',
				boxSizing: 'border-box',
				position: 'relative',
				'.columnSeparator': {
					position: 'absolute',
					top: '22%',
					right: 0,
					bottom: 0,
					width: '2px',
					maxHeight: '18px',
					backgroundColor: 'rgba(0, 0, 0, 0.1)'
				},
				'.columnSeparator--resizable': {
					cursor: 'col-resize',
					'&:hover': {
						backgroundColor: 'rgba(0, 0, 0, 0.5)'
					},
					'&:active': {
						backgroundColor: 'rgba(0, 0, 0, 0.9)'
					}
				},
				'& .columnHeaderAction': {
					display: 'none',
					'&.asc': {
						display: 'block'
					},
					'&.desc': {
						display: 'block'
					}
				},

				':hover': {
					'& .columnHeaderAction': {
						display: 'block'
					}
				}
			}
		},

		'& .columnCell': {
			display: 'table-cell',
			padding: '0px 10px',
			boxSizing: 'border-box',
			verticalAlign: 'middle',
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			whiteSpace: 'nowrap',
			background: 'inherit',
			"&[data-pinned='left']": {
				position: 'sticky',
				left: 0,
				zIndex: 1,
				boxShadow: 'inset -1px 0px 0px var(--grey-300, #e5e5e5)'
			},
			"&[data-pinned='right']": {
				position: 'sticky',
				right: 0,
				zIndex: 1,
				boxShadow: 'inset 1px 0px 0px var(--grey-300, #e5e5e5)'
			}
		},
		'.columnRow': {
			display: 'table-row',
			background: 'var(--white-600, #ffffff)',
			'&:hover': {
				background: 'var(--grey-200, #f2f2f2)'
				// background: 'var(--grey-100, #fafafa)'
			}
		}
	}
}));
