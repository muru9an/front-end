// src/services/PropertyService.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/properties'; // Replace with your API URL

const getAllProperties = () => {
  return axios.get(API_URL);
};

const getPropertyById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

const createProperty = (property) => {
  return axios.post(API_URL, property);
};

const updateProperty = (id, property) => {
  return axios.put(`${API_URL}/${id}`, property);
};

const deleteProperty = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

export default {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty
};
