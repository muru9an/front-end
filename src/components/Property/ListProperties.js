import React, { useState, useEffect } from 'react';
import PropertyService from '../services/PropertyService';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './listProperty.css';

const ListProperties = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();
  const location = useLocation(); // Get location to access state
  const role = location.state?.role; // Get the role from location.state

  useEffect(() => {
    retrieveProperties();
  }, []);

  const retrieveProperties = () => {
    PropertyService.getAllProperties()
      .then((response) => {
        setProperties(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (id) => {
    PropertyService.deleteProperty(id)
      .then(() => {
        setProperties(properties.filter((property) => property.propertyId !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const logout = () => {
    if (role === 'admin') {
      navigate('/admin/signin'); // Path for admin logout
    } else if (role === 'superadmin') {
      navigate('/super-admin/signin'); // Path for superadmin logout
    }
  };

  return (
    <>
    <div className="list-properties">
      <h2>Property List</h2>
      {/* <button onClick={logout} className="logout-btn">Logout</button> */}
      {role === 'superadmin' && (
        <button className="add-tenant-btn" onClick={()=>{ navigate('/create-property', { state: { role: role }});}}>
          Add New Property
        </button>
     
      )}
      {properties.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Property Name</th>
              <th>Address</th>
              <th>Type</th>
              <th>Bedrooms</th>
              <th>Bathrooms</th>
              <th>Size (sqft)</th>
              <th>Purchase Date</th>
              <th>Value</th>
              <th>Rent</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property.propertyId}>
                <td>{property.name}</td>
                <td>{property.address}</td>
                <td>{property.type}</td>
                <td>{property.bedrooms}</td>
                <td>{property.bathrooms}</td>
                <td>{property.size}</td>
                <td>{new Date(property.purchaseDate).toLocaleDateString()}</td>
                <td>{property.value}</td>
                <td>{property.rent}</td>
                <td className="action-buttons">
                  {role === 'superadmin' && ( // Conditional rendering for Add and Delete buttons
                    <>
                      <button onClick={() => handleDelete(property.propertyId)} className="delete-btn">Delete</button>
                    </>
                  )}
                  <Link to={`/update-property/${property.propertyId}`} className="edit-btn">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No properties found.</p>
      )}
    </div>
      <br/>
      <div>
       <button className="add-tenant-btn" onClick={()=>{  navigate('/super-admin/dashboard', { state: { role: role }});}}>
        Go to dashboard
      </button>
      </div>
      </>
  );
};

export default ListProperties;
