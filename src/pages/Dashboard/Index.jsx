import React from 'react'
import Logo from '../../logo.svg'
import MainSliderbar from '../../components/MainSliderbar'
import Chat from '../../components/Chat'
import SecondarySliderbar from '../../components/SecondarySliderbar'

const Index = () => {
    return (
        <>
            <div class=" h-full flex flex-col rounded-xl overflow-hidden shadow-xl mb-16"  >
                {/* <!-- navbar --> */}
                <div class=" border-b border-base-200 px-5 py-1 flex justify-between items-center">
                    <span>
                        <img src={Logo} class="h-12" alt="" />
                    </span>

                    {/* <!-- profile --> */}
                    <div class="flex space-x-4 items-center">
                        <img src="https://source.unsplash.com/random/500x500/?face" class="h-10 w-10 rounded-full" alt="" />

                    </div>

                </div>
                {/* <!-- body --> */}
                <div class="h-full flex">

                    <MainSliderbar />

                    {/* <!-- sidebar 2 --> */}
                    <SecondarySliderbar />

                    <Chat />
                </div>
            </div>
        </>
    )
}

export default Index