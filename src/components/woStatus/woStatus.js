import React from 'react';
import { Icon, Popup } from 'semantic-ui-react';

const renderIcons = (IconName, WoStatus, IconColor) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Icon name={IconName} color={IconColor} /> <span style={{ marginLeft: '2px' }}>{WoStatus}</span>
    </div>
  );
};

const WoStatus = props => {
  return (
    <Popup
      trigger={renderIcons(
        props.showWorkOrderStatus.IconName,
        props.showWorkOrderStatus.WoStatus,
        props.showWorkOrderStatus.IconColor
      )}
      content={props.showWorkOrderStatus.content}
      position={props.showWorkOrderStatus.position || 'top left'}
    />
  );
};

export default WoStatus;
