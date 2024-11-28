// Navbar.js
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './navbar.css'; // Create a separate CSS file for the navbar styles

const Navbar = () => {
  const location = useLocation();

  const role = location.state?.role; // Get the user role from location.state

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

  const tenantClick = () => {
    navigate('/get-tenants', { state: { role: role }})
  }

  const logout = () => {
    navigate('/super-admin/signin'); // Path for admin logout
    // if (role === 'admin') {
    //   navigate('/admin/signin'); // Path for admin logout
    // } else if (role === 'superadmin') {
    //   navigate('/super-admin/signin'); // Path for superadmin logout
    // }
  };

  return (
    <header className="navbar">
      <div className="logo">Property Management</div>
      <nav>
        <ul className="nav-links">
          <li><a href="/super-admin/dashboard">Home</a></li>
          <li><a href="/get-companies">Company</a></li>
          <li><a href="/get-properties">Properties</a></li>
          <li><a href="#" onClick={tenantClick}>Tenant</a></li>
        </ul>
      </nav>
      {/* <a class="btn m-2 navbar-btn btn-danger navbar-right" role="button"  href="#">Logout</a> */}
      <div style={{width:'100%', display:'flex', justifyContent:'flex-end'}}>
        <button className="add-btn" onClick={logout}>Logout</button> 
      </div>
        {/* <button className="log-button" onClick={handleComplaint}>Tenant</button> */}

        {/* <button className="log-button" onClick={handleSuperAdminClick}>Super Admin</button> */}
       
        {/* <button className="log-button" onClick={handleAdminClick}>Admin</button> */}

       
        
        {/* <button className="logout-btn" onClick={logout}>Logout</button> */}

    </header>
  );
};

export default Navbar;