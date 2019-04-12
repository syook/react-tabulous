import React from 'react';
import {Dropdown } from 'semantic-ui-react';

const BulkActionList = (props) => {
  return (
    <>
      <Dropdown text= {`Bulk Action (${props.selectedRows.length} selected)`}>
      <Dropdown.Menu>
        {props.bulkActions.map((action) => (
          <Dropdown.Item text={action.action}  onClick={() => action.function(props.selectedRows)}/>
        ))}
      </Dropdown.Menu>
    </Dropdown>
    </>
  )
}

export default BulkActionList;
