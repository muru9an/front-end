import React, { useState } from 'react';
import PersonService from '../services/PersonService'; // Import your person service
import { useNavigate } from 'react-router-dom';
import styles from './PersonLogin.module.css'; // Import the CSS module

const PersonLogin = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // Step 1: Enter email, Step 2: Verify OTP
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Function to handle sending OTP
  const sendOtp = async () => {
    if (!email) {
      setMessage('Email is required');
      return;
    }
    setLoading(true);
    try {
      const response = await PersonService.sendOtp({ email });
      setMessage(response.data.message);  // Display the message from the response
      setStep(2);  // Move to the OTP verification step
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error sending OTP');
    }
    setLoading(false);
  };

  // Function to handle OTP verification
  const verifyOtp = async () => {
    if (!otp) {
      setMessage('OTP is required');
      return;
    }
    setLoading(true);
    try {
      const response = await PersonService.verifyOtp({ email, otp });
      setMessage('Login successful');

      // Determine where to redirect based on the response
      if (response) {
        navigate('/complaints');
      } else {
        setMessage('No complaints available to view or resolve.');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error verifying OTP');
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <h2>{step === 1 ? 'Login' : 'Verify OTP'}</h2>
      {message && <p className={message.includes('successful') ? styles.successMessage : styles.message}>{message}</p>}
      
      {step === 1 ? (
        <div>
          <input
            className={styles.inputField}
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className={styles.button} onClick={sendOtp} disabled={loading}>
            {loading ? 'Sending...' : 'Send OTP'}
          </button>
        </div>
      ) : (
        <div>
          <input
            className={styles.inputField}
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button className={styles.button} onClick={verifyOtp} disabled={loading}>
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </div>
      )}
      
      {step === 2 && (
        <button className={styles.button} onClick={() => setStep(1)} style={{ marginTop: '10px' }}>
          Resend OTP
        </button>
      )}
    </div>
  );
};

export default PersonLogin;
