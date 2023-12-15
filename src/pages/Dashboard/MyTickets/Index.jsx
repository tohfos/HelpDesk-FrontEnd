import React from 'react'
import Ticket from '../../../components/MyTickets/Ticket'
import CreateTicketButton from '../../../components/MyTickets/CreateTicketButton'

const Index = () => {
    return (
        <>
            <div class="h-full w-full border-r border-base-200 flex flex-col">
                <div class="h-16 border-b border-base-200 px-4 flex items-center justify-center space-x-6 shadow-lg">
                    <h2 class="font-bold text-xl">My Tickets</h2>
                </div>


                <div className="h-screen overflow-auto">




                    {/* <!-- Tickets --> */}
                    <div className="mt-4 space-y-4">

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
                        <Ticket />





                    </div>

                    {/* place button at bottom right */}
                    <div className="absolute bottom-0 right-0 mb-10 mr-10">
                        <CreateTicketButton />
                    </div>


                </div>
            </div>
        </>
    )
}

export default Index