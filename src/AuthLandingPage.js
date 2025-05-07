import React from 'react';
import styled from 'styled-components';
import TaskList from './components/TaskList';
import { Link } from 'react-router-dom';


const AuthLandingPage = () => {
  return (
    <Wrapper>
      <Header>
        <h1>Authority Role Assignment Panel</h1> {/* More descriptive heading */}
        <Link to="/createtask">
          <StyledButton>Create Task</StyledButton>
        </Link>
      </Header>
      <Content>
      <TaskList statusType="adddelete" showFilters={false} />
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100vh;
  background: #1e1e2f;
  color: white;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #2c2c3c;
  }

  ::-webkit-scrollbar-thumb {
    background: #4caf50;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #388e3c;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background: #1e1e2f;
  padding: 1rem;
  z-index: 10;

  h1 {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 1.2rem;
    }
  }
`;

// Styled button for "Assign Task"
const StyledButton = styled.button`
  background-color: #4caf50; /* Green background */
  color: white; /* White text */
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #388e3c; /* Darker green when hovered */
  }

  &:focus {
    outline: none; /* Remove focus outline */
  }
`;

const Content = styled.div`
  padding: 1rem;

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

export default AuthLandingPage;
