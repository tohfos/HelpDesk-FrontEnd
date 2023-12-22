import React from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'
//import Header from '../../../components/Report/Header'
import Header from '../../../components/Report/Header'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import GenReport from '../../../components/Report/GenReport'

const Index = () => {
    const [reports, setReports] = useState([])
    const [showGenReport, setShowGenReport] = useState(false)
    const [newReport,setNewReport] = useState({})

    useEffect(() => {
        fetchReports();
    }, []);

    useEffect(() => {
        console.log(reports);
    }, [reports]);


    const fetchReports = async () => {

        try {
            const response = await fetch(`${process.env.REACT_APP_EXPRESS_URL}/api/v1/manager/getReports`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Cookies.get('token')
                },
                credentials: 'include'
            })
            const data = await response.json()
            setNewReport(data)
        }
        catch (error) {
            console.log(error)
        }
    }
    const generateReport = async (id)=>{
        try {
            console.log(id.ticketId)
            const response = await fetch(`${process.env.REACT_APP_EXPRESS_URL}/api/v1/manager/generateReport/${id.ticketId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Cookies.get('token')
                },
                credentials: 'include'
            })
            const data = await response.json()
            console.log(data)
            setNewReport(data)
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div><Header
        onAdd={() => setShowGenReport(!showGenReport)}
      />
      
              <>
                {showGenReport && <GenReport onAdd={generateReport} report={newReport.ReportDetails} />}
                <h3>{newReport.ReportDetails}</h3>
              </>

    
           </div>
    )
}
export default Index