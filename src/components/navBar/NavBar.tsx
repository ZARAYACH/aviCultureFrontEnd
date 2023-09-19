import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';

import './navBar.css';

class NavBar extends Component {
  render() {
    return (
      <div id="navBar" className="navbar navbar-expand-lg">
        <div className="navLinks">
          <div className="navLeft">
            <Link to="/" ><img src={logo} alt="Logo" className="logo" /></Link>
            <button id="btnNavCollapse" className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navContent1" aria-controls="navContent1" aria-expanded="false" aria-label="Toggle navigation">
              <i id="iconBtn" className="bi bi-list fs-1"></i>
            </button>
          </div>
          <div className="collapse navbar-collapse" id="navContent1">
            <div className="navItems">
              <Link to="/productionManagement" id="itm">Production</Link>
              <Link to="/medicationManagement" id="itm">Medication</Link>
              <Link to="/login" id="itm">login</Link>
              <Link to="/feedingManagement" id="itm">Feeding</Link>
              <Link to="/HeatingManagement" id="itm">Heating</Link>
              <Link to="/StrawManagement" id="itm">Straw</Link>
              <Link to="/addBlock" id="itm">Building</Link>
              <Link to="/EquipmentManagement" id="itm">Equipment</Link>
              <Link to="/TransportManagement" id="itm">Transport</Link>

              <div className="nav-item dropdown d-none d-md-flex me-3">
                <a href="#" className="px-0" data-bs-toggle="dropdown" tabIndex={-1}>
                  <div className="position-relative" style={{ boxShadow: '0 7px 12px 0 rgb(95 118 232 / 21%)' }}>
                    <img src="https://via.placeholder.com/80x80.png/60a5fa/030302?text=MG" className="rounded-circle mail-img shadow" alt="media image" width="60" height="60" />
                  </div>
                </a>
                <div style={{ boxShadow: 'rgb(1, 3, 15) 9px 9px 20px', width: '500px', backdropFilter: 'blur(0.3rem)', borderRadius: '10px', backgroundColor: 'rgb(78 6 24 / 88%)' }} className="dropdown-menu dropdown-menu-arrow dropdown-menu-end dropdown-menu-card" >
                  <div className="">
                    <div className="card-header" style={{ backgroundColor: 'rgb(40 0 25 / 73%)', margin: '0 7px 0 7px', borderRadius: '10px' }}>
                      <h3 className="card-title">Profile User</h3>
                      <button className="btn btnProfile"><span>See your Profile</span></button>

                    </div>
                    <div className="list-group list-group-flush list-group-hoverable">
                      <div id="nav-linkDrop" className="list-group-item" >
                        <a href="#" className="d-block">
                          <div className="row align-items-center">
                            <div className="col-auto">
                              <i className="bi bi-box-arrow-left fs-1 bg-secondary p-2" style={{ borderRadius: '100px' }}></i>
                            </div>
                            <div className="col text-truncate">
                              <a href="#" className="h3 text-white mx-2 py-1">
                                <h4>Logout</h4>
                              </a>
                            </div>
                          </div>
                        </a>
                      </div>


                    </div>
                    <div className="list-group list-group-flush list-group-hoverable">
                      <div id="nav-linkDrop" className="list-group-item" >
                        <a href="#" className="d-block">
                          <div className="row align-items-center">
                            <div className="col-auto">
                              <i className="bi bi-gear fs-1 bg-secondary p-2" style={{ borderRadius: '100px' }}></i>
                            </div>
                            <div className="col text-truncate">
                              <a href="#" className="h3 text-white mx-2 py-1">
                                <h4>Options</h4>
                              </a>
                            </div>
                          </div>
                        </a>
                      </div>


                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;
