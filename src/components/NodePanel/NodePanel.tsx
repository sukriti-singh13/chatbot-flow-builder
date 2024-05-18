import React from 'react';
import './NodePanel.scss';
import { TbMessage } from 'react-icons/tb';
const NodePanel = () => {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType:string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className='node_panel'>
      <div className='draggable_input' onDragStart={(event) => onDragStart(event, 'default')} draggable>
        <TbMessage className='message_icon'/>
        <p>Message</p>
      </div>
    </div>
  );
};

export default NodePanel;
