import styled from '@emotion/styled';

import { Icon, Popup } from '../widgets';

import ToolbarButton from './toolbarButton';

import { FilterForm } from '../filter';
import { useGridFilter } from '../../hooks/useGridFilter';

const StyledIndicator = styled.div({
  width: 8,
  height: 8,
  position: 'absolute',
  right: 4,
  top: 0,
  borderRadius: '50%',
  backgroundColor: 'currentColor'
});

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
            <StyledIndicator />
          )}
        </ToolbarButton>
      }
    >
      <FilterForm />
    </Popup>
  );
};
