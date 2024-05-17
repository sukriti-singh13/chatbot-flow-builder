import React from 'react';
import './NodePanel.scss';
import { TbMessage } from 'react-icons/tb';
const NodePanel = () => {
  return (
    <div className='node_panel'>
      <button>
        <TbMessage className='message_icon'/>
        <p>Message</p>
      </button>
    </div>
  );
};

export default NodePanel;
