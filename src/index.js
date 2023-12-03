import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* if route is /dashboard then hide navbar */}
    <Navbar />
    <App />
    <Footer />
  </React.StrictMode>
);

