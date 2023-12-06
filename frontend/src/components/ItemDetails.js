import React, {props} from 'react'
import { Link } from 'react-router-dom'
import bookmark from '../bookmark.svg'
import '../App.css'

const ItemDetails = ({item}) => {

  
  return (
    <div className='item-details'>
      <img className='bookmark' src={bookmark} alt=""/>
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
