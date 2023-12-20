import React, { useEffect } from 'react'
import { useState } from 'react'
import Logo from '../../logo.svg'
import MainSliderbar from '../../components/MainSliderbar/MainSliderbar'
import Chat from '../../components/Messages/Chat'
import SecondarySliderbar from './MessagesSliderbar/Index'
import { Outlet } from 'react-router-dom'
import Cookies from 'js-cookie'
import { jwtDecode } from "jwt-decode";



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
                        <img src={Logo} class="h-12" alt="" />
                    </span>
                </div>

                {/* <!-- body --> */}
                <div class="h-full flex">

                    {/* <!-- Main Sliderbar --> */}
                    <MainSliderbar userRole={userRole} />

                    {/* <!-- Main Content --> */}
                    {loading ? (
                        <div className="w-full h-full flex justify-center items-center">
                            <h1 className="text-3xl font-semibold text-primary">Loading...</h1>
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