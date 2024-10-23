// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import GetStarted from './components/GetStarted';
import RegisterUser from './components/RegisterUser';
import LoginUser from './components/LoginUser';
import RegisterWorker from './components/RegisterWorker';
import Search from './components/Search';
import Success from './components/Success';
import WorkerLogin from './components/WorkerLogin';
import UserDashboard from './components/UserDashboard';

function App() {
  const [userMobile, setUserMobile] = useState(''); // Store the user's mobile number

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/getstarted" element={<GetStarted />} />
        <Route path="/register-user" element={<RegisterUser />} />
        <Route path="/login-user" element={<LoginUser setUserMobile={setUserMobile} />} />
        <Route path="/register-worker" element={<RegisterWorker />} />
        <Route path="/worker-login" element={<WorkerLogin />} />
        <Route path="/search" element={<Search />} />
        <Route path="/user-dashboard" element={<UserDashboard userMobile={userMobile} />} />
        <Route path="/success" element={<Success />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
