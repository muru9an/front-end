// services/tenantService.js
import axios from 'axios';

// Define the base URL
const API_URL = 'http://localhost:3001/api/tenants';

// Create a new tenant
export const createTenant = (tenantData) => {
  return axios.post(API_URL, tenantData);
};

// Get all tenants
export const getAllTenants = () => {
  return axios.get(API_URL);
};

// Get a single tenant by ID
export const getTenantById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

// Update a tenant by ID
export const updateTenant = (id, tenantData) => {
  return axios.put(`${API_URL}/${id}`, tenantData);
};

// Delete a tenant by ID
export const deleteTenant = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

// Tenant login
export const tenantLogin = (loginData) => {
  console.log("tenant login called");
  return axios.post(`${API_URL}/login`, loginData);
};


export const sendOtp = (emailData) => {
  console.log("sendotp service called");
  return axios.post(`${API_URL}/login/email/send-otp`, emailData);
};

// Verify OTP
export const verifyOtp = (otpData) => {
  return axios.post(`${API_URL}/login/email/verify-otp`, otpData);
};

// Pay Rent
export const payRent = (paymentData, token) => {
  return axios.post(`${API_URL}/pay-rent`, paymentData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// File Complaint
export const fileComplaint = (complaintData, token) => {
  return axios.post(`${API_URL}/complaint`, complaintData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};