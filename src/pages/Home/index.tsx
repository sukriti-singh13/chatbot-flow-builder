import React from 'react';
import './index.scss';
import Header from '../../components/Header/Header';
import Flow from '../../components/Flow/Flow';
import NodePanel from '../../components/NodePanel/NodePanel';
const Home = () => {
  return (
    <div>
      <Header />
      <section className='main_layout'>
        <div className='left_panel'>
        <Flow />
        </div>
      
        <div className='right_panel'>
        <NodePanel />
        </div>
       
      </section>
    </div>
  );
};

export default Home;
