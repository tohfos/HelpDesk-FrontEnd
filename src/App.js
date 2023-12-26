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
import Profile from './pages/Profile/Index';

import Chat from './components/Messages/Chat';
import Analytics from './pages/Dashboard/Analytics'
import Logs from './pages/Dashboard/Logs/Index';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";



function App() {

  // get user from cookies if cookie exist
  const user = Cookies.get('token') ? jwtDecode(Cookies.get('token')) : null;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />


        {/* check user for token */}

        {user ? (
          <>
            <Route path="/dashboard" element={<Dashboard />}>

              {user.UserInfo.role === 'Manager' ?
                (
                  <>
                    <Route path="reports" element={<Reports />} />
                    <Route path="analytics" element={< Analytics />} />
                  </>
                )
                : <Route path="*" element={<NotFound />} />}

              {user.UserInfo.role === 'Admin' ?
                (
                  <>
                    <Route path="preferences" element={<Preferences />} />
                    <Route path="logs" element={<Logs />} />
                  </>
                )
                : <Route path="*" element={<NotFound />} />}

              <Route path="mytickets" element={<MyTickets />} />
              <Route path="knowledgebase" element={<KnowledgeBase />} />
              <Route path="messages" element={<MessagesSliderbar />} />
              <Route path="messages/:id" element={<Chat />} />
              <Route path="users" element={<Users />} />
              <Route path="profile" element={<Profile />} />

            </Route>
          </>
        ) : <Route path="*" element={<NotFound />} />}

        <Route path='/resetpassword' element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
