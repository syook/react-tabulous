import styled from '@emotion/styled';

import { Button, Icon, Popup } from '../widgets';

import { FilterForm } from '../filter';
import { useGridFilter } from '../../hooks/useGridFilter';

const StyledIndicator = styled.div({
  width: 10,
  height: 10,
  position: 'absolute',
  right: 5,
  top: 2,
  borderRadius: '50%',
  backgroundColor: 'var(--blue-500, #007bff)'
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
        <Button variant="text" size="small" icon={<Icon name="filter-list" size={14} />}>
          FILTERS
          {filters.length >= 1 && !!filters[0]?.value && <StyledIndicator />}
        </Button>
      }
    >
      <FilterForm />
    </Popup>
  );
};
