import React, { useState, useEffect } from 'react';
import PropertyService from '../services/PropertyService';
import CompanyService from '../services/CompanyService';
import { useNavigate, useLocation } from 'react-router-dom';
import './addProperty.css';

const AddProperty = () => {
  const [property, setProperty] = useState({
    name: '',
    address: '',
    type: '',
    bedrooms: '',
    bathrooms: '',
    size: '',
    purchaseDate: '',
    value: '',
    rent: '',
    companyId: ''
  });

  const [companies, setCompanies] = useState([]);
  const [isCompanySelected, setIsCompanySelected] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.state?.role;


  useEffect(() => {
    CompanyService.getAllCompanies()
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'companyId') {
      setIsCompanySelected(!!value);
    }
    setProperty({ ...property, [name]: value });
  };

  const handleSubmit = () => {
    if (!property.companyId) {
      alert('Please select a company to link the property.');
      return;
    }

    PropertyService.createProperty(property)
      .then(() => {
        alert('Property added successfully!');
        navigate('/get-properties', { state: { role: role }});
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="add-property"> {/* Add class name here */}
      <h2>Add Property</h2>

      <form>
        <label>Select Company</label>
        <select
          name="companyId"
          value={property.companyId}
          onChange={handleInputChange}
        >
          <option value="">Select Company</option>
          {companies.map((company) => (
            <option key={company.companyId} value={company.companyId}>
              {company.companyName}
            </option>
          ))}
        </select>
      </form>

      {isCompanySelected && (
        <form>
          <h3>Property Details</h3>

          <input
            type="text"
            name="name"
            placeholder="Property Name"
            value={property.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={property.address}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="type"
            placeholder="Type (residential/commercial)"
            value={property.type}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="bedrooms"
            placeholder="Bedrooms"
            value={property.bedrooms}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="bathrooms"
            placeholder="Bathrooms"
            value={property.bathrooms}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="size"
            placeholder="Size"
            value={property.size}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="purchaseDate"
            value={property.purchaseDate}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="value"
            placeholder="Value"
            value={property.value}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="rent"
            placeholder="Rent"
            value={property.rent}
            onChange={handleInputChange}
          />

          <button type="button" onClick={handleSubmit}>
            Add Property
          </button>
        </form>
      )}
    </div>
  );
};

export default AddProperty;
