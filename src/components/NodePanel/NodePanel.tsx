import React from 'react';
import './NodePanel.scss';
import { TbMessage } from 'react-icons/tb';
const NodePanel = () => {
  /*
   * This function handles the start of a drag event for a React Flow node.
   * It sets the dataTransfer object with the node type, which is used to identify
   * the type of node being dragged. This data will be available during the drop event
   * to ensure that the correct type of node is created.
   * Additionally, it sets the effect allowed to 'move', indicating that the dragged
   * element can be moved to a new location.
   */
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className='node_panel'>
      <div
        className='draggable_input'
        onDragStart={(event) => onDragStart(event, 'default')}
        draggable
      >
        <TbMessage className='message_icon' />
        <p>Message</p>
      </div>
    </div>
  );
};

export default NodePanel;
