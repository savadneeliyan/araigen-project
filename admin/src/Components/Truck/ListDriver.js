import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import SideBar from '../Sidebar/SideBar';
import axios from 'axios';
import { AiOutlinePlus } from 'react-icons/ai';
 
function ListDriver() {
    const [data, setData] = useState();

    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(`/driver`);
          setData(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, []);

    const handleDelete = async (id) => {
      try {
        const res = await axios.delete(`/driver/${id}`);
        console.log(res);
        setData(data.filter((item) => item._id !== id));
      } catch (error) {
        console.log(error);
      }
    };
  return (
    <div className="dash-top driverpage">
      <SideBar />
      <div className="right">
        <div className="head-container">
          <h2>All drivers</h2>
          <Link className="new" to="/admin/driver/register">
            {" "}
            <AiOutlinePlus />
            Add new driver
          </Link>
        </div>
        <div className="product">
          <ul className="head">
            <li>no</li>
            <li>name</li>
            <li>action</li>
          </ul>

          {data?.map((item, index) => {
            return (
              <div className="items" key={item._id}>
                <div>{index + 1}</div>
                <div>{item?.name}</div>
                <div className="order-action">
                  <Link className="edit" to={`/driver/${item._id}`}>
                    view
                  </Link>
                  <div
                    className="delete"
                    onClick={() => handleDelete(item._id)}
                  >
                    delete
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ListDriver