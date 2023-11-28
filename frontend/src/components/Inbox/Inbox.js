import Header from '../Header';
import { Conversation } from '../conversations/Conversation';
import { Message } from '../message/Message';
import "./Inbox.css";
import {useAuth} from "../../context/AuthProvider"; 
import axios from "axios"; 
import React, {useState, useEffect} from "react";




export const Inbox = () => {

    const [convsersations, setConversations] = useState([]); 

    const {user} = useAuth(); 
    console.log(user); 

    useEffect(() => {
        const getConversations = async () => {

            try {
                const res = await axios.get(`http://localhost:5003/api/conversations/${user._id}`);
                setConversations(res.data); 
            } 
            catch (err){
                console.log(err); 
            }
        }; 
        getConversations(); 
    }, [user._id]); 

    return (
        <div>
            <Header />
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder="Search Chat" className="chatMenuInput"></input>
                        {convsersations.map(c =>(<Conversation conversation= {c} currentUser={user} />)
                        )}
                    </div>
                </div>
                <div className="chatBox"> 
                <div className="chatBoxWrapper">
                    <div className="chatBoxTop">
                    <Message/>
                    <Message own={true}/>
                    <Message/>
                    </div>
                    <div className="chatBoxBottom">
                        <textarea className="chatMessageInput" placeholder="write something..."></textarea>
                        <button className="chatSubmitButton">Send</button>
                    </div>
                </div>
                </div>
    
            </div>
        </div>
    )

}