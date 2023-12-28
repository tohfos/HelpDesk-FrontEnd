import React from 'react'
import ReactModal from 'react-modal'

const ViewTicketModal = ({ isOpen, onRequestClose, ticket }) => {

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
                            <div className="flex flex-col items-center justify-center text-center space-y-2">
                                <div className="font-semibold text-3xl">
                                    <p>Ticket: {ticket.title}</p>
                                    <button onClick={onRequestClose} className="absolute top-0 right-0 p-2 m-2 rounded-full hover:bg-base-300 focus:outline-none focus:bg-base-content transition ease-in-out duration-150">
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="flex flex-col text-sm font-medium text-base-content space-y-4">
                                    <p>ticket id: {ticket._id}</p>
                                    <p>Created at: {ticket.createdAt}</p>
                                    <p>Created by: {ticket.createdBy}</p>
                                    <p>Status: {ticket.status}</p>
                                    <p>Priority: {ticket.priority}</p>
                                    <p>Rating: {ticket.rating}</p>
                                    <p>Assigned to: {ticket.assignedTo}</p>
                                    <p>Category: {ticket.ticketCategory}</p>
                                    <p>Sub-Category: {ticket.SubCategory}</p>
                                    <p>Description: {ticket.description}</p>
                                    <p>Update Date: {ticket.updateDate}</p>
                                    <p>Update At: {ticket.updatedAt}</p>
                                    <p>Answer: {ticket.UpdateDetails}</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </ReactModal>
        </>
    )
}

export default ViewTicketModal