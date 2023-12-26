import React, { useState } from 'react'
import SliderbarItem from './SliderbarItem'
import { NavLink } from 'react-router-dom'
import Cookies from 'js-cookie'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const MainSliderbar = ({ userRole }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [themeMode, setThemeMode] = useState({
        mainTheme: localStorage.getItem('mainTheme'),
        secondaryTheme: localStorage.getItem('secondaryTheme'),
        isMain: localStorage.getItem('isMain')
    })

    function toggleMode() {
        setThemeMode({
            ...themeMode, isMain: !themeMode.isMain
        })
        localStorage.setItem('isMain', !themeMode.isMain)
        if (localStorage.getItem('isMain') === 'true') {
            document.documentElement.setAttribute('data-theme', localStorage.getItem('mainTheme'))
        } else {
            document.documentElement.setAttribute('data-theme', localStorage.getItem('secondaryTheme'))
        }
    }


    const handleLogout = async () => {

        try {
            const response = await fetch(`${process.env.REACT_APP_EXPRESS_URL}/auth/logout`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (response.ok) {
                Cookies.remove('token')
                localStorage.clear()
                window.location.href = '/'
                success("Logged out successfully")
            }
            else {
                fail("Something went wrong")
            }
        }
        catch (err) {
            fail(err)
            console.log(err)
        }
    }


    const fail = (alert) => {
        toast.error(alert, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,

        });
    }

    const success = (alert) => {
        toast.success(alert, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,

        });
    }

    return (
        <>
            {/* <!-- slidebar 1 --> */}
            < div class="h-full w-fit border-r border-base-200 pt-10 px-5" >

                <div className="flex justify-between items-center">
                    {/* <!-- hamburger menu --> */}
                    <div className="flex items-center space-x-2">
                        <button onClick={() => setSidebarOpen(!isSidebarOpen)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform transition-transform duration-500 ease-in-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isSidebarOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>


                {/* <!-- sidebar items, when collaped show only icons --> */}
                {isSidebarOpen ? (
                    <>

                                <NavLink to="/dashboard/knowledgebase" activeClassName="active" className="flex items-center space-x-2 mt-5">
                                    <SliderbarItem itemName="Knowledge Base" itemSvgXmlns="http://www.w3.org/2000/svg" itemSvgPath="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0a3 3 0 005-2.618A4.978 4.978 0 0117 15m0 5a3 3 0 01-3-3 4.978 4.978 0 01-.643-.036A3.001 3.001 0 007 20H2v-2a3 3 0 015.356-1.857A4.978 4.978 0 0112 17a4.978 4.978 0 01.643.036A3.001 3.001 0 0117 20zm-5-7a4 4 0 100-8 4 4 0 000 8z" itemLink="knowledgebase" />
                                </NavLink>

                        {/* if user is user or agent show */}

                        {userRole === 'User' || userRole === 'Agent' ? (

                            <>
                                <NavLink to="/dashboard/mytickets" activeClassName="active" className="flex items-center space-x-2 mt-5">
                                    <SliderbarItem itemName="My Tickets" itemSvgXmlns="http://www.w3.org/2000/svg" itemSvgPath="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" itemLink="mytickets" />
                                </NavLink>

                                <NavLink to="/dashboard/messages" activeClassName="active" className="flex items-center space-x-2 mt-5">
                                    <SliderbarItem itemName="Messages" itemSvgXmlns="http://www.w3.org/2000/svg" itemSvgPath="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" itemLink="messages" />
                                </NavLink>


                            </>
                        ) : (null)}

                        {/* Knowledge is availabe to everyone */}

                        {/* if user is manager show */}
                        {userRole === 'Manager' ? (
                            <>
                                <NavLink to="/dashboard/reports" activeClassName="active" className="flex items-center space-x-2 mt-5">
                                    <SliderbarItem itemName="Reports" itemSvgXmlns="http://www.w3.org/2000/svg" itemSvgPath="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" itemLink="reports" />
                                </NavLink>
                                <NavLink to="/dashboard/analytics" activeClassName="active" className="flex items-center space-x-2 mt-5">
                                    <SliderbarItem itemName="Analytics" itemSvgXmlns="http://www.w3.org/2000/svg" itemSvgPath="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" itemLink="analytics" />
                                </NavLink>
                            </>
                        ) :
                            null}

                        {/*  if user is admin, show users tab */}
                        {userRole === 'Admin' ? (
                            <>
                                <NavLink to="/dashboard/users" activeClassName="active" className="flex items-center space-x-2 mt-3">
                                    <SliderbarItem itemName='Users' itemSvgXmlns="http://www.w3.org/2000/svg" itemSvgPath="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" itemLink="knowledgebase" />
                                </NavLink>

                                <NavLink to="/dashboard/preferences" activeClassName="active" className="flex items-center space-x-2 mt-3">
                                    <SliderbarItem itemName='Preferences' itemSvgXmlns="http://www.w3.org/2000/svg" itemSvgPath="M19 14v1a2 2 0 01-2 2h-1.586a2 2 0 00-1.414.586l-1.708 1.707a2 2 0 01-2.828 0l-1.708-1.707a2 2 0 00-1.414-.586H7a2 2 0 01-2-2v-1a2 2 0 012-2h1.586a2 2 0 001.414-.586l1.708-1.707a2 2 0 012.828 0l1.708 1.707a2 2 0 001.414.586H17a2 2 0 012 2zm-7 3a2 2 0 11-4 0 2 2 0 014 0z" />
                                </NavLink>

                                <NavLink to="/dashboard/logs" activeClassName="active" className="flex items-center space-x-2 mt-3">
                                    <SliderbarItem itemName='Logs' itemSvgXmlns="http://www.w3.org/2000/svg" itemSvgPath="M19 14v1a2 2 0 01-2 2h-1.586a2 2 0 00-1.414.586l-1.708 1.707a2 2 0 01-2.828 0l-1.708-1.707a2 2 0 00-1.414-.586H7a2 2 0 01-2-2v-1a2 2 0 012-2h1.586a2 2 0 001.414-.586l1.708-1.707a2 2 0 012.828 0l1.708 1.707a2 2 0 001.414.586H17a2 2 0 012 2zm-7 3a2 2 0 11-4 0 2 2 0 014 0z" />
                                </NavLink>
                            </>
                        ) : (null)}

                        {/* My profile */}
                        <NavLink to="/dashboard/profile" activeClassName="active" className="flex items-center space-x-2 mt-3">
                            <SliderbarItem itemName='My Profile' itemSvgXmlns="http://www.w3.org/2000/svg" itemSvgPath="M4 6h16M4 10h16M4 14h16M4 18h16" />
                        </NavLink>



                        {/* logout button */}
                        <div className="flex flex-col absolute bottom-0 mb-5 left-auto space-y-10">

                            <label className="cursor-pointer flex flex-row place-items-center space-x-4">
                                <svg className="stroke-base-content fill-primary" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                                <input type="checkbox" onClick={toggleMode} checked={themeMode.isMain} value={themeMode.isMain ? themeMode.mainTheme : themeMode.secondaryTheme} className="toggle theme-controller" />
                                <svg className="stroke-base-content fill-base-content" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
                            </label>

                            <button onClick={handleLogout} className="self-start btn btn-primary w-full">Logout</button>
                        </div>
                    </>
                ) :
                    (
                        <>
                            {/* if user is user or agent show */}
                            <NavLink to="/dashboard/knowledgebase" activeClassName="active" className="flex items-center space-x-2 mt-5">
                                        <SliderbarItem itemSvgXmlns="http://www.w3.org/2000/svg" itemSvgPath="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0a3 3 0 005-2.618A4.978 4.978 0 0117 15m0 5a3 3 0 01-3-3 4.978 4.978 0 01-.643-.036A3.001 3.001 0 007 20H2v-2a3 3 0 015.356-1.857A4.978 4.978 0 0112 17a4.978 4.978 0 01.643.036A3.001 3.001 0 0117 20zm-5-7a4 4 0 100-8 4 4 0 000 8z" itemLink="knowledgebase" />
                            </NavLink>

                            {userRole === 'User' || userRole === 'Agent' ? (

                                <>
                                    <NavLink to="/dashboard/mytickets" activeClassName="active" className="flex items-center space-x-2 mt-5">
                                        <SliderbarItem itemSvgXmlns="http://www.w3.org/2000/svg" itemSvgPath="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" itemLink="mytickets" />
                                    </NavLink>

                                    <NavLink to="/dashboard/messages" activeClassName="active" className="flex items-center space-x-2 mt-5">
                                        <SliderbarItem itemSvgXmlns="http://www.w3.org/2000/svg" itemSvgPath="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" itemLink="messages" />
                                    </NavLink>


                                </>
                            ) : (null)}

                            {/* Knowledge is availabe to everyone */}


                            {/* if user is manager show */}
                            {userRole === 'Manager' ? (
                                <>
                                    <NavLink to="/dashboard/reports" activeClassName="active" className="flex items-center space-x-2 mt-5">
                                        <SliderbarItem itemSvgXmlns="http://www.w3.org/2000/svg" itemSvgPath="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" itemLink="reports" />
                                    </NavLink>
                                    <NavLink to="/dashboard/analytics" activeClassName="active" className="flex items-center space-x-2 mt-5">
                                        <SliderbarItem itemSvgXmlns="http://www.w3.org/2000/svg" itemSvgPath="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" itemLink="analytics" />
                                    </NavLink>
                                </>
                            ) :
                            null}

                            {/*  if user is admin, show users tab */}
                            {userRole === 'Admin' ? (
                                <>
                                    <NavLink to="/dashboard/users" activeClassName="active" className="flex items-center space-x-2 mt-5">
                                        <SliderbarItem itemSvgXmlns="http://www.w3.org/2000/svg" itemSvgPath="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" itemLink="knowledgebase" />
                                    </NavLink>

                                    <NavLink to="/dashboard/preferences" activeClassName="active" className="flex items-center space-x-2 mt-5">
                                        <SliderbarItem itemSvgXmlns="http://www.w3.org/2000/svg" itemSvgPath="M19 14v1a2 2 0 01-2 2h-1.586a2 2 0 00-1.414.586l-1.708 1.707a2 2 0 01-2.828 0l-1.708-1.707a2 2 0 00-1.414-.586H7a2 2 0 01-2-2v-1a2 2 0 012-2h1.586a2 2 0 001.414-.586l1.708-1.707a2 2 0 012.828 0l1.708 1.707a2 2 0 001.414.586H17a2 2 0 012 2zm-7 3a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </NavLink>
                                </>
                            ) : (null)}

                            <NavLink to="/dashboard/profile" activeClassName="active" className="flex items-center space-x-2 mt-3">
                                <SliderbarItem itemSvgXmlns="http://www.w3.org/2000/svg" itemSvgPath="M4 6h16M4 10h16M4 14h16M4 18h16" />
                            </NavLink>
                        </>
                    )
                }



            </div >
            <ToastContainer />
        </>
    )
}

export default MainSliderbar