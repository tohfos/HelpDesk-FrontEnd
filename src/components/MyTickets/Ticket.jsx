import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import ViewTicketModal from './ViewTicketModal';
import RateTicketModal from './RateTicketModal';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

//add notification for ticket started and resolved
// import socketIOClient from "socket.io-client";


const Ticket = ({ ticket }) => {

    const user = jwtDecode(Cookies.get('token'));
//dee
    const [SolveTicketMessage , setSolveTicketMessage] = useState({
        "UpdateDetails": ""
    });

    const [emailMessage , setEmailMessage] = useState({
        "body": ""
    });

    const handelEmailMessage = (e) => {
        setEmailMessage({
            ...emailMessage,
            [e.target.name]:e.target.value

        })
        console.log(emailMessage)
    }
    
    const handleSolveTicketMessage = (e) => {

        setSolveTicketMessage({
            ...SolveTicketMessage,
            [e.target.name]: e.target.value
        })
        console.log(SolveTicketMessage);
    }

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

    const handleStartTicket = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_EXPRESS_URL}/api/v1/agent/startTicket/${ticket._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Cookies.get('token')
                },
            });
            const data = await response.json();
            console.log(data);
            if (response.status === 200) {
                success("Ticket Started!")

                setTimeout(() => {
                    window.location.reload();
                }, 3000);

            } else {
                fail(data.message)
            }
            //refresh page
            // window.location.reload();

        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleSolveTicket = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_EXPRESS_URL}/api/v1/agent/solveTicket/${ticket._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Cookies.get('token')
                },
                body: JSON.stringify(SolveTicketMessage),
                credentials: 'include'
            });
            const data = await response.json();
            console.log(data);

            if (response.status === 200) {
                success("Ticket Resolved!")
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            } else {
                fail(data.message)
            }


        } catch (error) {
            console.error('Error:', error);
        }
    }

    // // handle notification for ticket started and resolved
    // const socket = socketIOClient(process.env.REACT_APP_EXPRESS_URL);
    // useEffect(() => {
    //     socket.on("ticketStarted", (data) => {
    //         console.log(data);
    //         success(data.message)
    //     });
    //     socket.on("ticketResolved", (data) => {
    //         console.log(data);
    //         success(data.message)
    //     });
    // }, []);


    const handleMessgeAgent = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_EXPRESS_URL}/api/v1/user/openchat/${ticket._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Cookies.get('token')
                },
            });
            const data = await response.json();
            console.log(data);
            if (response.status === 200) {
                success("Chat Opened!, Redirecting to Chat Page")

                setTimeout(() => {
                    window.location.href = `/dashboard/messages/${ticket._id}`
                }, 3000);

            } else {
                fail(data.message)
            }
        }
        catch (error) {
            console.error('Error:', error);
        }
    }

    const handleEmailUser = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_EXPRESS_URL}/api/v1/agent/communicate/${ticket._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Cookies.get('token')
                },
                body: JSON.stringify(emailMessage),
                credentials: 'include'
                
            });
            const data = await response.json();
            console.log(data);
            if (response.status === 200) {
                success("Email Sent!")
            } else {
                fail(data.message)
            }
        }
        catch (error) {
            console.error('Error:', error);
        }
    }




    const fail = (alert) => {
        toast.error(alert, {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const success = (alert) => {
        toast.success(alert, {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,

        });
    };

    return (
        <>
            <div>
                <div class="bg-base-100 mx-auto border-base-200 border rounded-sm mb-0.5 h-30 shadow-md">
                    <div className={`flex p-3 border-l-8 ${ticket.priority === "Medium" ? "border-warning" : ticket.priority === "Low" ? "border-success" : ticket.priority === "High" ? "border-error" : ""}`}>

                        {/* add color to priority */}
                        <div class="space-y-1 border-r-2 pr-3">
                            <div class="text-sm leading-5 font-semibold"><span class="text-xs leading-4 font-normal  pr"> Ticket #</span> {ticket._id}</div>
                            <div class="text-sm leading-5 font-semibold"><span class={`text-xs leading-4 font-normal ${user.UserInfo.userid === ticket.assignedTo ? "text-primary" : ""}`}> Assinged to: </span> {ticket.assignedTo}</div>
                            <div class="text-sm leading-5 font-semibold">Created at: {ticket.createdAt}</div>
                        </div>
                        <div class="flex-1">
                            <div class="h-full ml-3 space-y-1 border-r-2 pr-3">
                                <div class="text-base leading-6 font-normal">{ticket.title}</div>
                                <div class="text-sm leading-4 font-normal"><span class="text-xs leading-4 font-normal "> Catagory</span> {ticket.ticketCategory}</div>
                                <div class="text-sm leading-4 font-normal"><span class="text-xs leading-4 font-normal "> Sub-Catagory</span> {ticket.SubCategory}</div>
                            </div>
                        </div>

                        {ticket.status === "In Progress" && ticket.rating === null && user.UserInfo.role === "Agent" ?
                            <div class="flex-1">
                                <div class="border-r-2 pr-3 w-full">
                                    <div className='flex flex-row'>
                                        <div class={`ml-3 my-3 border-base-200 border-2 p-1 w-full`}>
                                            <textarea class="textarea textarea-primary w-full" name='body' onChange={handelEmailMessage} placeholder="Enter In Progress Email to User"></textarea>
                                        </div>
                                        <div class="ml-3 my-3 border-base-200 border-2 bg-base-300 p-1">
                                            <button class="uppercase text-xs w-12 h-12 leading-4 font-semibold" onClick={handleEmailUser}>Send</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : null
                        }

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

                        {ticket.status === "Resolved" && ticket.rating === null && user.UserInfo.role === "User" ?
                            <div class="h-auto border-r-2 pr-3">
                                <div>
                                    <div class="ml-3 my-5 border-base-200 border-2 bg-base-300 p-1 ">
                                        <button onClick={handleOpenRateModal} class="text-center text-sm leading-4 font-semibold">Rate</button>
                                    </div>
                                </div>
                            </div>
                            : null
                        }

                        {(ticket.status === "Resolved") && user.UserInfo.role === "User" ?
                            <div class="h-auto border-r-2 pr-3">
                                <div>
                                    <div class="ml-3 my-5 border-base-200 border-2 bg-base-300 p-1 ">
                                        <button onClick={handleMessgeAgent} class="text-center text-sm leading-4 font-semibold">Message Agent</button>
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
                            {(user.UserInfo.role === "Agent" && user.UserInfo.userid === ticket.assignedTo && ticket.status !== "Resolved") && (
                                <>
                                    <div class="dropdown dropdown-hover dropdown-end">
                                        <div tabindex="0" class="rounded-sm my-6 ml-2 focus:outline-none bg-base-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                        <ul tabindex="0" class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-96">

                                            {(ticket.status === "Open") && (
                                                <li>
                                                    <a onClick={handleStartTicket} class="flex items-center space-x-2">
                                                        <i class="fas fa-user"></i>
                                                        <span>In-Progress</span>
                                                    </a>
                                                </li>
                                            )}

                                            {ticket.status === "In Progress" && ticket.rating === null && user.UserInfo.role === "Agent" ?
                                                <>
                                                    <div class="flex-1">
                                                        <div class="border-r-2 pr-3 w-full">
                                                            <div className='flex flex-row'>
                                                                <div class={`ml-3 my-3 border-base-200 border-2 p-1 w-full`}>
                                                                    <textarea class="textarea textarea-primary w-full" name='UpdateDetails' onChange={handleSolveTicketMessage} placeholder="Enter Ticket Update"></textarea>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <li>
                                                        <a onClick={handleSolveTicket} class="flex items-center space-x-2">
                                                            <i class="fas fa-user"></i>
                                                            <span>Resolved</span>
                                                        </a>
                                                    </li>
                                                </>
                                                : null
                                            }

                                        </ul>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <ViewTicketModal isOpen={ViewTicketModalIsOpen} onRequestClose={handleCloseViewTicketModal} ticket={ticket} />
            <RateTicketModal isOpen={rateModalIsOpen} onRequestClose={handleCloseRateModal} ticket={ticket} />
            <ToastContainer />
        </>
    )
}

export default Ticket