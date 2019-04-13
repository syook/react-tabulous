import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const findColor = action => {
  switch (action) {
    case 'Edit':
      return 'yellow';
    case 'Delete':
      return 'red';
    default:
      return '';
  }
};

const TableActions = props => {
  return (
    <div>
      {props.actions.map(
        (action, index) =>
          typeof action.show === 'function' && action.show(props.row) ? (
            <Button
              key={index}
              icon
              // color={findColor(action.action)} // Parent need to pas color, if needed to display
              onClick={() => action.function([props.ids])}
              size="medium">
              <Icon name={action.icon} /> {action.action}
            </Button>
          ) : null
      )}
    </div>
  );
};

export default TableActions;
