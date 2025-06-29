import React, { useMemo } from 'react';
import styled from '@emotion/styled';

import { Button, Icon, Input, Popup, Switch, Typography } from '../widgets';

import ToolbarButton from './toolbarButton';

import { useGridColumn } from '../../hooks/useGridColumn';
import { type GridColDef } from '../../models/columnDef/columnDef';
import { isStringIncludes } from '../../helpers/select';

const StyledDiv = styled.div({
  display: 'flex',
  flexDirection: 'column',
  minWidth: 250,
  '& .searchContainer': { margin: 8 },
  '& .columnBody': {
    flex: 1,
    overflowY: 'auto',
    maxHeight: 300,
    padding: '8px 0 8px 8px',
    marginTop: 18
    // verticalAlign: 'middle'
  },
  '& .columnHederRows': {
    display: 'flex',
    alignItems: 'center',
    padding: '4px 8px 4px 4px',
    '> :first-of-type': { marginRight: 10 }
  },
  '.columnFooter': { display: 'flex', justifyContent: 'space-between', padding: 8 }
});

const StyledIndicator = styled.div({
  width: 8,
  height: 8,
  position: 'absolute',
  right: 4,
  top: 0,
  borderRadius: '50%',
  backgroundColor: 'currentColor'
});

export const GridToolbarColumns: React.FC = () => {
  const { columns, showColumnToolbar, onHideColumns, onToggleColumns, onToggleColumnToolbar } = useGridColumn();

  const [searchKey, setSearchKey] = React.useState<string>('');

  const displayColumns = columns.filter((column: GridColDef) => {
    return isStringIncludes(column.headerName, searchKey);
  });

  const isColumnsHidden = useMemo(() => columns.some((col: GridColDef) => !col.isVisible), [columns]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchKey(e.target.value);
  };

  const handleOnclose = () => {
    setSearchKey('');
    showColumnToolbar && onToggleColumnToolbar();
  };

  return (
    <Popup
      open={showColumnToolbar}
      noPadding
      onClose={handleOnclose}
      trigger={
        <ToolbarButton variant="text" size="small" icon={<Icon name="column" size={18} />}>
          Columns
          {isColumnsHidden && <StyledIndicator />}
        </ToolbarButton>
      }
    >
      <StyledDiv>
        <div className="searchContainer">
          <Input
            type="search"
            name="search"
            label="Filter Column"
            placeholder="Search column"
            onChange={handleChange}
          />
        </div>

        <div className="columnBody scrollStyle">
          {displayColumns.map((column: GridColDef) => {
            return (
              <div key={column.field} className="columnHederRows">
                <Switch size={18} checked={column.isVisible ?? false} onChange={() => onHideColumns(column.field)} />
                <Typography>{column.headerName}</Typography>
              </div>
            );
          })}
        </div>

        <div className="columnFooter">
          <Button variant="text" size="small" onClick={() => onToggleColumns(false)}>
            Hide All
          </Button>
          <Button variant="text" size="small" onClick={() => onToggleColumns(true)}>
            Show All
          </Button>
        </div>
      </StyledDiv>
    </Popup>
  );
};
