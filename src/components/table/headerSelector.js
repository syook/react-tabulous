import './headerSelector.css';
import React from 'react';
import { Button, Popup, List, Icon, Checkbox } from 'semantic-ui-react';

const ColumnList = ({ columns, toggleAllColumns, toggleColumns, disabled }) => {
  return (
    <List key={`hide-selector-list`}>
      {(columns || []).map((column, index) => (
        <List.Item key={`hide-selector-list-item-${index}`}>
          <List.Content>
            <Checkbox
              style={{ marginRight: 8 }}
              checked={column.isVisible}
              disabled={disabled}
              onChange={(_e, { checked }) => toggleColumns(column.headerName, { checked })}
            />{' '}
            <span>{column.headerName}</span>
          </List.Content>
        </List.Item>
      ))}
      <List.Item>
        <List.Content>
          <Button compact content="Hide all" size="mini" onClick={() => toggleAllColumns(false)} />
          <Button compact content="Show all" size="mini" onClick={() => toggleAllColumns(true)} />
        </List.Content>
      </List.Item>
    </List>
  );
};

const HeaderSelector = ({ hiddenColumnsCount, columns, toggleColumns, toggleAllColumns, disabled }) => {
  return (
    <div style={{ textAlign: 'left', gridColumn: '1/2', gridRow: 1, alignSelf: 'center' }}>
      <Popup
        trigger={
          <Button
            size="small"
            icon
            disabled={!columns.length}
            style={{
              background: hiddenColumnsCount ? '#3498DB' : 'rgb(109, 180, 226)',
              color: '#fff',
              padding: hiddenColumnsCount ? '0.78em 0.6em 0.78em' : '',
            }}>
            <Icon name="eye slash outline" />{' '}
            {hiddenColumnsCount === 1
              ? '1 hidden column'
              : hiddenColumnsCount >= 1
              ? `${hiddenColumnsCount} hidden columns`
              : 'Hide columns'}
          </Button>
        }
        content={
          <ColumnList
            columns={columns || []}
            toggleColumns={toggleColumns}
            toggleAllColumns={toggleAllColumns}
            disabled={disabled}
          />
        }
        hoverable
        on="click"
        position="bottom center"
        className="selectColumns-btn"
      />
    </div>
  );
};

export default HeaderSelector;
