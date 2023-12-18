import React from 'react'

const Ticket = ({ ticket }) => {
    return (
        <>
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
                                <div class={`ml-3 my-3 border-base-200 border-2 bg-base-300 p-1 ${ticket.status === "Resolved" ? "bg-success" : ""}`}>
                                    <div class="uppercase text-xs leading-4 font-medium">Status</div>
                                    <div class="text-center text-sm leading-4 font-semibold">{ticket.status}</div>
                                    {ticket.status === "Resolved" ? <div class="text-center text-sm leading-4 font-semibold">Rating: {ticket.rating}</div> : ""}
                                </div>
                            </div>
                        </div>
                        {ticket.status === "Resolved" && ticket.rating === null ?
                            <div class="h-auto border-r-2 pr-3">
                                <div>
                                    <div class="ml-3 my-5 border-base-200 border-2 bg-base-300 p-1 ">

                                        {/* if not rated add rate button */}
                                        <button class="text-center text-sm leading-4 font-semibold">Rate</button>
                                    </div>
                                </div>
                            </div>
                            : ""
                        }
                        <div>
                            <div class={`rounded-none ml-3 my-5 p-1 w-20 ${ticket.priority === "Medium" ? "bg-warning" : ticket.priority === "Low" ? "bg-success" : ticket.priority === "High" ? "bg-error" : ""}`}>
                                <button class="uppercase text-xs leading-4 font-semibold text-center text-base-100">View Ticket</button>
                            </div>
                        </div>
                        <div>
                            {/* Drop down button */}
                            <button class="rounded-sm my-6 ml-2 focus:outline-none bg-base-300">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Ticket