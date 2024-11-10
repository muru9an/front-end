import React, { useState } from 'react';
import CompanyService from '../services/CompanyService';
import { useNavigate, useLocation } from 'react-router-dom';
import './companyStyles.css'; // Import scoped CSS

const AddCompany = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const role = location.state?.role;

  const [company, setCompany] = useState({
    companyName: '',
    contactEmail: '',
    contactPhone: '',
    address: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompany({ ...company, [name]: value });
  };

  const saveCompany = () => {
    CompanyService.createCompany(company)
      .then(() => {
        alert('Company created successfully!');
        setCompany({
          companyName: '',
          contactEmail: '',
          contactPhone: '',
          address: ''
        });
        navigate( '/get-companies',  { state: { role: role }});
      })
      .catch((error) => {
        console.error(error);
        alert('Failed to create company: ' + error.message); 
      });
  };

  return (
    <div className="company-container">
      <h2>Add Company</h2>
      <form>
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={company.companyName}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="contactEmail"
          placeholder="Contact Email"
          value={company.contactEmail}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="contactPhone"
          placeholder="Contact Phone"
          value={company.contactPhone}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={company.address}
          onChange={handleInputChange}
        />
        <button type="button" onClick={saveCompany}>
          Add Company
        </button>
      </form>
    </div>
  );
};

export default AddCompany;
