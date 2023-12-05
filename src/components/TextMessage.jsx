import React from 'react'

const TextMessage = (props) => {
    return (
        // check if from me then show then return the me message, else return the other person's message
        props.fromMe ? (
            <div class="w-full flex justify-end mt-3">
                <div class="w-1/2 ">
                    <div class="flex items-center justify-end">
                        <p class="font-semibold mr-3 text-sm">Me <span
                            class="text-xs">{props.messageTime}</span></p>

                        <img class="h-5 w-5 overflow-hidden rounded-full"
                            src="https://source.unsplash.com/random/500x500/?face"
                            alt="" />
                    </div>
                    <div class="mt-3 w-full bg-accent-content  p-4 rounded-b-xl rounded-tl-xl">
                        <p class=" text-sm text-accent">
                            {props.message}
                        </p>
                    </div>
                </div>
            </div>
        ) : (
            <div class="w-full flex flex-start">
                <div class="w-1/2">
                    <div class="flex items-center">
                        <img class="h-5 w-5 overflow-hidden rounded-full"
                            src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnN8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500"
                            alt="" />
                        <p class="font-semibold ml-3 text-sm ">{props.chatName} <span
                            class="text-xs">{props.messageTime}</span></p>
                    </div>

                    <div class="mt-3 w-full p-4 bg-primary rounded-b-xl rounded-tr-xl">
                        <p class=" text-sm text-primary-content">
                            {props.message}
                        </p>
                    </div>
                </div>
            </div>
        )
    )
}

export default TextMessage