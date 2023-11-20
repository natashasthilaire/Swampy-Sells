import React, { useState, useEffect } from "react";

import io from "socket.io-client";

export const Inbox = () => {

    const [message, setMessage] = useState(""); //so we can grab what users is typing on input
    //const [currentMessage, setCurrentMessage] = useState([]);
    const [messageReceived, setMessageReceived] = useState(""); 
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
        */
        
    const sendMessage = () => {
        if (message.trim() !== '') {
            const date = new Date(); 
            const messageObject = {
                sender: 'User', // Replace with actual user identification
                content: message,
                timestamp: {date}
            };
            // Emit the message to the server
            socket.emit('send_message', messageObject);
            setMessage('');
        }
    };

    return (
        <div>
            <h1>Real-time Chat</h1>
            <div>
                {/* {messages.map((message, index) => (
                    <div key={index}>
                        <strong>{message.sender}: </strong>
                        {message.content}
                    </div>
                ))} */}
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


