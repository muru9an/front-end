import React, { useEffect, useState } from 'react';
import { 
  fetchCompanies, 
  fetchPropertiesByCompany, 
  fetchTenantsByProperty, 
  fetchTotalsByTenant, 
  fetchTransactionsByTenant, 
  fetchTotalsByProperty // Make sure this function is available
} from '../services/TransactionService';
import './transaction.css'; // We'll style the cards here.
import { useNavigate, useLocation } from 'react-router-dom';

const Transaction = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const role = location.state?.role; // Get the user role from location.state

  console.log("Role "+role);

  // State for the first card
  const [companies, setCompanies] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [properties, setProperties] = useState([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [tenants, setTenants] = useState([]);
  const [selectedTenantId, setSelectedTenantId] = useState(null);
  const [totals, setTotals] = useState(null);
  const [transactions, setTransactions] = useState([]);

  // State for the second card
  const [selectedCompanyIdSecondCard, setSelectedCompanyIdSecondCard] = useState(null);
  const [propertiesSecondCard, setPropertiesSecondCard] = useState([]);
  const [selectedPropertyIdSecondCard, setSelectedPropertyIdSecondCard] = useState(null);
  const [totalsSecondCard, setTotalsSecondCard] = useState(null);
  const [balanceSecondCard, setBalanceSecondCard] = useState(0); // State to hold the balance

  

  // Fetch companies on component mount
  useEffect(() => {
    const loadCompanies = async () => {
      const companyData = await fetchCompanies();
      setCompanies(companyData);
    };
    loadCompanies();
  }, []);

  // Fetch properties when a company is selected in the first card
  useEffect(() => {
    const loadProperties = async () => {
      if (selectedCompanyId) {
        const propertyData = await fetchPropertiesByCompany(selectedCompanyId);
        setProperties(propertyData);
        setSelectedPropertyId(null);
        setTenants([]);
        setTotals(null);
        setTransactions([]);
      }
    };
    loadProperties();
  }, [selectedCompanyId]);

  // Fetch properties when a company is selected in the second card
  useEffect(() => {
    const loadPropertiesForSecondCard = async () => {
      if (selectedCompanyIdSecondCard) {
        const propertyData = await fetchPropertiesByCompany(selectedCompanyIdSecondCard);
        setPropertiesSecondCard(propertyData);
        setSelectedPropertyIdSecondCard(null);
        setTotalsSecondCard(null);
      }
    };
    loadPropertiesForSecondCard();
  }, [selectedCompanyIdSecondCard]);

  // Fetch tenants when a property is selected in the first card
  useEffect(() => {
    const loadTenants = async () => {
      if (selectedPropertyId) {
        const tenantData = await fetchTenantsByProperty(selectedPropertyId);
        setTenants(tenantData);
        setSelectedTenantId(null);
        setTotals(null);
        setTransactions([]);
      }
    };
    loadTenants();
  }, [selectedPropertyId]);

  // Fetch totals and transactions when a tenant is selected in the first card
  useEffect(() => {
    const loadTotalsAndTransactions = async () => {
      if (selectedTenantId) {
        try {
          const totalData = await fetchTotalsByTenant(selectedTenantId);
          setTotals(totalData);

          const transactionResponse = await fetchTransactionsByTenant(selectedTenantId);
          setTransactions(transactionResponse.data);
        } catch (error) {
          console.error("Error fetching totals and transactions: ", error);
        }
      }
    };
    loadTotalsAndTransactions();
  }, [selectedTenantId]);

  // Fetch totals for the second card when a property is selected
  useEffect(() => {
    const loadTotalsForSecondCard = async () => {
      if (selectedPropertyIdSecondCard) {
        try {
          const totalsData = await fetchTotalsByProperty(selectedPropertyIdSecondCard); // Fetch totals by property
          console.log("Fetched Totals Data:", totalsData); // Log the fetched totals data
          setTotalsSecondCard(totalsData); // Set the totals for the second card

          // Calculate the balance and set it
          const balance = (totalsData.totalIncome || 0) - (totalsData.totalExpenses || 0);
          setBalanceSecondCard(balance);
        } catch (error) {
          console.error("Error fetching totals for second card: ", error);
        }
      }
    };
    loadTotalsForSecondCard();
  }, [selectedPropertyIdSecondCard]);

  const logout = () => {
    if (role === 'admin') {
      navigate('/admin/signin'); // Path for admin logout
    } else if (role === 'superadmin') {
      navigate('/super-admin/signin'); // Path for superadmin logout
    }
  };

  return (
    <div className="transaction-container">
      <h1>Property Management System</h1>

      {/* First Card */}
      <div className="card first-card">
        <h2>Tenant Financial Summary</h2>
        <div className="dropdowns">
          <div className="dropdown">
            <label>Company:</label>
            <select onChange={(e) => setSelectedCompanyId(e.target.value)} value={selectedCompanyId || ''}>
              <option value="">Select a company</option>
              {companies.map(company => (
                <option key={company.companyId} value={company.companyId}>
                  {company.companyName}
                </option>
              ))}
            </select>
          </div>

          {selectedCompanyId && (
            <div className="dropdown">
              <label>Property:</label>
              <select onChange={(e) => setSelectedPropertyId(e.target.value)} value={selectedPropertyId || ''}>
                <option value="">Select a property</option>
                {properties.map(property => (
                  <option key={property.propertyId} value={property.propertyId}>
                    {property.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {selectedPropertyId && (
            <div className="dropdown">
              <label>Tenant:</label>
              <select onChange={(e) => setSelectedTenantId(e.target.value)} value={selectedTenantId || ''}>
                <option value="">Select a tenant</option>
                {tenants.map(tenant => (
                  <option key={tenant.tenantId} value={tenant.tenantId}>
                    {tenant.firstName} {tenant.lastName}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {totals && (
          <div className="financial-summary">
            <h2>Financial Summary</h2>
            <p>Income: ${totals.totalIncome}</p>
            <p>Expenses: ${totals.totalExpenses}</p>
            <p>Balance: ${totals.balance}</p>
          </div>
        )}

        {transactions.length > 0 && (
          <div className="transaction-table">
            <h2>Transaction History</h2>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Rent</th>
                  <th>Maintenance Charges</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(transaction => (
                  <tr key={transaction._id}>
                    <td>{new Date(transaction.paymentDate).toLocaleDateString()}</td>
                    <td>${transaction.amount}</td>
                    <td>{transaction.complaintCharges}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Second Card */}

      {role === 'superadmin' && (
      <div className="card second-card">
        <h2>Company & Property Financial Summary</h2>
        <div className="dropdowns">
          <div className="dropdown">
            <label>Company:</label>
            <select onChange={(e) => setSelectedCompanyIdSecondCard(e.target.value)} value={selectedCompanyIdSecondCard || ''}>
              <option value="">Select a company</option>
              {companies.map(company => (
                <option key={company.companyId} value={company.companyId}>
                  {company.companyName}
                </option>
              ))}
            </select>
          </div>

          {selectedCompanyIdSecondCard && (
            <div className="dropdown">
              <label>Property:</label>
              <select onChange={(e) => setSelectedPropertyIdSecondCard(e.target.value)} value={selectedPropertyIdSecondCard || ''}>
                <option value="">Select a property</option>
                {propertiesSecondCard.map(property => (
                  <option key={property.propertyId} value={property.propertyId}>
                    {property.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {totalsSecondCard && (
          <div className="financial-summary">
            <h2>Financial Summary for Company</h2>
            <p>Total Income: ${totalsSecondCard.totalIncome}</p>
            <p>Total Expenses: ${totalsSecondCard.totalExpenses}</p>
            <p>Balance: ${balanceSecondCard}</p> {/* Display the calculated balance */}
          </div>
        )}
      </div>)}

      <div className="top-right">
        <button onClick={logout} className="logout-btn">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Transaction;
