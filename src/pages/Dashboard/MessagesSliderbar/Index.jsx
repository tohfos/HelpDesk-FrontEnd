import React from 'react'
import Contact from '../../../components/Messages/Contact'
import { NavLink } from 'react-router-dom'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { useState } from 'react'

const Index = () => {

    // 

    return (
        <div class="h-full w-96 border-r border-base-200 flex flex-col">
            <div class="h-16 border-b border-base-200 px-4 flex items-center justify-center space-x-4">
                Messages
            </div>
            <div class="h-screen overflow-auto">
                {contacts.map((contact) => (
                    <NavLink to={`/dashboard/messages/${contact.ticketId}`} activeClassName="active" className="flex items-center space-x-2 mt-5">
                        <Contact contactName={contact.ticketId} />
                    </NavLink>
                ))}

            </div>



        </div>

    )
}

export default Index