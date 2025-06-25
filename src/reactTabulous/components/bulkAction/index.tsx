import { type FC } from 'react';
import styled from '@emotion/styled';

import { Button, Typography } from '../widgets';
import { type GridRowId } from '../../models';
import { useGridRowSelection } from '../../hooks/useGridRowSelection';

const GridBulkActionContainer = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: 8,
  padding: '16px 12px 14px',
  button: {
    textTransform: 'capitalize'
  }
});

interface BulkActionsProps {
  selectedRows: GridRowId[];
  bulkActions: any;
  onBulkActionClick: (action: any, selectedRows: GridRowId[], resetSelectedRows: () => void) => void;
}

export const BulkActions: FC<BulkActionsProps> = ({ selectedRows, bulkActions, onBulkActionClick }) => {
  const { resetSelectedRows } = useGridRowSelection();
  return (
    <GridBulkActionContainer>
      <Typography variant="h4" style={{ marginLeft: 5 }}>
        {selectedRows.length} Selected
      </Typography>
      {bulkActions.map((action: any) => {
        if (typeof action === 'string') {
          return (
            <Button
              size="small"
              key={action}
              variant="contained"
              onClick={e => {
                onBulkActionClick(action, selectedRows, resetSelectedRows);
              }}
            >
              {action}
            </Button>
          );
        } else {
          return action;
        }
      })}
    </GridBulkActionContainer>
  );
};
