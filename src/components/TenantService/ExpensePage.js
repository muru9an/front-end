import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendOtp, verifyOtp, payExpenseAmount, fileComplaint } from '../services/tenantservice';
import { 
  fetchCompanies, 
  fetchPropertiesByCompany, 
  fetchTenantsByProperty, 
} from '../services/TransactionService';
import styles from './TenantPage.module.css';  // Corrected path to CSS module


const Outgoing = () => {

  const [expenseAmount, setExpenseAmount] = useState('');
  const [complaint, setComplaint] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  const [companies, setCompanies] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [properties, setProperties] = useState([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [tenants, setTenants] = useState([]);
  const [selectedTenantId, setSelectedTenantId] = useState(null);

  const navigate = useNavigate();

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
        // setTotals(null);
        // setTransactions([]);
      }
    };
    loadProperties();
  }, [selectedCompanyId]);

   // Fetch tenants when a property is selected in the first card
   useEffect(() => {
    const loadTenants = async () => {
      if (selectedPropertyId) {
        const tenantData = await fetchTenantsByProperty(selectedPropertyId);
        setTenants(tenantData);
        setSelectedTenantId(null);
        // setTotals(null);
        // setTransactions([]);
      }
    };
    loadTenants();
  }, [selectedPropertyId]);
  
  const handleExpenseAmount = async (e) => {
    e.preventDefault();
    try {
      // await payRent({ amount: rentAmount }, token);
      await payExpenseAmount({ amount: expenseAmount, tenantId: selectedTenantId });
      setMessage('Expense paid successfully.');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to pay rent.');
    }
  };

 
  return (
    <div className={styles.tenantContainer}>
      <h2 className={styles.pageTitle}>Transactions</h2>

      {/* {!isLoggedIn && (
        <form className={styles.form} onSubmit={!otpSent ? handleSendOtp : handleVerifyOtp}>
          <h3 className={styles.sectionTitle}>{!otpSent ? 'Login with Email' : 'Verify OTP'}</h3>
          {!otpSent ? (
            <>
              <input
                className={styles.inputField}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button className={styles.button} type="submit">Send OTP</button>
            </>
          ) : (
            <>
              <input
                className={styles.inputField}
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <button className={styles.button} type="submit">Verify OTP</button>
            </>
          )}
        </form>
      )} */}

      {/* {isLoggedIn && ( */}
        <>
          <h3 className={styles.sectionTitle}>Pay Expense</h3>
          <form className={styles.form} onSubmit={handleExpenseAmount}>
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
        
            {/* <input
              className={styles.inputField}
              type="number"
              placeholder="Rent Amount"
              value={rentAmount}
              onChange={(e) => setRentAmount(e.target.value)}
              required
            />
            <button className={styles.button} type="submit">Pay Rent</button> */}

        {/* <form className={styles.form} onSubmit={handleFileComplaint}> */}
            <input
              className={styles.inputField}
              type="number"
              placeholder="Expense Amount"
              value={expenseAmount}
              onChange={(e) => setExpenseAmount(e.target.value)}
              required
            />
            <button className={styles.button} type="submit">Pay Expense</button>
          </form>

          {/* <h3 className={styles.sectionTitle}>File a Complaint</h3>
          <form className={styles.form} onSubmit={handleFileComplaint}>
            <textarea
              className={styles.textArea}
              placeholder="Your complaint"
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              required
            />
            <button className={styles.button} type="submit">File Complaint</button>
          </form> */}
        </>
      {/* )} */}

      {message && <p className={message.includes('successful') ? styles.success : styles.error}>{message}</p>}
   
      {/* <div className="top-right">
        <button onClick={logout} className="logout-btn">
          Log Out
        </button>
      </div> */}

    </div>
  );
};

export default Outgoing;
