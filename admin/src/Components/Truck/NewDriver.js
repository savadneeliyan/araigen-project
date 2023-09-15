import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import SideBar from '../Sidebar/SideBar';
import axios from 'axios';

function NewDriver() {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    name: "",
    mobile: "",
    address: "",
    license: "",
    password:"",
  });

  const handleChange = (event) => {
    setDetails((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/driver", details);
      console.log(res);
      navigate("/driver");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dash-top">
      <SideBar />
      <div className="right">
        <form action="">
          <Link to="/driver">back</Link>
          <input
            onChange={handleChange}
            id="name"
            placeholder="name"
            type="text"
            required
          />
          <input
            onChange={handleChange}
            id="mobile"
            placeholder="Mobile Number"
            type="number"
            required
          />
          <input
            onChange={handleChange}
            id="address"
            placeholder="address"
            type="text"
            required
          />
          <input
            onChange={handleChange}
            id="license"
            placeholder="license number"
            type="number"
            required
          />
          <input
            onChange={handleChange}
            id="password"
            placeholder="password"
            type="text"
            required
          />
          <button type="submit" onClick={submitForm}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewDriver