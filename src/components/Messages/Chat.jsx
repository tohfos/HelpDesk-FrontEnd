import React from 'react'
import TextMessage from './TextMessage'

const Chat = (props) => {
    return (

        <div class="w-full h-screen flex flex-col">
            <div class="h-16 border-b border-base-200 flex justify-between items-center w-full px-5 py-2 shadow-sm">
                <div class="flex items-center">
                    <img class="h-10 w-10 overflow-hidden rounded-full"
                        src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnN8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500"
                        alt="" />
                    <p class="font-semibold ml-3">Mircel Jones</p>
                </div>
            </div>

            {/* Chat Messages */}
            <div class="w-full overflow-y-auto">
                <TextMessage fromMe={true} message="Hello" messageTime="12:00" />
                <TextMessage fromMe={false} message="Hello" messageTime="12:00" chatName="Mircel Jones" />
                <TextMessage fromMe={true} message="Hello" messageTime="12:00" />
                <TextMessage fromMe={false} message="Hello" messageTime="12:00" chatName="Mircel Jones" />
                <TextMessage fromMe={true} message="Hello" messageTime="12:00" />
                <TextMessage fromMe={false} message="Hello" messageTime="12:00" chatName="Mircel Jones" />
                <TextMessage fromMe={true} message="Hello" messageTime="12:00" />
            </div>

            {/* Input */}
            <div class="w-full px-5 py-3">
                <div
                    class="h-12 flex justify-between px-3 items-center border border-transparent rounded-lg">

                    <input type="text" className="input input-primary w-full rounded-md px-3 bg-base-200 outline-none"
                        placeholder="Type your message" />

                    <button className="ml-5 btn btn-primary w-24">Send</button>

                </div>
            </div>
        </div>
    )
}

export default Chat