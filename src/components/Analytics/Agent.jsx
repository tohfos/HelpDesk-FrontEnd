import { useState } from "react";

const Agent = ({onAdd}) => {
    const [agentId , setAgentId]= useState('')
    const onSubmit = (e) => {
        e.preventDefault()
    
        if (!agentId) {
          alert('Please add an agent id')
          return
        }
        onAdd({ agentId })
    
        setAgentId('')
      }
    return (
    <div>
        <   input type="text" 
            placeholder="Type here" 
            className="input input-bordered w-full max-w-xs" 
            value={agentId}
            onChange={(e) => setAgentId(e.target.value)}
        />
        <input type='submit' value='Generate' className='btn btn-block' onClick={onSubmit}/>

    </div>
  )
}

export default Agent
