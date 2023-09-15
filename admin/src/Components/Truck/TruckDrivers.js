import React, { useContext, useEffect, useState } from 'react';
import './TruckDrivers.css'
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Link, useParams } from 'react-router-dom';
import DriverNavbar from '../Navbar/navbar';
import { AiOutlinePlus } from "react-icons/ai";

function TruckDrivers() {

  const [data, setData] = useState();
  const [greeting, setGreeting] = useState("");

  const {user} = useContext(AuthContext)
  const params = useParams();
   useEffect(() => {
     const fetchData = async () => {
       try {
         const res = await axios.get(`/order/driver/${params.id}`);
         console.log(res.data);
         setData(res.data);
       } catch (error) {
         console.log(error);
       }
     };
     fetchData();

     const getCurrentGreeting = () => {
       const currentHour = new Date().getHours();
       if (currentHour >= 5 && currentHour < 12) {
         return "Good Morning ✨";
       } else if (currentHour >= 12 && currentHour < 18) {
         return "Good Afternoon ☀️";
       } else {
         return "Good Night 🌚";
       }
     };

     setGreeting(getCurrentGreeting());
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
      <DriverNavbar />
      <div>
        <div className="new-order">
          <h4>{greeting} </h4>
          <Link to={`/order/${params.id}`} className="new">
            {" "}
            <AiOutlinePlus /> create new order
          </Link>
        </div>
        <h1>All orders</h1>
        <div className="ordertable">
          <div className="ordertableheading">
            <span>no</span>
            <span>vendor</span>
            <span>product</span>
            <span>price</span>
            <span>quantity</span>
            <span>total</span>
            <span>collected</span>
            <span>status</span>
            <span>change</span>
          </div>
          {data?.map((item, i) => (
            <div className="ordertablebody" key={item._id}>
              <div>{i + 1}</div>
              <div> {item.vendor.name}</div>
              <div>
                <ul>
                  {
                    item.products.map((element) => (
                      <li key={element._id}>{element.name}</li>
                    ))
                  }
                </ul>
              </div>
              <div>
                <ul>
                  {item.products.map((element) => (
                    <li key={element._id}>{element?.price}</li>
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
                <Link to={`/order/edit/${item._id}`} className="edit">
                  edit
                </Link>
                <span onClick={() => handleDelete(item._id)} className="delete">
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

export default TruckDrivers