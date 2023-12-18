import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Modal from 'react-modal';
import { ReactSortable } from "react-sortablejs";

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [changeRoleUser, setChangeRoleUser] = useState({
    "_id": "",
    "role": "",
    "Highresponsibility": "",
    "Midresponsibility": "",
    "Lowresponsibility": ""
  });

  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  const handleChange = (e) => {

    
    setChangeRoleUser({
      ...changeRoleUser,
      [e.target.name]: e.target.value,
      "Highresponsibility": items[0].name,
      "Midresponsibility": items[1].name,
      "Lowresponsibility": items[2].name
    })
    console.log(changeRoleUser)

    console.log(items)
  }

  const [items, setItems] = useState([
    { id: "Software", name: "Software" },
    { id: "Hardware", name: "Hardware" },
    { id: "Network", name: "Network" },
  ]);

  const onSortEnd = (newList) => {
    setItems(newList);

    setChangeRoleUser({
      ...changeRoleUser,
      "Highresponsibility": newList[0].name,
      "Midresponsibility": newList[1].name,
      "Lowresponsibility": newList[2].name
    })
  };

  const openModal = (userId) => {
    //setChangeRoleUser _id with userId
    setChangeRoleUser({
      ...changeRoleUser,
      "_id": userId
    })


    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }
  const handleUpdateRole = async (e) => {
    e.preventDefault();

    const Data = {
      "_id": changeRoleUser._id,
      "role": changeRoleUser.role
    };
    if(changeRoleUser.role === 'Agent'){
      
      Data["Highresponsibility"] = items[0].name;
      Data["Midresponsibility"] = items[1].name;
      Data["Lowresponsibility"] = items[2].name;
      
    }
    try {
      console.log('updating role');
      
      const response = await fetch(`${process.env.REACT_APP_EXPRESS_URL}/api/v1/admin/updateRole/${Data._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + Cookies.get('token')
        },
        credentials: 'include',
        body: JSON.stringify(Data)
      });

      if (!response.ok) {
        console.error('Error:', response.statusText);
        return;
      }

      const data = await response.json();
      console.log('data:', data);
      //refresh page
      window.location.reload();
      closeModal();
    } catch (error) {
      console.error('Error updating role:', error);
    }
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log('fetching users');
        const response = await fetch(`${process.env.REACT_APP_EXPRESS_URL}/api/v1/admin/getallusers`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Cookies.get('token')
          },
          credentials: 'include'
        });

        if (!response.ok) {
          console.error('Error:', response.statusText);
          return;
        }

        const data = await response.json();
        console.log('data:', data);
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <table className="table table-xs lg:table-lg overflow-auto my-24">
        <thead>
          <tr>
            <th></th>
            <th>UserName</th>
            <th>Role</th>
            <th>Email</th>
            <th>Change Role</th>
            {users.some(user => user.Role === 'Agent') && (
              <>
                <th>Highresponsibility</th>
                <th>Midresponsibility</th>
                <th>Lowresponsibility</th>
              </>
            )}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{user.UserName}</td>
              <td>{user.Role}</td>
              <td>{user.profile.email}</td>
              <td>
                <div className="form-control mt-6">
                  <button className="btn btn-outline ml-6" onClick={() => openModal(user._id)}>Change Role</button>
                </div>
              </td>
              {user.Role === 'Agent' && (
                <>
                  <td>{user.Highresponsibility}</td>
                  <td>{user.Midresponsibility}</td>
                  <td>{user.Lowresponsibility}</td>
                </>
              )}

            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Example Modal">
        <div className="flex justify-between items-center">
        
                <label className="label">
                  <span className="label-text">Role</span>
                </label>
                <select
                  className="select select-bordered"
                  name='role'
                  onChange={handleChange}
                  required
                >
                  <option selected disabled value="">Select Role</option>
                  <option value="User">User</option>
                  <option value="Agent">Agent</option>
                  <option value="Manager">Manager</option>
                </select>
                
                {changeRoleUser.role === 'Agent' && (
                  <>
                  <div className='card '>
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
                  </div>
                  
                    
                  </>
                )}
                  <div className="form-control mt-6">
                    <button className="btn btn-primary" onClick={handleUpdateRole}>Save Role</button>
                  </div>
          <button className="btn btn-outline" onClick={closeModal}>close</button>
        </div>
      </Modal>
    </>
  );
};

export default ViewUsers;
