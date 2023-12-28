import { useState } from "react";


const SubCategory = ({onAdd}) => {
  const [subCategory,setSubCategory] = useState('')
  const [category,setCategory]=useState('')
  const onSubmit = (e) => {
    e.preventDefault()

    if (!subCategory) {
      alert('Please select a sub-category')
      return
    }
    onAdd({ subCategory })
    
    setSubCategory('')
    setCategory('')
  } 
  const handleChange = (event) => {

    setCategory(event.target.value);
 
};
const handleChangeSub = (event) => {

    setSubCategory(event.target.value);
 
}; 
  return (
    <div>
      <>
      <select onChange={handleChange} class="select select-bordered w-full max-w-xs">

<option disabled selected>Category</option>

<option value="Software">Software</option>

<option value="Hardware">Hardware</option>

<option value="Network">Network</option>
</select></>
<>
    {category==='Software'&&
    <select onChange={handleChangeSub} class="select select-bordered w-full max-w-xs">

    <option disabled selected>Sub-Category</option>
    
    <option value="Operating System">Operating System</option>
    
    <option value="Application Software">Application Software</option>
    
    <option value="Custom Software">Custom Software</option>
    
    <option value="Integration Issues">Integration Issues</option>

    </select>
    }
    {category==='Hardware'&&
    <select onChange={handleChangeSub} class="select select-bordered w-full max-w-xs">

    <option disabled selected>Sub-Category</option>
    
    <option value="Desktop">Desktop</option>
    
    <option value="Laptops">Laptops</option>
    
    <option value="Printers">Printers</option>
    
    <option value="Servers">Servers</option>
    
    <option value="Networking Equipment">Networking Equipment</option>

    </select>
    }
    {category==='Network'&&
    <select onChange={handleChangeSub} class="select select-bordered w-full max-w-xs">

    <option disabled selected>Sub-Category</option>
    
    <option value="Email Issues">Email Issues</option>
    
    <option value="Internet Connection Problems">Internet Connection Problems</option>
    
    <option value="Website Error">Website Error</option>
    
    </select>
    }</>
    <input type='submit' value='Generate' className='btn btn-block' onClick={onSubmit}/>
    </div>
  )
}

export default SubCategory
