import { Button, Icon, Popup } from '../widgets';

import { FilterForm } from '../filter';
import { useGridFilter } from '../../hooks/useGridFilter';

export const GridToolbarFilter: React.FC = () => {
	const { showFilterToolbar, onToggleFilterToolbar } = useGridFilter();

	const handleOnclose = () => {
		showFilterToolbar && onToggleFilterToolbar();
	};

	return (
		<Popup
			open={showFilterToolbar}
			onClose={handleOnclose}
			noPadding
			trigger={
				<Button variant="text" size="small" icon={<Icon name="filter-list" size={14} />}>
					FILTERS
				</Button>
			}
		>
			<FilterForm />
		</Popup>
	);
};
