import './index.scss';
import Header from '../../components/Header/Header';
import Flow from '../../components/Flow/Flow';
import Toast from '../../components/Toast/Toast';
import { useState } from 'react';
import { useEdgesState, useNodesState } from 'reactflow';
import { isFlowValid } from '../../utils/helpers';

const Home = () => {
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | '';
  }>({ message: '', type: '' });
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const saveFlow = () => {
    if (isFlowValid(nodes, edges)) {
      setToast({ message: 'Flow saved successfully', type: 'success' });
    } else {
      setToast({ message: 'Cannot save flow', type: 'error' });
    }
    const toastTimeout = setTimeout(() => {
      setToast({ message: '', type: '' });
    }, 3000);
    return () => {
      clearInterval(toastTimeout);
    };
  };
  return (
    <div className='chatbot_flow_layout'>
      {toast.message && <Toast message={toast.message} type={toast.type} />}
      <Header saveFlow={saveFlow} />
      <section className='main_layout'>
        <Flow
          nodes={nodes}
          setNodes={setNodes}
          onNodesChange={onNodesChange}
          edges={edges}
          setEdges={setEdges}
          onEdgesChange={onEdgesChange}
        />
      </section>
    </div>
  );
};

export default Home;
