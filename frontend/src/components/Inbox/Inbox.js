import Header from '../Header';
import { Conversation } from '../conversations/Conversation';
import { Message } from '../message/Message';
import "./Inbox.css";
import {useAuth} from "../../context/AuthProvider"; 
import axios from "axios"; 
import React, {useState, useEffect} from "react";

export const Inbox = () => {

    const [convsersations, setConversations] = useState([]); 
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]); 
    const [newMessage, setNewMessage] = useState(""); 

    const {user} = useAuth(); 

    useEffect(() => {
        const getConversations = async () => {

            try {
                const res = await axios.get(`http://localhost:5003/api/conversations/${user._id}`);
                console.log("getConversation data", res.data); 
                setConversations(res.data); 
            } 
            catch (err){
                console.log(err); 
            }
        }; 
        getConversations(); 
    }, [user._id]); 

    useEffect(() => {
        const getMessages = async () =>{
            try{
            const res = await axios.get(`http://localhost:5003/api/messages/${currentChat._id}`); 
            setMessages(res.data); 
            } catch(err){
                console.log(err); 
            }
        }; 
        getMessages(); 
    }, [currentChat]); 

    const handleSubmit =  async (e) => {
        e.preventDefault(); 
        const message = {
            sender: user._id, 
            text: newMessage, 
            conversationId: currentChat._id, 
        }; 

        try {
            const res = await axios.post("http://localhost:5003/api/messages", message); 
            setMessages([...messages, res.data]); 
        }
        catch (error) {
            console.log(error); 
        }
    }; 

    return (
        <div>
            <Header />
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder="Search Chat" className="chatMenuInput"/>
                        {convsersations.map((c) =>(
                            <div onClick={() => setCurrentChat(c)}>
                        <Conversation conversation={c} currentUser={user} />
                        </div>
                        ))}
                    </div>
                </div>
                <div className="chatBox"> 
                <div className="chatBoxWrapper">
                    {
                        currentChat ?
                        <>
                    <div className="chatBoxTop">
                        {messages.map(m=>(
                            <Message message={m} own={m.sender === user._id}/>
                        ))}
                    </div>
                    <div className="chatBoxBottom">
                        <textarea className="chatMessageInput" 
                        placeholder="write something..."
                        onChange={(e)=>setNewMessage(e.target.value)}
                        value={newMessage}>     
                        </textarea>
                        <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
                    </div></> : <span className="noConvoText">open conversation to start talking</span> }
                </div>
                </div>
    
            </div>
        </div>
    )

}