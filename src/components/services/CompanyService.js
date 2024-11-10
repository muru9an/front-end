// src/services/CompanyService.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/companies'; // Replace with your API URL

const getAllCompanies = () => {
  return axios.get(API_URL);
};

const getCompanyById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

const createCompany = (company) => {
  return axios.post(API_URL, company);
};

const updateCompany = (id, company) => {
  return axios.put(`${API_URL}/${id}`, company);
};

const deleteCompany = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

export default {
  getAllCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany
};
