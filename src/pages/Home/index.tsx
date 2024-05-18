import './index.scss';
import Header from '../../components/Header/Header';
import Flow from '../../components/Flow/Flow';
import Toast from '../../components/Toast/Toast';
import { useState } from 'react';
import { useEdgesState, useNodesState } from 'reactflow';

const Home = () => {
  const [toast, setToast] = useState({ message: '', type: '' });
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const saveFlow = () => {
    if (nodes.length < 2 || nodes.length - 1 !== edges.length) {
      setToast({ message: 'Cannot save flow', type: 'error' });
    } else {
      setToast({ message: 'Flow saved successfully', type: 'success' });
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
