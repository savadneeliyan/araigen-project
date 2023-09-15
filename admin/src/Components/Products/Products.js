import React, { useEffect, useState } from 'react'
import SideBar from '../Sidebar/SideBar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AiOutlinePlus } from 'react-icons/ai';

function Products() {
  const [data, setData] = useState();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect( () => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/product`);
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData()
  }, [])
  
  
  
  const handleDelete = async(id) => {
    try {
      const res = await axios.delete(`/product/${id}`);  
      console.log(res)
      setData(data.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="dash-top">
      <SideBar />
      <div className="right">
        <div className="head-container">
          <h2>All Products</h2>
          <Link to="/product/new" className="new">
            {" "}
            <AiOutlinePlus />
            Add A product
          </Link>
        </div>

        <div className="product">
          <ul className="head">
            <li>name</li>
            <li>price</li>
            <li>category</li>
            <li>image</li>
            <li>inventory</li>
            <li>action</li>
          </ul>

          {data?.map((item) => {
            return (
                item?.inventory > 0 && (
                  <div className="items" key={item._id}>
                    <div>{item?.name}</div>
                    <div>{item?.price}</div>
                    <div>{item?.category}</div>
                    <div>
                      <img src={PF + item?.photos} alt={item?.photos} />
                    </div>
                    <div>{item?.inventory}</div>
                    <div className="order-action">
                      <Link to={`/product/${item._id}`} className="edit">
                        view
                      </Link>
                      <div
                        onClick={() => handleDelete(item._id)}
                        className="delete"
                      >
                        delete
                      </div>
                    </div>
                  </div>
                )
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Products