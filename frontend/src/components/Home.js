import React, {useEffect, useState} from 'react';
import Header from './Header';
import '../App.css'

export const Home = () => {
  return (
    <div >
    <Header />
    <div className='items'>
      {items && items.map((item) => {
        <p key={item._id}>{item.title}</p>
      })}
    </div>
    </div>
    
  );
  
};

