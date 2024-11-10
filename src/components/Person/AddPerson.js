import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PersonService from '../services/PersonService';
import { TextField, Button, MenuItem, Container, Typography, Box } from '@mui/material';
import { FaUserPlus } from 'react-icons/fa'; // Importing react-icon

const AddPerson = () => {
  const { companyId } = useParams();

  console.log("Compant ID "+companyId);
  const navigate = useNavigate();
  const [person, setPerson] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    nationality: '',
    role: 'director',
    email: '',
    companyId: companyId,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPerson({ ...person, [name]: value });
  };

  const savePerson = () => {
    if (!person.firstName || !person.lastName || !person.email) {
      alert('Please fill in all required fields.');
      return;
    }
    PersonService.createPerson(person)
      .then(() => {
        navigate(`/company/${companyId}/persons`, { state: { message: 'Person created successfully!' } });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4} p={3} boxShadow={3} borderRadius={4} bgcolor="#f5f5f5">
        <Typography variant="h4" gutterBottom align="center">
          <FaUserPlus /> Add Stakeholder
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
            <MenuItem value="Director">Director</MenuItem>
            <MenuItem value="Secretary">Secretary</MenuItem>
            <MenuItem value="Shareholder">Shareholder</MenuItem>
          </TextField>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={savePerson}
            startIcon={<FaUserPlus />}
            sx={{ mt: 3 }}
          >
            Add Stakeholder
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AddPerson;
