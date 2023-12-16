import React from 'react'
import Ticket from '../../../components/MyTickets/Ticket'
import CreateTicketButton from '../../../components/MyTickets/CreateTicketButton'

const Index = () => {
    return (
        <>
            <div class="h-full w-full border-r border-base-200 flex flex-col">
                <div class="z-10 h-16 border-b border-base-200 px-4 flex items-center justify-center space-x-6 shadow-lg">
                    <h2 class="font-bold text-xl">My Tickets</h2>
                </div>
                <div className="h-screen overflow-auto">
                    <div className="mt-10 top-0 left-0 mb-10 m-5">
                        <CreateTicketButton />
                    </div>

                    {/* <!-- Tickets --> */}
                    <div className="ml-5 space-y-4 my-24">

                        <Ticket />
                        <Ticket />
                        <Ticket />
                        <Ticket />
                        <Ticket />
                        <Ticket />
                        <Ticket />
                        <Ticket />
                        <Ticket />
                        <Ticket />
                        <Ticket />

                    </div>
                </div>
            </div>
        </>
    )
}

export default Index