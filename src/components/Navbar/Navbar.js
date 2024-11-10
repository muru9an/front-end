// Navbar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './navbar.css'; // Create a separate CSS file for the navbar styles

const Navbar = () => {
  const navigate = useNavigate();

  const handleSuperAdminClick = () => {
    navigate('/super-admin/signup');
  };

  const handleAdminClick = () => {
    navigate('/admin/signin');
  };

  const handleComplaint = () => {
    navigate('/tenant');
  };

  const handlePersonClick = () => {
    navigate('/person/login');
  };

  return (
    <header className="navbar">
      <div className="logo">Property Management</div>
      <nav>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Properties</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
     
        <button className="log-button" onClick={handleComplaint}>Tenant</button>

        <button className="log-button" onClick={handleSuperAdminClick}>Super Admin</button>
       
        <button className="log-button" onClick={handleAdminClick}>Admin</button>

        <button className="log-button" onClick={handlePersonClick}>Stakeholder</button>

        
    </header>
  );
};

export default Navbar;