import React, {useEffect, useState} from 'react';
import Header from './Header';
import ItemDetails from './ItemDetails'
import axios from 'axios'
import { useQuery } from 'react-query';

export const Home = () => {
  const query = useQuery({
    queryKey: ['getItems'],
    queryFn: async () => {
      const { data } = await axios.get(
        'http://localhost:5003/getItems'
      )
      return data
    },
  })

  if (query.isLoading) {
    return "Loading ... "
  }

  return (
    <>
    <Header /> 
    <div className='items-list'>
      {query.isFetched && query.data.map((item) => (
       <ItemDetails key={item._id} item={item}/>
      ))}
    </div>
    </>
  );
};

