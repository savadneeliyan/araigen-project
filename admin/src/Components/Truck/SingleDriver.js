import React, { useEffect, useState } from 'react'
import SideBar from '../Sidebar/SideBar'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/usefetch';
import axios from 'axios';

function SingleDriver() {
  const navigate = useNavigate();
const location = useLocation();
const path = location.pathname;
  const { data, loading, error } = useFetch(`${path}`);
  const [edit, setEdit] = useState(false);
  const [details, setDetails] = useState({
    name: "",
    address: "",
    mobile: "",
    license: "",
    password: "",
  });
useEffect(() => {
  setDetails((prevDetails) => ({
    ...prevDetails,
    name: data.name,
    address: data.address,
    mobile: data.mobile,
    license: data.license,
    password: data.password,
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
      navigate("/driver")
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
        <h2>Edit driver</h2>
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
                  value={details?.name}
                  id="name"
                  type="text"
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  placeholder="address"
                  id="address"
                  value={details?.address}
                  type="text"
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  placeholder="mobile"
                  id="mobile"
                  type="number"
                  value={details?.mobile}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  placeholder="password"
                  id="password"
                  type="text"
                  value={details?.password}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  placeholder="license"
                  id="license"
                  type="number"
                  value={details?.license}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" onClick={submitForm}>
                Submit
              </button>
            </>
          ) : (
            <>
              <div>name : {data?.name}</div>
              <div>address : {data?.address}</div>
              <div>mobile : {data?.mobile}</div>
              <div>password : {data?.password}</div>
              <div>license : {data?.license}</div>
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

export default SingleDriver