import React from 'react';
import './Dashboard.css'
import SideBar from '../Sidebar/SideBar';

function Dashboard() {
  return (
    <div className='dash-top'>
      <SideBar/>
      <div className="right">
        <div className="product">
          <ul className="head">
            <li>name</li>
            <li>price</li>
            <li>category</li>
            <li>image</li>
            <li>inventory</li>
          </ul>
          <ul>
            <li>lorem</li>
            <li>20</li>
            <li>fruit</li>
            <li><img src="https://cdn11.bigcommerce.com/s-podjif72xf/images/stencil/350x350/products/10375/5881/990047__94557.1591323806.jpg?c=2" alt="" srcset="" /></li>
            <li>21</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Dashboard