import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import PersonService from '../services/PersonService';
import { List, ListItem, ListItemText, Button, Typography, Box, Container } from '@mui/material';
import { FaUser, FaTrashAlt, FaEdit, FaPlus } from 'react-icons/fa';

const PersonList = () => {
  const { companyId } = useParams();
  console.log("Company ID "+companyId);
  const navigate = useNavigate();
  const location = useLocation(); // Get location to access state
  const role = location.state?.role;
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    fetchPersonsByCompanyId();
  }, [companyId]);

  const fetchPersonsByCompanyId = () => {
    PersonService.getAllPersons()
      .then((response) => {
        const filteredPersons = response.data.filter((person) => person.companyId === parseInt(companyId));
        setPersons(filteredPersons);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deletePerson = (personId) => {
    PersonService.deletePerson(personId)
      .then(() => {
        fetchPersonsByCompanyId();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEditClick = (personId) => {
    navigate(`/update-person/${personId}` ,   { state: { role } });
  };

  const handleAddClick = () => {
    navigate(`/add-person/${companyId}` ,   { state: { role } }); // Update this route based on your application structure
  };

  const logout = () => {
  
      navigate('/get-companies',   { state: { role } }); // Path for admin logout
   
  };

  return (
    <Container maxWidth="md">
      {/* Logout Button at the top right */}
      <Box display="flex" justifyContent="flex-end" mt={2} mb={2}>
        <Button
          variant="contained"
          color="secondary"
          sx={{ ml: 4 }}
          onClick={logout}
        >
          Logout
        </Button>
      </Box>

      <Box mt={4} p={3} boxShadow={3} borderRadius={4} bgcolor="#f5f5f5">
        <Typography variant="h4" gutterBottom align="center">
          <FaUser /> Stakeholder List
        </Typography>

        {/* Add Person Button inside the card */}
        {/* {role === 'superadmin' && ( */}
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<FaPlus />}
              onClick={handleAddClick} // Add button click handler
            >
              Add Stakeholder
            </Button>
          </Box>
        {/* )} */}

        {persons.length === 0 ? (
          <Typography variant="h6" align="center" color="textSecondary">
            No persons are added.
          </Typography>
        ) : (
          <List>
            {persons.map((person) => (
              <ListItem key={person.personId} divider>
                <ListItemText
                  primary={
                    <Typography variant="h6" fontWeight="bold">
                      {`${person.firstName} ${person.lastName}`}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography variant="body2">
                        <strong>Email:</strong> <b>{person.email}</b>
                      </Typography>
                      <Typography variant="body2">
                        <strong>Role:</strong> <b>{person.role}</b>
                      </Typography>
                      <Typography variant="body2">
                        <strong>DOB:</strong> <b>{person.dob}</b>
                      </Typography>
                    </>
                  }
                />
                <Box display="flex" flexDirection="column" alignItems="flex-end">
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<FaEdit />}
                    sx={{ mb: 1 }} // Margin bottom for spacing
                    onClick={() => handleEditClick(person.personId)} // Edit button click handler
                  >
                    Edit
                  </Button>
                  {/* {role === 'superadmin' && ( */}
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<FaTrashAlt />}
                      onClick={() => deletePerson(person.personId)}
                    >
                      Delete
                    </Button>
                  {/* )} */}
                </Box>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
      <br/>
      <div>
       <button className="add-tenant-btn" onClick={()=>{  navigate('/super-admin/dashboard', { state: { role: role }});}}>
        Go to dashboard
      </button>
    </div>
    </Container>
  );
};

export default PersonList;
