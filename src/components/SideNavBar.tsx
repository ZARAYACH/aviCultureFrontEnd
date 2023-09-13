import React from "react";

import {Link, Route, Routes, useNavigate} from "react-router-dom";
import logo from "../images/AviLogo.png";
import {useAuth} from "../provider/AuthProvider";
import {useAxios} from "../configuration/AxiosConfiguration";

const SideNavBar = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    const {axiosInstance} = useAxios();

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
                                                className="nav-icon img-circle m-0"
                                                alt="User Image"
                                            />
                                            Alexander Pierce
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
                                <a href="" className="nav-link active">
                                    <i className="nav-icon fas fa-tachometer-alt"/>
                                    <p>
                                        Breeding
                                        <i className="right fas fa-angle-left"/>
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <Link className="nav-link active" to="centers">
                                            <i className="far fa-circle nav-icon"/>
                                            <p>Centers</p>
                                        </Link>

                                    </li>
                                    <li className="nav-item">
                                        <Link to={"buildings"} className="nav-link">
                                            <i className="far fa-circle nav-icon"/>
                                            <p>Buildings</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={"blocks"} className="nav-link">
                                            <i className="far fa-circle nav-icon"/>
                                            <p>Blocks</p>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link">
                                    <i className="nav-icon fas fa-copy"/>
                                    <p>
                                        Health
                                        <i className="fas fa-angle-left right"/>
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <Link to="medicines" className="nav-link">
                                            <i className="far fa-circle nav-icon"/>
                                            <p>Medicines</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="diseases"
                                              className="nav-link">
                                            <i className="far fa-circle nav-icon"/>
                                            <p>Diseases</p>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item menu-open">
                                <a href="" className="nav-link active">
                                    <i className="nav-icon fas fa-tachometer-alt"/>
                                    <p>
                                    Transportation Management
                                        <i className="right fas fa-angle-left"/>
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <Link className="nav-link active" to="vehicles">
                                            <i className="far fa-circle nav-icon"/>
                                            <p>vehicle</p>
                                        </Link>

                                    </li>
                                    <li className="nav-item">
                                        <Link to={"vehicles_intervention"} className="nav-link">
                                            <i className="far fa-circle nav-icon"/>
                                            <p>vehicle-intervention</p>
                                        </Link>
                                    </li>

                                </ul>
                            </li>
                            <li className="nav-header">PRODUCTS & TRANSACTIONS</li>
                            <li className="nav-item menu-open">
                                <Link to="products" className="nav-link">
                                    <i className="nav-icon fas fa-tachometer-alt"/>
                                    <p>Products Stock</p>
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
