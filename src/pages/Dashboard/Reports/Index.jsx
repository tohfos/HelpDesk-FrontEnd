import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import Header from '../../../components/Report/Header';
import GenReport from '../../../components/Report/GenReport';
import ViewReports from '../../../components/Report/ViewReports';

const ReportsContainer = () => {
  // const [reports, setReports] = useState([]);
  const [showGenReport, setShowGenReport] = useState(false);
  const [newReport, setNewReport] = useState({});

  

  const generateReport = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_EXPRESS_URL}/api/v1/manager/generateReport/${id.ticketId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + Cookies.get('token'),
        },
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok) {
        
        toast.success('Report Generated!', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setNewReport(data);
        
        
      window.location.reload();
    } else {
        fail(data.message);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      fail(error);
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

  return (
    <>
      <div>
      <Header onAdd={() => setShowGenReport(!showGenReport)} />
      {showGenReport && <GenReport onAdd={generateReport} report={newReport.ReportDetails} />}
   
    </div>

    <ViewReports  />
    
    
    
    </>
  
    
  );
};

export default ReportsContainer;
