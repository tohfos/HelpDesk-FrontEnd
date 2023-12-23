import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import ViewTicketModal from './ViewTicketModal';
import RateTicketModal from './RateTicketModal';


const Ticket = ({ ticket }) => {

    const user = jwtDecode(Cookies.get('token'));

    const [rateModalIsOpen, setRateModalIsOpen] = useState(false);

    const handleOpenRateModal = () => {
        setRateModalIsOpen(true);
    }

    const handleCloseRateModal = () => {
        setRateModalIsOpen(false);
    }


    const [ViewTicketModalIsOpen, setViewTicketModalIsOpen] = useState(false);

    const handleOpenViewTicketModal = () => {
        setViewTicketModalIsOpen(true);
    }

    const handleCloseViewTicketModal = () => {
        setViewTicketModalIsOpen(false);
    }



    return (
        <>

            {/* TODO add functionality for view ticket, drop down for agent, and rate ticket */}

            <div>
                <div class="bg-base-100 mx-auto border-base-200 border rounded-sm mb-0.5 h-30 shadow-md">
                    <div className={`flex p-3 border-l-8 ${ticket.priority === "Medium" ? "border-warning" : ticket.priority === "Low" ? "border-success" : ticket.priority === "High" ? "border-error" : ""}`}>

                        {/* add color to priority */}
                        <div class="space-y-1 border-r-2 pr-3">
                            <div class="text-sm leading-5 font-semibold"><span class="text-xs leading-4 font-normal  pr"> Ticket #</span> {ticket._id}</div>
                            <div class="text-sm leading-5 font-semibold"><span class="text-xs leading-4 font-normal "> Assingeed to: </span> {ticket.assignedTo}</div>
                            <div class="text-sm leading-5 font-semibold">Created at: {ticket.createdAt}</div>
                        </div>
                        <div class="flex-1">
                            <div class="h-full ml-3 space-y-1 border-r-2 pr-3">
                                <div class="text-base leading-6 font-normal">{ticket.title}</div>
                                <div class="text-sm leading-4 font-normal"><span class="text-xs leading-4 font-normal "> Catagory</span> {ticket.ticketCategory}</div>
                                <div class="text-sm leading-4 font-normal"><span class="text-xs leading-4 font-normal "> Sub-Catagory</span> {ticket.SubCategory}</div>
                            </div>
                        </div>
                        <div class="border-r-2 pr-3">
                            <div >
                                <div class={`ml-3 my-3 border-base-200 border-2 p-1 ${ticket.status === "Resolved" ? "bg-success text-base-100" : ""}`}>
                                    <div class="uppercase text-xs leading-4 font-medium">Status:</div>
                                    <div class="text-center text-sm leading-4 font-semibold">{ticket.status}</div>
                                    {ticket.status === "Resolved" ?
                                        <div className="rating">
                                            {/* add stars for the number of ticket rating */}
                                            {ticket.rating && Array.from({ length: ticket.rating }).map((_, index) => (
                                                <span key={index} className="star">&#9733;</span>
                                            ))}
                                        </div>
                                        : ""}
                                </div>
                            </div>
                        </div>
                        {ticket.status === "Resolved" && ticket.rating === null ?
                            <div class="h-auto border-r-2 pr-3">
                                <div>
                                    <div class="ml-3 my-5 border-base-200 border-2 bg-base-300 p-1 ">
                                        <button onClick={handleOpenRateModal} class="text-center text-sm leading-4 font-semibold">Rate</button>
                                    </div>
                                </div>
                            </div>
                            : ""
                        }

                        {/* TODO Start the chat with the agent */}
                        {(ticket.ticketCategory === "Other" || (ticket.rating < 3 && ticket.rating > 0)) && user.UserInfo.role === "User" ?
                            <div class="h-auto border-r-2 pr-3">
                                <div>
                                    <div class="ml-3 my-5 border-base-200 border-2 bg-base-300 p-1 ">
                                        <button class="text-center text-sm leading-4 font-semibold">Message Agent</button>
                                    </div>
                                </div>
                            </div>
                            : (null)
                        }

                        <div>
                            <div class={`rounded-none ml-3 my-5 p-1 w-20 ${ticket.priority === "Medium" ? "bg-warning" : ticket.priority === "Low" ? "bg-success" : ticket.priority === "High" ? "bg-error" : ""}`}>
                                <button onClick={handleOpenViewTicketModal} class="uppercase text-xs leading-4 font-semibold text-center text-base-100">View Ticket</button>
                            </div>
                        </div>
                        <div>
                            {/* Drop down button */}
                            {/* only for agent */}
                            {/* TODO handle logic */}
                            {user.UserInfo.role === "Agent" && (
                                <button class="rounded-sm my-6 ml-2 focus:outline-none bg-base-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <ViewTicketModal isOpen={ViewTicketModalIsOpen} onRequestClose={handleCloseViewTicketModal} ticket={ticket} />
            <RateTicketModal isOpen={rateModalIsOpen} onRequestClose={handleCloseRateModal} ticket={ticket} />


        </>
    )
}

export default Ticket