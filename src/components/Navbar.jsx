import React, { useEffect } from 'react'
import { useState } from 'react'
import logo from '../logo.svg'

const Navbar = () => {

    const [theme, setTheme] = useState(localStorage.getItem('theme'))
    const isChecked = theme === 'lofi' ? false : true

    function toggleMode() {
        console.log(theme)
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

    return (
        <>
            <nav class="fixed w-full z-20 top-0 start-0 border-b shadow-lg">
                <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={logo} class="w-1/2" alt="Logo" />
                        <span class="self-center text-2xl font-semibold whitespace-nowrap text-primary"></span>
                    </a>
                    <div class="flex md:order-2 space-x-6 md:space-x-6 rtl:space-x-reverse">

                        <div class='dropdown'>
                            <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm md:hidden btn btn-outline" aria-controls="navbar-sticky" aria-expanded="false">
                                <span class="sr-only">Open main menu</span>
                                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                                </svg>
                            </button>
                            <ul class="menu menu-lg dropdown-content mt-3 z-[1] p-2 shadow rounded-box sticky">
                                <li><a>Homepage</a></li>
                                <li><a>Portfolio</a></li>
                                <li><a>About</a></li>
                                <li> <label className="cursor-pointer grid place-items-center">
                                    <input type="checkbox" onClick={toggleMode} checked={isChecked} value={theme} className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2" />
                                    <svg className="col-start-1 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
                                    <svg className="col-start-2 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                                </label>
                                </li>
                            </ul>
                        </div>

                        <button type="button" className="btn btn-outline btn-md">Login</button>

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
                                <a href="#" class="block py-2 px-3 hover:border-opacity-0 duration-200 hover:-translate-y-1 rounded md:p-0 " aria-current="page">Home</a>
                            </li>
                            <li>
                                <a href="#" class="block py-2 px-3 hover:border-opacity-0 duration-200 hover:-translate-y-1 rounded md:p-0 " aria-current="page">Home</a>


                            </li>
                            <li>
                                <a href="#" class="block py-2 px-3 hover:border-opacity-0 duration-200 hover:-translate-y-1 rounded md:p-0 " aria-current="page">Home</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar