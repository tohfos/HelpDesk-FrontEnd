import React from 'react'
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';

const Index = () => {

  const handelBackup = async () => {
    const response = await fetch(`${process.env.REACT_APP_EXPRESS_URL}/api/v1/admin/backup`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + Cookies.get('token')
      },
      credentials: 'include',

    });

    if (response.ok) {
      // Handle success, maybe redirect or show a success message
      console.log('Backup Added successfully');
      success('Backup Added successfully', response.message)
    } else {
      // Handle error, maybe show an error message
      console.error('Backup failed to Add');
      fail('Backup failed to Add', response.message)
    }

  }

  const handelrestore = async () => {
    const response = await fetch(`${process.env.REACT_APP_EXPRESS_URL}/api/v1/admin/restore`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + Cookies.get('token')
      },
      credentials: 'include',

    });
    if (response.ok) {
      // Handle success, maybe redirect or show a success message
      console.log('Restored successfully');
      success('Restored successfully', response.message)
    } else {
      // Handle error, maybe show an error message
      console.error('Restore failed to Add');
      fail('Restore failed to Add', response.message)
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
      <div className='hero'>
        <div className='hero-content flex-col lg:flex-row'>

          {/* Backup Button */}
          <div className="form-control mt-6">
            <button className="btn btn-outline btn-info ml-6" onClick={handelBackup}>
              Backup
            </button>
          </div>

          {/* Restore Button */}
          <div className="form-control mt-6">
            <button className="btn btn-outline btn-error ml-6" onClick={handelrestore}>
              Restore
            </button>
          </div>

        </div>
      </div>

    </>


  )
}

export default Index
