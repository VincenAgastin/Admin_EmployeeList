import React, { useState } from 'react';
import '../login/LoginFl.css';
import titlepng from '../../assets/title.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginFl = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { name, password });
      if (response.status === 200) {
        // Store user name in localStorage
        localStorage.setItem('userName', name);
        navigate('/home');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  // State to manage tooltip visibility
  const [showTooltip, setShowTooltip] = useState({ name: false, password: false });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100" id='bgImg'>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">

        <div className="flex justify-center mb-6">
          <img style={{objectFit:"cover"}} src={titlepng} alt="Title" className="h-10 w-25" />
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} autoComplete='off'>
          <div className="mb-4 relative">
            <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setShowTooltip({ ...showTooltip, name: true })}
              onBlur={() => setShowTooltip({ ...showTooltip, name: false })}
              onMouseEnter={() => setShowTooltip({ ...showTooltip, name: true })}
              onMouseLeave={() => setShowTooltip({ ...showTooltip, name: false })}
            />
            {/* Tooltip for Name */}
            {showTooltip.name && (
              <div className="absolute top-0 right-0 mt-1 ml-2 bg-purple text-white text-sm p-2 rounded-lg shadow-lg">
                Admin
              </div>
            )}
          </div>

          <div className="mb-4 relative">
            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setShowTooltip({ ...showTooltip, password: true })}
              onBlur={() => setShowTooltip({ ...showTooltip, password: false })}
              onMouseEnter={() => setShowTooltip({ ...showTooltip, password: true })}
              onMouseLeave={() => setShowTooltip({ ...showTooltip, password: false })}
            />
            {/* Tooltip for Password */}
            {showTooltip.password && (
              <div className="absolute top-0 right-0 mt-1 ml-2 bg-purple text-white text-sm p-2 rounded-lg shadow-lg">
                admin007
              </div>
            )}
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}

          <button
            type="submit"
            className="w-full bg-purple text-white py-2 rounded-lg hover:bg-purple transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginFl;
