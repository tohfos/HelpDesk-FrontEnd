import { useState } from "react";

const TicketCategory = ({onAdd}) => {
    const [category,setCategory]= useState('')
    const onSubmit = (e) => {
        e.preventDefault()
    
        if (!category) {
          alert('Please select a category')
          return
        }
        onAdd({ category })
    
        setCategory('')
      }
    const handleChange = (event) => {

        setCategory(event.target.value);
     
    };
    return (
    <div>
      

<select onChange={handleChange} class="select select-bordered w-full max-w-xs">

  <option disabled selected>Category</option>

  <option value="Software">Software</option>

  <option value="Hardware">Hardware</option>

  <option value="Network">Network</option>

  <option value="Other">Other</option>
</select>

<input type='submit' value='Generate' className='btn btn-block' onClick={onSubmit}/>
    </div>
  )
}

export default TicketCategory
