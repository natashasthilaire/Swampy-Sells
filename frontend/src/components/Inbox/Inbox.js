import Header from '../Header';
import { Conversation } from '../conversations/Conversation';
import { Message } from '../message/Message';
import "./Inbox.css";
import { useAuth } from "../../context/AuthProvider";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
//accessing seller ID; 
import { useItemDetails } from '../../context/ItemProvider';

export const Inbox = () => {

    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null); //currentChat holds data bout currentChat
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState(null); //new message that user types
    const [arrivalMessage, setArrivalMessage] = useState(null); //new incoming message from other user
    const socket = useRef();
    const scrollRef = useRef();
    const { user } = useAuth();
    //seller ID: 
    const { itemData } = useItemDetails(); 


    /*
    useEffect(() => {
        socket.current = io("ws://localhost:8900"); 
        socket.current.on("getMessage", data => {
            setArrivalMessage({
                sender: data.senderId, 
                text: data.text, 
                createdAt: Date.now(),
            }); 
        }); 
    }, []); 
    */

    //if there are changes in arrival messages, update
    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    /*
    useEffect(() =>{
        socket.current.emit("addUser", user._id); 
        socket.current.on("getUsers", (users) => {
            console.log(users); 
        }); 
    }, [user]); 
    */


    const addConversation = async () => {
        const newConvo  = {
            "senderId": user._id,
            "receiverId": itemData.sellerId,
        }
        try {
            console.log("newConvo data: ", newConvo);
            const res = await axios.post("http://localhost:5003/api/conversations", newConvo);
           // setConversations([])
        }
        catch (err) {
            console.log(err);
        }   

    }; 
    //add conversation based on seller information
    useEffect(() => {

        //find out if there is already a conversation with sender
        const getConversations = async () => {
            try {
                const res = await axios.get(`http://localhost:5003/api/conversations/${user._id}`);
                console.log("getConversation data", res.data);
                setConversations(res.data);
                console.log("conversations after getting them in seller convo update: ", conversations)
            }
            catch (err) {
                console.log(err);
            }
        };
        //getConversations(); 
        let present = false; 
        console.log("itemData.sellerId", itemData?.sellerId); 
        console.log("conversations: ", conversations);
        conversations.map((c) => {
            if((itemData?.sellerId !== undefined && itemData?.sellerId !== null) && c.members.includes(itemData?.sellerId)){
                console.log("presentif statement reached:", c);
                console.log("c.members: ", c.members); 
                console.log("itemData.sellerId:", itemData.sellerId);
                present = true; 
            }
        }); 
        //if sellerId is not null AND it is not present in conversations
        console.log("sellerID", itemData?.sellerId); 
        console.log(present);
        if((itemData?.sellerId !== undefined && itemData?.sellerId !== null) && present === false)
        {
            //then we can add a new conversation; 
            console.log(present);
            addConversation(); 
        }
        //getConversations();

    },[itemData, user._id]); 

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get(`http://localhost:5003/api/conversations/${user._id}`);
                //console.log("getConversation data", res.data);
                setConversations(res.data);
                console.log("conversations after getting them: ", conversations)
            }
            catch (err) {
                console.log(err);
            }
        };
        getConversations();
    }, [user._id]);

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get(`http://localhost:5003/api/messages/${currentChat._id}`);
                setMessages(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getMessages();
    }, [currentChat]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id,
        };

        /*
        const receiverId = currentChat.members.find(
            (member) => member !== user._id)
            //send message: 
        socket.current.emit("sendMessage", {
            senderId: user._id, 
            receiverId, 
            text: newMessage, 
        }); 
        */

        try {
            const res = await axios.post("http://localhost:5003/api/messages", message);
            setMessages([...messages, res.data]);
            setNewMessage("");
        }
        catch (error) {
            console.log(error);
        }
    };


    //for scrolling: setCurrent
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);  //dependecy is messsages bc when messages change --> use effect will be fired

    return (
        <div>
            <Header />
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder="Search Chat" className="chatMenuInput" />
                        {conversations.map((c) => (
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
                                        {messages.map(m => (
                                            <div ref={scrollRef}>
                                                <Message message={m} own={m.sender === user._id} />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="chatBoxBottom">
                                        <textarea className="chatMessageInput"
                                            placeholder="write something..."
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            value={newMessage}>
                                        </textarea>
                                        <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
                                    </div></> : <span className="noConvoText">Open conversation to chat.</span>}
                    </div>
                </div>

            </div>
        </div>
    )

}