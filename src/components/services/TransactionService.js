import axios from 'axios';

const API_URL = 'http://localhost:3001/api/transactions';

export const fetchCompanies = async () => {
  const response = await axios.get(`${API_URL}/companies`);
  return response.data;
};

export const fetchPropertiesByCompany = async (companyId) => {
  const response = await axios.get(`${API_URL}/properties/${companyId}`);
  return response.data;
};

export const fetchTenantsByProperty = async (propertyId) => {
  const response = await axios.get(`${API_URL}/tenants/${propertyId}`);
  return response.data;
};

export const fetchTotalsByTenant = async (tenantId) => {
  const response = await axios.get(`${API_URL}/totals/${tenantId}`);
  return response.data;
};

// New functions for fetching totals
export const fetchTotalsByProperty = async (propertyId) => {
  const response = await axios.get(`${API_URL}/totals/property/${propertyId}`);
  return response.data;
};

export const fetchTotalsByCompany = async (companyId) => {
  const response = await axios.get(`${API_URL}/totals/company/${companyId}`);
  return response.data;
};

export const fetchAllTransactions = async () => {
  const response = await fetch('/api/transactions');
  if (!response.ok) {
    throw new Error('Failed to fetch transactions');
  }
  return response.json();
};

export const fetchTransactionsByTenant = (tenantId) => {
  return axios.get(`${API_URL}/tenant?tenantId=${tenantId}`);
};

/*import axios from 'axios';

const API_URL = 'http://localhost:3001/api/transactions';

export const fetchCompanies = async () => {
  const response = await axios.get(`${API_URL}/companies`);
  return response.data;
};

export const fetchPropertiesByCompany = async (companyId) => {
  const response = await axios.get(`${API_URL}/properties/${companyId}`);
  return response.data;
};

export const fetchTenantsByProperty = async (propertyId) => {
  const response = await axios.get(`${API_URL}/tenants/${propertyId}`);
  return response.data;
};

export const fetchTotalsByTenant = async (tenantId) => {
  const response = await axios.get(`${API_URL}/totals/${tenantId}`);
  return response.data;
};*/
