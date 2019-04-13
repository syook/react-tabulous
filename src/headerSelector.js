import React from 'react';
import { Button, Popup, List, Icon, Checkbox } from 'semantic-ui-react';

const ColumnList = props => {
  return (
    <>
      {props.columns.map((column, index) => (
        <List key={`hide-selector-list-${index}`}>
          <List.Item>
            <List.Content>
              <Checkbox
                checked={!column.isVisible}
                toggle
                onChange={(e, { checked }) => props.toggleColumns(column.heading, { checked })}
              />{' '}
              <span>{column.heading}</span>
            </List.Content>
          </List.Item>
        </List>
      ))}
    </>
  );
};

const HeaderSelector = props => {
  const hiddenColumnsCount = props.hiddenColumnCount;
  return (
    <div style={{ textAlign: 'left' }}>
      <Popup
        trigger={
          <Button icon color={hiddenColumnsCount ? 'blue' : null}>
            <Icon name="eye slash outline" />{' '}
            {hiddenColumnsCount === 1
              ? '1 hidden field'
              : hiddenColumnsCount >= 1
                ? `${hiddenColumnsCount} hidden fields`
                : 'Hide fields'}
          </Button>
        }
        content={<ColumnList columns={props.columns} toggleColumns={props.toggleColumns} />}
        hoverable
        on="click"
        position="bottom center"
      />
    </div>
  );
};

export default HeaderSelector;
