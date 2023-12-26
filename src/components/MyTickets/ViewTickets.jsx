import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const ViewTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_EXPRESS_URL}/api/v1/user/get`, {
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
        setTickets(data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Created By</th>
            <th>Category</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Sub Category</th>
            <th>Title</th>
            <th>Description</th>
            <th>Assigned To</th>
            <th>Update Details</th>
            <th>Update Date</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{ticket.createdBy}</td>
              <td>{ticket.ticketCategory}</td>
              <td>{ticket.priority}</td>
              <td>{ticket.status}</td>
              <td>{ticket.SubCategory}</td>
              <td>{ticket.title}</td>
              <td>{ticket.description}</td>
              <td>{ticket.assignedTo}</td>
              <td>{ticket.UpdateDetails}</td>
              <td>{ticket.updateDate}</td>
              <td>{ticket.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewTickets;
