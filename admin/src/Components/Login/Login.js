import React, { useContext, useState } from 'react';
import './Login.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";


function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    name: undefined,
    password: undefined,
  }); 

  const {user, loading, error, dispatch } = useContext(AuthContext)

  const handleChange = (event) => {
    setCredentials((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };

  const togglepassword = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({
      type: "LOGIN_START"
    })
    try {
      const response = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: response })
      localStorage.setItem("type", "admin");
      navigate("/");

    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data })
      console.log(error.message);
    }
  };

  return (
    <div className="main-container">
      <div className="form-container">
        <form>
          <h2>Login</h2>
          <input
            type="text"
            id="name"
            onChange={handleChange}
            placeholder="Username"
          />
          <div className="errorField">
            {error?.message === "Admin not found" && <>{error.message}</>}
          </div>
          <div className="password">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={handleChange}
            />
            <span className="icon" onClick={togglepassword}>
              {showPassword ? (
                <AiOutlineEyeInvisible size={"2em"} />
              ) : (
                <AiOutlineEye size={"2em"} />
              )}
            </span>
          </div>
          <div className="errorField">
            {error?.message === "Password does not match" && (
              <>{error.message}</>
            )}
          </div>

          <button onClick={handleSubmit}>Login</button>
          <div className="bottom-block">
            <span>Are you a driver? </span>
            <Link to="/driver/login">Login Here</Link>
            <div>OR</div>
            <Link to="/driver/new/register">Register Here</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login