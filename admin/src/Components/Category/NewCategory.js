import React, { useEffect, useState } from 'react'
import SideBar from '../Sidebar/SideBar'
import axios from 'axios';

function Category() {
    const [data, setData] = useState([]);
    const [text, setText] = useState({
        name : ""
    });
    const [errors, setErrors] = useState({
        name : ""
    });
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(`/category`);
          setData(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, [data]);

    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };

        if (text.name.trim() === "") {
            errors = "Name is required";
            isValid = false;
        } else {
            errors.name = "";
        }

        setErrors(newErrors);
        return isValid;
    };


    const handleChange = (event) => {
      setText((prev) => ({
        ...prev,
        [event.target.id]: event.target.value,
      }));
    };

    const submitForm = async (e) => {
      e.preventDefault();
      
      try {
        if (validateForm()) {
          const res = await axios.post("/category", text);
        }
      } catch (error) {
        console.log(error);
      }
    };
        const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`/category/${id}`);
            // console.log(res);
            setData(data.filter((item) => item._id !== id));
        } catch (error) {
            console.log(error);
        }
        };
  return (
    <>
      <SideBar />
      <div className="right">
        <form action="" className="orderForm" style={{marginBottom:"50px"}}>
          <input
            placeholder="name"
            id="name"
            type="text"
            onChange={handleChange}
          />
          <div className="errorField">
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <button type="submit" onClick={submitForm}>
            Submit
          </button>
        </form>

        <div>
          {data.map((item) => (
            <div className="items" key={item._id}>
              <div className='capitalize'>{item?.name}</div>
              <div className="order-action">
                <div onClick={() => handleDelete(item._id)} className="delete">
                  delete
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Category