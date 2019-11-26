import './bulk-action-dropdown.css';

import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const BulkActionList = props => {
  return (
    <Dropdown
      text={`Bulk Action (${(props.selectedRows || []).length} selected)`}
      button
      className="icon bulk-action right labeled">
      <Dropdown.Menu>
        {(props.bulkActions || [])
          .filter(a => a.isVisible !== false)
          .map((action, index) => (
            <Dropdown.Item
              key={`BulkActionList-${index}`}
              text={action.name}
              onClick={() => action.function(props.selectedRows)}
            />
          ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default BulkActionList;
