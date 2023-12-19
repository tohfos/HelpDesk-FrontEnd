import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';

const Index = () => {
  const [profileData, setProfileData] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  const [updateProfile, setUpdatedProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    _id: '',
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setUpdatedProfileData({
      ...updateProfile,
      [e.target.name]: e.target.value,
    });
  };

  const openModal = (userId) => {
    setUpdatedProfileData({
      ...updateProfile,
      _id: userId,
    });
  };
  const closeModal = () => {
    setIsOpen(false);
  }

  const fetchUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_EXPRESS_URL}/api/v1/user/updateProfile`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + Cookies.get('token'),
        },
        credentials: 'include',
        body: JSON.stringify(updateProfile),
      });

      if (response.ok) {
        const data = await response.json();
        setUpdatedProfileData(data);
        success('Profile updated successfully');
      } else {
        const errorData = await response.json();
        fail('Failed to update profile: ' + errorData.message);
      }
    } catch (error) {
      console.error('Error updating profile: ', error);
      fail('Failed to update profile');
    }
  };

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

      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
        success('Profile fetched successfully');
      } else {
        const errorData = await response.json();
        fail('Failed to fetch profile: ' + errorData.message);
      }
    } catch (error) {
      console.error('Error fetching profile: ', error);
      fail('Failed to fetch profile');
    }
  };

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
    <>
      <div>
        <ToastContainer />
        <h1>User Profile</h1>
        {profileData ? (
          <div>
            <p>First Name: {profileData.firstName}</p>
            <p>Last Name: {profileData.lastName}</p>
            <p>Email: {profileData.email}</p>
            <p>Phone: {profileData.phone}</p>
          </div>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>

      <div className="form-control mt-6">
        <button className="btn btn-outline ml-6" onClick={() => openModal(user._id)}>
          Update Profile
        </button>
      </div>

      {/* Modal for updating profile */}
      {updateProfile._id && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <form onSubmit={fetchUpdateProfile}>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={updateProfile.firstName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={updateProfile.lastName}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={updateProfile.email}
                onChange={handleChange}
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={updateProfile.phone}
                onChange={handleChange}
              />
              <button type="submit">Update Profile</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Index;
