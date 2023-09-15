import React, { useContext, useEffect, useState } from 'react'
import './order.css'
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DriverNavbar from '../Navbar/navbar';
import { AuthContext } from '../../context/AuthContext';

function EditOrder() {
    const params = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [vendor, setVendor] = useState([]);
    const [driver, setDriver] = useState([]);
    const [status, setStatus] = useState("");
    const [collected, setCollected] = useState();
    const [selectedVendor, setSelectedVendor] = useState("");
    const [selecteddriver, setSelectedDriver] = useState("");
    const [selectedProducts, setSelectedProducts] = useState(
            {
                product: [],
                quantity: [],
      });
  
    const {user} = useContext(AuthContext)
    useEffect(() => {
    const fetchData = async () => {
      try {
      const productsResponse = await axios.get("/product");
      const vendorsResponse = await axios.get("/vendor");
      const driverResponse = await axios.get("/driver");
        const formResponse = await axios.get(`/order/${params.id}`);
        setSelectedProducts({
          product: formResponse.data.products.map(item => item._id),
          quantity: formResponse.data.quantities,
        });
        setData(productsResponse);
        setVendor(vendorsResponse.data);
        setDriver(driverResponse.data);
        setStatus(formResponse.data.status);
        setSelectedDriver(formResponse.data.driver._id);
        setSelectedVendor(formResponse.data.vendor._id);
        setCollected(formResponse.data.collected);
        
      } catch (error) {
      console.error(error);
      }
    };

    fetchData();
    }, []);
  
  const goBack = () => {
    navigate(-1);
  };
  
  
    const handleCheck = (e, id) => {
      const productId = id;

      const updatedProducts = [...selectedProducts.product];
      const updatedQuantity = [...selectedProducts.quantity];

      const productIndex = updatedProducts.findIndex(
        (product) => product === productId
      );

      if (productIndex !== -1) {
        updatedProducts.splice(productIndex, 1);
        updatedQuantity.splice(productIndex, 1);
      } else {
        updatedProducts.push(productId); 
        updatedQuantity.push(1); 
      }
      setSelectedProducts({
        product: updatedProducts,
        quantity: updatedQuantity,
      });
    };

    const handlequantity = (e,id) => {
      const newValue = isNaN(parseInt(e.target.value, 10))
        ? 1
        : parseInt(e.target.value, 10);
      const productId = id;
      const updatedQuantities = [...selectedProducts.quantity];
      const updatedProducts = [...selectedProducts.product];
      const productIndex = selectedProducts.product.findIndex(
        (product) => product === productId
      );
      if (productIndex !== -1) {
        updatedQuantities[productIndex] = newValue < 0 ? 1 : newValue;
      } else {
        updatedProducts.push(productId); 
        updatedQuantities.push(newValue);
      }
      setSelectedProducts({
        ...selectedProducts,
        product: updatedProducts,
        quantity: updatedQuantities,
      });
    };
    

    const handleSubmit = async () => {
        try {
          const sumvalue = selectedProducts.product.map((id, index) => {
            const product = data.data.find((item) => item._id === id);
            return product.price * selectedProducts.quantity[index];
          });
          const total = sumvalue.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
          );

          const response = await axios.put(`/order/${params.id}`, {
            products: selectedProducts.product,
            quantities: selectedProducts.quantity,
            driver: selecteddriver,
            vendor: selectedVendor,
            total: total,
            collected: collected,
            status: status,
          });
          goBack()
          
        } catch (error) {
            console.error(error);
        }
  };
  
  return (
    <>
      <DriverNavbar />
      <div className="head-container">
        <h2>Edit order</h2>
        <Link className="cancelOrder" onClick={goBack}>
          back
        </Link>
      </div>
      <div className="orderForm">
        <div>
          <div className="orderSelect">
            <h3>choose a vendor : </h3>
            <select
              name=""
              id=""
              value={selectedVendor}
              onChange={(e) => setSelectedVendor(e.target.value)}
            >
              <option>select a vendor </option>
              {vendor?.map((item) => (
                <option key={item._id} id={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          {/* <div className="orderSelect">
            <h3>choose a driver : </h3>
            <select
              name=""
              id={selecteddriver}
              onChange={(e) => setSelectedDriver(e.target.value)}
            >
              {driver?.map((item) => (
                <option key={item._id} id={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div> */}
          <div className="table">
            <h3>choose product</h3>
            <div className="tablehead">
              <h5>select</h5>
              <h5>product</h5>
              <h5>price</h5>
              <h5>quantity</h5>
              <h5>collected amount</h5>
              <h5>status</h5>
            </div>
            {data?.data?.map((item, index) => (
              <div className="table-row" key={item._id}>
                <div>
                  <input
                    id={item._id}
                    type="checkbox"
                    checked={
                      selectedProducts?.product?.some(
                        (product) => product === item._id
                      )
                        ? true
                        : false
                    }
                    onChange={(e) => handleCheck(e, item._id)}
                  />
                </div>
                <div>
                  <span>{item.name}</span>
                </div>
                <div>
                  <span>{item.price}</span>
                </div>
                <div>
                  <input
                    id={item._id}
                    type="number"
                    placeholder="Quantity"
                    value={
                      selectedProducts?.product?.some(
                        (product) => product === item._id
                      )
                        ? selectedProducts?.quantity[
                            selectedProducts?.product.findIndex(
                              (product) => product === item._id
                            )
                          ]
                        : ""
                    }
                    onChange={(e) => handlequantity(e, item._id)}
                  />
                </div>
                <div>
                  <input
                    type="number"
                    name=""
                    value={collected}
                    onChange={(e) =>
                      setCollected(e.target.value > 0 ? e.target.value : 0)
                    }
                    id=""
                  />
                </div>
                <div>
                  <select
                    name=""
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="pending">pending</option>
                    <option value="processed">processed</option>
                    <option value="packed">packed</option>
                    <option value="outofdelivery">out of delivery</option>
                    <option value="delivered">delivered</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </>
  );
}

export default EditOrder