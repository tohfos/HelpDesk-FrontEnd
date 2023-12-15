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

    return (
        <div>
            <button className="btn btn-primary" onClick={handleOpenModal}>Create Ticket</button>

            <Modal className={'overflow-hidden'} isOpen={modalIsOpen} onRequestClose={modalOnRequestClose}>

            </Modal>

        </div>
    )
}

export default CreateTicketButton