import React from 'react'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react'

const TextMessage = (props) => {

    const user = jwtDecode(Cookies.get('token'));

    return (
        // check if from me then show then return the me message, else return the other person's message
        props.fromMe ? (
            <div class="w-full flex justify-end mt-3">
                <div class="w-1/2 ">
                    <div class="flex items-center justify-end">
                        <p class="font-semibold mr-3 text-sm">Me <span
                            class="text-xs">{props.messageTime}</span></p>
                    </div>
                    <div className="chat chat-end">
                        <div className="chat-bubble">{props.message}</div>
                    </div>
                </div>
            </div>
        ) : (
            <div class="w-full flex flex-start">
                <div class="w-1/2">
                    <div class="flex items-center">
                        <p class="font-semibold mr-3 text-sm">{user.UserInfo.role === "User" ? "Agent" : "User"} <span
                            class="text-xs">{props.messageTime}</span></p>
                    </div>
                    <div className="chat chat-start">
                        <div className="chat-bubble chat-bubble-secondary">{props.message}</div>
                    </div>
                </div>
            </div>
        )
    )
}

export default TextMessage