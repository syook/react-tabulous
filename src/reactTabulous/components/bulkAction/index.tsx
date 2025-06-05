import { type FC } from 'react';
import styled from '@emotion/styled';

import { Button, Typography } from '../widgets';
import { type GridRowId } from '../../models';

const GridBulkActionContainer = styled.div({
  gap: 4,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  padding: '4px 4px 0',
  button: {
    textTransform: 'capitalize'
  }
});

interface BulkActionsProps {
  selectedRows: GridRowId[];
  bulkActions: any;
  onBulkActionClick: (action: any, selectedRows: GridRowId[]) => void;
}

export const BulkActions: FC<BulkActionsProps> = ({ selectedRows, bulkActions, onBulkActionClick }) => {
  return (
    <GridBulkActionContainer>
      <Typography variant="subheading1">{selectedRows.length} Selected</Typography>
      {bulkActions.map((action: any) => {
        if (typeof action === 'string') {
          return (
            <Button
              size="small"
              key={action}
              variant="text"
              onClick={e => {
                onBulkActionClick(action, selectedRows);
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
