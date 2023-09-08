import React, {Fragment, useEffect, useState} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import Login from "./components/login/Login";
import NavBar from "./components/navBar/NavBar";
import Blocks from "./components/Breeding/Block/Blocks";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import SideNavBar from "./components/SideNavBar";
import Centers from "./components/Breeding/centers/Centers";
import Buildings from "./components/Breeding/buildings/Buildings";
import NotFound from "./components/NotFound";
import Diseases from "./components/health/Diseases";
import Medicines from "./components/health/Medicines";

library.add(fas);

export default function App() {
    useEffect(() => {
        import("preline");
    }, []);

    const [loading, setLoading] = useState(false);

    return (
        <div className="wrapper">
            <Header/>
            <SideNavBar/>
            <Routes>
                <Route path={''} element={<Home/>}></Route>
                <Route path='centers' element={<Centers/>}></Route>
                <Route path='buildings' element={<Buildings/>}></Route>
                <Route path='blocks' element={<Blocks/>}></Route>
                <Route path='medicines' element={<Medicines/>}></Route>
                <Route path='diseases' element={<Diseases/>}></Route>

                <Route path="*" element={<NotFound/>}/>
            </Routes>
            <Footer/>
        </div>
    )
}
