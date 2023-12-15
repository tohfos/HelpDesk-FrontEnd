import React, { useState } from 'react'
import SliderbarItem from './SliderbarItem'
import { NavLink } from 'react-router-dom'

const MainSliderbar = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    return (
        <>
            {/* <!-- slidebar 1 --> */}
            < div class="h-full w-fit border-r border-base-200 pt-10 px-5" >


                {/* if sidebar is open, then hide, else show */}

                {!isSidebarOpen && (
                    <div className="flex justify-end">
                        <button onClick={() => setSidebarOpen(!isSidebarOpen)}>
                            {isSidebarOpen ? 'Collapse' : 'Expand'}
                        </button>
                    </div>
                )}


                {isSidebarOpen && (
                    <>
                        <p class="text-md font-medium">Dashboard  <button onClick={() => setSidebarOpen(!isSidebarOpen)}>
                            {isSidebarOpen ? 'Collapse' : 'Expand'}
                        </button></p>
                        <NavLink to="/dashboard/mytickets" activeClassName="active" className="flex items-center space-x-2 mt-5">
                            <SliderbarItem itemName="My Tickets" itemSvgXmlns="http://www.w3.org/2000/svg" itemSvgPath="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" itemLink="mytickets" />
                        </NavLink>

                        <NavLink to="/dashboard/messages" activeClassName="active" className="flex items-center space-x-2 mt-5">
                            <SliderbarItem itemName="Messages" itemSvgXmlns="http://www.w3.org/2000/svg" itemSvgPath="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" itemLink="messages" />
                        </NavLink>

                        <NavLink to="/dashboard/reports" activeClassName="active" className="flex items-center space-x-2 mt-5">
                            <SliderbarItem itemName="Reports" itemSvgXmlns="http://www.w3.org/2000/svg" itemSvgPath="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" itemLink="reports" />
                        </NavLink>

                        <NavLink to="/dashboard/knowledgebase" activeClassName="active" className="flex items-center space-x-2 mt-5">
                            <SliderbarItem itemName="Knowledge Base" itemSvgXmlns="http://www.w3.org/2000/svg" itemSvgPath="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" itemLink="knowledgebase" />
                        </NavLink>

                        <NavLink to="/dashboard/users" activeClassName="active" className="flex items-center space-x-2 mt-5">
                            <SliderbarItem itemName='Users' itemSvgXmlns="http://www.w3.org/2000/svg" itemSvgPath="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" itemLink="knowledgebase" />
                        </NavLink>

                        <NavLink to="/dashboard/preferences" activeClassName="active" className="flex items-center space-x-2 mt-5">
                            <SliderbarItem itemName='Preferences' itemSvgXmlns="http://www.w3.org/2000/svg" itemSvgPath="M4 6h16M4 10h16M4 14h16M4 18h16" />
                        </NavLink>

                    </>
                )}
            </div >
        </>
    )
}

export default MainSliderbar