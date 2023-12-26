import React from 'react'
import Ticket from '../../../components/MyTickets/Ticket'
import CreateTicketButton from '../../../components/MyTickets/CreateTicketButton'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'


const Index = () => {

    const [showPopup, setShowPopup] = useState(false);
    const [allTickets, setAllTickets] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [filterOption, setFilterOption] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [ticketsPerPage, setTicketsPerPage] = useState(6);
    const user = jwtDecode(Cookies.get('token'));


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

    // useEffect(() => {
    //     fetchTickets();
    //     console.log(allTickets);
    //     console.log(tickets);
    // }, []);


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

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const fetchTickets = async () => {

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
                            < CreateTicketButton onTicketCreated={handleTicketCreated}/>
                            : null
                        }
                        {/* Sort */}
                        <select
                            className="select select-secondary w-full max-w-xs"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                        >
                            <option disabled value="" className=' z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'>Sort by</option>
                            {/* Add sort options here */}
                        </select>

                        {/* Filter */}
                        <select
                            className="select select-secondary w-full max-w-xs"
                            value={filterOption}
                            onChange={(e) => setFilterOption(e.target.value)}
                        >
                            <option disabled value="" className=' z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'>Filter by</option>
                            {/* Add filter options here */}
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

                        {/* <!-- Tickets --> */}
                        <div className="ml-5 space-y-4 my-24">
                            {currentTickets.map((ticket) => (
                                <Ticket key={ticket._id} ticket={ticket} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* {showPopup && (
                <div className="popup">
                    <p>This is the popup content</p>
                </div>
            )} */}
        </>
    )
}

export default Index