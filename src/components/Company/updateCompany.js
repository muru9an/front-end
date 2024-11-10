import React, { useState, useEffect } from 'react';
import CompanyService from '../services/CompanyService';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './companyStyles.css'; // Import scoped CSS

const UpdateCompany = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.state?.role;
  const [company, setCompany] = useState({
    companyName: '',
    contactEmail: '',
    contactPhone: '',
    address: ''
  });

  useEffect(() => {
    CompanyService.getCompanyById(id)
      .then((response) => {
        setCompany(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompany({ ...company, [name]: value });
  };

  const updateCompany = () => {
    CompanyService.updateCompany(id, company)
      .then(() => {
        alert('Company updated successfully!');
       navigate( '/get-companies', { state: { role: role }});
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="company-container">
      <h2>Update Company</h2>
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
        <button type="button" onClick={updateCompany}>
          Update Company
        </button>
      </form>
    </div>
  );
};

export default UpdateCompany;
