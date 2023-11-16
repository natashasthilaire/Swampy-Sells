import React, {useEffect, useState} from 'react';
import Header from './Header';
import '../App.css'

const Home = () => {
  const [items, setItems] = useState(null);

  /*useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch('http://localhost:3001/items');
      const json = await response.json()

      if (response.ok) {
        setItems(json);
      }
    }
    fetchItems();
  }, [])

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
  */
};

export default Home;