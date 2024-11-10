import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PersonService from '../services/PersonService';
import { TextField, Button, Container, Typography, Box, MenuItem } from '@mui/material';
import { FaUserEdit } from 'react-icons/fa';

const UpdatePerson = () => {
  const { personId } = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    nationality: '',
    role: 'director',
    email: '',
  });

  useEffect(() => {
    fetchPersonDetails();
  }, [personId]);

  const fetchPersonDetails = () => {
    PersonService.getPersonById(personId)
      .then((response) => {
        setPerson(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPerson({ ...person, [name]: value });
  };

  const updatePerson = () => {
    if (!person.firstName || !person.lastName || !person.email) {
      alert('Please fill in all required fields.');
      return;
    }
    PersonService.updatePerson(personId, person)
      .then(() => {
        navigate(`/get-companies`, { state: { message: 'Person updated successfully!' } });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4} p={3} boxShadow={3} borderRadius={4} bgcolor="#f5f5f5">
        <Typography variant="h4" gutterBottom align="center">
          <FaUserEdit /> Update Stakeholder
        </Typography>

        <form>
          <TextField
            label="First Name"
            name="firstName"
            value={person.firstName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={person.lastName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Date of Birth"
            type="date"
            name="dob"
            value={person.dob}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Nationality"
            name="nationality"
            value={person.nationality}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            value={person.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            select
            label="Role"
            name="role"
            value={person.role}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          >
            <MenuItem value="director">Director</MenuItem>
            <MenuItem value="secretary">Secretary</MenuItem>
            <MenuItem value="shareholder">Shareholder</MenuItem>
          </TextField>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={updatePerson}
            startIcon={<FaUserEdit />}
            sx={{ mt: 3 }}
          >
            Update Person
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default UpdatePerson;
