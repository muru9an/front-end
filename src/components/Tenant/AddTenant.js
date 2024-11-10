import React, { useEffect, useState } from 'react';
import { createTenant } from '../services/tenantservice';
import PropertyService from '../services/PropertyService';
import './addTenant.css';
import { useNavigate, useLocation } from 'react-router-dom';

const AddTenant = () => {

  const navigate = new useNavigate();
  const location = useLocation();
  const role = location.state?.role; 
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState('');
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
    const fetchProperties = async () => {
      try {
        const response = await PropertyService.getAllProperties();
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };
    fetchProperties();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTenantData({
      ...tenantData,
      [name]: value,
    });
  };

  const handlePropertyChange = (e) => {
    setSelectedProperty(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSubmit = {
        ...tenantData,
        propertyId: selectedProperty,
      };
      console.log(dataToSubmit.moveInDate);
      await createTenant(dataToSubmit);
      // Optionally clear the form or show a success message
      setTenantData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        moveInDate: '',
        leaseEndDate: '',
        rentAmount: '',
      });
      setSelectedProperty('');
      navigate("/get-tenants", { state: { role: role }});
    } catch (error) {
      console.error('Error adding tenant:', error);
    }
  };

  return (
    <div className="add-tenant-container">
      <form className="add-tenant-form" onSubmit={handleSubmit}>
        <h2>Add Tenant</h2>

        <div className="form-group">
          <label htmlFor="property">Select Property:</label>
          <select
            id="property"
            value={selectedProperty}
            onChange={handlePropertyChange}
            required
          >
            <option value="">Select a property</option>
            {properties.map((property) => (
              <option key={property.propertyId} value={property.propertyId}>
                {property.name}
              </option>
            ))}
          </select>
        </div>

        {selectedProperty && (
          <>
            <div className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={tenantData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={tenantData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={tenantData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone:</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={tenantData.phone}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="moveInDate">Move-In Date:</label>
              <input
                type="date"
                id="moveInDate"
                name="moveInDate"
                value={tenantData.moveInDate}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="leaseEndDate">Lease End Date:</label>
              <input
                type="date"
                id="leaseEndDate"
                name="leaseEndDate"
                value={tenantData.leaseEndDate}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="rentAmount">Rent Amount:</label>
              <input
                type="number"
                id="rentAmount"
                name="rentAmount"
                value={tenantData.rentAmount}
                onChange={handleInputChange}
                required
              />
            </div>
          </>
        )}

        <button type="submit" disabled={!selectedProperty}>
          Add Tenant
        </button>
      </form>
    </div>
  );
};

export default AddTenant;
