import React, { useState } from 'react'
import "./Auth.css";
import axiosInstance from '../../utils/axiosInstance';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });


  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");


    try {
      setLoading(true);
      const res = await axiosInstance.post("/auth/login", formData, {
        withCredentials: true
      });

      const loggedUser = res.data.user

      setUser(loggedUser);
      setSuccess("Login Successful");

      setTimeout(() => {
        if (loggedUser.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      }, 500);


    } catch (error) {
      setError(error.response?.data?.message || "Login Failed")
    } finally {
      setLoading(false)
    }
  }



  return (
    <div className="auth-wrapper">
      <form className="auth-card fade-in" onSubmit={handleSubmit}>
        <div className="auth-back">
          <Link to="/">← Back to Home</Link>
        </div>

        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Login to continue shopping</p>

        {success && <p className="success-text">{success}</p>}
        {error && <p className="error-text">{error}</p>}

        <div>
          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            className="input"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="label">Password</label>
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="auth-footer">
          Don’t have an account? <a href="/register">Register</a>
        </div>

      </form>
    </div>
  )
}

export default Login
