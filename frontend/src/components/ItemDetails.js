import React, {props} from 'react'
import { Link } from 'react-router-dom'
import bookmark from '../bookmark.svg'
import { useEffect, useState } from "react";
import {BookmarkBorder, Bookmark} from '@mui/icons-material';
import axios from "axios";
import { useAuth } from '../context/AuthProvider';
import '../App.css'

const ItemDetails = ({item}) => {
  const { user } = useAuth(); // get the current user
  const [bookmarked, setBookmarked] = useState(item.bookmarkedBy?.includes(user._id));

  const handleBookmark = async () => {
    try {
      if (bookmarked) {
        console.log("unbookmarking item");
        const response = await axios.patch(`http://localhost:5003/api/item/unbookmark/${item._id}`, {
          userId: user._id,
        }, { timeout: 600000}
        );

        console.log(response);
        if (response.status === 200) {
          console.log("Successfully unbookmarked item");
          setBookmarked(false);
          item = response.data;
        }
      } else {
        const response = await axios.patch(`http://localhost:5003/api/item/bookmark/${item._id}`, {
          userId: user._id,
        }, { timeout: 600000});

        if (response.status === 200) {
          console.log("Successfully bookmarked item");
          setBookmarked(true);
          item.bookmarkedBy.push(user._id);
          item = response.data;
        }
      }
    } catch (error) {
      console.error(error);
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
