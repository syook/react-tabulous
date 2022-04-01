import './kebabDropdown.css';
import React from 'react';
import Button from '../button';
import { Popup, List } from 'semantic-ui-react';
const ColumnList = ({ options }) => {
  return (
    <List key={`hide-selector-list`}>
      {(options || []).map((option, index) => (
        <List.Item key={`hide-selector-list-item-${index}`}>
          <List.Content>{option}</List.Content>
        </List.Item>
      ))}
    </List>
  );
};

const KebabDropdown = props => {
  return (
    <div style={{ textAlign: 'left', display: 'inline-block' }}>
      <Popup
        trigger={
          <Button
            variant="outline"
            className="filter-button"
            disabled={props.disabled}
            backgroundColor={props.accentColor}
          >
            <div class="kebab">
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </div>
          </Button>
        }
        content={<ColumnList options={props.options || []} />}
        on="click"
        positionFixed
        position="bottom right"
        className="selectColumns-btn"
      />
    </div>
  );
};

export default KebabDropdown;
