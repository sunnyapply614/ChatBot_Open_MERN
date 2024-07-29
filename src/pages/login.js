import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Admin } from '../hooks/cedential';

function Login({setIsAuthenticated}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = (event) => {
    event.preventDefault();
    // Simulate authentication check
    if (email === Admin.email && password === Admin.password) {
      // Set user as authenticated
      console.log("correct");
      localStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated("true")
      navigate("/");
    } else {
      alert('Invalid credentials');
    }
    // Reset form fields after submission (optional)
    // setEmail('');
    // setPassword('');
  };

  return (
    <div className="tt-login flex items-center justify-center m-auto h-full flex-column md:w-[40%]">
      <div className="py-20 order-0 card">
        <h2 className="pb-6 mb-3 text-4xl font-bold">LOGIN</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="mt-4">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
