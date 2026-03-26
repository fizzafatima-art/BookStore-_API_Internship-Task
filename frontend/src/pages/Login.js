import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_URL}/api/users/login`, formData);
            localStorage.setItem('token', res.data.token);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-[90vh] flex items-center justify-center bg-slate-50 px-4">
            <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl w-full max-w-md border border-gray-100">
                <h2 className="text-3xl font-black text-center text-slate-800 mb-8">Sign In</h2>
                {error && <p className="bg-red-50 text-red-500 p-3 rounded-xl mb-6 text-center text-sm">{error}</p>}
                <form onSubmit={handleLogin} className="space-y-5">
                    <input 
                        type="text" 
                        placeholder="Username" 
                        className="w-full p-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 outline-none"
                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="w-full p-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 outline-none"
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                    <button className="w-full bg-indigo-600 text-white p-4 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all">
                        Login Now
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;