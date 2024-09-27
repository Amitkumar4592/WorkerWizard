// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import GetStarted from './components/GetStarted';
import RegisterUser from './components/RegisterUser';
import LoginUser from './components/LoginUser';
import RegisterWorker from './components/RegisterWorker';
import Search from './components/Search';
import Success from './components/Success';
import WorkerLogin from './components/WorkerLogin';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/getstarted" element={<GetStarted />} />
        <Route path="/register-user" element={<RegisterUser />} />
        <Route path="/login-user" element={<LoginUser />} />
        <Route path="/register-worker" element={<RegisterWorker />} />
        <Route path="/worker-login" element={<WorkerLogin />} />
        <Route path="/search" element={<Search />} />
        <Route path="/success" element={<Success />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
