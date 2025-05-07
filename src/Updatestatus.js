import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Updatestatus = () => {
  const { taskId } = useParams(); // Gets task ID from URL params
  const [status, setStatus] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submitting state
  const navigate = useNavigate(); // For navigation after submission

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem("userEmail");
    if (!email) {
      alert("User email not found in localStorage.");
      return;
    }

    try {
      setIsSubmitting(true); // Disable the form during submission

      // Send PUT request to update the task status
      const response = await axios.put(`https://taskassignbackend.onrender.com/task/status/${taskId}/`, {
        email,
        password,
        status,
      });

      if (response.status === 200) {
        alert("Task status updated successfully!");
        setStatus("");
        setPassword("");
        navigate("/home"); // Redirect to task list after successful update
      }
    } catch (error) {
      if (error.response) {
        alert(`Error: ${error.response.data.error || "Something went wrong"}`);
      } else {
        alert("Something went wrong.");
      }
    } finally {
      setIsSubmitting(false); // Re-enable the form after submission
    }
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <h2>Update Task Status</h2>

        <label>Status:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="">Select</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <label>Password:</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update"}
        </button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a, #2d2d3a);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;

  form {
    background: rgba(255, 255, 255, 0.05);
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;

    h2 {
      color: #fff;
      text-align: center;
      margin-bottom: 1.5rem;
    }

    label {
      color: #ccc;
      margin-bottom: 0.5rem;
    }

    select,
    input {
      padding: 0.75rem;
      margin-bottom: 1.5rem;
      border: none;
      border-radius: 6px;
      background: #2a2a3e;
      color: #fff;
    }

    button {
      background: #4caf50;
      color: #fff;
      padding: 0.75rem;
      border: none;
      border-radius: 6px;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: #388e3c;
      }

      &:disabled {
        background: #888;
        cursor: not-allowed;
      }
    }
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #2d2d3a;
  }

  ::-webkit-scrollbar-thumb {
    background: #4caf50;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #388e3c;
  }

  @media (max-width: 480px) {
    form {
      padding: 1.5rem;
    }

    input,
    select {
      font-size: 0.9rem;
    }
  }
`;

export default Updatestatus;
