import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CreateUser = () => {
  //const [selectedRole, setSelectedRole] = useState('');
  const [User, setUser] = useState({
    "UserName": "",
    "Password": "",
    "firstName": "",
    "lastName": "",
    "email": "",
    "phone": "",
    "Role": "",
    "Highresponsibility": "",
    "Midresponsibility": "",
    "Lowresponsibility": ""

  });


  const handleChange = (e) => {

    setUser({
      ...User, [e.target.name]: e.target.value
    })
    console.log(User)
  }
  const handleCreateUser = async (e) => {
    e.preventDefault();

    const usingUser = {
      "UserName": User.UserName,
      "Password": User.Password,
      "profile": {
        "firstName": User.firstName,
        "lastName": User.lastName,
        "email": User.email,
        "phone": User.phone
      },
      "Role": User.Role
    };

    if (User.Role === "Agent") {
      usingUser["Highresponsibility"] = User.Highresponsibility;
      usingUser["Midresponsibility"] = User.Midresponsibility;
      usingUser["Lowresponsibility"] = User.Lowresponsibility;
    }


    try {
      const response = await fetch(`${process.env.REACT_APP_EXPRESS_URL}/api/v1/admin/createUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + Cookies.get('token')
        },
        body: JSON.stringify(usingUser),
        credentials: 'include'
      });

      if (response.ok) {
        // Handle success, maybe redirect or show a success message
        console.log('User created successfully');
        success('User created successfully')
      } else {
        // Handle error, maybe show an error message
        console.error('Failed to create user');
        fail('Failed to create user')
      }
    } catch (error) {
      console.error('Error:', error);
      fail('Failed to create user')
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
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Create User</h1>
            <p className="py-6">Provide user details and role to create a new user.</p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input type="text" placeholder="Username" onChange={handleChange} className="input input-bordered" name='UserName' required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="Password" onChange={handleChange} name='Password' className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input type="text" placeholder="First Name" onChange={handleChange} name='firstName' className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <input type="text" placeholder="Last Name" onChange={handleChange} name='lastName' className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="Email" onChange={handleChange} name='email' className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone</span>
                </label>
                <input type="tel" placeholder="Phone" onChange={handleChange} name='phone' className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Role</span>
                </label>
                <select
                  className="select select-bordered"
                  name='Role'
                  defaultValue={"Select Role"}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="User">User</option>
                  <option value="Agent">Agent</option>
                  <option value="Manager">Manager</option>
                </select>
              </div>
              {/* Additional fields for Agent role */}
              {User.Role === 'Agent' && (
                <>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">High Responsibility</span>
                    </label>
                    <select
                      className="select select-bordered"
                      name='Highresponsibility'
                      defaultValue={"Select Role"}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Role</option>
                      <option value="Software">Software</option>
                      <option value="Hardware">Hardware</option>
                      <option value="Network">Network</option>
                    </select>
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Mid Responsibility</span>
                    </label>
                    <select
                      className="select select-bordered"
                      name='Midresponsibility'
                      defaultValue={"Software"}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Role</option>
                      <option value="Software">Software</option>
                      <option value="Hardware">Hardware</option>
                      <option value="Network">Network</option>
                    </select>
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Low Responsibility</span>
                    </label>
                    <select
                      className="select select-bordered"
                      name='Lowresponsibility'
                      defaultValue={"Software"}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Role</option>
                      <option value="Software">Software</option>
                      <option value="Hardware">Hardware</option>
                      <option value="Network">Network</option>
                    </select>
                  </div>
                </>
              )}
              <div className="form-control mt-6">
                <button className="btn btn-primary" onClick={handleCreateUser}>Create User</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default CreateUser