import './actions.css';

import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const TableActions = ({ actions, row }) => {
  return (
    <div className="table-actions" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {(actions || []).map((action, index) =>
        typeof action.isVisible === 'function' && action.isVisible(row) ? (
          <Button
            icon
            key={`TableActions-${index}`}
            onClick={() => typeof action.function === 'function' && action.function(row)}
            size="small"
            disabled={typeof action.isDisabled === 'function' && action.isDisabled(row)}
            loading={typeof action.isLoading === 'function' && action.isLoading(row)}
            style={{ background: action.color || '#5DA1CD' }}>
            <Icon name={action.icon} /> {action.name}
          </Button>
        ) : null
      )}
    </div>
  );
};

export default TableActions;
