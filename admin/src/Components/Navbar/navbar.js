import React, { useContext } from 'react'
import './navbar.css'
import { AuthContext } from '../../context/AuthContext';
import Logo from '../Logo/Logo';
import { Link } from 'react-router-dom';
function DriverNavbar() {
    const { user, dispatch } = useContext(AuthContext);

    const logout = () => {
      dispatch({
        type: "LOGOUT",
      });
    };

  return (
    <div className="navbar">
      <Link to={`/user/${user._id}`}>
        <Logo />
      </Link>
      <div className="navbar-profile">
        <img
          src="https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
          alt=""
          className="no-img"
        />
        <div>
          <h2>Hi, {user.name}</h2>
          <span>(driver)</span>
        </div>
          <span className='order-action' onClick={logout}><h4 className='delete'>LOGOUT</h4></span>
      </div>
    </div>
  );
}

export default DriverNavbar;