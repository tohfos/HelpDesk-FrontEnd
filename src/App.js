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



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>

          <Route path="mytickets" element={<MyTickets />} />
          <Route path="reports" element={<Reports />} />
          <Route path="knowledgebase" element={<KnowledgeBase />} />
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
