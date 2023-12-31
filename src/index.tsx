import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import NotFound from "./components/NotFound";
import Login from "./components/login/Login";
import AuthProvider from "./provider/AuthProvider";
import Logout from "./components/Logout";
import {ProtectedRoute} from "./components/ProtectedRoute";
import Forbiden from "./components/Forbiden";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <BrowserRouter>
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Navigate to="/login"/>}/>
                <Route path="" element={<ProtectedRoute requiredRoles={[]}/>}>
                    <Route path="dashboard/*" element={<App/>}></Route>
                </Route>
                <Route path="/login" element={<Login/>}/>
                <Route path="/logout" element={<Logout/>}/>
                <Route path="/forbidden" element={<Forbiden/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </AuthProvider>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
