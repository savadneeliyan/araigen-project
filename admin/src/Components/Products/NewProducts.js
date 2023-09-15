import React, { useState } from 'react'
import SideBar from '../Sidebar/SideBar';
import './Products.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/usefetch';

function NewProducts() {
  const navigate = useNavigate();
  const [img,setImg] = useState(null)
  const [category,setCategory] = useState("")
  const [details, setDetails] = useState({
    name : "",
    price : "",
    category : category,
    photos : "",
    inventory : "",
  })

  const { data } = useFetch("/category")
  const [errors, setErrors] = useState({
    name: "",
    price: "",
    category: "",
    photos: "",
    inventory: "",
  });

  const goBack = () => {
    navigate(-1);
  }

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (details.name.trim() === "") {
      newErrors.name = "Name is required";
      isValid = false;
    } else {
      newErrors.name = "";
    }

    if (details.price.trim() === "") {
      newErrors.price = "price is required";
      isValid = false;
    } else {
      newErrors.price = "";
    }

    if (details.category.trim() === "") {
      newErrors.category = "category is required";
      isValid = false;
    } else {
      newErrors.category = "";
    }

    if (details.inventory.trim() === "") {
      newErrors.inventory = "inventory is required";
      isValid = false;
    } else {
      newErrors.inventory = "";
    }

    if (details.photos.trim() === "") {
      newErrors.photos = "file is required";
      isValid = false;
    } else {
      newErrors.photos = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleimg = (event) => { 
    const file = event.target.files[0]; 
    setImg(file);
  }

  const handleChange = (event) => {
    setDetails((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };

  const submitForm =async (e) =>{
    e.preventDefault();
    if (img) {
      const data = new FormData();
      const fileName = img.name;
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
      if (validateForm()) {
        const res = await axios.post("/product", details);
        console.log(res)
        navigate("/"); 
      }
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <div className="dash-top">
      <SideBar />
      <div className="head-container">
        <h3>Create new product</h3>
        <a onClick={goBack}>Go back</a>
      </div>
      <div className="right">
        <form action="" className="orderForm">
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
            placeholder="price"
            id="price"
            type="number"
            onChange={handleChange}
          />
          <div className="errorField">
            {errors.price && <p className="error">{errors.price}</p>}
          </div>
          <select
            id="category"
            onChange={(e) => {
              details.category = e.target.value
              return setCategory(e.target.value)
            }
            }
          >
            {data?.map((item,i) => {
              return <option key={i} value={item.name}>{item.name}</option>;
            })}
          </select>
          {/* <input
            placeholder="category"
            id="category"
            type="text"
            onChange={handleChange}
          /> */}
          <div className="errorField">
            {errors.category && <p className="error">{errors.category}</p>}
          </div>
          <input type="file" id="file" onChange={handleimg} />
          <div className="errorField">
            {errors.photos && <p className="error">{errors.photos}</p>}
          </div>
          <input
            placeholder="inventory"
            id="inventory"
            type="number"
            onChange={handleChange}
          />

          <div className="errorField">
            {errors.inventory && <p className="error">{errors.inventory}</p>}
          </div>
          <button type="submit" onClick={submitForm}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewProducts