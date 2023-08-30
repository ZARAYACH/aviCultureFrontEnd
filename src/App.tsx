import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import NavBar from './components/navBar/NavBar';
import Home from './components/home/Home';
import AddBlock from './components/Buildings/Block/AddBlock';
library.add(fas)

function App() {
  return (
    <Router>
      <React.Fragment><NavBar /></React.Fragment>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addBlock" element={<AddBlock/>} />

      </Routes>
    </Router>
  );
}

export default App;
