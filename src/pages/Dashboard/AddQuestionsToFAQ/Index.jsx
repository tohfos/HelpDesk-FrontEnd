import React from 'react'
import { useState } from 'react'
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';

const Index = () => {
    const [FAQ, setFAQ] = useState({
        category: '',
        subcategory: '',
        Question: '',
        Answer: ''
    })  
    const handleFAQChange = (e) => {
        setFAQ({
            ...FAQ,
            [e.target.name]: e.target.value
        })
        console.log(FAQ)
    }


    const HandleFAQbutton =async (e) => {
        e.preventDefault()
        console.log(FAQ)
        const response = await fetch(`${process.env.REACT_APP_EXPRESS_URL}/api/v1/admin/AddQuestionsToFAQ`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookies.get('token')

            },
            body: JSON.stringify(FAQ),
            credentials: 'include'

        })
        if (response.ok) {
            // Handle success, maybe redirect or show a success message
            console.log('FAQ Added successfully');
            success('FAQ ADDED successfully',response.message)
          } else {
            // Handle error, maybe show an error message
            console.error('Failed to Add FAQ');
            fail('Failed to Add FAQ', response.message)
          }
        window.location.reload();

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
  }

  return (
    <div className="hero  flex min-h-screen  justify-center py-12 overflow-visible bg-base-100" style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 100px)' }}>

      <div className="flex flex-col space-y-1">
                                    <label htmlFor="category" className="text-sm font-medium text-base-content">Category</label>
                                    <select required onChange={handleFAQChange} name="category" id="category" className="select select-bordered w-full">
                                        <option selected disabled value="Select">Select</option>
                                        <option value="Software">Software Issue</option>
                                        <option value="Hardware">Hardware Issue</option>
                                        <option value="Network">Network Issue</option>
                                    </select>
                                </div>

                                {FAQ.category === 'Software' && (
                                    <div className="flex flex-col space-y-1">
                                        <label htmlFor="subcategory" className="text-sm font-medium text-base-content">Subcategory</label>
                                        <select required onChange={handleFAQChange} name="subcategory" id="subcategory" className="select select-bordered w-full">
                                            <option selected disabled value="Select">Select</option>
                                            <option value="Operating System">Operating System</option>
                                            <option value="Application Software">Application Software</option>
                                            <option value="Custom Software">Custom Software</option>
                                            <option value="Integration Issues">Integration Issues</option>
                                        </select>
                                    </div>
                                )}

                                {FAQ.category === 'Hardware' && (
                                    <div className="flex flex-col space-y-1">
                                        <label htmlFor="subcategory" className="text-sm font-medium text-base-content">Subcategory</label>
                                        <select required onChange={handleFAQChange} name="subcategory" id="subcategory" className="select select-bordered w-full">
                                            <option selected disabled value="Select">Select</option>
                                            <option value="Desktop">Desktop</option>
                                            <option value="Laptops">Laptops</option>
                                            <option value="Printers">Printers</option>
                                            <option value="Servers">Servers</option>
                                            <option value="Networking Equipment">Networking Equipment</option>
                                        </select>
                                    </div>
                                )}

                                {FAQ.category === 'Network' && (
                                    <div className="flex flex-col space-y-1">
                                        <label htmlFor="subcategory" className="text-sm font-medium text-base-content">Subcategory</label>
                                        <select required onChange={handleFAQChange} name="subcategory" id="subcategory" className="select select-bordered w-full">
                                            <option selected disabled value="Select">Select</option>
                                            <option value="Email Issues">Email Issues</option>
                                            <option value="Internet Connection Problems">Internet Connection Problems</option>
                                            <option value="Website Error">Website Error</option>
                                        </select>
                                    </div>
                                )}

                                <div className="flex flex-col space-y-1">
                                    <label htmlFor="question" className="text-sm font-medium text-base-content">Question</label>
                                    <input required onChange={handleFAQChange} name="Question" id="Question" type="text" className="input input-bordered w-full" placeholder="Question" />
                                </div>

                                <div className="flex flex-col space-y-1">
                                    <label htmlFor="Answer" className="text-sm font-medium text-base-content">Answer</label>
                                    <input required onChange={handleFAQChange} name="Answer" id="Answer" type="text" className="input input-bordered w-full" placeholder="Answer" />
                                </div>

                                <div className='form-control mt-6 '>
                                    <button type="submit" className="btn btn-primary btn-wide shadow-md" onClick={HandleFAQbutton}>Add</button>
                                </div>


    </div>
  )
}

export default Index
