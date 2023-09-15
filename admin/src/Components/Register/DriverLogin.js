import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function DriverLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { user, loading, error, dispatch } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    mobile: undefined,
    password: undefined,
  });


  const togglepassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (event) => {
    setCredentials((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({
      type: "LOGIN_START",
    });

    try {
      const response = await axios.post("/auth/driver/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
      localStorage.setItem("type", "driver");
      navigate(`/user/${response.data._id}`)
    } catch (error) {
       dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
      console.log(error.message);
    }
  };

  return (
    <div className="main-container">
      <div className="form-container">
        <form>
          <h2>Login As Driver</h2>
          <input
            type="number"
            id="mobile"
            onChange={handleChange}
            placeholder="mobile"
          />
          <div className="errorField">
            {error?.message === "number not found" && <>{error.message}</>}
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
          <div>OR</div>
          <Link to="/driver/new/register">Register Here</Link>
        </div>
        </form>
      </div>
    </div>
  );
}

export default DriverLogin;
