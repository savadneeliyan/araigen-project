import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Link, useParams } from "react-router-dom";
import SideBar from "../Sidebar/SideBar";
import { AiOutlinePlus } from "react-icons/ai";

function AdminViewOrder() {
  const [data, setData] = useState();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/order`);
        console.log(res.data);
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/order/${id}`);
      setData(data.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <SideBar />
      <div className="head-container">
        <h2>All orders</h2>
        <Link className="new" to={`/admin/order/create`}>
          <AiOutlinePlus />
          create new order
        </Link>
      </div>
     
      <div>
        <div className="ordertable adminorder">
          <div className="ordertableheading admin">
            <span>order id</span>
            <span>vendor</span>
            <span>driver</span>
            <span>product</span>
            <span>price</span>
            <span>quantity</span>
            <span>total</span>
            <span>collected</span>
            <span>status</span>
            <span>change</span>
          </div>
          {data?.map((item, i) => (
            <div className="ordertablebody admin" key={item._id}>
              <div>{i + 1}</div>
              <div> {item.vendor.name}</div>
              <div> {item.driver.name}</div>
              <div>
                <ul>
                  {
                    item.products.map((element, i) => (
                      <li key={i}>{element.name}</li>
                    ))
                  }
                </ul>
              </div>
              <div>
                <ul>
                  {item.products.map((element, i) => (
                    <li key={i}>{element?.price}</li>
                  ))}
                </ul>
              </div>
              <div>
                <ul>
                  {item.quantities?.map((product, i) => (
                    <li key={i}>{product}</li>
                  ))}
                </ul>
              </div>
              <div> Rs {item.total}</div>
              <div>Rs {item.collected}</div>
              <div>{item.status}</div>
              <div className="order-action">
                <Link className="edit" to={`/admin/order/edit/${item._id}`}>
                  edit
                </Link>
                <span className="delete" onClick={() => handleDelete(item._id)}>
                  delete
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AdminViewOrder;
