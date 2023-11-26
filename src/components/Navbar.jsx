import React from 'react'
import logo from '../logo.svg'

const Navbar = () => {
    return (
        <>
            <nav class="fixed w-full z-20 top-0 start-0 border-b bg-accent shadow-lg">
                <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={logo} class="w-1/2" alt="Logo" />
                        <span class="self-center text-2xl font-semibold whitespace-nowrap text-primary"></span>
                    </a>
                    <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">

                        <div class='dropdown'>
                            <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm md:hidden btn btn-outline" aria-controls="navbar-sticky" aria-expanded="false">
                                <span class="sr-only">Open main menu</span>
                                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                                </svg>
                            </button>
                            <ul class="menu menu-lg dropdown-content mt-3 z-[1] p-2 shadow bg-accent rounded-box sticky">
                                <li className='text-primary-content'><a>Homepage</a></li>
                                <li className='text-primary-content'><a>Portfolio</a></li>
                                <li className='text-primary-content'><a>About</a></li>
                            </ul>
                        </div>

                        <button type="button" className="btn btn-outline btn-md">Login</button>

                    </div>
                    <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                        <ul class="flex flex-col p-8 md:p-0 mt-4 font-medium border border-primary-content rounded-none md:space-x-16 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
                            <li>
                                <a href="#" class="block py-2 px-3 text-primary-content hover:border-opacity-0 duration-200 hover:-translate-y-1 rounded md:p-0 " aria-current="page">Home</a>
                            </li>
                            <li>
                                <a href="#" class="block py-2 px-3 text-primary-content hover:border-opacity-0 duration-200 hover:-translate-y-1 rounded md:p-0 " aria-current="page">Home</a>


                            </li>
                            <li>
                                <a href="#" class="block py-2 px-3 text-primary-content hover:border-opacity-0 duration-200 hover:-translate-y-1 rounded md:p-0 " aria-current="page">Home</a>

                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar