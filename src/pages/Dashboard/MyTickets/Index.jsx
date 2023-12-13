import React from 'react'

const Index = () => {
    return (
        <div>
            <div class="h-full w-full border-r border-base-200 flex flex-col">
                <div class="h-16 border-b border-base-200 px-4 flex items-center justify-center space-x-6">
                    My Tickets
                    <div class="flex items-center space-x-4">
                        <button class="btn btn-primary">New Ticket</button>

                        <div class="dropdown dropdown-end">
                            <div tabindex="0" class="m-1 btn btn-ghost btn-sm rounded-btn">Filters</div>
                            <ul tabindex="0" class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
                                <li>
                                    <a>Open Tickets</a>
                                </li>
                                <li>
                                    <a>Closed Tickets</a>
                                </li>
                                <li>
                                    <a>On Hold Tickets</a>
                                </li>
                                <li>
                                    <a>Resolved Tickets</a>
                                </li>
                            </ul>
                            <div tabindex="0" class="m-1 btn btn-ghost btn-sm rounded-btn">Sort</div>
                            <ul tabindex="0" class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
                                <li>
                                    <a>Sort by Date</a>
                                </li>
                                <li>
                                    <a>Sort by Priority</a>
                                </li>
                                <li>
                                    <a>Sort by Status</a>
                                </li>
                            </ul>
                            <div tabindex="0" class="m-1 btn btn-ghost btn-sm rounded-btn">Search</div>
                            <ul tabindex="0" class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
                                <li>
                                    <a>Search by Title</a>
                                </li>
                                <li>
                                    <a>Search by ID</a>
                                </li>
                                <li>
                                    <a>Search by Customer</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index