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
      trigger={renderIcons(props.IconName, props.WoStatus, props.IconColor)}
      content={props.content}
      position={props.position || 'top left'}
    />
  );
};

export default WoStatus;
