import React, { useContext } from 'react'
import './SideBar.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';

function SideBar() {

  const { user, dispatch } = useContext(AuthContext)
  
  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
  }
  return (
    <div className="left">
      <Link to={"/"} className="pro-container">
        <div className="pro-img">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdnn6Ueaa_WV5KGcvz7m1lIjHHxxy1is-5CXqpUQSQnQ&s"
            alt=""
          />
        </div>
        <div className="names">
          <h2>{user?.data?.name}</h2>
          <p>(admin)</p>
        </div>
      </Link>

      <ul>
        <li>
          <Link to="/">Products</Link>
        </li>
        <li>
          <Link to="/admin/driver">Truck Drivers</Link>
        </li>
        <li>
          <Link to="/vendor">Vendors</Link>
        </li>
        <li>
          <Link to="/admin/order">orders</Link>
        </li>
        <li>
          <Link to="/admin">admin</Link>
        </li>
        <li>
          <Link to="/admin/category">category</Link>
        </li>
      </ul>
      <div className='action-button' onClick={logout}>
        Logout
      </div>
    </div>
  );
}

export default SideBar