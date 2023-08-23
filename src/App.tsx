import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import NavBar from './components/navBar/NavBar';
import Home from './components/home/Home';

function App() {
  return (
    <Router>
            <React.Fragment><NavBar/></React.Fragment>

      <Routes>
      <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

      </Routes>
    </Router>
  );
}

export default App;
