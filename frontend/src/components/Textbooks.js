import React, {useEffect, useState} from 'react';
import Header from './Header';
import ItemDetails from './ItemDetails'
import axios from 'axios'

export const Textbooks = () => {
  const [items, setItems] = useState([]);
  const urlSearchParams = new URLSearchParams(`?category=textbooks`);

  useEffect(() => {
    axios.get('http://localhost:5003/getTextbooks')
    .then(items => setItems(items.data))
    .catch(err => console.log(err))
  }, [])

  return (
    <>
    <Header /> 
    <div className='items-list'>
      {items && items.map((item)  => (
       <ItemDetails key={item._id} item={item}/>
      ))}
    </div>
    </>
  );
};

