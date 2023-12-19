import React from 'react'
import { useState } from 'react'
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const Index = () => {

    const [Knowledgebase, setKnowledgebase] = useState({
        category: '',
        subcategory: '',
        Question: '',
        Answer: '',
        Description: ''
    }) 
    const handleknoledgeChange = (e) => {
        setKnowledgebase({
            ...Knowledgebase,
            [e.target.name]: e.target.value
        })
        console.log(Knowledgebase)
    }

    const Handleknoledgebutton =async (e) => {
        e.preventDefault()
        console.log("123",Knowledgebase)
        const response = await fetch(`${process.env.REACT_APP_EXPRESS_URL}/api/v1/admin/AddDataToKnowledgeBase`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookies.get('token')

            },
            body: JSON.stringify(Knowledgebase),
            credentials: 'include'

        })
        if (response.ok) {
            // Handle success, maybe redirect or show a success message
            console.log('knoledgebase Added successfully');
            success('knowledgebase Added successfully',response.message)
          } else {
            // Handle error, maybe show an error message
            console.error('Failed to Add knoledgebase');
            fail('Failed to Add knowledgebase', response.message)
          }
        //window.location.reload();

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

  const success = (alert) => {
    toast.success(alert, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
        
  };
    return (
        <div className="hero flex min-h-screen justify-center py-12 overflow-visible bg-base-100" style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 100px)' }}>
        <div className="flex flex-col space-y-4 max-w-lg mx-auto">
    
            <div className="flex flex-col space-y-1">
                <label htmlFor="Category" className="text-sm font-medium text-base-content">Category</label>
                <select required onChange={handleknoledgeChange} name="Category" id="Category" className="select select-bordered w-full">
                     
                    <option selected disabled value="Select">Select</option>
                    <option value="Software">Software Issue</option>
                    <option value="Hardware">Hardware Issue</option>
                    <option value="Network">Network Issue</option>
                </select>
            </div>
    
            {Knowledgebase.Category === 'Software' && (
                <div className="flex flex-col space-y-1">
                    <label htmlFor="subcategory" className="text-sm font-medium text-base-content">Subcategory</label>
                    <select required onChange={handleknoledgeChange} name="SubCategory" id="SubCategory" className="select select-bordered w-full">
                        <option selected disabled value="Select">Select</option>
                        <option value="Operating System">Operating System</option>
                        <option value="Application Software">Application Software</option>
                        <option value="Custom Software">Custom Software</option>
                        <option value="Integration Issues">Integration Issues</option>
                    </select>
                </div>
            )}
    
            {Knowledgebase.category === 'Hardware' && (
                <div className="flex flex-col space-y-1">
                    <label htmlFor="subcategory" className="text-sm font-medium text-base-content">Subcategory</label>
                    <select required onChange={handleknoledgeChange} name="subcategory" id="subcategory" className="select select-bordered w-full">
                        <option selected disabled value="Select">Select</option>
                        <option value="Desktop">Desktop</option>
                        <option value="Laptops">Laptops</option>
                        <option value="Printers">Printers</option>
                        <option value="Servers">Servers</option>
                        <option value="Networking Equipment">Networking Equipment</option>
                    </select>
                </div>
            )}
    
            {Knowledgebase.category === 'Network' && (
                <div className="flex flex-col space-y-1">
                    <label htmlFor="subcategory" className="text-sm font-medium text-base-content">Subcategory</label>
                    <select required onChange={handleknoledgeChange} name="subcategory" id="subcategory" className="select select-bordered w-full">
                        <option selected disabled value="Select">Select</option>
                        <option value="Email Issues">Email Issues</option>
                        <option value="Internet Connection Problems">Internet Connection Problems</option>
                        <option value="Website Error">Website Error</option>
                    </select>
                </div>
            )}
    
            <div className="flex flex-col space-y-1">
                <label htmlFor="question" className="text-sm font-medium text-base-content">Question</label>
                <input required onChange={handleknoledgeChange} name="Question" id="Question" type="text" className="input input-bordered w-full" placeholder="Question" />
            </div>
    
            <div className="flex flex-col space-y-1">
                <label htmlFor="Answer" className="text-sm font-medium text-base-content">Answer</label>
                <input required onChange={handleknoledgeChange} name="Answer" id="Answer" type="text" className="input input-bordered w-full" placeholder="Answer" />
            </div>
    
            <div className="flex flex-col space-y-1">
                <label htmlFor="Description" className="text-sm font-medium text-base-content">Description</label>
                <input required onChange={handleknoledgeChange} name="Description" id="Description" type="text" className="input input-bordered w-full" placeholder="Description" />
            </div>
    
            <div className='form-control mt-6'>
                <button type="submit" className="btn btn-primary btn-wide shadow-md" onClick={Handleknoledgebutton}>Add</button>
            </div>
    
        </div>
    </div>
    
    )
}

export default Index