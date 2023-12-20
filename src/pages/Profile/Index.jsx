import React, { useEffect } from 'react'
import { useState } from 'react'
import Cookies from 'js-cookie'
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from 'react-toastify';


const Index = () => {



    const [User, setUser] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    })

   

    useEffect(() => {

        const fetchProfile = async () => {
            try {
              const response = await fetch(`${process.env.REACT_APP_EXPRESS_URL}/api/v1/user/profile`, {
                method: 'GET',
                headers: {
                  'Content-type': 'application/json',
                  'Authorization': 'Bearer ' + Cookies.get('token'),
                },
                credentials: 'include',
              });


              if(!response.ok) {
                console.error('Error:', response.statusText);
                return;
                }
              const data = await response.json();
              setUser(data);
              
            } catch (error) {
              console.error('Error fetching profile: ', error);
              fail('Failed to fetch profile');
            }
          };
        fetchProfile()
        
    }, [])


    const handleChange = (e) => {
        setUser({
            ...User,
            [e.target.name]: e.target.value
        })
        console.log(User)
    }
    const handleUpdate = async (e) => { 
        e.preventDefault()
        const token = Cookies.get('token')

        const Data = {
            firstName: User.firstName,
            lastName: User.lastName,
            phone: User.phone
        }
        
        const response = await fetch(`${process.env.REACT_APP_EXPRESS_URL}/api/v1/user/updateProfile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookies.get('token')
            },
            credentials: 'include',
            body: JSON.stringify(Data)
        })
        
        if (response.ok) {
            // Handle success, maybe redirect or show a success message

            console.log('Profile updated successfully');
            success('Profile updated successfully')
            //refresh page
            //window.location.reload();

          } else {
            // Handle error, maybe show an error message
            console.error('Failed to updated');
            fail('Failed to updated', response.message)
          }


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
    <>

        <div className="hero min-h-screen bg-base-200 mb-10">
            <div className="hero-content w-full flex-col lg:flex-row-reverse">
                <div className="card  w-full max-w-lg shadow-2xl bg-base-100">
                    <form className="card-body">
 
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">First Name: </span>
                            </label>
                            <input type="text" onChange={handleChange} name="firstName" value={User.firstName} className="input input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Last Name: </span>
                            </label>
                            <input type="text" onChange={handleChange} name="lastName" value={User.lastName} className="input input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email: </span>
                            </label>
                            <input type="text" aria-label="Email" value={User.email} name="email" className="input input-bordered" readOnly required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Phone: </span>
                            </label>
                            <input type="tel" onChange={handleChange} name="phone" value={User.phone} className="input input-bordered" required />
                        </div>

                        <div className="form-control">
                            <button className="btn btn-primary" onClick={handleUpdate}>Update</button>
                        </div>

                        <div className="form-control mt-1">
                            <a href="/resetpassword" className="label-text-alt link link-hover">Reset Password</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>




    </>
    



  )
}

export default Index
