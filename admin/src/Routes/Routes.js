import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from '../Components/Products/Products';
import Vendors from '../Components/Vendor/Vendors';
import TruckDrivers from '../Components/Truck/TruckDrivers';
import NewProducts from '../Components/Products/NewProducts';
import ProductSingle from '../Components/Products/ProductSingle';
import NewDriver from '../Components/Truck/NewDriver';
import SingleDriver from '../Components/Truck/SingleDriver';
import NewVendor from '../Components/Vendor/NewVendor';
import SingleVendor from '../Components/Vendor/SingleVendor';
import Login from '../Components/Login/Login';
import DriverLogin from '../Components/Register/DriverLogin';
import Order from '../Components/Orders/Order';
import DriverRegister from '../Components/Register/DriverRegister';
import EditOrder from '../Components/Orders/EditOrder';
import AdminOrder from '../Components/Orders/AdminOrder';
import AdminViewOrder from '../Components/Orders/AdminViewOrder';
import ListDriver from '../Components/Truck/ListDriver';
import AdminDriverRegister from '../Components/Truck/AdminDriverRegister';
import AdminEditOrder from '../Components/Orders/AdminEditOrder';
import PrivateRoute from './PrivateRoute';
import Error from '../Components/Error/Error';
import Admin from '../Components/Admin/admin';
import AdminRegister from '../Components/Admin/AdminRegister';
import Category from '../Components/Category/NewCategory';

function Routers() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Products />} />
          <Route path="/vendor" element={<Vendors />} />
          <Route path="/vendor/new" element={<NewVendor />} />
          <Route path="/vendor/:id" element={<SingleVendor />} />
          <Route path="/user/:id" element={<TruckDrivers />} />
          {/* <Route path="/driver/register" element={<NewDriver />} /> */}
          <Route path="/driver/:id" element={<SingleDriver />} />
          <Route path="/product/new" element={<NewProducts />} />
          <Route path="/product/:id" element={<ProductSingle />} />
          <Route path="/order/:id" element={<Order />} />
          <Route path="/admin/order/create" element={<AdminOrder />} />
          <Route path="/admin/driver" element={<ListDriver />} />
          <Route
            path="/admin/driver/register"
            element={<AdminDriverRegister />}
          />
          <Route path="/admin/order" element={<AdminViewOrder />} />
          <Route path="/order/edit/:id" element={<EditOrder />} />
          <Route path="/admin/order/edit/:id" element={<AdminEditOrder />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/new" element={<AdminRegister />} />
          <Route path="/admin/category" element={<Category />} />
          <Route path="*" element={<Error />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/driver/login" element={<DriverLogin />} />
        <Route path="/driver/new/register" element={<DriverRegister />} />

        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;