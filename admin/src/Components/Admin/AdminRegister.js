import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Logo from '../Logo/Logo'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import SideBar from '../Sidebar/SideBar';

function AdminRegister() {
  const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [check, setCheck] = useState(false);
    const [details, setDetails] = useState({
        name: "",
        password:"",
    });
  const [errors, setErrors] = useState({
    name: "",
    password: "",
  });

   const togglepassword = () => {
     setShowPassword(!showPassword);
   };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (details.name.trim() === "") {
      newErrors.name = "Name is required";
      isValid = false;
    } else {
      newErrors.name = "";
    }

    if (details.password.trim() === "") {
      newErrors.password = "Password is required";
      isValid = false;
    } else {
      newErrors.password = "";
    }

    setErrors(newErrors);
    return isValid;
  };
  
  const handleChange = (event) => {
    setDetails((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      if (validateForm()) {
        const res = await axios.post("/admin/register", details);
        navigate("/admin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="userregister">
      <SideBar/>
      <Link to="/admin">Go Back</Link>
      <div className="userregister-container">
        <h1>register a driver</h1>
        <form action="">
          <input
            onChange={handleChange}
            id="name"
            placeholder="name"
            type="text"
          />
          <div className="errorField">
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          
          <div className="password">
            <input
              onChange={handleChange}
              id="password"
              placeholder="password"
              type={showPassword ? "text" : "password"}
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
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <button type="submit" onClick={submitForm}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminRegister