import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import Header from "./Header";
import { Buffer } from 'buffer';
import { useItemDetails } from '../context/ItemProvider';
import axios from "axios"
import { useAuth } from "../context/AuthProvider";

import '../styles/ViewItem.css';

export const ViewItem = () => {
    const [details, setDetails] = useState({});
    const { id } = useParams();
    const { itemDetails } = useItemDetails();
    const navigate = useNavigate();
    const { user } = useAuth();

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
                    sellerId: responseData.user
                    // comments: responseData.comments
                });
                console.log(responseData.image)
                console.log(responseData.image.data);



            } catch (error) {
                console.error('Error with fetching in useEffect', error);
            }
        };
        retrieveItem();
    }, [id]);

    // const sleep = (time) => {
    //     return new Promise(resolve => setTimeout(resolve, time))
    // }
    const handleMessageButton = async () => {
        console.log(details.sellerId);
        // await sleep(2000);
        itemDetails({ sellerId: details.sellerId })
        console.log(details.sellerId);

        //get conversations
        var conversations = []; 
        try {
            const res = await axios.get(`http://localhost:5003/api/conversations/${user._id}`);
            console.log("ViewItem: from response", res.data);
            conversations = res.data; 
            console.log("conversations in try statment: ", conversations);
            //setConversations(res.data);
            //console.log("conversations after getting them: ", conversations)
            //return res; 
        }
        catch (err) {
            console.log(err);
        }

        //check if conversation is already present with the seller
        let present = false; 
        conversations.map((c) => {
            if(c.members.includes(details.sellerId)) {present = true;} 
        }); 
        //add if not present
        if(present === false)
        {
            //make post request with conversation
            try {
                const res2 = await axios.post("http://localhost:5003/api/conversations", {"senderId": user._id,"receiverId": details.sellerId,});
            }
            catch(err) {
                console.log(err); 
            }
        }
        
        navigate('/inbox');

    }



    return (
        <div>
            <Header />
            <div className="view-item">
                <div className="item-image-container">
                    <img src={details.image} alt="ItemImage" />
                </div>
                <div className="item-details">
                    <div className="details">

                        <h2 className='item-title'>{details.title}</h2>
                        <p className='item-price'>${details.price}</p>
                        <div className='item-description-container'>
                            <p className='item-description'>Description:  </p>
                            <div className='item-description-details'>{details.description}</div>
                        </div>
                        <Button variant="outline-success"
                            style={{ backgroundColor: "#0000FF", color: "white", borderColor: "#0000FF" }}
                            onClick={handleMessageButton}>
                            Message
                        </Button>

                    </div>
                </div>
                {/* <Button variant="outline-success" style={{backgroundColor:"#0000FF", color:"white", borderColor:"#0000FF"}}>Search</Button> */}
            </div>
        </div>


    )
};

//export default ViewItem;