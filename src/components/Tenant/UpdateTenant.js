import React, { useEffect, useState } from 'react';
import { getTenantById, updateTenant } from '../services/tenantservice';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './updateTenant.css';
import { FaUser, FaEnvelope, FaPhone, FaHome, FaMoneyBillWave } from 'react-icons/fa';

const UpdateTenant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.state?.role;
  const [tenantData, setTenantData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    moveInDate: '',
    leaseEndDate: '',
    rentAmount: '',
  });

  useEffect(() => {
    const fetchTenant = async () => {
      try {
        const response = await getTenantById(id);
        setTenantData(response.data);
      } catch (error) {
        console.error('Error fetching tenant:', error);
      }
    };
    fetchTenant();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTenantData({
      ...tenantData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTenant(id, tenantData);
      navigate('/tenants' , { state: { role: role }}); // Redirect to tenant list after update
    } catch (error) {
      console.error('Error updating tenant:', error);
    }
  };

  return (
    <div className="update-tenant-container">
      <form className="update-tenant-form" onSubmit={handleSubmit}>
        <h2>Edit Tenant Information</h2>
        <div className="form-group">
          <FaUser className="form-icon" />
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={tenantData.firstName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <FaUser className="form-icon" />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={tenantData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <FaEnvelope className="form-icon" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={tenantData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <FaPhone className="form-icon" />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={tenantData.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <FaHome className="form-icon" />
          <input
            type="date"
            name="moveInDate"
            value={tenantData.moveInDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <FaHome className="form-icon" />
          <input
            type="date"
            name="leaseEndDate"
            value={tenantData.leaseEndDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <FaMoneyBillWave className="form-icon" />
          <input
            type="number"
            name="rentAmount"
            placeholder="Rent Amount"
            value={tenantData.rentAmount}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Update Tenant</button>
      </form>
    </div>
  );
};

export default UpdateTenant;
