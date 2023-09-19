import React, {useEffect, useState} from "react";

import {Link, Route, Routes, useNavigate} from "react-router-dom";
import logo from "../images/AviLogo.png";
import {useAuth} from "../provider/AuthProvider";
import {useAxios} from "../configuration/AxiosConfiguration";
import User from "./personnels/User";

const SideNavBar = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    const {axiosInstance} = useAxios();
    const [user, setUser] = useState<User | undefined>(undefined);
    const handleLogout = async () => {
        try {
            await axiosInstance
                .post("/logout")
                .then((value) => auth.setAccessToken(""))
                .then((value) => navigate("/logout"));
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    useEffect(() => {
        try {
            axiosInstance
                .get(process.env.REACT_APP_API_PREFIX + "/users/info")
                .then((response) => setUser(response.data as User))
        } catch (error) {
            console.error("Error during logout:", error);
        }
    }, [])

    return (
        <div>
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                {/* Brand Logo */}
                <a href="index3.html" className="brand-link">
                    <img src={logo}
                         alt="Logo"
                         className="brand-image img-circle elevation-3"
                         style={{opacity: ".8"}}/>
                    <span className="brand-text font-weight-light">Aviculture</span>
                </a>
                {/* Sidebar */}
                <div className="sidebar">
                    {/* Sidebar user panel (optional) */}
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="info">
                            <nav className="mt-2">
                                <ul
                                    className="nav nav-pills nav-sidebar flex-column"
                                    data-widget="treeview"
                                    role="menu"
                                    data-accordion="false"
                                >
                                    <li className="nav-item ">
                                        <a href="/" className="flex justify-start nav-link">
                                            <img
                                                src="dist/img/user2-160x160.jpg"
                                                className="nav-icon img-circle mr-2"
                                                alt="User Image"
                                            />
                                            {user?.firstName ? user?.firstName + ' ' + (user?.lastName ? user?.lastName : '') : user?.email}
                                            <i className="right fas fa-angle-left"/>
                                        </a>
                                        <ul className="nav nav-treeview">
                                            <li className="nav-item">
                                                <i className="far fa-sign-out nav-icon"/>
                                                <a onClick={handleLogout}>Logout</a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <nav className="mt-2">
                        <ul
                            className="nav nav-pills nav-sidebar flex-column"
                            data-widget="treeview"
                            role="menu"
                            data-accordion="false">
                            <li className="nav-item">
                                <Link to="/dashboard" className="nav-link">
                                    <i className="nav-icon fas fa-columns"/>
                                    <p>Dashboard</p>
                                </Link>
                            </li>
                            <li className="nav-item menu-open">
                                <a href="" className="nav-link ">
                                    <i className="nav-icon fas fa-egg"/>
                                    <p>
                                        Breeding
                                        <i className="right fas fa-angle-left"/>
                                    </p>
                                </a>
                                <ul className="nav nav-treeview ml-2">
                                    <li className="nav-item">
                                        <Link className="nav-link " to="centers">
                                            <i className="far fa-circle nav-icon"/>
                                            <p>Centers</p>
                                        </Link>

                                    </li>
                                    <li className="nav-item">
                                        <Link to={"buildings"} className="nav-link">
                                            <i className="fas fa-building nav-icon"/>
                                            <p>Buildings</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={"blocks"} className="nav-link">
                                            <i className="fas fa-circle nav-icon"/>
                                            <p>Blocks</p>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link">
                                    <i className="nav-icon fas fa-clinic-medical"/>
                                    <p>
                                        Health
                                        <i className="fas fa-angle-left right"/>
                                    </p>
                                </a>
                                <ul className="nav nav-treeview ml-2">
                                    <li className="nav-item">
                                        <Link to="medicines" className="nav-link">
                                            <i className="fas fa-briefcase-medical nav-icon"/>
                                            <p>Medicines</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="diseases"
                                              className="nav-link">
                                            <i className="fas fa-disease nav-icon"/>
                                            <p>Diseases</p>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item menu-open">
                                <a href="" className="nav-link ">
                                    <i className="nav-icon fas fa-car-side"/>
                                    <p>
                                        Transportation Management
                                        <i className="right fas fa-angle-left"/>
                                    </p>
                                </a>
                                <ul className="nav nav-treeview ml-2">
                                    <li className="nav-item">
                                        <Link className="nav-link " to="vehicles">
                                            <i className="fas fa-car nav-icon"/>
                                            <p>vehicle</p>
                                        </Link>

                                    </li>

                                </ul>
                            </li>
                            <li className="nav-header">PRODUCTS & TRANSACTIONS</li>
                            <li className="nav-item menu-open">
                                <Link to="products" className="nav-link">
                                    <i className="nav-icon fas fa-warehouse"/>
                                    <p>Products Stock</p>
                                </Link>
                            </li>
                            <li className="nav-item menu-open">
                                <Link to="transactions" className="nav-link">
                                    <i className="nav-icon fas fa-dollar-sign"></i>
                                    <p>Transactions</p>
                                </Link>
                            </li>
                            <li className="nav-item menu-open">
                                <Link to="counter-parties" className="nav-link">
                                    <i className="nav-icon fas fa-cash-register"></i>
                                    <p>Counter Parties</p>
                                </Link>
                            </li>
                            <li className="nav-header">PERSONNEL MANAGEMENT</li>
                            <li className="nav-item menu-open">
                                <Link to="personnels" className="nav-link">
                                    <i className="nav-icon fas fa-users"></i>
                                    <p>Personnel's</p>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        </div>
    );
};

export default SideNavBar;
