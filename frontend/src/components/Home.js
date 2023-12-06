import React, {useEffect, useState} from 'react';
import { useQuery} from 'react-query'
import Header from './Header';
import ItemDetails from './ItemDetails'
import axios from 'axios'

export const Home = () => {
  const [items, setItems] = useState([]);

  const {isLoading, data } = useQuery('item', () => {
    return axios.get('http://localhost:5003/getItems')
  })

  /*useEffect(() => {
    axios.get('http://localhost:5003/getItems')
    .then(items => setItems(items.data))
    .catch(err => console.log(err))
  }, [])
  */

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  return (
    <>
    <Header /> 
    <div className='items-list'>
     {
      data?.data.map((item) => {
        return <div key={item._id}>{item.title}</div>
      })
     }
    </div>
    </>
  );
};

