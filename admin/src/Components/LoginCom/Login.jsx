import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const url = import.meta.env.VITE_URL; 

    const onSubmithandler = async (e) => {
        e.preventDefault(); 

        setLoading(true); 
        try {
            console.log('Sending request to:', `${url}/api/user/admin/register`);
            console.log(url);
            
            console.log('Request payload:', { email, password });

            const response = await axios.post(`${url}/api/user/admin/register`, { email, password });

            console.log('Response:', response);

            if (response.status === 200) {
                const { token } = response.data;
                setToken(token); 
                alert('Login successful!');
            } else {
                alert('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert(error.response?.data?.message || 'An error occurred. Please try again.');
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="flex">
            <div className="bg-white login-container">
                <h1 className="text-center font-bold mb-4 text-2xl">Admin Panel</h1>
                <form onSubmit={onSubmithandler}>
                    <div className="mb-4">
                        <label>Email Address</label>
                        <input
                            type="email"
                            placeholder="your@email.com"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            className="input-field"
                        />
                    </div>
                    <div className="mb-4">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            className="input-field"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`submit-button ${loading ? 'loading' : ''}`}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
