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
<<<<<<< HEAD
// import FAQ from './pages/Dashboard/AddQuestionsToFAQ/Index';
import Profile from './pages/Profile/Index';
import Chat from './components/Messages/Chat';
import Analytics from './pages/Dashboard/Analytics'
=======

import Backup from './pages/Dashboard/Backup/Index';
// import FAQ from './pages/Dashboard/AddQuestionsToFAQ/Index';
import Profile from './pages/Profile/Index';
import Chat from './components/Messages/Chat';import Analytics from './pages/Dashboard/Analytics'
>>>>>>> 88e589e39c4e20c6bf52c73e8b3e4938ea1f8885



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
<<<<<<< HEAD
          <Route path="analytics" element={< Analytics />} />
=======
          <Route path="analytics" element={< Analytics/>} />
>>>>>>> 88e589e39c4e20c6bf52c73e8b3e4938ea1f8885
          <Route path="knowledgebase" element={<KnowledgeBase />} />
          <Route path="preferences" element={<Preferences />} />
          <Route path="messages" element={<MessagesSliderbar />} />
          <Route path="messages/:id" element={<Chat />} />
          <Route path="users" element={<Users />} />
<<<<<<< HEAD
=======

          <Route path="backup" element={<Backup />} />
          {/* <Route path="faq" element={<FAQ />} /> */}
          {/* <Route path="getFAQ" element={<GetFAQs />} /> */}
>>>>>>> 88e589e39c4e20c6bf52c73e8b3e4938ea1f8885
          <Route path="profile" element={<Profile />} />

        </Route>
        <Route path='/resetpassword' element={<ResetPassword />} />
        <Route path='/test' element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;
