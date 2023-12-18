import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Modal from 'react-modal';

const ViewUsers = () => {
  const [users, setUsers] = useState([]);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
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
                  <button className="btn btn-outline ml-6" onClick={openModal}>Change Role</button>
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
          <h2>Change Role</h2>
          <button className="btn btn-outline" onClick={closeModal}>close</button>
        </div>
      </Modal>
    </>
  );
};

export default ViewUsers;
