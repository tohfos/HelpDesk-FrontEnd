import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import Cookies from 'js-cookie'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { jwtDecode } from 'jwt-decode'


const CreateTicketButton = ({ onTicketCreated }) => {

    const [modalIsOpen, setModalIsOpen] = React.useState(false)
    const [rangeClassName, setRangeClassName] = useState('range-success')
    const [loading, setLoading] = useState(false)


    const handleOpenModal = () => {
        setModalIsOpen(true)
    }

    const modalOnRequestClose = () => {
        setModalIsOpen(false)
    }


    const [ticket, setTicket] = useState({
        subject: '',
        message: '',
        priority: 0,
        category: '',
        subcategory: ''
    })

    const [workflow, setWorkflow] = useState([])

    const handleTicketChange = (e) => {
        const { name, value } = e.target;
        if (name === "category") {
            setTicket({
                ...ticket,
                [name]: value,
                subcategory: ""
            })
        } else {
            setTicket({
                ...ticket,
                [name]: value,
            })
        }

        if (name === 'priority') {
            if (value === '0') {
                setRangeClassName('range-success')
            } else if (value === '1') {
                setRangeClassName('range-warning')
            } else if (value === '2') {
                setRangeClassName('range-error')
            }
        }
        console.log(ticket)

        if (ticket.category !== "" && ticket.subcategory !== "") handleGetAutomationAndWorkflow();
    }
    useEffect(() => {
        handleGetAutomationAndWorkflow()
    }, [ticket.category, ticket.subcategory])



    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)

        if (ticket.subject === '' || ticket.message === '' || ticket.category === '') {
            console.log('Please fill out all the fields')
            fail('Please fill out all the fields')
            return
        }

        let input = {
            ticketCategory: ticket.category,
            SubCategory: ticket.subcategory,
            priority: ticket.priority === '0' ? 'Low' : ticket.priority === '1' ? 'Medium' : ticket.priority === '2' ? 'High' : "Low",
            title: ticket.subject,
            description: ticket.message,
        }

      //  console.log(Cookies.get('token'))

        try {


            const response = await fetch(`${process.env.REACT_APP_EXPRESS_URL}/api/v1/user/create`, {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Cookies.get('token')
                },
                body: JSON.stringify(input),
                credentials: 'include'
            })
            let data = await response.json()
            console.log(data)

            if (response.ok) {
                setLoading(false)
                // Close the modal
                modalOnRequestClose()

                // show success toast
                success("Ticket has been created")
                // Update the parent component with the new ticket
                onTicketCreated();

                // reset the ticket state
                setTicket({
                    subject: '',
                    message: '',
                    priority: 0,
                    category: '',
                    subcategory: ''
                })

                //set loading to false

                // refresh the page
                // window.location.reload()
            }
        } catch (error) {
            console.log(error)
            fail(error)
            setLoading(false)
        }
    }


    const handleGetAutomationAndWorkflow = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_EXPRESS_URL}/api/v1/user/workflow/${ticket.category}/${ticket.subcategory}`,
            {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + Cookies.get("token"),
                },
                credentials: "include",
            }
        )

        const data = await response.json();
        let filteredWorkflow;
        filteredWorkflow = data.filter(
            (workflow) => workflow.Description !== undefined
        );
        setWorkflow(filteredWorkflow)
        console.log("workflow", workflow)
    }

    const success = (alert) => {
        toast.success(alert, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            draggable: true
        })
    }

    const fail = (alert) => {
        toast.error(alert, {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    return (
        <>
            <button className="btn btn-primary btn-wide shadow-md" onClick={handleOpenModal}>Create Ticket</button>

            {loading && (
                <div style={{
                    overlay: {
                        zIndex: 99,
                    },
                }}
                    className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-black opacity-50">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            )} {modalIsOpen && (
                <>
                    <Modal style={{
                        overlay: {
                            zIndex: 98,
                        },
                    }} className={"overflow-auto"} isOpen={modalIsOpen} onRequestClose={modalOnRequestClose}>
                        <div className="relative flex min-h-screen flex-col justify-center py-12 overflow-visible bg-base-100" style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 100px)' }}>
                            <div className="relative px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                                <div className="mx-auto flex w-full max-w-md flex-col space-y-16 ">
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
                                            <input required onChange={handleTicketChange} type="text" name="subject" id="subject" placeholder="Subject" className="input input-bordered" />
                                        </div>

                                        <div className="flex flex-col space-y-1">
                                            <label htmlFor="message" className="text-sm font-medium text-base-content">Message</label>
                                            <textarea required onChange={handleTicketChange} name="message" id="message" placeholder="Message" className="textarea textarea-bordered h-24 max-h-44" />
                                        </div>

                                        <div className="flex flex-col space-y-1">
                                            <label htmlFor="priority" className="text-sm font-medium text-base-content">Priority</label>
                                            <input type="range" name="priority" value={ticket.priority} id="priority" onChange={handleTicketChange} min={0} max="2" className={`range ${rangeClassName}`} step="1" />
                                            <div className="w-full flex justify-between text-xs px-2">
                                                <span value="low">Low</span>
                                                <span value="medium">Medium</span>
                                                <span value="high">High</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-col space-y-1">
                                            <label htmlFor="category" className="text-sm font-medium text-base-content">Category</label>
                                            <select required onChange={handleTicketChange} name="category" id="category" className="select select-bordered w-full">
                                                <option selected disabled value="Select">Select</option>
                                                <option value="Software">Software Issue</option>
                                                <option value="Hardware">Hardware Issue</option>
                                                <option value="Network">Network Issue</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>

                                        {ticket.category === 'Software' && (
                                            <div className="flex flex-col space-y-1">
                                                <label htmlFor="subcategory" className="text-sm font-medium text-base-content">Subcategory</label>
                                                <select required onChange={handleTicketChange} name="subcategory" id="subcategory" className="select select-bordered w-full">
                                                    <option selected disabled value="Select">Select</option>
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
                                                <select required onChange={handleTicketChange} name="subcategory" id="subcategory" className="select select-bordered w-full">
                                                    <option selected disabled value="Select">Select</option>
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
                                                <select required onChange={handleTicketChange} name="subcategory" id="subcategory" className="select select-bordered w-full">
                                                    <option selected disabled value="Select">Select</option>
                                                    <option value="Email Issues">Email Issues</option>
                                                    <option value="Internet Connection Problems">Internet Connection Problems</option>
                                                    <option value="Website Error">Website Error</option>
                                                </select>
                                            </div>
                                        )}


                                        <div className="ml-5 space-y-4 my-24">

                                            <ol className='list-decimal ml-4'>
                                                {workflow.map((workflow, index) => (
                                                    <li key={index} className='text-primary w-full'>{workflow.Description}</li>
                                                ))}
                                            </ol>
                                        </div>


                                        <div className="flex flex-row space-x-2 self-end">
                                            <button onClick={modalOnRequestClose} className="btn btn-ghost">Cancel</button>
                                            <button onClick={handleSubmit} className="btn btn-primary">Create Ticket</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal >
                </>
            )}
            <ToastContainer />
        </>
    )
}

export default CreateTicketButton