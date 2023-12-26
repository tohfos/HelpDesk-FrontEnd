import React from 'react'
import TextMessage from './TextMessage'
import Cookies from 'js-cookie'
import { useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import io from 'socket.io-client';
const socket = io.connect(`${process.env.REACT_APP_EXPRESS_URL}`);

const Chat = () => {

    //get chat details
    const ticketId = window.location.pathname.split('/')[3];
    const user = jwtDecode(Cookies.get('token'));
    const [chat, setChat] = useState({});
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');


    //get chat
    const fetchChat = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_EXPRESS_URL}/api/v1/chats/${ticketId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Cookies.get('token')
                },
            });
            const data = await res.json();
            console.log(data);
            if (res.status === 200) {
                setChat(data);
                setMessages(data.message);
            }
        } catch (err) {
            console.log(err);
        }
    }

    //send message
    const handleSendMessage = async (e) => {

        e.preventDefault();

        socket.emit('newMessage', { message, UserId: socket.id, RoomId: ticketId });

        console.log("message", message);
        console.log("messages", messages);

        try {
            const res = await fetch(`${process.env.REACT_APP_EXPRESS_URL}/api/v1/chats/${ticketId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Cookies.get('token')
                },
                body: JSON.stringify({ message }),
            });
            const data = await res.json();
            console.log(data);
            if (res.status === 200) {
                setMessage('');

                //update messages
                setMessages([...messages, data]);

                //update chat
                fetchChat();

            }
        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        fetchChat()

    }, [])

    useEffect(() => {
        socket.emit('joinRoom', { UserId: socket.id, RoomId: ticketId });

        socket.on('Welcome', (message) => {
            console.log(message);
        });

        socket.on('message', (message) => {
            console.log(message);
        });

        socket.on('newMessage', (message) => {
            console.log(message);
            setMessages([...messages, message]);

            //update chat
            fetchChat();
        });

    }, [messages]);



    return (
        <div class="w-full h-screen flex flex-col">
            <div class="h-16 border-b border-base-200 flex justify-between items-center w-full px-5 py-2 shadow-sm">
                <div class="flex items-center">
                    {/* back button */}
                    <a className="btn btn-primary btn-xs" href='/dashboard/messages'>
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-narrow-left" width="24" height="24" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <line x1="5" y1="12" x2="9" y2="16" />
                            <line x1="5" y1="12" x2="9" y2="8" />
                        </svg>
                    </a>

                    <p class="font-semibold ml-3">{chat.title}</p>
                </div>
            </div>

            {/* Chat Messages */}
            <div class="w-full overflow-y-auto">

                {messages.map((message) => (
                    <TextMessage message={message.message} fromMe={message.sender === user.UserInfo.userid ? true : false}
                        time={new Date(message.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' })} />
                ))}

            </div>

            {/* Input */}
            <div class="w-full px-5 py-3 sticky bottom-0 mt-20">
                <div
                    class="h-12 flex justify-between px-3 items-center border border-transparent rounded-lg">

                    <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} className="input input-primary w-full rounded-md px-3 bg-base-200 outline-none"
                        placeholder="Type your message" />


                    <button onClick={handleSendMessage} className="ml-5 btn btn-primary w-24">Send</button>

                </div>
            </div>
        </div>
    )
}

export default Chat