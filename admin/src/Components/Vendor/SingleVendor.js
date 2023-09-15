import React, { useEffect, useState } from 'react'
import SideBar from '../Sidebar/SideBar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/usefetch';
import axios from 'axios';

function SingleVendor() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const { data, loading, error } = useFetch(`${path}`);
  const [edit, setEdit] = useState(false);
  const [details, setDetails] = useState({
    name: "",
    location: "",
    email: "",
    contact: "",
  });
console.log(data)
  useEffect(() => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      name: data.name,
      location: data.location,
      email: data.email,
      contact: data.contact,
    }));
  }, [data]);

  const handleChange = (event) => {
    setDetails((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };
  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(path, details);
      navigate("/vendor");
    } catch (error) {
      console.log(error);
    }
  };

  const goBack = () => {
    navigate(-1)
  }

  return (
    <div className="dash-top">
      <SideBar />
      <div className="head-container">
        <h2>Edit order</h2>
        <Link className="cancelOrder" onClick={goBack}>
          back
        </Link>
      </div>
      <div className="right orderForm">
        <ul className="head singlehead">
          {edit ? (
            <>
              <div>
                <input
                placeholder="name"
                id="name"
                type="text"
                value={details?.name}
                onChange={handleChange}
              /></div>
              <div>
                <input
                placeholder="location"
                id="location"
                type="text"
                value={details?.location}
                onChange={handleChange}
              /></div>
              <div>
                <input
                placeholder="Contact information"
                id="contact"
                type="text"
                value={details?.contact}
                onChange={handleChange}
              /></div>
              <div>
                <input
                placeholder="email"
                id="email"
                type="email"
                value={details?.email}
                onChange={handleChange}
              /></div>
              <button type="submit" onClick={submitForm}>
                Submit
              </button>
            </>
          ) : (
            <>
              <div>name : lorem</div>
              <div>location : sdcbdshvb</div>
              <div>contact information : sdfblwugfbpewiugfer</div>
              <div>email : sdh@gmail.com</div>
              <button type="submit" onClick={() => setEdit(true)}>
                {" "}
                edit{" "}
              </button>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default SingleVendor