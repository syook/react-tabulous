import { Icon, Menu, MenuItem, Popup } from '../widgets';
import ToolbarButton from './toolbarButton';
import { useGridDensity } from '../../hooks/useGridDensity';

export const GridToolbarDensity: React.FC = () => {
  const { density, onChangeDensity } = useGridDensity();
  return (
    <Popup
      noPadding
      trigger={
        <ToolbarButton variant="text" size="small" icon={<Icon name="density" size={20} />}>
          Density
        </ToolbarButton>
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
