import React from 'react'
import Ticket from '../../../components/MyTickets/Ticket'
import CreateTicketButton from '../../../components/MyTickets/CreateTicketButton'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'


const Index = () => {

    // TODO filter for different type of users
    // TODO for filter with the category, as well as status (resolved, in progress, open)
    // TODO sort depending on alphabetic or ticket category/subcategory

    const [showPopup, setShowPopup] = useState(false);
    const [allTickets, setAllTickets] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [filterOption, setFilterOption] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [ticketsPerPage, setTicketsPerPage] = useState(6);
    const [filterItem, setFilterItem] = useState('')
    const [sortItem, setSortItem] = useState('')
    const user = jwtDecode(Cookies.get('token'));
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        // Load popup state from localStorage on component mount
        const storedPopupState = localStorage.getItem('popupState');
        if (storedPopupState) {
            setShowPopup(JSON.parse(storedPopupState));
        }

        fetchTickets();
        console.log(allTickets);
        console.log(tickets);
    }, []);

    const handleTicketCreated = () => {
        // Refresh the tickets by calling fetchTickets again
        fetchTickets();
    };

    // Function to toggle popup visibility and update localStorage
    const togglePopup = () => {
        const updatedPopupState = !showPopup;
        setShowPopup(updatedPopupState);
        localStorage.setItem('popupState', JSON.stringify(updatedPopupState));
    };


    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
        if (searchTerm === '') {
            setTickets(allTickets);
        } else {
            setTickets(allTickets.filter((ticket) =>
                ticket.title.toLowerCase().includes(searchTerm.toLowerCase())
            ));
        }
    }

    const handleFilter = (filterItem) => {
        setFilterItem(filterItem)
        if (filterItem === '') {
            setTickets(allTickets);
        } else {
            setTickets(allTickets.filter((ticket) => {
                if (filterItem === 'Software' || filterItem === 'Hardware' || filterItem === 'Network' || filterItem === 'Other')
                    return ticket.ticketCategory === filterItem
                else
                    return ticket.status === filterItem
            }
            ));
        }
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const fetchTickets = async () => {

        setIsLoading(true);

        if (user.UserInfo.role === "User") {
            try {
                const response = await fetch(`${process.env.REACT_APP_EXPRESS_URL}/api/v1/user/get`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + Cookies.get('token')
                    },
                });
                const data = await response.json();
                data.reverse();
                setAllTickets(data);
                setTickets(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error:', error);
            }
        } else if (user.UserInfo.role === "Agent") {
            try {
                const response = await fetch(`${process.env.REACT_APP_EXPRESS_URL}/api/v1/agent/get`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + Cookies.get('token')
                    },
                });
                const data = await response.json();
                data.reverse();
                setAllTickets(data);
                setTickets(data);
                setIsLoading(false);

            } catch (error) {
                console.error('Error:', error);
            }
        }
    }

    const indexOfLastTicket = currentPage * ticketsPerPage;
    const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
    const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);


    return (
        <>
            <div class="h-full w-full border-r border-base-200 flex flex-col">
                <div class="z-10 h-16 border-b border-base-200 px-4 flex items-center justify-center space-x-6 shadow-lg">
                    <h2 class="font-bold text-xl">My Tickets</h2>
                </div>
                <div className="h-screen overflow-auto">
                    <div className="mt-10 top-0 left-0 mb-10 m-5 flex flex-row space-x-6">
                        {user.UserInfo.role === "User" ?
                            < CreateTicketButton onTicketCreated={handleTicketCreated} />
                            : null
                        }
                        

                        {/* Filter */}
                        <select
                            className="select select-secondary w-full max-w-xs"
                            value={filterItem}
                            onChange={(e) => handleFilter(e.target.value)}
                        >
                            <option value="" className=' z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'>All</option>
                            <option value="Software" className=' z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'>Software Category</option>
                            <option value="Hardware" className=' z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'>Hardware Category</option>
                            <option value="Network" className=' z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'>Network Category</option>
                            <option value="Open" className=' z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'>Open Tickets</option>
                            <option value="In Progress" className=' z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'>In Progress Tickets</option>
                            <option value="Resolved" className=' z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'>Resolved Tickets</option>
                            <option value="Other" className=' z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'>Other</option>
                        </select>

                        <input
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="input input-primary input-bordered w-full max-w-xs"
                        />
                    </div>

                    <div className="flex flex-col">
                        <div className="join mx-auto self-center">
                            {[...Array(Math.ceil(tickets.length / ticketsPerPage))].map((e, i) => (
                                <button className={`join-item btn btn-square ${currentPage === i + 1 ? "btn-active" : ""}`} type="radio" name="options" key={i} onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
                            ))}
                        </div>

                        {isLoading ? (
                            <div className="flex flex-col gap-4 w-full mt-4 mx-8">
                                <div className="skeleton h-32 w-full"></div>
                                <div className="skeleton h-4 w-28"></div>
                                <div className="skeleton h-4 w-full"></div>
                                <div className="skeleton h-4 w-full"></div>
                                <div className="skeleton h-32 w-full"></div>
                                <div className="skeleton h-4 w-28"></div>
                                <div className="skeleton h-4 w-full"></div>
                                <div className="skeleton h-4 w-full"></div>
                                <div className="skeleton h-32 w-full"></div>
                                <div className="skeleton h-4 w-28"></div>
                                <div className="skeleton h-4 w-full"></div>
                                <div className="skeleton h-4 w-full"></div>
                            </div>

                        ) : (
                            //Tickets
                            < div className="ml-5 space-y-4 my-24">
                                {currentTickets.map((ticket) => (
                                    <Ticket key={ticket._id} ticket={ticket} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div >
            {/* {showPopup && (
                <div className="popup">
                    <p>This is the popup content</p>
                </div>
            )} */}
        </>
    )
}

export default Index