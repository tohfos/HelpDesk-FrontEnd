import React, { useEffect } from 'react'
import { useState } from 'react'
import Logo from '../../logo.svg'
import MainSliderbar from '../../components/MainSliderbar/MainSliderbar'
import { Outlet } from 'react-router-dom'
import Cookies from 'js-cookie'
import { jwtDecode } from "jwt-decode";
import Notification from '../../components/Notifications/Notification'
const Index = () => {


    useEffect(() => {


        const token = Cookies.get('token')
        if (token) {
            handleGetTheme();
            const user = jwtDecode(token)
            setUser(user.UserInfo.username)
            setUserRole(user.UserInfo.role)
            setLoading(false)
        }
        else {
            window.location.href = '/'
        }
    }, [])

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState('')
    const [userRole, setUserRole] = useState('')
    const [notifications,setNotifications] = useState([])
    const [displayedNotifications,setDisplayedNotifications]=useState([])
    const handleGetTheme = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_EXPRESS_URL}/auth/getTheme`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })

            const data = await response.json()
            // set the theme in local storage
            localStorage.setItem('mainTheme', data.mainTheme)
            localStorage.setItem('secondaryTheme', data.secondaryTheme)

            // set the data-theme attribute on the html tag
            if (localStorage.getItem('isMain') === 'true') {
                document.documentElement.setAttribute('data-theme', localStorage.getItem('mainTheme'))
            } else {
                document.documentElement.setAttribute('data-theme', localStorage.getItem('secondaryTheme'))
            }
        }
        catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        //fetch notifications
    }, [user])


    const fetchNotifications = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_EXPRESS_URL}/api/v1/user/getnotifcations`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Cookies.get('token')

                },
                credentials: 'include'
            })

            const data = await response.json()
            console.log(data)
            setNotifications(data)
            let notifText = notifications.map(notification=>notification.text)
            setDisplayedNotifications(notifText.map(notification =>notification))
           console.log(displayedNotifications)
        }
        catch (err) {
            console.log(err)
        }
    }


    return (
        <>
            <div class=" h-screen flex flex-col rounded-xl overflow-hidden shadow-xl mb-16"  >
                {/* <!-- navbar --> */}
                <div class=" border-b border-base-200 px-5 py-1 flex justify-between items-center">
                    <a href="profile" class="text-xl font-bold">
                        Welcome, {user} <br />
                        <span class="text-base font-medium">to the Dashboard</span>
                    </a>
                    <span>
                        <a href="/dashboard/knowledgebase">
                            <img src={Logo} class="h-12" alt="" />
                        </a>
                    </span>
                    {/* <!-- notifactions dropdown --> */}
                    <div class="dropdown dropdown-end" onClick={fetchNotifications}>
                        <div tabindex="0" class="m-1 btn btn-ghost btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <g>
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-1.11 0-2-.89-2-2h4c0 1.11-.89 2-2 2zm-1-3h2v-2h-2zm0-6h2V7h-2z" />
                                </g>
                            </svg>

                        </div>
                        <ul
                            tabindex="0"
                            class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-96 h-40 overflow-y"
                        >
                            <li>
                            {displayedNotifications.map((notification) => (
                                    <Notification notif={notification} />
                                ))}                            
                                </li>
                                {/* <li>
                                    <button onClick={setDisplayedNotifications(displayedNotifications.slice(1000).map(notification =>notification))}>View All</button>
                                </li> */}
                            
                        </ul>
                    </div>
                </div>

                {/* <!-- body --> */}
                <div class="h-full flex">

                    {/* <!-- Main Sliderbar --> */}
                    <MainSliderbar userRole={userRole} />

                    {/* <!-- Main Content --> */}
                    {loading ? (
                        <div className="w-full h-full flex justify-center items-center">
                            <span className="loading loading-spinner loading-lg"></span>
                        </div>
                    ) : (
                        // renders the outlet component, which can be MyTickets, Messages, Reports, KnowledgeBase, or Preferences
                        <Outlet />
                    )}
                </div>

            </div>
        </>
    )
}

export default Index