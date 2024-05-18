
import './index.scss';
import Header from '../../components/Header/Header';
import Flow from '../../components/Flow/Flow';
import Toast from '../../components/Toast/Toast';
import { useState } from 'react';

const Home = () => {
  const [toast, setToast] = useState({ message: '', type: '' });
  const saveFlow = () => {}
  return (
    <div className='chatbot_flow_layout'>
       {toast.message && <Toast message={toast.message} type={toast.type} />}
      <Header saveFlow={saveFlow} />
      <section className='main_layout'>
        <Flow setToast={setToast}/>
      </section>
    </div>
  );
};

export default Home;
