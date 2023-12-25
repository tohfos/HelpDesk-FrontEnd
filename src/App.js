import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Index';
import Login from './pages/Login/Index';
import ResetPassword from './pages/ResetPassword/Index';
import Dashboard from './pages/Dashboard/Index';
import NotFound from './pages/404/Index';
import Test from './pages/Test/Index';
import Preferences from './pages/Dashboard/Preferences/Index';
import MessagesSliderbar from './pages/Dashboard/MessagesSliderbar/Index';
import MyTickets from './pages/Dashboard/MyTickets/Index';
import Reports from './pages/Dashboard/Reports/Index';
import KnowledgeBase from './pages/Dashboard/Knowledgebase/Index';
import Contact from './pages/Contact';
import Users from './pages/Dashboard/Users/Index';
import Backup from './pages/Dashboard/Backup/Index';
// import FAQ from './pages/Dashboard/AddQuestionsToFAQ/Index';
import Profile from './pages/Profile/Index';
import { useEffect } from 'react';
import { io } from "socket.io-client";
import { useState } from "react";


function App() {
  const [socket, setSocket] = useState(null);


  useEffect(() => {
    console.log("1234");
    setSocket(io("http://localhost:3000"));
  }, []);

  return (
    <Router>
      <Routes>
        {/* TODO check user role */}
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        
        {socket && (
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="mytickets" element={<MyTickets socket={socket}/>} />
            <Route path="reports" element={<Reports />} />
            <Route path="knowledgebase" element={<KnowledgeBase />} />
            <Route path="preferences" element={<Preferences />} />
            <Route path="messages" element={<MessagesSliderbar />} />
            <Route path="users" element={<Users />} />
            <Route path="backup" element={<Backup />} />
            {/* <Route path="faq" element={<FAQ />} /> */}
            {/* <Route path="getFAQ" element={<GetFAQs />} /> */}
            <Route path="profile" element={<Profile />} />
          </Route>
        )}
          
        
        <Route path='/resetpassword' element={<ResetPassword />} />
        <Route path='/test' element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;
