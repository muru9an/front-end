import React, { useState } from 'react';
import './superAdminSignUp.css';
import { useNavigate } from 'react-router-dom'; // For navigation
import { FaSpinner } from 'react-icons/fa'; // Spinner for loading

const SuperAdminSignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);

        const requestBody = { email, password };

        try {
            const response = await fetch('http://localhost:3001/api/superadmin/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                const data = await response.json();
                alert('Sign up successful!');
            } else {
                const errorData = await response.json();
                alert(`Sign up failed: ${errorData.message || 'Please try again.'}`);
            }
        } catch (error) {
            console.error('Error during sign up:', error);
            alert('An error occurred during sign up. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleLoginRedirect = () => {
        navigate('/super-admin/signin');
    };

    return (
        <div className="signup-page">
            <div className="signup-container">
                <div className="signup-image">
                    <img src="/super-admin.jpg" alt="Admin Illustration" />
                </div>
                <div className="signup-form-container">
                    <h1 className="signup-header">Super Admin Sign Up</h1>
                    <form onSubmit={handleSignUp}>
                        <div className="form-field">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className={email ? 'valid-input' : ''}
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
                                className={password ? 'valid-input' : ''}
                            />
                        </div>
                        <button type="submit" className="signup-button" disabled={loading}>
                            {loading ? <FaSpinner className="spinner" /> : 'Sign Up'}
                        </button>

                    </form>

                    <div className="separator">OR</div>

                    <div className="login-button-wrapper">
    <button className="log-button" onClick={handleLoginRedirect} disabled={loading}>
        {loading ? '...' : 'Login'}
    </button>
</div>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminSignUp;
