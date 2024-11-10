import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Box, Button, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import { FaCheckCircle, FaSignOutAlt } from 'react-icons/fa';

const ResolveComplaint = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { complaint } = location.state; // Complaint object passed from the complaints page
  const [resolutionText, setResolutionText] = useState('');
  const [charges, setCharges] = useState(0); // New charges state

  useEffect(() => {
    if (!complaint) {
      navigate('/complaints'); // Redirect if no complaint is passed
    }
  }, [complaint, navigate]);

  const logout = () => {
    // Perform any logout logic here (if needed)
    navigate('/'); // Redirect to the homepage
  };

  const handleResolve = () => {
    if (!resolutionText || charges === undefined) {
      alert('Please provide a resolution and charges.');
      return;
    }

    // Update complaint status, resolution, and charges
    axios
      .put(`http://localhost:3001/api/complaints/${complaint.complaintId}`, {
        ...complaint,
        status: 'Resolved',
        resolution: resolutionText,
        charges: parseFloat(charges), // ensure charges is a number
      })
      .then(() => {
        navigate('/complaints', { state: { message: 'Complaint resolved successfully!' } });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Container maxWidth="md">
      <Box mt={4} p={3} boxShadow={3} borderRadius={4} bgcolor="#f5f5f5">
        <Typography variant="h4" gutterBottom align="center">
          <FaCheckCircle /> Resolve Complaint
        </Typography>

        <Typography variant="h6" gutterBottom>
          Complaint Details:
        </Typography>
        <Typography><strong>Complaint ID:</strong> {complaint.complaintId}</Typography>
        <Typography><strong>Tenant ID:</strong> {complaint.tenantId}</Typography>
        <Typography><strong>Complaint Text:</strong> {complaint.complaintText}</Typography>
        <Typography><strong>Status:</strong> {complaint.status}</Typography>

        <TextField
          label="Resolution"
          multiline
          rows={4}
          value={resolutionText}
          onChange={(e) => setResolutionText(e.target.value)}
          fullWidth
          margin="normal"
          required
        />

        {/* New Charges Input Field */}
        <TextField
          label="Charges (in $)"
          type="number"
          value={charges}
          onChange={(e) => setCharges(e.target.value)}
          fullWidth
          margin="normal"
          required
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleResolve}
          startIcon={<FaCheckCircle />}
          sx={{ mt: 3 }}
        >
          Mark as Resolved
        </Button>

        {/* Logout Button */}
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={logout}
          startIcon={<FaSignOutAlt />}
          sx={{ mt: 2 }}
        >
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default ResolveComplaint;
