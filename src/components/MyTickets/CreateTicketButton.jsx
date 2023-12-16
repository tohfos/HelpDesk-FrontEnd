import React, { useState } from 'react'
import Modal from 'react-modal'

const CreateTicketButton = () => {

    const [modalIsOpen, setModalIsOpen] = React.useState(false)

    const handleOpenModal = () => {
        setModalIsOpen(true)
    }

    const modalOnRequestClose = () => {
        setModalIsOpen(false)
    }


    const [ticket, setTicket] = useState({
        subject: '',
        message: '',
        priority: '',
        category: '',
        subcategory: ''
    })

    const handleTicketChange = (e) => {
        setTicket({
            ...ticket,
            [e.target.name]: e.target.value
        })

        console.log(ticket)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Ticket Created')
    }





    return (
        <div>
            <button className="btn btn-primary btn-wide shadow-md" onClick={handleOpenModal}>Create Ticket</button>

            <Modal className={'overflow-hidden'} isOpen={modalIsOpen} onRequestClose={modalOnRequestClose}>
                <div className="relative flex min-h-screen flex-col justify-center overflow-hidden py-12">
                    <div className="relative px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl bg-base-100">
                        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                            <div className="flex flex-col items-center justify-center text-center space-y-2">
                                <div className="font-semibold text-3xl">
                                    <p>Create Ticket</p>
                                </div>
                                <div className="flex flex-row text-sm font-medium text-base-content">
                                    <p>Fill out the form below to create a ticket.</p>
                                </div>
                            </div>

                            <div className="flex flex-col space-y-4">
                                <div className="flex flex-col space-y-1">
                                    <label htmlFor="subject" className="text-sm font-medium text-base-content">Subject</label>
                                    <input onChange={handleTicketChange} type="text" name="subject" id="subject" placeholder="Subject" className="input input-bordered" />
                                </div>

                                <div className="flex flex-col space-y-1">
                                    <label htmlFor="message" className="text-sm font-medium text-base-content">Message</label>
                                    <textarea onChange={handleTicketChange} name="message" id="message" placeholder="Message" className="textarea textarea-bordered h-24" />
                                </div>

                                <div className="flex flex-col space-y-1">
                                    <label htmlFor="priority" className="text-sm font-medium text-base-content">Priority</label>
                                    <select onChange={handleTicketChange} name="priority" id="priority" className="select select-bordered w-full">
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>

                                <div className="flex flex-col space-y-1">
                                    <label htmlFor="category" className="text-sm font-medium text-base-content">Category</label>
                                    <select defaultValue={"Choose Category"} onChange={handleTicketChange} name="category" id="category" className="select select-bordered w-full">
                                        <option value="Software">Software Issue</option>
                                        <option value="Hardware">Hardware Issue</option>
                                        <option value="Network">Network Issue</option>
                                    </select>
                                </div>

                                {ticket.category === 'Software' && (
                                    <div className="flex flex-col space-y-1">
                                        <label htmlFor="subcategory" className="text-sm font-medium text-base-content">Subcategory</label>
                                        <select defaultValue={"Choose Sub-Category"} onChange={handleTicketChange} name="subcategory" id="subcategory" className="select select-bordered w-full">
                                            <option value="Operating System">Operating System</option>
                                            <option value="Application Software">Application Software</option>
                                            <option value="Custom Software">Custom Software</option>
                                            <option value="Integration Issues">Integration Issues</option>
                                        </select>
                                    </div>
                                )}

                                {ticket.category === 'Hardware' && (
                                    <div className="flex flex-col space-y-1">
                                        <label htmlFor="subcategory" className="text-sm font-medium text-base-content">Subcategory</label>
                                        <select defaultValue={"Choose Sub-Category"} onChange={handleTicketChange} name="subcategory" id="subcategory" className="select select-bordered w-full">
                                            <option value="Desktop">Desktop</option>
                                            <option value="Laptops">Laptops</option>
                                            <option value="Printers">Printers</option>
                                            <option value="Servers">Servers</option>
                                            <option value="Networking Equipment">Networking Equipment</option>
                                        </select>
                                    </div>
                                )}

                                {ticket.category === 'Network' && (
                                    <div className="flex flex-col space-y-1">
                                        <label htmlFor="subcategory" className="text-sm font-medium text-base-content">Subcategory</label>
                                        <select defaultValue={"Choose Sub-Category"} onChange={handleTicketChange} name="subcategory" id="subcategory" className="select select-bordered w-full">
                                            <option value="Email Issues">Email Issues</option>
                                            <option value="Internet Connection Problems">Internet Connection Problems</option>
                                            <option value="Website Error">Website Error</option>
                                        </select>
                                    </div>
                                )}


                                <div className="flex flex-row space-x-2 self-end">
                                    <button onClick={modalOnRequestClose} className="btn btn-ghost">Cancel</button>
                                    <button onClick={handleSubmit} className="btn btn-primary">Create Ticket</button>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </Modal>

        </div>
    )
}

export default CreateTicketButton