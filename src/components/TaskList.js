import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GrDocumentUpdate } from "react-icons/gr";
import { FaPlus, FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import axios from "axios";

const TaskList = ({ statusType, showFilters = true }) => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    dueDate: "",
  });

  // Fetch tasks from the backend
  useEffect(() => {
    axios
      .get("https://taskassignbackend.onrender.com/tasks/")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  // Handle delete task
  const handleDelete = (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      axios
        .delete(`https://taskassignbackend.onrender.com/task/${taskId}/`)
        .then(() => {
          setTasks(tasks.filter((task) => task.id !== taskId));
          alert("Task deleted successfully!");
        })
        .catch((error) => {
          console.error("Error deleting task:", error);
          alert("Error deleting task. Please try again.");
        });
    }
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filters.status === "" || task.status === filters.status;
    const matchesPriority = filters.priority === "" || task.priority === filters.priority;
    const matchesDueDate = filters.dueDate === "" || task.due_date === filters.dueDate;

    return matchesSearch && matchesStatus && matchesPriority && matchesDueDate;
  });

  return (
    <Wrapper>
      <h2>All Tasks</h2>

      {showFilters && (
        <FilterWrapper>
          <input
            type="text"
            placeholder="Search by title or description"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select name="status" value={filters.status} onChange={handleFilterChange}>
            <option value="">All Status</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <select name="priority" value={filters.priority} onChange={handleFilterChange}>
            <option value="">All Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <input
            type="date"
            name="dueDate"
            value={filters.dueDate}
            onChange={handleFilterChange}
          />
        </FilterWrapper>
      )}

      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Due Date</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Assigned User</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.due_date}</td>
                  <td>{task.priority}</td>
                  <td>{task.status}</td>
                  <td>{task.assigned_user}</td>
                  <td>
                    {statusType === "update" ? (
                      <NavLink to={`/updatestatus/${task.id}`} className="update-icon">
                        <GrDocumentUpdate className="update-icon" />
                      </NavLink>
                    ) : statusType === "adddelete" ? (
                      <>
                        <NavLink to={`/addtask/${task.id}`} className="add-icon">
                          <FaPlus className="add-icon" />
                        </NavLink>
                        <button
                          onClick={() => handleDelete(task.id)}
                          className="delete-icon"
                        >
                          <FaTrash />
                        </button>
                      </>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a, #2d2d3a);
  padding: 2rem;
  color: #fff;

  .task-list {
    max-width: 1000px;
    margin: auto;
    overflow-x: auto;
  }

  h2 {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 1.8rem;
  }

  table {
    width: 100%;
    min-width: 700px;
    border-collapse: collapse;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #444;
    font-size: 0.9rem;
  }

  th {
    background-color: #333;
    color: #fff;
  }

  td {
    color: #ccc;
  }

  tr:nth-child(even) {
    background-color: #2a2a3e;
  }

  tr:hover {
    background-color: #3b3b52;
  }

  .update-icon,
  .add-icon,
  .delete-icon {
    font-size: 1.5rem;
    cursor: pointer;
    transition: color 0.3s ease-in-out;
  }

  .update-icon,
  .add-icon {
    color: #4caf50;
    margin-left: 1rem;
    background: none;
    border: none;
    &:hover {
      color: #388e3c;
    }
  }

  .delete-icon {
    color: #f44336;
    margin-left: 1rem;
    background: none;
    border: none;
    &:hover {
      color: #d32f2f;
    }
  }

  @media (max-width: 768px) {
    table {
      min-width: 600px;
    }
  }

  @media (max-width: 480px) {
    table {
      min-width: 500px;
    }
    .update-icon, .add-icon, .delete-icon {
      font-size: 1.2rem;
    }
  }
`;

const FilterWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;

  input,
  select {
    padding: 0.5rem;
    border-radius: 6px;
    border: none;
    font-size: 1rem;
  }

  input[type="text"] {
    width: 200px; // Make the search input smaller
    padding: 0.4rem;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 0.9rem;
  }


  input[type="date"] {
    min-width: 150px;
  }

  select {
    min-width: 150px;
  }
`;

export default TaskList;
