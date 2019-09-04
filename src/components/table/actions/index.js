import './actions.css';

import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const TableActions = ({ actions, row, actionOnHover }) => {
  return (
    <div
      className={`table-actions ${actionOnHover ? 'onHoverActions' : null}`}
      style={{
        display: actionOnHover ? 'none' : 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        whiteSpace: 'nowrap',
      }}>
      {(actions || []).map((action, index) => {
        if (typeof action.isVisible === 'function' && !action.isVisible(row)) {
          return null;
        }
        return action.hasCustomComponent ? (
          action.customComponent(row)
        ) : (
          <Button
            icon
            className={action.className || ''}
            size={action.size || 'small'}
            inverted={typeof action.inverted === 'function' && action.inverted(row)}
            key={`TableActions-${index}`}
            onClick={() => typeof action.function === 'function' && action.function(row)}
            color={action.color || null}
            disabled={typeof action.isDisabled === 'function' && action.isDisabled(row)}
            loading={typeof action.isLoading === 'function' && action.isLoading(row)}
            // style={{ action.color && action.color[0] === "#" ? background: action.color || '#5DA1CD': {} }}
          >
            <Icon
              className={action.iconClassName || ''}
              name={action.icon}
              color={typeof action.iconColor === 'function' && action.iconColor(row)}
              inverted={action.iconInverted || false}
            />{' '}
            {action.name}
          </Button>
        );
      })}
    </div>
  );
};

export default TableActions;
