import { Handle, Node, NodeProps, Position } from 'reactflow';
import './CustomNode.scss';
import { TbMessage } from 'react-icons/tb';
import CustomSourceHandler from '../CustomSourceHandler/CustomSourceHandler';

const CustomNode = (
  props: NodeProps<
    {
      label: string;
    } & Node['data']
  >
) => {
  return (
    <div className='custom_node'>
      <div className='node_wrapper'>
        <div className='top_bar'>
          <TbMessage className='message_icon_small' />
          Send Message
        </div>
        <p className='content'> {props.data.label} </p>
        <Handle className='handle' type='target' position={Position.Left} />
        <CustomSourceHandler
          className='source'
          type='source'
          position={Position.Right}
          connectableNodes={1}
        />
      </div>
    </div>
  );
};

export default CustomNode;
