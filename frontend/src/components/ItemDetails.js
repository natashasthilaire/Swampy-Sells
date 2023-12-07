import React, {props} from 'react'
import { Link } from 'react-router-dom'
import bookmark from '../bookmark.svg'
import '../App.css'
import { useEffect, useState } from "react";
import { useAuth } from '../context/AuthProvider';
import axios from 'axios';
import {BookmarkBorder, Bookmark} from '@mui/icons-material';
import { toast } from 'react-toastify';

const ItemDetails = ({item}) => {
  const { user } = useAuth();
  const [bookmarked, setBookmarked] = useState(item.bookmarkedBy?.includes(user?._id));

  const handleBookmark = async () => {
    try {
      const bookmarkingRes = await axios.put(`http://localhost:5003/api/bookmarkItem/${item._id}`, {
        userId: user?._id
      });
  
      if (!bookmarkingRes) {
        console.log("Error bookmarking item");
        return;
      }

      const data = await bookmarkingRes.data;
      console.log(data);
      setBookmarked(!bookmarked);
      toast.success(bookmarked ? "Item unbookmarked!" : "Item bookmarked!");
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <div className='item-details'>
      {bookmarked ? <Bookmark className='bookmark' onClick={handleBookmark} /> : <BookmarkBorder className='bookmark' onClick={handleBookmark} />}
      <Link to={`/item/${item._id}`}>
          <img className="home-img" style={{marginTop: "15px"}}src={item.image}></img>
           <h5 style={{marginTop:"10px", width:"200px"}}>{item.title}</h5>
        </Link>
      <p style={{marginTop:"-10px", fontSize:"20px"}}>{"$" + item.price}</p> 
      <h5 style={{marginTop:"-20px", fontSize:"20px"}}>{item.location}</h5>
       
    </div>
  )
}

export default ItemDetails;
