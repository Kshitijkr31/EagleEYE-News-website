// src/components/Signup.js
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"; // Use the same CSS file for consistent styling


const baseURL = "https://eagleeye-news-website-main.onrender.com"; 

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseURL}/api/auth/signup`, { // Use baseURL here
        username,
        email,
        password,
      });
      alert("Signup successful! Please log in.");
      navigate("/login");
    } catch (error) {
      console.error("Signup failed", error);
      const errorMessage = error.response?.data?.msg || "An error occurred";
      alert("Signup failed: " + errorMessage);
    }
  };

  return (
    <div className="wrapper">
      <div className="title">Signup Form</div>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label>Username</label>
        </div>
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
        <div className="field">
          <input type="submit" value="Signup" />
        </div>
        <div className="signup-link">
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
