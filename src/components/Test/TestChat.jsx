import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
// const socket = io.connect('http://localhost:3000');

const Chat = () => {

    const [message, setMessage] = useState('');


    useEffect(() => {

        // socket.emit('joinRoom', { UserId: socket.id, RoomId: 1234 });

        // socket.on('Welcome', (message) => {
        //     console.log(message);
        // });

        // socket.on('message', (message) => {
        //     console.log(message);
        // });

        // socket.on('newMessage', (message) => {
        //     console.log(message);
        // });



    }, []);

    const sendMessage = () => {

        // socket.emit('newMessage', { message, UserId: socket.id, RoomId: 1234 });

        // fetch('http://localhost:3000/api/chats/', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ message, UserId: socket.id, RoomId: 1234 }),
        // })
        //     .then((res) => res.json())
        //     .then((res) => {
        //         console.log(res);
        //     });
    };




    return (
        <div>
            <h1>Chat</h1>
            <input type="text" onChange={(e) => setMessage(e.target.value)} />
            <button onClick={sendMessage}>Send</button>

        </div>
    );
};

export default Chat;