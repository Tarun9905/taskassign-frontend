import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // Import useNavigate to programmatically navigate

const Authlogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");  // To display error message if credentials are incorrect
  const navigate = useNavigate(); // Hook to navigate to another route

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Check if the entered email and password are correct
    if (email === "tarunrekandar9905@gmail.com" && password === "tarun9905") {
      navigate("/authhome"); // Navigate to /authhome on successful login
    } else {
      setError("Invalid email or password"); // Show error message if credentials are incorrect
    }
  };

  return (
    <Wrapper>
      <div className="hero-section">
        <div className="hero-content">
          <h1>Login</h1>
          <p>Sign in to your account</p>
          {error && <p className="error">{error}</p>} {/* Display error message */}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Bind email state
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Bind password state
              required
            />
            <button type="submit" className="cta-button">Login</button>
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
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
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

  .error {
    color: red;
    font-size: 1rem;
    margin-bottom: 1rem;
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
`;

export default Authlogin;
