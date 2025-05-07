import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams,useNavigate } from "react-router-dom";

const Addtask = () => {
  const { taskId } = useParams(); // ✅ Get task ID from URL
  const navigate = useNavigate();
  const [usernames, setUsernames] = useState([]);
  const [assignedUser, setAssignedUser] = useState("");

  // Fetch usernames on mount
  useEffect(() => {
    axios.get("https://taskassignbackend.onrender.com/users/") // Replace with the actual endpoint to fetch usernames
      .then((response) => {
        setUsernames(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!assignedUser) {
      alert("Please select a user.");
      return;
    }

    axios
      .put(`https://taskassignbackend.onrender.com/task/${taskId}/`, { 
        id: taskId,
        assigned_user: assignedUser, // Ensure field name matches backend
      })
      .then(() => {
        alert("User assigned to task successfully!");
        navigate(`/authhome`); // Redirect to the home page after submission
        setAssignedUser(""); // Reset field after submission
      })
      .catch((error) => {
        console.error("Error updating task:", error.response?.data || error.message);
        alert("Error updating task. Please try again.");
      });
  };

  return (
    <Wrapper>
      <div className="form-container">
        <h2>Assign User to Task</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="assignedUser">Assigned User:</label>
          <select
            id="assignedUser"
            value={assignedUser}
            onChange={(e) => setAssignedUser(e.target.value)}
          >
            <option value="">Select User</option>
            {usernames.map((user) => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>

          <button type="submit">Assign</button>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 100vh;
  background: linear-gradient(to right, #1e1e2f, #2c2c3e);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: #fff;

  .form-container {
    background-color: #2d2d3a;
    padding: 2rem 3rem;
    border-radius: 12px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
    width: 100%;
    max-width: 500px;
  }

  h2 {
    text-align: center;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  label {
    margin-bottom: 0.5rem;
    font-weight: bold;
  }

  select {
    padding: 0.75rem;
    margin-bottom: 1.5rem;
    border: none;
    border-radius: 6px;
    background-color: #444;
    color: #fff;
    font-size: 1rem;
  }

  button {
    padding: 0.75rem;
    background-color: #4caf50;
    color: #fff;
    font-size: 1rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
  }

  button:hover {
    background-color: #388e3c;
  }

  @media (max-width: 480px) {
    .form-container {
      padding: 1.5rem 2rem;
    }

    h2 {
      font-size: 1.2rem;
    }
  }
`;

export default Addtask;
