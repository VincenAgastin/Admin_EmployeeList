import React from 'react';
import '../homepg/HomePg.css';

const HomePg = () => {
  return (
    <div className='homecontainer bg-gradient-to-r from-purple-500 to-purple-700'>
      <h1 className='text-3xl font-bold mb-6 dash'>Dashboard</h1>
      <div className="homecontent flex items-center justify-center">
        <h1 className='text-3xl font-semibold '>Hi Welcome to Admin portal</h1>
      </div>
    </div>
  );
}

export default HomePg;
