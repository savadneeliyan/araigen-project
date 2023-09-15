import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "../Sidebar/SideBar";

function AdminDriverRegister() {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    name: "",
    mobile: "",
    address: "",
    license: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    mobile: "",
    address: "",
    license: "",
    password: "",
    check: "",
  });

  const handleChange = (event) => {
    setDetails((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
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

  setErrors(newErrors);
  return isValid;
};



  const submitForm = async (e) => {
    e.preventDefault();

    try {
      if (validateForm()) { 
          const res = await axios.post("/driver", details);
          console.log(res);
        goBack();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const goBack = () =>{
    navigate(-1)
  }

  return (
    <>
      <SideBar />
      <div className="head-container">
        <h2>Edit order</h2>
        <Link className="cancelOrder" onClick={goBack}>
          back
        </Link>
      </div>
      <form action="">
        <input
          onChange={handleChange}
          id="name"
          placeholder="name"
          type="text"
          required
        />
        <div className="errorField">
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <input
          onChange={handleChange}
          id="mobile"
          placeholder="Mobile Number"
          type="number"
          required
        />
        <div className="errorField">
          {errors.mobile && <p className="error">{errors.mobile}</p>}
        </div>
        <input
          onChange={handleChange}
          id="address"
          placeholder="address"
          type="text"
          required
        />
        <div className="errorField">
          {errors.address && <p className="error">{errors.address}</p>}
        </div>
        <input
          onChange={handleChange}
          id="license"
          placeholder="license number"
          type="number"
          required
        />
        <div className="errorField">
          {errors.license && <p className="error">{errors.license}</p>}
        </div>
        <input
          onChange={handleChange}
          id="password"
          placeholder="password"
          type="text"
          required
        />
        <div className="errorField">
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <button type="submit" onClick={submitForm}>
          Submit
        </button>
      </form>
    </>
  );
}

export default AdminDriverRegister;
