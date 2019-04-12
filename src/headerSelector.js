import React from 'react';
import { Button, Popup, List, Icon, Checkbox } from 'semantic-ui-react'


const ColumnList = (props) => {
  return(
    <>
      {props.columns.map((column) => (
        <List>
          <List.Item>
            <Checkbox checked={!column.isVisible} toggle onChange={(e, {checked}) => props.toggleColumns(column.heading, {checked})}/>
            <List.Content>{column.heading}</List.Content>
          </List.Item>
        </List>
      ))}
    </>
  )
}

const HeaderSelector = (props) => {
  return(
      <div style={{textAlign: 'left'}}>
        <Popup
          trigger={<Button icon> <Icon name='eye' /> {props.hiddenColumnCount} hidden feilds </Button>}
          content={<ColumnList columns={props.columns} toggleColumns={props.toggleColumns}/>}
          hoverable
        />
      </div>
  );
}

export default HeaderSelector;
