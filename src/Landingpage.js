import React from 'react';
import { IoMdNotificationsOutline } from "react-icons/io";
import styled from 'styled-components';
import TaskList from './components/TaskList';
import { Link } from 'react-router-dom';

const Landingpage = () => {
  const name = localStorage.getItem("userName");
  
  return (
    <Wrapper>
      <Header>
      <h1>{name && name.trim() !== "" ? name : "User Name"}</h1>
      <div className="right-actions">
          <Link to="/dashboard">    
            <Button>Dashboard</Button>
          </Link>

        </div>
      </Header>
      <Content>
        <TaskList statusType="update" />
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
  padding: 1rem;  /* Fixed padding property */
  z-index: 10;

  h1 {
    font-size: 1.5rem;
    margin-left: 1rem;
  }

  .right-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 1.2rem;
    }

    .right-actions {
      gap: 0.5rem;
    }
  }
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 0.5rem 1rem;
  font-size: 0.95rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #388e3c;
  }
`;

const Icon = styled(IoMdNotificationsOutline)`
  font-size: 28px;
  color: gray;
  cursor: pointer;

  &:hover {
    color: #4caf50;
  }
`;

const Content = styled.div`
  padding: 1rem;

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

export default Landingpage;


