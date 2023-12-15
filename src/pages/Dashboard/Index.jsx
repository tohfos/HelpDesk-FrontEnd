import React from 'react'
import { useState } from 'react'
import Logo from '../../logo.svg'
import MainSliderbar from '../../components/MainSliderbar/MainSliderbar'
import Chat from '../../components/Messages/Chat'
import SecondarySliderbar from './MessagesSliderbar/Index'
import { Outlet } from 'react-router-dom'

const Index = () => {

    // loading state of the outlet component
    const [loading, setLoading] = useState(false)

    return (
        <>
            <div class=" h-screen flex flex-col rounded-xl overflow-hidden shadow-xl mb-16"  >
                {/* <!-- navbar --> */}
                <div class=" border-b border-base-200 px-5 py-1 flex justify-between items-center">
                    <span>
                        <img src={Logo} class="h-12" alt="" />
                    </span>
                </div>
                {/* <!-- body --> */}
                <div class="h-full flex">

                    {/* <!-- Main Sliderbar --> */}
                    <MainSliderbar />

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