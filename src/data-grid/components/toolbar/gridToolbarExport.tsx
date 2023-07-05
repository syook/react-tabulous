import { Button, Icon, Menu, MenuItem, Popup } from '../widgets';
import { useGridExport } from '../../hooks/useGridExport';

export const GridToolbarExport: React.FC = () => {
	const { handleExport, filteredAndSortedData, columns, searchText, customExport } = useGridExport();

	const handleDataExport = (type: string) => {
		handleExport(type);
	};

	return (
		<>
			{customExport ? (
				<Button
					variant="text"
					size="small"
					icon={<Icon name="download" size={14} />}
					onClick={() => customExport(filteredAndSortedData, searchText, columns)}
				>
					EXPORT
				</Button>
			) : (
				<Popup
					noPadding
					trigger={
						<Button variant="text" size="small" icon={<Icon name="download" size={14} />}>
							EXPORT
						</Button>
					}
				>
					<Menu>
						<MenuItem
							label="Download as CSV"
							onClick={() => {
								handleDataExport('csv');
							}}
						/>
						<MenuItem
							label="Download as Excel"
							onClick={() => {
								handleDataExport('xlsx');
							}}
						/>
					</Menu>
				</Popup>
			)}
		</>
	);
};
