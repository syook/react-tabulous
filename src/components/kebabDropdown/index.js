import './kebabDropdown.css';
import React from 'react';
import { Popup, List } from 'semantic-ui-react';

import Button from '../button';
import Icon from '../icon';

const ColumnList = ({ options = [] }) => {
  return (
    <div style={{ maxHeight: 300, overflow: 'auto' }}>
      <List key={`hide-selector-list`}>
        {options.map((option, index) => (
          <List.Item key={`hide-selector-list-item-${index}`}>
            <List.Content>{option}</List.Content>
          </List.Item>
        ))}
      </List>
    </div>
  );
};

const KebabDropdown = props => {
  return (
    <div className="rt-KebabDropdown">
      <Popup
        basic
        on="click"
        positionFixed
        position="bottom left"
        className="selectColumns-btn"
        content={<ColumnList options={props.options || []} />}
        trigger={
          <Button
            variant="outline"
            className="kebab-filter-button"
            disabled={props.disabled}
            backgroundColor={props.accentColor}
          >
            <Icon name="kebab" />
          </Button>
        }
      />
    </div>
  );
};

export default KebabDropdown;
