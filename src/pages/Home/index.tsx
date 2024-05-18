import React from 'react';
import './index.scss';
import Header from '../../components/Header/Header';
import Flow from '../../components/Flow/Flow';

const Home = () => {
  return (
    <div>
      <Header />
      <section className='main_layout'>
        <Flow />
      </section>
    </div>
  );
};

export default Home;
