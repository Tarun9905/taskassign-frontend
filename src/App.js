import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Authlogin from './Authlogin';
import Landingpage from './Landingpage';
import AuthLandingPage from './AuthLandingPage';
import CreateTask from './CreateTask';
import Updatestatus from './Updatestatus';
import Addtask from './Addtask';
import DashBoard from './DashBoard';

const  App =()  => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authlogin" element={<Authlogin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Landingpage />} />
        <Route path="/authhome" element={<AuthLandingPage />} />
        <Route path="/createtask" element={<CreateTask />} />
        <Route path="/updatestatus/:taskId" element={<Updatestatus />} />
        <Route path="/addtask/:taskId" element={<Addtask />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
    </Router>
  );
}

export default App;
