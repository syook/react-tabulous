import './kebabDropdown.css';
import React from 'react';
import Button from '../button';
import { Popup, List } from 'semantic-ui-react';

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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.3333 8.66667C13.0693 8.66667 13.6667 8.06933 13.6667 7.33333C13.6667 6.59733 13.0693 6 12.3333 6C11.5973 6 11 6.59733 11 7.33333C11 8.06933 11.5973 8.66667 12.3333 8.66667ZM12.3333 10.6667C11.5973 10.6667 11 11.264 11 12C11 12.736 11.5973 13.3333 12.3333 13.3333C13.0693 13.3333 13.6667 12.736 13.6667 12C13.6667 11.264 13.0693 10.6667 12.3333 10.6667ZM11 16.6667C11 15.9307 11.5973 15.3333 12.3333 15.3333C13.0693 15.3333 13.6667 15.9307 13.6667 16.6667C13.6667 17.4027 13.0693 18 12.3333 18C11.5973 18 11 17.4027 11 16.6667Z"
                fill="#231F20"
              />
            </svg>
          </Button>
        }
      />
    </div>
  );
};

export default KebabDropdown;
