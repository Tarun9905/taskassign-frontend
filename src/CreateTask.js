import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const CreateTask = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    due_date: "", // Make sure this matches the backend field name (due_date)
    priority: "Medium",
  });
  const navigate = useNavigate(); // Import useNavigate from react-router-dom

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Task:", task);

    // Send the task data to the backend
    axios
      .post("https://taskassignbackend.onrender.com/tasks/", task)
      .then((response) =>{ console.log("Task Created:", response.data)
        navigate("/authhome"); // Redirect to the home page after submission
  })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <Wrapper>
      <div className="hero-section">
        <div className="hero-content">
          <h2>Create Task</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Task Title"
              value={task.title}
              onChange={handleChange}
              required
            />
            <textarea
              name="description"
              placeholder="Task Description"
              value={task.description}
              onChange={handleChange}
              rows="4"
            />
            <input
              type="date"
              name="due_date" // Make sure the name matches the backend field
              value={task.due_date}
              onChange={handleChange}
              required
            />
            <select name="priority" value={task.priority} onChange={handleChange}>
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority</option>
            </select>

            <button className="cta-button" type="submit">
              Create Task
            </button>
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

  h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #ffffff;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  input,
  select,
  textarea {
    width: 100%;
    padding: 12px;
    margin-bottom: 1rem;
    border: none;
    border-radius: 5px;
    background: #404053;
    color: #ffffff;
    font-size: 1rem;
  }

  input::placeholder,
  textarea::placeholder {
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

export default CreateTask;
