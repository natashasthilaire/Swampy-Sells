import "./conversation.css"
import React, {useState, useEffect} from "react";
import axios from "axios"; 

export const Conversation = (conversation, currentUser) => {

    const [user, setUser] = useState(null); 

    useEffect(() => {
        //we are looking for friend !==
        const friendId = conversation.member.find(m=>m !== currentUser._id); 
        //get user info for friends
        const getUser = async() =>{
            try{
                //update: 
                const res = await axios(`http://localhost:5003/api/user/${friendId}`); 
                console.log(res); 
                setUser(res.data); 
            }
            catch(err) {
                console.log(err); 
            }
       }; 
        getUser(); 
    }, [currentUser, conversation]); 

    return (
        <div>
            <div className="conversation"> 
                <img className="conversationImg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF65dDrnV_Acx-_JX7o7pyfh4uYMITFMQi5w&usqp=CAU" alt=""/>
                <span className="conversationName">{user.firstName} {user.lastName} </span>
            </div>
        </div>
    )

}