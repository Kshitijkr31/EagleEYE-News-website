// src/components/Login.js
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Login.css"; // Ensure this CSS file is linked correctly

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      handleLogin(response.data.token); // Pass the token to handleLogin
    } catch (error) {
      console.error("Login failed", error.response.data);
      alert("Login failed: " + error.response.data.msg);
    }
  };

  return (
    <div className="wrapper">
      <div className="title">Login to EAGLE EYE</div>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Email Address</label>
        </div>
        <div className="field">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Password</label>
        </div>
        <div className="content">
          <div className="checkbox">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
        </div>
        <div className="field">
          <input type="submit" value="Login" />
        </div>
        <div className="signup-link">
          Not a member? <Link to="/signup">Signup now</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
