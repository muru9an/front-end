import axios from 'axios';

const API_URL = 'http://localhost:3001/api'; // Adjust based on your backend setup

// Fetch all persons
const getAllPersons = () => {
  return axios.get(`${API_URL}/persons`);
};

// Fetch person by ID
const getPersonById = (id) => {
  return axios.get(`${API_URL}/persons/${id}`);
};

// Create a new person
const createPerson = (personData) => {
  return axios.post(`${API_URL}/persons`, personData);
};

// Update a person
const updatePerson = (id, personData) => {
  return axios.put(`${API_URL}/persons/${id}`, personData);
};

// Delete a person
const deletePerson = (id) => {
  return axios.delete(`${API_URL}/persons/${id}`);
};

// Send OTP to person's email
const sendOtp = (data) => {
  return axios.post(`${API_URL}/persons/send-otp`, data);
};

// Verify OTP for login
const verifyOtp = (data) => {
  return axios.post(`${API_URL}/persons/verify-otp`, data);
};

// Get persons by company ID
const getPersonsByCompanyId = (companyId) => {
  return axios.get(`${API_URL}/companies/${companyId}/persons`);
};

export default {
  getAllPersons,
  getPersonById,
  createPerson,
  updatePerson,
  deletePerson,
  sendOtp,
  verifyOtp,
  getPersonsByCompanyId
};
