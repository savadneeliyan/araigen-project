import React, { useEffect, useState } from 'react'
import SideBar from '../Sidebar/SideBar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AiOutlinePlus } from 'react-icons/ai';

function Vendors() {

  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/vendor`);
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/vendor/${id}`);
      console.log(res);
      setData(data.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className="dash-top driverpage vendor">
      <SideBar />
      <div className="right">
        <div className="head-container">
          <h2>All Vendors</h2>
          <Link className="new" to="/vendor/new">
            <AiOutlinePlus />
            Add new
          </Link>
        </div>
        <div className="product">
          <ul className="head">
            <li>name</li>
            <li>location</li>
            <li>contact information</li>
            <li>email</li>
            <li>action</li>
          </ul>
          {data?.map((item) => (
            <div className="items" key={item?._id}>
              <div>{item?.name}</div>
              <div>{item?.location}</div>
              <div>{item?.contact}</div>

              <div>{item?.email}</div>
              <div className="order-action">
                <Link to={`/vendor/${item._id}`} className="edit">
                  view
                </Link>

                <div onClick={() => handleDelete(item._id)} className="delete">
                  delete
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Vendors