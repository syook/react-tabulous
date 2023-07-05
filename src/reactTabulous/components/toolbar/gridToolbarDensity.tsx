import { Button, Icon, Menu, MenuItem, Popup } from '../widgets';
import { useGridDensity } from '../../hooks/useGridDensity';

export const GridToolbarDensity: React.FC = () => {
	const { density, onChangeDensity } = useGridDensity();
	return (
		<Popup
			noPadding
			trigger={
				<Button variant="text" size="small" icon={<Icon name="density" size={18} />}>
					DENSITY
				</Button>
			}
		>
			<Menu>
				<MenuItem
					icon="compact"
					label="Compact"
					selected={density === 'compact'}
					onClick={() => onChangeDensity('compact')}
				/>
				<MenuItem
					icon="standard"
					label="Standard"
					selected={density === 'standard'}
					onClick={() => onChangeDensity('standard')}
				/>
				<MenuItem
					icon="comfortable"
					label="Comfortable"
					selected={density === 'comfortable'}
					onClick={() => onChangeDensity('comfortable')}
				/>
			</Menu>
		</Popup>
	);
};
