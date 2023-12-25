import React from 'react'
import TextMessage from './TextMessage'
import Cookies from 'js-cookie'
import { useState, useEffect } from 'react'


const Chat = () => {

    //get chat details
    const ticketId = window.location.pathname.split('/')[3];
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
                setMessages([...messages, data]);
                setMessage('');
            }
        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        fetchChat()

    }, [])



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

                    <p class="font-semibold ml-3">ticket.title</p>
                </div>
            </div>

            {/* Chat Messages */}
            <div class="w-full overflow-y-auto">

                {messages.map((message) => (
                    <TextMessage message={message} />
                ))}

            </div>

            {/* Input */}
            <div class="w-full px-5 py-3">
                <div
                    class="h-12 flex justify-between px-3 items-center border border-transparent rounded-lg">

                    <input type="text" onChange={(e) => setMessage(e.target.value)} className="input input-primary w-full rounded-md px-3 bg-base-200 outline-none"
                        placeholder="Type your message" />


                    <button onClick={handleSendMessage} className="ml-5 btn btn-primary w-24">Send</button>

                </div>
            </div>
        </div>
    )
}

export default Chat