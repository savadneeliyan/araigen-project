import React, { useEffect, useState } from "react";
import SideBar from "../Sidebar/SideBar";
import { Link } from "react-router-dom";
import axios from "axios";
import { AiOutlinePlus } from "react-icons/ai";

function Admin() {
  const [data, setData] = useState();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/admin`);
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/admin/${id}`);
      // console.log(res);
      setData(data.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dash-top">
      <SideBar />
      <div className="right">
        <div className="head-container">
          <h2>All Admin</h2>
          <Link to="/admin/new" className="new">
            {" "}
            <AiOutlinePlus />
            Add new admin
          </Link>
        </div>

        <div className="product" style={{width:"fit-content"}}>
          <ul className="head">
            <li>name</li>
            <li>password</li>
            <li>delete</li>
          </ul>

          {data?.map((item) => {
            return (
              <div className="items" key={item._id}>
                <div>{item?.name}</div>
                <div>{item?.password}</div>
                <div className="order-action">
                  <div
                    onClick={() => handleDelete(item._id)}
                    className="delete"
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

export default Admin;
