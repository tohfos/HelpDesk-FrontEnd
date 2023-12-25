import { useState } from 'react'
import newReport from './newReport'
const GenReport = ({ onAdd ,report}) => {
  const [ticketId, setTicketId] = useState()

  const onSubmit = (e) => {
    e.preventDefault()

    if (!ticketId) {
      alert('Please add a ticket id')
      return
    }
    console.log(ticketId)
    onAdd({ ticketId })

    setTicketId('')
  }

  return (
   <>
   <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Ticket Id</label>
        <input
          type='text'
          placeholder=''
          value={ticketId}
          onChange={(e) => setTicketId(e.target.value)}
        />
      </div>
      

      <input type='submit' value='Generate' className='btn btn-block' />
      
    </form>
    <newReport report={report}/></>
  )
}

export default GenReport