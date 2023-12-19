import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
//TODO: zabet el html 
const Index = () => {
  const [profileData, setProfileData] = useState(null);
  const [updateProfile, setupdatedProfileData] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);
  const handleChange = (e) => {
    setupdatedProfileData({
      ...updateProfile,
      [e.target.name]: e.target.value,
    
    })
    console.log(updateProfile)

  }

  const openModal = (userId) => {
    setupdatedProfileData({
      ...updateProfile,
      "_id": userId
    })


    setIsOpen(true);
  }
  const closeModal = () => {
    setIsOpen(false);
  }
  const fetchupdateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_EXPRESS_URL}/api/v1/user/updateProfile`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + Cookies.get('token'),
        },
        credentials: 'include',
        body: JSON.stringify(updatedProfile),
      });

      if (response.ok) {
        const data = await response.json();
        setupdatedProfileData(data);
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

  return (<>
  
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
          <button className="btn btn-outline ml-6" onClick={() => openModal(user._id)}>update Profile</button>
          </div>
    </>
  );
};

export default Index;
