import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Logo from '../Logo/Logo'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

function DriverRegister() {
  const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [check, setCheck] = useState(false);
    const [details, setDetails] = useState({
        name: "",
        mobile: "",
        address: "",
        license: "",
        password:"",
    });
  const [errors, setErrors] = useState({
    name: "",
    mobile: "",
    address: "",
    license: "",
    password: "",
    check: "",
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

    if (!/^\d{10}$/.test(details.mobile)) {
      newErrors.mobile = "Mobile number must be 10 digits";
      isValid = false;
    } else {
      newErrors.mobile = "";
    }

    if (details.address.trim() === "") {
      newErrors.address = "Address is required";
      isValid = false;
    } else {
      newErrors.address = "";
    }

    if (!/^\d{9}$/.test(details.license)) {
      newErrors.license = "License number must be 9 digits";
      isValid = false;
    } else {
      newErrors.license = "";
    }

    if (details.password.trim() === "") {
      newErrors.password = "Password is required";
      isValid = false;
    } else {
      newErrors.password = "";
    }
    
    if (!check) {
      newErrors.check = "please agree to continue";
      isValid = false;
    } else {
      newErrors.check = "";
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
      if (validateForm() && check) {
        const res = await axios.post("/driver", details);
        navigate("/driver/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="userregister">
      <div className="logoContainer">
        <Logo />
      </div>
      <Link to="/login">Go to Login</Link>
      <div className="userregister-container">
        <h1>register a admin</h1>
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
          
          <input
            onChange={handleChange}
            id="address"
            placeholder="address"
            type="text"
          />
          <div className="errorField">
            {errors.address && <p className="error">{errors.address}</p>}
          </div>
          <input
            onChange={handleChange}
            id="license"
            placeholder="license number"
            type="number"
          />
          <div className="errorField">
            {errors.license && <p className="error">{errors.license}</p>}
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

          <div className="terms">
            <input type="checkbox" name="" id="" onClick={()=>setCheck(!check)} />
            <span>I agree for the terms and condetions of TDS</span>
          </div>
          <div className="errorField">
            {errors.check && <p className="error">{errors.check}</p>}
          </div>
          <button type="submit" onClick={submitForm}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default DriverRegister