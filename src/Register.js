import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const registrationData = { name, email, phone, password };

    axios.post("https://taskassignbackend.onrender.com/register/", registrationData)
      .then(response => {
        console.log(response);
        navigate('/login');
      })
      .catch(error => console.error(error.response));

    console.log("Submitted Data:", registrationData);
  };

  return (
    <Wrapper>
      <div className="hero-section">
        <div className="hero-content">
          <h1>Register</h1>
          <p>Create an account to get started</p>
          <form 
          onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="login-link">
              If you already have an account,
              <NavLink to="/login" className="login-link-hover"> click here</NavLink>
            </div>
            <button type="submit" className="cta-button">Register</button>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
.hero-section {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1a1a1a, #2d2d3a);
  color: #d9d9d9;
  text-align: center;
  padding: 0 20px;
}

.hero-content {
  max-width: 400px;
  width: 100%;
  padding: 30px;
  background: rgba(255, 255, 255, 0.05); /* slightly lighter */
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px); /* adds the glass effect */
  -webkit-backdrop-filter: blur(10px); /* for Safari support */
  border: 1px solid rgba(255, 255, 255, 0.15); /* optional border for clarity */
}


h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #ffffff;
}

p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #a6a6b3;
}

form {
  display: flex;
  flex-direction: column;
}

input {
  width: 100%;
  padding: 12px;
  margin-bottom: 1rem;
  border: none;
  border-radius: 5px;
  background: #404053;
  color: #ffffff;
  font-size: 1rem;
}

input::placeholder {
  color: #a6a6b3;
}

.cta-button {
  padding: 12px;
  font-size: 1.1rem;
  background-color: #525266;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cta-button:hover {
  background-color: #626280;
}

.login-link {
  display: inline-block;
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #a6a6b3;
}

.login-link-hover {
  color:  #ff6b6b;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s ease;
}

.login-link-hover:hover {
  color: #ff4747;
  text-decoration: underline;
}
`;

export default Register;
