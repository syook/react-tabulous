import './bulkActionDropdown.css';

import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const BulkActionList = props => {
  return (
    <Dropdown
      text={`Bulk Action (${(props.selectedRows || []).length} selected)`}
      button
      style={{ gridColumn: '4/6', alignSelf: 'center' }}
      className="icon bulk-action right labeled">
      <Dropdown.Menu>
        {(props.bulkActions || []).map((action, index) => (
          <Dropdown.Item
            key={`BulkActionList-${index}`}
            text={action.action}
            onClick={() => action.function(props.selectedRows)}
          />
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default BulkActionList;
