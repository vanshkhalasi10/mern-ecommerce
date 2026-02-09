import { useState } from 'react';
import axios from "axios";

const Register = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value});
    console.log(formData)
    
  }

  const handleSubmit= async (e)=>{
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register",formData);
      alert(res.data.message);
      
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Register Page</h2>


        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button type='submit'>Register</button>
      </form>
    </div>
  )
}

export default Register
