import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Modal from 'react-modal';
import { ReactSortable } from "react-sortablejs";
import { toast, ToastContainer } from 'react-toastify';


const ViewReports = () => {
    const [reports, setReports] = useState([]);


    useEffect(() => {
     fetchReports();
    }, []);


    // useEffect(() => {
  //   console.log("Reports 2",reports);
  // }, [reports]);






    const fetchReports = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_EXPRESS_URL}/api/v1/manager/getReports`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + Cookies.get('token'),
            },
            credentials: 'include',
          });
          const data = await response.json();
          setReports(data); // Assuming data is an array of reports
          console.log("reports",);
        } catch (error) {
          console.log(error);
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
      }




    return (
<>

<div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>User</th>
        <th>Report details</th>
      </tr>
    </thead>
    <tbody>
    {reports.map((report, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{report.user}</td>
              <td>{report.ReportDetails}</td>

            </tr>
          ))}
    </tbody>
  </table>
</div>


</>



    );

};



export default ViewReports;