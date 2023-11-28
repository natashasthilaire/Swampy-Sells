import { useContext } from 'react';
import Header from '../Header';
import { Conversation } from '../conversations/Conversation';
import { Message } from '../message/Message';
import "./Inbox.css";
//import { useAuth } from '../../context/AuthProvider';

/*
import React, { useState, useEffect } from "react";
import Header from "./Header"
import io from "socket.io-client";
import axios from 'axios';

export const Inbox = () => {

    const [message, setMessage] = useState(""); //so we can grab what users is typing on input
    //const [currentMessage, setCurrentMessage] = useState([]);
    const [messageReceived, setMessageReceived] = useState("");
    const [users, setUserList] = useState([]);
    const socket = io.connect('http://localhost:5003'); // Replace with your backend server URL

    //useEffect is how we listen to messages
    //this hook will be called when we recieve a message
    useEffect(() => {
        // Connect to the server and listen for incoming messages
        socket.on('receive_message', (message) => {
            //setMessages([...messages, message]);
            setMessageReceived(message.content);
        });

        //workaround for socketio: 
        //emitting a message from frontend can only be emmitted to backend
        //1. emit message to backend
        //2. backend will listen to event emitted in frontend
        //3. then emit data from backend to another event that is listening in the frontend
        return () => {
            socket.disconnect();
        };
    }, [socket]); //pass socket var inside dependents list in useEffect

    //useEffect for getting users
    // useEffect(async () => {
    //     const response = await fetch('http://localhost:5003/api/user'); 
    //     users = await response.json(); 
    //     //fetch users from api
    //     /*
    //     axios.get('/api/user')
    //     .then(response => {
    //         setUserList(response.data); 
    //     })
    //     .catch(err => {
    //         console.error('Error fetching users:', err); 
    //     }); 
    //     */
// }, []); 

//we want to emit message here
/*
const messageSchema = new mongoose.Schema({
    sender: String,
    content: String,
    timestamp: {
        type: Date,
        default: Date.now,
    },
});


const sendMessage = () => {
    if (message.trim() !== '') {
        const date = new Date();
        const messageObject = {
            sender: 'User', // Replace with actual user identification
            content: message,
            timestamp: { date }
        };
        // Emit the message to the server
        socket.emit('send_message', messageObject);
        setMessage('');
    }
};


return (
    <div>
        <Header />
        <div>
            <h1>Users:
                <ul>
                    {users.map(user => (
                        <li key={user._id}>
                            <h1> Name: {user.firstName}</h1>
                        </li>
                    ))}
                </ul>
            </h1>
        </div>
        <h1>Chat</h1>
        <div>
            {/* {messages.map((message, index) => (
                    <div key={index}>
                        <strong>{message.sender}: </strong>
                        {message.content}
                    </div>
                ))} }
        </div>
        <div>
            <input
                type="text"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
            <h1>Message: </h1> {messageReceived}
        </div>
    </div>
);
};

*/


export const Inbox = () => {

    //const {user} = useContext(useAuth); 
    //console.log(user); 

    return (
        <div>
            <Header />
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder="Search Chat" className="chatMenuInput"></input>
                        <Conversation />
                        <Conversation />
                        <Conversation />
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

