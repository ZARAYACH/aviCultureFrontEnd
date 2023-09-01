
import React,{useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import './App.css';
import Login from './components/login/Login';
import NavBar from './components/navBar/NavBar';
//import Home from './components/home/Home';
import AddBlock from './components/Buildings/Block/AddBlock';
import DisplayBlock from './components/Buildings/Block/DisplayBlock';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import SideNavBar from './components/SideNavBar';
import preline from 'preline'; // Import Preline
library.add(fas);
export default function App() {

  useEffect(() => {
    import('preline');
  }, []);
  return (
    <div className="wrapper">
      <Router>
        <React.Fragment><Header /></React.Fragment>
        <React.Fragment><SideNavBar /></React.Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addBlock" element={<AddBlock />} />
          <Route path="/displayBlock" element={<DisplayBlock />} />
        </Routes>
        <React.Fragment><Footer /></React.Fragment>
      </Router>
    </div>
  );
}

