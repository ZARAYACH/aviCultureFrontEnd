import React, { Component, Fragment } from 'react';
import './Login.css';
import logo from '../../images/logo.png';


class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      email: e.target.value
    });
  };

  handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      password: e.target.value
    });
  };

  render() {
    return (
      <Fragment>
        <div className="login">
          <div className="row position-relative text-light">
            <div id="LoginForm" className="row rounded mx-auto my-5">
              <div className="position-relative pt-5 text-light">
                <form>
                  <h3 className="fs-1 ">Login</h3>
                  <div className="form-group ">
                    <label className="EmailPass">Email</label>
                    <div className="input input-group mb-4">
                      <span className="input-group-text ">
                        <i id="iUser" className="bi bi-envelope-open"></i>
                      </span>
                      <input
                        id="inp"
                        onChange={this.handleEmail}
                        type="text"
                        className="form-control"
                        placeholder="Enter Email"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="EmailPass">Password</label>
                    <div className="input input-group mb-4">
                      <span className="input-group-text">
                        <i id="iUser" className="bi bi-key"></i>
                      </span>
                      <input
                        id="inp"
                        onChange={this.handlePassword}
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div className="BTN">
                <button id="btn2" type="submit">
                  Login
                </button>
                <img src={logo} alt="Logo" className='mx-5' style={{
                  width: '100px', // Adjust the width according to your preference
                  height: '100px', // Maintain aspect ratio
                  border: '1px solid #ccc', // Example border
                  borderRadius: '50%', // Make the image round
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Example shadow
                }} />
              </div>
              <div id="cantLogin">
                <p>
                  <a href="">Can't log in ?</a>
                </p>
                <p>Privacy policy Terms of use</p>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Login;
