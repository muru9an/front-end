import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './adminLogin.css';
import { jwtDecode } from 'jwt-decode'; // Correctly import jwtDecode

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const requestBody = { email, password };

        try {
            const response = await fetch('http://localhost:3001/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                const data = await response.json();
                const decodedToken = jwtDecode(data.token); // Decode the JWT token

                console.log('Decoded Token:', decodedToken); // Log the decoded token
                
                // Now you can access the role from the decoded token
                setMessage('Login successful! Redirecting...'); 
                setTimeout(() => {
                    navigate('/super-admin/dashboard', { state: { role: decodedToken.role } }); 
                }, 2000);
            } else {
                const errorData = await response.json();
                setMessage(`Login failed: ${errorData.message || 'Please try again.'}`);
            }
        } catch (error) {
            console.error('Error during login:', error);
            setMessage('An error occurred during login. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="super-admin-login-container">
            <div className="login-image">
                <img src="/super-admin-login.jpg" alt="Admin Login Illustration" />
            </div>
            <div className="form-container">
                <h1> Admin Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="form-field">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button className='btn' type="submit" disabled={loading}>
                        {loading ? 'Logging In...' : 'Login'}
                    </button>
                </form>
                {message && <div className="message">{message}</div>}
            </div>
        </div>
    );
};

export default AdminLogin;
