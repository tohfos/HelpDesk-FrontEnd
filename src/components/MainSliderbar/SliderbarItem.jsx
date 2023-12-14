import React from 'react'

const SliderbarItem = (props) => {
    return (
        <>
            <a href={props.itemLink}>
                <div
                    class="mt-4 py-1.5 text-sm font-normal group cursor-pointer flex items-center hover:font-semibold focus:border-b-0 duration-100">
                    <svg xmlns={props.itemSvgXmlns}
                        class="h-5 mr-4 duration-100" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">

                        <path stroke-linecap="round" stroke-linejoin="round"
                            d={props.itemSvgPath} />

                    </svg>
                    {props.itemName}
                </div>
            </a>
        </>
    )
}

export default SliderbarItem