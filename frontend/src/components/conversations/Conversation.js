import "./conversation.css"
import React, {useState, useEffect} from "react";
import axios from "axios"; 

export const Conversation = ({conversation, currentUser}) => {

    const [user, setUser] = useState(null); 

    useEffect(() => {
        const friendId = conversation.members.find((m) => m !== currentUser._id); 
        //get user info for friends to display name
        const getUser = async() =>{
            try{
                //update: 
                console.log("Conversation.js request: http://localhost:5003/api/user/" + friendId)
                const res = await axios("http://localhost:5003/api/user/" + friendId); 
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
                <span className="conversationName"> {user?.firstName} { user?.lastName}</span>
            </div>
        </div>
    )

}