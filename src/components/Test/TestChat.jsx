import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Chat = ({ ticketId, userId }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    // Initialize Socket.io client
    const socket = io('http://localhost:3000/');

    // connect to socket.io server
    socket.on('connect', () => {
        console.log('connected to socket.io server');
    });

    // Fetch chat history on component mount
    useEffect(() => {
        fetch(`http://localhost:3000/chat/${ticketId}`)
            .then((response) => response.json())
            .then((data) => {
                setMessages(data.messages);
                // Join chat room
                socket.emit('joinRoom', `${1234}`);
            });
    }, []);




    // Send new message
    const sendMessage = () => {
        fetch(`http://localhost:3000/api/chats/${ticketId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ messages: message }),
        })
            .then((response) => response.json())
            .then((data) => {
                // Update local state and emit message to server
                setMessages((messages) => [...messages, data.message]);
                socket.emit('newMessage', data.message);
                setMessage(''); // Clear input field after sending message
            });
    };

    // Render chat messages
    const renderMessages = () => {
        messages && messages.map((message) => (
            <div key={message._id}>
                <b>{message.sender.UserName}:</b> {message.message}
            </div>
        ))
    };

    return (
        <div>
            <h2>Chat</h2>
            <div className="chat-messages">{renderMessages()}</div>
            <input
                type="text"
                placeholder="Enter message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={() => sendMessage()}>Send</button>
        </div>
    );
};

export default Chat;
