import React from 'react'

const Contact = (props) => {
    return (
        <div
            class="px-5 py-4   flex items-center   cursor-pointer border-l-4 border-l-transparent hover:bg-base-300">

            <div class="ml-4">
                <p x-text="user.name" class="text-md font-semibold m-0 p-0">{props.contactName}
                </p>
                <p class="text-xs text-base-content -mt-0.5 font-semibold" x-text="user.email">{props.contactLastText}</p>
            </div>
        </div>
    )
}

export default Contact