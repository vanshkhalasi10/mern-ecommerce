import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from '../../utils/axiosInstance';
import { useAuth } from '../../context/AuthContext';
import "./Auth.css";

const Register = () => {

  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });


  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setLoading(true);
      const res = await axiosInstance.post("/auth/register",
        formData,
        { withCredentials: true }
      );

      setUser(res.data.user);

      setSuccess(res.data.message || "Registered successfully");
      localStorage.setItem("verifyEmail", formData.email);

      setTimeout(() => {

        navigate('/verify-email', {
          state: { email: formData.email }
        });
      }, 800)

    } catch (err) {
      setError(err.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='register-container'>
      <form className='register-form' onSubmit={handleSubmit}>

        <div className="auth-back">
          <Link to="/">← Back to Home</Link>
        </div>

        <h2>Create Account</h2>

        {success && <p className="success-text">{success}</p>}
        {error && <p className="error-text">{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
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
          {loading ? "Creating account..." : "Register"}
        </button>

        <div className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  )
}

export default Register
