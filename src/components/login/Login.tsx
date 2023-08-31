import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // axios for making API requests


import './Login.css';
import logo from '../../images/logo.png';


function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<String>(); // Explicitly set the type
  const [password, setPassword] = useState<String>(); // Explicitly set the type
  const [errorMessage, setErrorMessage] = useState<string>(''); // State for error message

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/login', {
        email,
        password,
      });

      const { access_token } = response.data;

      // Saving the access_token to local storage or state for future requests
      navigate('/');
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Login failed. Please check your credentials.'); // Update error message state

    }
  };


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
                      onChange={handleEmail}
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
                      onChange={handlePassword}
                      type="password"
                      className="form-control"
                      placeholder="Enter password"
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="BTN">
              <button id="btn2" type="submit" onClick={handleLogin}>
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
            {errorMessage && <div className="error-message bg-danger rounded-pill mb-3">{errorMessage}</div>} {/* Display error message */}

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

export default Login;
