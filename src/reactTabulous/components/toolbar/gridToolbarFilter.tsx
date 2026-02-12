import { DotIndicator, Icon, Popup } from '../widgets';

import ToolbarButton from './toolbarButton';

import { FilterForm } from '../filter';
import { useGridFilter } from '../../hooks/useGridFilter';

export const GridToolbarFilter: React.FC = () => {
  const { filters, showFilterToolbar, onToggleFilterToolbar } = useGridFilter();
  const handleOnclose = () => {
    showFilterToolbar && onToggleFilterToolbar();
  };

  return (
    <Popup
      open={showFilterToolbar}
      onClose={handleOnclose}
      noPadding
      trigger={
        <ToolbarButton variant="text" size="small" icon={<Icon name="filter-list" size={18} />}>
          Filters
          {(filters.length > 1 ||
            (filters.length === 1 &&
              (!!filters[0]?.value || ['is empty', 'is not empty'].includes(filters[0]?.operator)))) && (
            <DotIndicator />
          )}
        </ToolbarButton>
      }
    >
      <FilterForm />
    </Popup>
  );
};
