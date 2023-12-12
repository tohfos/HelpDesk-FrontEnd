import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Index';
import Login from './pages/Login/Index';
import ResetPassword from './pages/ResetPassword/Index';
import Dashboard from './pages/Dashboard/Index';
import NotFound from './pages/404/Index';
import Test from './pages/Test/Index';
import Preferences from './pages/Dashboard/Preferences/Preferences';
import MessagesSliderbar from './pages/Dashboard/MessagesSliderbar/MessagesSliderbar';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>

          {/* dashboard will have nested routes to my tickets, messages, reports (only for manegers), knowledge base, and prefrenes (only for admins) */}
          {/* <Route path="/mytickets" element={<MyTickets />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/knowledgebase" element={<KnowledgeBase />} /> */}
          <Route path="preferences" element={<Preferences />} />
          <Route path="messages" element={<MessagesSliderbar />} />


        </Route>
        <Route path='/resetpassword' element={<ResetPassword />} />
        <Route path='/test' element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;
