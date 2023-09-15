import React, { useState } from 'react'
import SideBar from '../Sidebar/SideBar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function NewVendor() {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    name: "",
    location: "",
    contact: "",
    email: "",
  });

const [errors, setErrors] = useState({
  name: "",
  location: "",
  contact: "",
  email: "",
});
  
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (details.name.trim() === "") {
      newErrors.name = "Name is required";
      isValid = false;
    } else {
      newErrors.name = "";
    }

    if (!/^\d{10}$/.test(details.contact)) {
      newErrors.contact = "Mobile number must be 10 digits";
      isValid = false;
    } else {
      newErrors.contact = "";
    }

    if (details.location.trim() === "") {
      newErrors.location = "Location is required";
      isValid = false;
    } else {
      newErrors.location = "";
    }

    if (details.email.trim() === "") {
      newErrors.email = "Email is required";
      isValid = false;
    } else {
      newErrors.email = "";
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
        const res = await axios.post("/vendor", details);
        navigate("/vendor");
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const goBack = () =>{
    navigate(-1)
  }

  return (
    <div className="dash-top">
      <SideBar />
      <div className="head-container">
        <h2>Add new vendor</h2>
        <Link onClick={goBack}>back</Link>
      </div>
      <div className="right">
        <form action="">
          <input
            placeholder="name"
            id="name"
            type="text"
            onChange={handleChange}
          />
          <div className="errorField">
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <input
            placeholder="location"
            id="location"
            type="text"
            onChange={handleChange}
          />
          <div className="errorField">
            {errors.location && <p className="error">{errors.location}</p>}
          </div>
          <input
            placeholder="Contact information"
            id="contact"
            type="text"
            onChange={handleChange}
          />
          <div className="errorField">
            {errors.contact && <p className="error">{errors.contact}</p>}
          </div>
          <input
            placeholder="email"
            id="email"
            type="email"
            onChange={handleChange}
          />
          <div className="errorField">
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <button type="submit" onClick={submitForm}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewVendor