import React from 'react'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'


const Index = () => {
  const [logs, setLogs] =  useState([]);


  const fetchLogs = async () => {

    const response = await fetch(`${process.env.REACT_APP_EXPRESS_URL}/api/v1/admin/getLogs`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + Cookies.get('token')
      },
    })
    const data = await response.json()
    console.log(data)
    setLogs(data)
    
  }

  useEffect(() => {
    fetchLogs()
  }, [])

  
  return (
    <div className="overflow-x-auto ml-5">
      <table className="table table-xs">
      <thead>
        <tr>
          <th></th> 
          <th>DateTime</th> 
          <th>Req ID</th> 
          <th>Message</th> 
          <th>origin</th> 
        </tr>
      </thead> 
      <tbody>
        {logs.map((log, index) => (
          <tr key={index + 1}>
          <tb>{index}</tb>
          <td>{log.dateTime}</td> 
          <td>{log.uuid}</td> 
          <td>{log.message}</td> 
          <td>{log.origin}</td>
        </tr>
        ))}
      </tbody> 
    </table>
  </div>
  )
}

export default Index
