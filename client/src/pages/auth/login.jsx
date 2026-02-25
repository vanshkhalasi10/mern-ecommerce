import React, { useState } from 'react'
import './Login.css';
import axiosInstance from '../../utils/axiosInstance';

const Login = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });


  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");


    try {
      setLoading(true);
      await axiosInstance.post("/auth/login", formData, {
        withCredentials: true
      });

      setSuccess("Login Successful");


    } catch (error) {
      setError(error.response?.data?.message || "Login Failed")
    } finally {
      setLoading(false)
    }
  }



  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {success && <p className="success-text">{success}</p>}
        {error && <p className="error-text">{error}</p>}


        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  )
}

export default Login
