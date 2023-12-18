import React from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'

const Index = () => {
    const [reports, setReports] = useState([])


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
            setReports(data)
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div>Reports</div>
    )
}
export default Index