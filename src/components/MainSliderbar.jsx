import React from 'react'
import SliderbarItem from './SliderbarItem'
import ThemeSelector from './ThemeSelector'
import Themes from '../constants/Themes'

const MainSliderbar = () => {
    return (
        <>
            {/* <!-- slidebar 1 --> */}
            < div class="h-full w-64 border-r border-base-200 pt-10 px-5" >
                <p class="text-xs font-medium">Dashboard</p>

                <SliderbarItem itemName="My Tickets" itemSvgXmlns="http://www.w3.org/2000/svg" itemSvgPath="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />

                <SliderbarItem itemName="Messages" itemSvgXmlns="http://www.w3.org/2000/svg" itemSvgPath="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />

                <SliderbarItem itemName="Reports" itemSvgXmlns="http://www.w3.org/2000/svg" itemSvgPath="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />

                <SliderbarItem itemName="Knowledge Base" itemSvgXmlns="http://www.w3.org/2000/svg" itemSvgPath="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />

                <ul tabIndex={0} className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52 h-64 overflow-auto">
                    {
                        // map through the Themes array and return a ThemeSelector component for each theme
                        Themes.map((theme, index) => {
                            return (
                                <ThemeSelector
                                    key={index}
                                    ThemeTitle={theme}
                                />
                            )
                        })
                    }
                </ul>

            </div >
        </>
    )
}

export default MainSliderbar