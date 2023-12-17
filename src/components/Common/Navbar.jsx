import React, { useEffect } from 'react'
import { useState } from 'react'
import logo from '../../logo.svg'
import ThemeSelector from '../Preferences/ThemeSelector'
import Themes from '../../constants/Themes'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Navbar = () => {

    const [theme, setTheme] = useState(localStorage.getItem('theme'))
    const isChecked = theme === 'lofi' ? false : true
    const [progress, setProgress] = useState(0)

    //check if the user is on the dashboard page or any dashboard subpage
    const isDashboard = window.location.pathname.includes('/dashboard')

    //set the progress bar value as the user scrolls
    useEffect(() => {

        //if no theme is set in local storage, set it to lofi
        if (!localStorage.getItem('theme')) {
            localStorage.setItem('theme', 'black')
        }

        const onScroll = () => {
            const scrollCheck = document.body.scrollTop || document.documentElement.scrollTop
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
            const scrolled = (scrollCheck / height) * 100
            setProgress(scrolled)
        }
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    function toggleMode() {
        if (theme === 'lofi') {
            localStorage.setItem('theme', 'black')
            setTheme('black')
        } else {
            localStorage.setItem('theme', 'lofi')
            setTheme('lofi')
        }
    }

    useEffect(() => {
        //set data-theme attribute on html tag
        document.documentElement.setAttribute('data-theme', localStorage.getItem('theme'))
    }, [theme])

    return isDashboard ? null : (

        <>
            <div className="sticky top-0 start-0 z-40 drawer">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    {/* Navbar */}
                    <div class="w-full bg-base-200">
                        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                            <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
                                <img src={logo} class="w-1/2" alt="Logo" />
                                <span class="self-center text-2xl font-semibold whitespace-nowrap text-primary"></span>
                            </a>
                            <div class="flex md:order-2 space-x-6 md:space-x-6 rtl:space-x-reverse">

                                <div class='dropdown'>
                                    <div className="flex-none md:hidden">
                                        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                                        </label>
                                    </div>
                                    <ul class="menu menu-lg bg-base-200 dropdown-content z-40 mt-3 p-2 shadow rounded-box sticky">

                                    </ul>
                                </div>

                                <a type="button" href="/login" className="btn btn-outline btn-md">Login</a>

                                <div class="items-center justify-between hidden w-full md:flex md:w-auto">
                                    <label className="cursor-pointer grid place-items-center">
                                        <input type="checkbox" onClick={toggleMode} checked={isChecked} value={theme} className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2" />
                                        <svg className="col-start-1 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
                                        <svg className="col-start-2 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                                    </label>
                                </div>

                            </div>
                            <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                                <ul class="flex flex-col p-8 md:p-0 mt-4 font-medium border border-primary-content rounded-none md:space-x-16 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
                                    <li>
                                        <a href="/" class="block py-2 px-3 hover:border-opacity-0 duration-200 hover:-translate-y-1 rounded md:p-0 " aria-current="page">Home</a>
                                    </li>
                                    <li>
                                        <a href="/Features" class="block py-2 px-3 hover:border-opacity-0 duration-200 hover:-translate-y-1 rounded md:p-0 " aria-current="page">Features</a>


                                    </li>
                                    <li>
                                        <a href="/Contact" class="block py-2 px-3 hover:border-opacity-0 duration-200 hover:-translate-y-1 rounded md:p-0 " aria-current="page">Contact</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <progress className="sticky top-0 progress h-[1px]" value={progress} max="100"></progress>

                    </div>
                </div>
                <div className="drawer-side z-40">
                    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 space-y-4 w-2/3 min-h-full bg-base-200">
                        <li><a href='/'>Home</a></li>
                        <li><a href='/Features'>Features</a></li>
                        <li><a href='/Contact'>Contact</a></li>
                        <li> <label className="cursor-pointer grid place-items-center">
                            <input type="checkbox" onClick={toggleMode} checked={isChecked} value={theme} className="toggle theme-controller row-start-1 col-start-1 col-span-2" />
                            <svg className="col-start-2 row-start-1 stroke-base-content fill-base-content" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
                            <svg className="col-start-1 row-start-1 stroke-base-content fill-primary" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                        </label>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Navbar