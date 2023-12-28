import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReactSortable } from "react-sortablejs";

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
      ...User,
      [e.target.name]: e.target.value,
      "Highresponsibility": items[0].name,
      "Midresponsibility": items[1].name,
      "Lowresponsibility": items[2].name
    })
    console.log(User)

    console.log(items)
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
      usingUser["Highresponsibility"] = items[0].name;
      usingUser["Midresponsibility"] = items[1].name;
      usingUser["Lowresponsibility"] = items[2].name;
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

      const data = await response.json()

      if (response.ok) {
        // Handle success, maybe redirect or show a success message
        console.log('User created successfully');
        success('User created successfully')
        window.location.reload();

      } else {
        // Handle error, maybe show an error message
        console.error('Failed to create user');
        fail(data.message)
      }
    } catch (error) {
      console.error('Error:', error);
      fail('Failed to create user ', error.message)
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


  const [items, setItems] = useState([
    { id: "Software", name: "Software" },
    { id: "Hardware", name: "Hardware" },
    { id: "Network", name: "Network" },
  ]);

  const onSortEnd = (newList) => {
    setItems(newList);

    setUser({
      ...User,
      "Highresponsibility": newList[0].name,
      "Midresponsibility": newList[1].name,
      "Lowresponsibility": newList[2].name
    })
  };

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
                  
                  onChange={handleChange}
                  required
                >
                  <option selected disabled value="">Select Role</option>
                  <option value="User">User</option>
                  <option value="Agent">Agent</option>
                  <option value="Manager">Manager</option>
                </select>
              </div>

              {User.Role === 'Agent' && (
                <>
                  <label className="label">
                    <span className="label-text text-lg font-semibold">Agent Responsibility</span>
                  </label>
                  <label className="label">
                    <span className="label-text text-xs text-success">Highest Responsibility</span>
                  </label>
                  <ReactSortable
                    list={items}
                    setList={setItems}
                    onSortEnd={onSortEnd}
                    onChange={handleChange}
                  >
                    {items.map((item) => (
                      <div key={item.id} className="px-3 py-2 border rounded-md mb-2" >
                        {/* drag icon */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 inline-block"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 9a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm0 4a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        &nbsp;
                        {item.name}
                      </div>
                    ))}
                  </ReactSortable>
                  <label className="label">
                    <span className="label-text text-xs text-error">Lowest Responsibility:</span>
                  </label>
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