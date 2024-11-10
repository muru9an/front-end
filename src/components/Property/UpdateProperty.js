import React, { useState, useEffect } from 'react';
import PropertyService from '../services/PropertyService';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './updateProperty.css';

const UpdateProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.state?.role;
  const [property, setProperty] = useState({
    address: '',
    type: '',
    bedrooms: '',
    bathrooms: '',
    size: '',
    purchaseDate: '',
    value: '',
    rent: ''
  });

  useEffect(() => {
    PropertyService.getPropertyById(id)
      .then((response) => {
        setProperty(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProperty({ ...property, [name]: value });
  };

  const handleUpdate = () => {
    PropertyService.updateProperty(id, property)
      .then(() => {
        alert('Property updated successfully!');
        navigate('/get-properties', { state: { role: role }});
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="update-property"> {/* Add class name here */}
      <h2>Update Property</h2>
      <form>
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={property.address}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="type"
          placeholder="Type (residential/commercial)"
          value={property.type}
          onChange={handleInputChange}
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
          type="text"
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
          type="text"
          name="value"
          placeholder="Value"
          value={property.value}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="rent"
          placeholder="Rent"
          value={property.rent}
          onChange={handleInputChange}
        />
        <button type="button" onClick={handleUpdate}>
          Update Property
        </button>
      </form>
    </div>
  );
};

export default UpdateProperty;
