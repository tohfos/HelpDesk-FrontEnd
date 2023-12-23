import React, { useState } from 'react'
import ReactModal from 'react-modal'
import Cookies from 'js-cookie'



const RateTicketModal = ({ isOpen, onRequestClose, ticket }) => {

    const [rating, setRating] = useState(1);

    const handleRatingChange = (event) => {
        setRating(event.target.value);

        console.log(rating);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${process.env.REACT_APP_EXPRESS_URL}/api/v1/user/rate/${ticket._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Cookies.get('token')
                },
                body: JSON.stringify({
                    rating: rating
                })
            });
            const data = await response.json();
            console.log(data);
            if (data.success) {
                console.log('success');
            }
            onRequestClose();
            window.location.reload();
        }
        catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <>
            <ReactModal style={{
                overlay: {
                    zIndex: 99,
                },
            }} className={"overflow-auto"} isOpen={isOpen} onRequestClose={onRequestClose}>
                <div className="relative flex min-h-screen flex-col justify-center py-12 overflow-visible bg-base-100" style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 100px)' }}>
                    <div className="relative px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                        <div className="mx-auto flex w-full max-w-md flex-col space-y-16 ">
                            <div className="flex flex-col items-center justify-center text-center space-y-6">
                                <div className="font-semibold text-3xl">
                                    <p>Rate Ticket: {ticket.title}</p>
                                    <button onClick={onRequestClose} className="absolute top-0 right-0 p-2 m-2 rounded-full hover:bg-base-300 focus:outline-none focus:bg-base-content transition ease-in-out duration-150">
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="rating my-10">
                                    {[...Array(5)].map((star, i) => {
                                        const ratingValue = i + 1;
                                        return (
                                            <label key={i}>
                                                <input
                                                    type="radio"
                                                    name="rating-2"
                                                    className={`mask mask-star-2 ${ratingValue <= rating ? "bg-orange-400" : "bg-white"} `}
                                                    value={ratingValue}
                                                    onClick={handleRatingChange}
                                                />
                                                <i className={ratingValue <= rating ? "filled-star" : "empty-star"} />
                                            </label>
                                        );
                                    })}
                                </div>
                                <button onClick={handleSubmit} className="btn btn-primary btn-wide">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </ReactModal>
        </>
    )
}

export default RateTicketModal