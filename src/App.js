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

// import FAQ from './pages/Dashboard/AddQuestionsToFAQ/Index';
import Profile from './pages/Profile/Index';
import Chat from './components/Messages/Chat'; import Analytics from './pages/Dashboard/Analytics'
import Logs from './pages/Dashboard/Logs/Index';


function App() {
  return (
    <Router>
      <Routes>
        {/* TODO check user role */}
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="mytickets" element={<MyTickets />} />
          <Route path="reports" element={<Reports />} />
          <Route path="analytics" element={< Analytics />} />
          <Route path="knowledgebase" element={<KnowledgeBase />} />
          <Route path="preferences" element={<Preferences />} />
          <Route path="messages" element={<MessagesSliderbar />} />
          <Route path="messages/:id" element={<Chat />} />
          <Route path="users" element={<Users />} />
          <Route path="profile" element={<Profile />} />
          <Route path="logs" element={<Logs/>}/>

        </Route>
        <Route path='/resetpassword' element={<ResetPassword />} />
        <Route path='/test' element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;
