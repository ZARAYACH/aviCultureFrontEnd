import React from "react";

import {Link, Route, Routes, useNavigate} from "react-router-dom";
import logo from "../images/AviLogo.png";
import { useAuth } from "../provider/AuthProvider";
import { useAxios } from "../configuration/AxiosConfiguration";
import displayBlock from "./Breeding/Block/Blocks";
import Blocks from "./Breeding/Block/Blocks";

const SideNavBar = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const { axiosInstance } = useAxios();

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
      {/* Main Sidebar Container */}
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <a href="index3.html" className="brand-link">
          <img
            src={logo}
            alt="Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: ".8" }}
          />
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
                      <i className="right fas fa-angle-left" />
                    </a>
                    <ul className="nav nav-treeview">
                      <li className="nav-item">
                        <i className="far fa-sign-out nav-icon" />
                        <a onClick={handleLogout}>Logout</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link">
                  <i className="nav-icon fas fa-columns" />
                  <p>Dashboard</p>
                </Link>
              </li>
              <li className="nav-item menu-open">
                <a href="" className="nav-link active">
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>
                    Breeding
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link className="nav-link active" to="centers">
                      <i className="far fa-circle nav-icon" />
                      <p>Centers</p>
                    </Link>

                  </li>
                  <li className="nav-item">
                    <Link to={"buildings"} className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Buildings</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"blocks"}  className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Blocks</p>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="nav-icon fas fa-copy" />
                  <p>
                    Health
                    <i className="fas fa-angle-left right" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="medicines" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Medicines</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="diseases"
                      className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Diseases</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a href="pages/layout/boxed.html" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Boxed</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="pages/layout/fixed-sidebar.html"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon" />
                      <p>Fixed Sidebar</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="pages/layout/fixed-sidebar-custom.html"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon" />
                      <p>
                        Fixed Sidebar <small>+ Custom Area</small>
                      </p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="pages/layout/fixed-topnav.html"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon" />
                      <p>Fixed Navbar</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="pages/layout/fixed-footer.html"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon" />
                      <p>Fixed Footer</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="pages/layout/collapsed-sidebar.html"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon" />
                      <p>Collapsed Sidebar</p>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-header">EXAMPLES</li>
              <li className="nav-item">
                <a href="pages/calendar.html" className="nav-link">
                  <i className="nav-icon far fa-calendar-alt" />
                  <p>
                    Calendar
                    <span className="badge badge-info right">2</span>
                  </p>
                </a>
              </li>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    </div>
  );
};

export default SideNavBar;
