import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell } from 'recharts';
import styled from 'styled-components';

const COLORS = ['#00C49F', '#FF8042', '#FFBB28'];

const DashBoard = () => {
  const name = localStorage.getItem("userName");
  const [tasks, setTasks] = useState([]);
  const [statusCount, setStatusCount] = useState({ completed: 0, inProgress: 0, pending: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      const name = localStorage.getItem("userName");
      try {
        const response = await axios.get(`https://taskassignbackend.onrender.com/tasks/${name}/`);
        console.log("Fetched tasks:", response.data);  // Debugging log
        setTasks(response.data);
        calculateStatus(response.data);  // Calculate task status
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Function to calculate status counts
  const calculateStatus = (tasks) => {
    let completed = 0, inProgress = 0, pending = 0;
    tasks.forEach(task => {
      console.log("Task status:", task.status);  // Debugging the task status
      if (task.status && task.status.toLowerCase() === "completed") {
        completed++;
      } else if (task.status && task.status.toLowerCase() === "in progress") {
        inProgress++;
      } else if (task.status && task.status.toLowerCase() === "pending") {
        pending++;
      }
    });
    setStatusCount({ completed, inProgress, pending });
    console.log("Status count:", { completed, inProgress, pending });
  };

  // Prepare pie chart data
  const pieData = [
    { name: 'Completed', value: statusCount.completed },
    { name: 'In Progress', value: statusCount.inProgress },
    { name: 'Pending', value: statusCount.pending },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper>
      <h1>{name && name.trim() !== "" ? name : "User Name"}</h1>
      <h2>Task Status Overview</h2>

      {/* Pie Chart */}
      <ChartWrapper style={{ width: '300px', height: '300px' }}>
        <PieChart width={300} height={300}>
          <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={80}>
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ChartWrapper>

      {/* Tasks List */}
      <TaskList>
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <TaskItem key={index}>
              <strong>{task.title}</strong>
              <p>{task.description}</p>
              <p>Status: {task.status}</p>
            </TaskItem>
          ))
        ) : (
          <p>No tasks found.</p>
        )}
      </TaskList>
    </Wrapper>
  );
};

// Styled Components
const Wrapper = styled.div`
  background: #1e1e2f;
  color: white;
  min-height: 100vh;
  padding: 2rem;
`;

const ChartWrapper = styled.div`
  background: #2c2c3c;
  padding: 1rem;
  border-radius: 6px;
  margin-top: 2rem;
  text-align: center;
`;

const TaskList = styled.div`
  margin-top: 1rem;
`;

const TaskItem = styled.div`
  background: #2c2c3c;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 6px;
`;

export default DashBoard;
