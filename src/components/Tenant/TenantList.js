import React, { useEffect, useState } from 'react';
import { getAllTenants, deleteTenant } from '../services/tenantservice';
import { useNavigate, useLocation } from 'react-router-dom';
import './tenantList.css';

const TenantList = () => {
  const [tenants, setTenants] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.state?.role; // Get the user role from location.state

  console.log("Role "+role);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const response = await getAllTenants();
        setTenants(response.data);
      } catch (error) {
        console.error('Error fetching tenants:', error);
      }
    };
    fetchTenants();
  }, []);

  const handleEdit = (tenantId) => {
    navigate(`/update-tenant/${tenantId}`, { state: { role: role }});
  };

  const handleDelete = async (tenantId) => {
    if (window.confirm('Are you sure you want to delete this tenant?')) {
      try {
        await deleteTenant(tenantId);
        setTenants(tenants.filter((tenant) => tenant.tenantId !== tenantId));
      } catch (error) {
        console.error('Error deleting tenant:', error);
      }
    }
  };

  const handleAddTenant = () => {
    navigate('/add-tenant', { state: { role: role }});
  };

  const logout = () => {
    if (role === 'admin') {
      navigate('/admin/signin'); // Path for admin logout
    } else if (role === 'superadmin') {
      navigate('/super-admin/signin'); // Path for superadmin logout
    }
  };
  return (
    <div className="tenant-list-container">
      <h2>Tenant List</h2>
      <button className="logout-btn" onClick={logout}>Logout</button>
      {role === 'superadmin' && (
      <button className="add-tenant-btn" onClick={handleAddTenant}>
        Add Tenant
      </button>
      )}
      <table className="tenant-list-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Rent Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tenants.map((tenant) => (
            <tr key={tenant.tenantId}>
              <td>{tenant.firstName}</td>
              <td>{tenant.lastName}</td>
              <td>{tenant.email}</td>
              <td>{tenant.phone}</td>
              <td>{tenant.rentAmount}</td>
              <td className="tenant-actions">
                <button onClick={() => handleEdit(tenant.tenantId)}>Edit</button>
                {role === 'superadmin' && (
                  <button onClick={() => handleDelete(tenant.tenantId)}>Delete</button>
                  )}

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TenantList;
