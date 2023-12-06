import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../context/AuthProvider';
import { useNavigate, useParams } from 'react-router-dom';
import Header from "./Header";
import { Buffer } from 'buffer';

import '../styles/ViewItem.css';

export const ViewItem = () => {
    const [details, setDetails] = useState({});
    const { id } = useParams();
    const user = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const retrieveItem = async () => {
            try {
                const response = await fetch(`http://localhost:5003/api/item/${id}`)
                const responseData = await response.json();
                const base64 = Buffer.from(responseData.image.data).toString('base64');

                setDetails({
                    title: responseData.title,
                    price: responseData.price,
                    description: responseData.description,
                    image: `data:image/png;base64, ${base64}`,
                    condition: responseData.condition,
                    sellerId: responseData.user,
                    sellerName: responseData.user.location
                    // comments: responseData.comments
                    
                });

        } catch (error) {
            console.error('Error with fetching in useEffect', error);
        }
    };
    retrieveItem();
}, [id]);

    const handleMessageButton = async() => {
        navigate('/inbox');
    }



return (
    <div>
    <Header />
    <div className="view-item">
        <div className= "item-image-container">
        <img src={details.image} alt="ItemImage" />
        </div>
        <h2>{details.sellerName}</h2>
        <div className="item-details">
            <div className="details">
                <h2 className='item-title'>{details.title}</h2>
                <p className='item-price'>${details.price}</p>
                <p className='item-condition'>Condition: {details.condition}</p>
                <div className='item-description-container'>
                <div style={{display:"flex"}}>
                <p className='item-description'>Description:  </p>
                <div className='item-description-details'>{details.description}</div>  
                </div>
                </div>
                <Button variant="outline-success" 
                    style={{backgroundColor:"#0000FF", color:"white", borderColor:"#0000FF", width:"150px", height:"58px", fontSize:"30px", justifyContent:"center"}}
                    onClick={handleMessageButton}>
                    Message
                </Button>

            </div>
        </div>
        </div>
    </div>

    
)
};

//export default ViewItem;