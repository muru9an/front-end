
import React from 'react';
import './superAdminDashBoard.css'; 
import { useNavigate } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faHome, faUsers, faMoneyBill, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

const SuperAdminDashboard = () => {
    const navigate = useNavigate(); 
    const location = useLocation();

    const role = location.state?.role; // Get the user role from location.state

    console.log("Role " + role);

    const handleNavigation = (path) => {
        navigate(path, { state: { role } }); // Pass the role in the navigation state
    }

    const logout = () => {
        if (role === 'admin') {
          navigate('/admin/signin'); // Path for admin logout
        } else if (role === 'superadmin') {
          navigate('/super-admin/signin'); // Path for superadmin logout
        }
      };

    return (
        <div className="dashboard-container">
            <h1>Super Admin Dashboard</h1>
            <div className="dashboard-options">
                <div className="dashboard-card" onClick={() => handleNavigation('/get-companies')}>
                    <FontAwesomeIcon icon={faBuilding} size="2x" className="card-icon" />
                    <h2>Manage Companies</h2>
                    <p>Create, view, update, or delete companies.</p>
                </div>
                <div className="dashboard-card" onClick={() => handleNavigation('/get-properties')}>
                    <FontAwesomeIcon icon={faHome} size="2x" className="card-icon" />
                    <h2>Manage Properties</h2>
                    <p>Create, view, update, or delete properties.</p>
                </div>
                <div className="dashboard-card" onClick={() => handleNavigation('/get-tenants')}>
                    <FontAwesomeIcon icon={faUsers} size="2x" className="card-icon" />
                    <h2>Manage Tenants</h2>
                    <p>Create, view, update, or delete tenants.</p>
                </div>
                <div className="dashboard-card" onClick={() => handleNavigation('/transactions')}>
                    <FontAwesomeIcon icon={faMoneyBill} size="2x" className="card-icon" />
                    <h2>Manage Transactions</h2>
                    <p>View and track all transactions related to properties and tenants.</p>
                </div>

                {/* Render Add Admin button only if the role is 'superadmin' */}
                {role === 'superadmin' && (
                    <div className="dashboard-card" onClick={() => handleNavigation('/admin/signup')}>
                        <FontAwesomeIcon icon={faUserPlus} size="2x" className="card-icon" />
                        <h2>Add Admin</h2>
                        <p>Add a new admin to manage the platform.</p>
                    </div>
                )}

            </div>
            <button onClick={logout} className="logout-btn">Logout</button>
        </div>
    );
};

export default SuperAdminDashboard;
