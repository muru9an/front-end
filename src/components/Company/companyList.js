import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CompanyService from '../services/CompanyService';
import PersonService from '../services/PersonService';
import { FaBuilding, FaEnvelope, FaPhone, FaAddressCard } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import './companyStyles.css';

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.state?.role; // Get the user role from location.state

  console.log("Role "+role);

  useEffect(() => {
    retrieveCompanies();
  }, []);

  const retrieveCompanies = () => {
    CompanyService.getAllCompanies()
      .then(async (response) => {
        const companiesData = response.data;
        const companiesWithPersons = await Promise.all(
          companiesData.map(async (company) => {
            const personsResponse = await PersonService.getPersonsByCompanyId(company.companyId);
            return {
              ...company,
              persons: personsResponse.data 
            };
          })
        );
        setCompanies(companiesWithPersons);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteCompany = (id) => {
    CompanyService.deleteCompany(id)
      .then(() => {
        retrieveCompanies();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addCompany = () => {
    navigate('/create-company',   { state: { role } });
  };

  const updateCompany = (companyId) => {
    navigate(`/update-company/${companyId}`,   { state: { role } });
  };

  const managePersons = (companyId) => {
    navigate(`/company/${companyId}/persons`,  { state: { role } });
  };

  const logout = () => {
    if (role === 'admin') {
      navigate('/admin/signin'); // Path for admin logout
    } else if (role === 'superadmin') {
      navigate('/super-admin/signin'); // Path for superadmin logout
    }
  };
  
  return (
    <div className="company-container">
      <h2>Company List</h2>
      
      <div className="top-right">
        <button onClick={logout} className="logout-button">
          Log Out
        </button>
      </div>
      
      {/* Render the Add Company button only for Super Admin */}
      {role === 'superadmin' && (
        <button onClick={addCompany} className="add-company-btn">
          <FaBuilding /> Add Company
        </button>
      )}

      <ul>
        {companies.map((company) => (
          <li key={company.companyId}>
            <div className="company-info">
              <img src="/company.jpg" alt="Company" />
              <div className="company-text">
                <h3>{company.companyName}</h3>
                <p>
                  <FaEnvelope /> {company.contactEmail} <br />
                  <FaPhone /> {company.contactPhone} <br />
                  <FaAddressCard /> {company.address}
                </p>
              </div>
            </div>

            <div className="persons-list">
              {company.persons.length > 0 ? (
                company.persons.map(person => (
                  <div key={person.personId} className="person-info">
                    <img src="/person.png" alt={`${person.firstName} ${person.lastName}`} />
                    <div className="person-details">
                      <p> <strong>{person.role}</strong></p>
                      <p> {person.firstName} {person.lastName}</p>
                      <p> <FaEnvelope /> {person.email}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No persons associated with this company.</p>
              )}
            </div>

            {/* Company action buttons, show update button for both roles */}
            <div className="company-icons">
              <button onClick={() => updateCompany(company.companyId)}>Update Company</button>
              {/* Render delete button only for Super Admin */}
              {role === 'superadmin' && (
                <button onClick={() => deleteCompany(company.companyId)}>Delete Company</button>
              )}
              <button onClick={() => managePersons(company.companyId)}>Manage Stakeholder</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyList;
