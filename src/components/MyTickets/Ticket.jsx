import React from 'react'
import ThemeSelector from '../Preferences/ThemeSelector'

const Ticket = () => {
    return (
        <>
            <div className="card card-compact w-2/3 h-40 bg-base-100 shadow-sm">

                <div className="card-body">
                    <h2 className="card-title">Shoes!</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Ticket