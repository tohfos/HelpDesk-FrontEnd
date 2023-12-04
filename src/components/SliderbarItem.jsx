import React from 'react'

const SliderbarItem = (props) => {
    return (
        <>
            <div
                class="mt-4 py-1.5 text-sm font-medium hover:font-bold hover:animate-pulse duration-100 group cursor-pointer flex items-center">
                <svg xmlns={props.itemSvgXmlns}
                    class="h-5 mr-4 group-hover:animate-pulse duration-100" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">

                    <path stroke-linecap="round" stroke-linejoin="round"
                        d={props.itemSvgPath} />

                </svg>
                {props.itemName}
            </div>
        </>
    )
}

export default SliderbarItem