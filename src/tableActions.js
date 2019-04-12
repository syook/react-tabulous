import React from 'react';
import { Button } from 'semantic-ui-react'

const findColor = (action) => {
  switch (action) {
    case 'Edit': return 'yellow';
    case 'Delete': return 'red';
    default: return ''
  }
}

const TableActions = (props) =>  {
  return (
    <div>
      {props.actions.map((action, index) => (
        (typeof action.show === 'function') && action.show(props.row) ?
        <Button key={index} color={findColor(action.action)} onClick={() => action.function([props.ids])}>
          {action.action}
        </Button> : null
      ))}
    </div>
  )
}

export default TableActions;
