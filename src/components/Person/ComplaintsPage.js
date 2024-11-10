import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import { FaClipboardList, FaExclamationTriangle } from 'react-icons/fa';

const ComplaintsPage = () => {
  const [email, setEmail] = useState('');
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchComplaints = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/complaints/email/${email}`);
      setComplaints(response.data);
      setError('');
    } catch (error) {
      setComplaints([]);
      setError(error.response ? error.response.data.message : 'An error occurred while fetching complaints');
    }
  };

  const handleResolveClick = (complaint) => {
    navigate('/resolve-complaint', { state: { complaint } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchComplaints();
  };

  return (
    <Container maxWidth="md">
      <Box mt={4} p={3} boxShadow={3} borderRadius={4} bgcolor="#fafafa">
        <Typography variant="h4" gutterBottom align="center">
          <FaClipboardList /> View Complaints
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            sx={{ mt: 3 }}
          >
            Fetch Complaints
          </Button>
        </form>

        {error && (
          <Typography color="error" align="center" mt={2}>
            <FaExclamationTriangle /> {error}
          </Typography>
        )}

        {complaints.length > 0 && (
          <Box mt={4}>
            <Typography variant="h5" gutterBottom>
              Your Complaints:
            </Typography>
            <List>
              {complaints.map((complaint) => (
                <ListItem key={complaint.complaintId} divider>
                  <ListItemText
                    primary={`Complaint ID: ${complaint.complaintId}`}
                    secondary={
                      <>
                        <div><strong>Tenant ID:</strong> {complaint.tenantId}</div>
                        <div><strong>Complaint:</strong> {complaint.complaintText}</div>
                        <div><strong>Status:</strong> {complaint.status}</div>
                      </>
                    }
                  />
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleResolveClick(complaint)}
                    sx={{ ml: 2 }}
                  >
                    Resolve
                  </Button>
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default ComplaintsPage;
