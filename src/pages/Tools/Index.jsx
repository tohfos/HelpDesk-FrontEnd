import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Cookies from 'js-cookie';

const Index = () => {
    const [backupMessage, setBackupMessage] = useState('');

    useEffect(() => {
        fetchBackup();
    }, []);

 

    const fetchBackup = async () => {
        try {
            console.log('fetching backup');
            const response = await fetch(`${process.env.REACT_APP_EXPRESS_URL}/api/v1/admin/backup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Cookies.get('token'),
                },
                credentials: 'include',
            });
            const data = await response.json();
            setBackupMessage(data.message);
        } catch (error) {
            console.log(error);
            // Handle error state for backup fetch if needed
        }
    };

    return (
        <div>Reports</div>
    );
};

export default Index;
