import React, {props} from 'react'
import { Buffer } from 'buffer'
import { useAuth } from '../context/AuthProvider';
import axios from "axios";
import '../App.css'
import {BookmarkBorder, Bookmark} from '@mui/icons-material';

const ItemDetails = ({item}) => {
  const { user } = useAuth(); // get the current user
  let isBookmarkedByUser = item.bookmarkedBy?.includes(user._id);

  const handleBookmark = async () => {
    try {
      if (isBookmarkedByUser) {
        const response = await axios.patch(`http://localhost:5003/api/item/unbookmark/${item._id}`, {
          userId: user._id,
        }, { timeout: 600000}
        );

        if (response.status === 200) {
          console.log("Successfully unbookmarked item");
          isBookmarkedByUser = false;
          item = response.data;
        }
      } else {
        const response = await axios.patch(`http://localhost:5003/api/item/bookmark/${item._id}`, {
          userId: user._id,
        }, { timeout: 600000});

        if (response.status === 200) {
          console.log("Successfully bookmarked item");
          isBookmarkedByUser = true;
          item.bookmarkedBy.push(user._id);
          item = response.data;
        }
      }

    } catch (error) {
      console.error(error);
    }
    console.log(item);
  }

  return (
    <div className='item-details'>
      {isBookmarkedByUser ? <Bookmark className='bookmark' onClick={handleBookmark} /> : <BookmarkBorder className='bookmark' onClick={handleBookmark} />}
      <img className="home-img" style={{marginTop: "15px"}}src={`data:image/jpeg;base64,${Buffer.from(item.image).toString('base64')}`}></img>
      <h5 style={{marginTop:"10px", width:"200px"}}>{item.title}</h5>
      <p style={{marginTop:"-10px", fontSize:"20px"}}>{"$" + item.price}</p> 
      <h5 style={{marginTop:"-20px", fontSize:"20px"}}>{item.location}</h5> 
    </div>
  )
}

export default ItemDetails;
