
import React, { useEffect, useState } from 'react'
import SideBar from '../Sidebar/SideBar';
import { Link, useNavigate } from 'react-router-dom';
import './Products.css'
import useFetch from "../../hooks/usefetch";
import { useParams, useLocation } from "react-router-dom";
import axios from 'axios';


function ProductSingle() {
  const navigate = useNavigate();
  const [img, setImg] = useState(null);
  
  const location = useLocation();
  const path = location.pathname;
  const { data, loading, error } = useFetch(`${path}`);
  const [edit, setEdit] = useState(false);
  const [details, setDetails] = useState({
    name: "",
    price: "",
    category: "",
    photos: "",
    inventory: "",
  });
  useEffect(() => {
     setImg(data.photos);
     setDetails((prevDetails) => ({
       ...prevDetails,
       name: data.name,
       price: data.price,
       category: data.category,
       photos: img,
       inventory: data.inventory,
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
    if (img) {
      const data = new FormData();
      const fileName =img.name;
      data.append("file", img);
      data.append("name", fileName);
      details.photos = fileName;
      try {
        await axios.post("/upload", data);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      const res = await axios.put(path, details);
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  };

  const goBack = () => {
    navigate(-1);
  };
 const handleimg = (event) => {
   const file = event.target.files[0];
   setImg(file);
  };

  return (
    <div className="dash-top">
      <SideBar />
      <div className="right">
        <div className="head-container">
          <h3>{edit ? "Edit " : "View"} product</h3>
          <a onClick={goBack}>Go back</a>
        </div>
        <div className="orderForm">
          <div className="head singlehead">
            {edit ? (
              <>
                <input
                  placeholder="name"
                  value={details?.name}
                  id="name"
                  type="text"
                  onChange={handleChange}
                />
                <input
                  placeholder="price"
                  id="price"
                  value={details?.price}
                  type="number"
                  onChange={handleChange}
                />
                <input
                  placeholder="category"
                  id="category"
                  type="text"
                  value={details?.category}
                  onChange={handleChange}
                />
                <input
                  type="file"
                  id="file"
                  onChange={handleimg}
                />
                <input
                  placeholder="inventory"
                  id="inventory"
                  type="number"
                  value={details?.inventory}
                  onChange={handleChange}
                />
                <button type="submit" onClick={submitForm}>
                  Submit
                </button>
              </>
            ) : (
              <>
                <div>name : {data?.name}</div>
                <div>price : {data?.price}</div>
                <div>category : {data?.category}</div>
                <div>
                  image :
                  {
                    img
                  }
                </div>
                <div>inventory : {data?.inventory}</div>
                <button type="submit" onClick={() => setEdit(true)}>
                  {" "}
                  edit{" "}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductSingle