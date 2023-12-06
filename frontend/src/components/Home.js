import React, {useEffect, useState} from 'react';
import { useQuery} from 'react-query'
import Header from './Header';
import ItemDetails from './ItemDetails'
import axios from 'axios'

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
   
    return (
    <>
    <Header/>
    <h1>Loading...</h1>
    </>
    )
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

