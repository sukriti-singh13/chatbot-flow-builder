import React from 'react';
import { Handle, Position } from 'reactflow';
import './CustomNode.scss';
import { TbMessage } from 'react-icons/tb';
import CustomHandle from '../CustomHadle/CustomHadle';
const CustomNode = ({ data }) => {
  console.log(data);
  return (
    <div className='custom_node'>
      <CustomHandle className="handle" type='target' position={Position.Left} isConnectable={2} />
      <div className='node_wrapper'>
        <div className='top_bar'>
          <TbMessage className='message_icon_small' />
          Send Message
        </div>
        <p className='content'> {data?.label} </p>
      </div>
      <CustomHandle className="handle"  type='source' position={Position.Right} isConnectable={1} />
    </div>
  );
};

export default CustomNode;
