import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import SideBar from "../Sidebar/SideBar";

function AdminOrder() {
  const navigate = useNavigate()
    const [data, setData] = useState([]);
    const [vendor, setVendor] = useState([]);
    const [driver, setdriver] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState({
      product: [],
      quantity: [],
    });
  
    const [errors, setErrors] = useState({
      ventor: "",
      driver: "",
      product: "",
    });
  
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };
    let isempty = selectedProducts.product.length === 0;

    if (isempty) {
      newErrors.product =
        "You need to select at least one product to create a bill";
      isValid = false;
    } else {
      newErrors.product = "";
    }

    if (selectedVendor.trim() === "") {
      newErrors.ventor = "Select a vendor";
      isValid = false;
    } else {
      newErrors.ventor = "";
    }
    
    if (selecteddriver.trim() === "") {
      newErrors.driver = "Select a driver";
      isValid = false;
    } else {
      newErrors.driver = "";
    }

    setErrors(newErrors);
    return isValid;
  };

    const [selectedprice, setSelectedPrice] = useState([]); 
    const [selecteddriver, setSelecteddriver] = useState(""); 
    const [selectedVendor, setSelectedVendor] = useState("");
    const params = useParams();
  
    useEffect(() => {
        const fetchData = async () => {
        try {
            const productsResponse = await axios.get("/product");
            const vendorsResponse = await axios.get("/vendor");
            const driverResponse = await axios.get("/driver");
            setData(productsResponse.data);
            setVendor(vendorsResponse.data);
            setdriver(driverResponse.data);
        } catch (error) {
            console.error(error);
        }
        };

        fetchData();
    }, []);
  
    

    

    const handleSubmit = async () => {
      try {
      selectedProducts.product = [];
        selectedProducts.quantity = [];
        
      var checkboxes = document.querySelectorAll(".product");

      checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
          selectedProducts.product.push(checkbox.value);
          const quantity = document.getElementById(checkbox.value).value || 1;
          const price = document.getElementById(
            "price" + checkbox.value
          ).innerHTML;
          selectedprice.push(price);
          selectedProducts.quantity.push(quantity);
        }
      });

      const sumvalue = selectedProducts.product.map((id, index) => {
        const product = data.find((item) => item._id === id);
        return product.price * selectedProducts.quantity[index];
      });
      const total = sumvalue.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      
        if (validateForm()) {
          const updatePromises = selectedProducts.product.map(
            async (id, index) => {
              const product = data.find((item) => item._id === id);
              const qty = selectedProducts.quantity[index];
              const inventory = product.inventory - qty;
              const update = await axios.put(`/product/${product._id}`, {
                inventory: inventory,
              });
              return update;
            }
          );
          const updateResults = await Promise.all(updatePromises);
          // console.log("All updates completed:", updateResults);
          const response = await axios.post("/order", {
            products: selectedProducts.product,
            quantities: selectedProducts.quantity,
            price: selectedprice,
            driver: selecteddriver,
            vendor: selectedVendor,
            total: total,
            collected: 0,
            status: "pending",
          });
          navigate(-1)
        }
        

    } catch (error) {
      console.error(error);
      
    }
  };
  
  const goBack = () => { 
    navigate(-1)
  }

  return (
    <div>
      <SideBar />
      <div className="head-container">
        <h2>Create A new Order</h2>
        <Link className="cancelOrder" onClick={goBack}>
          Cancel Order
        </Link>
      </div>
      <div className="orderForm">
        <div className="orderSelect">
          <h3>choose a vendor : </h3>
          <select
            name="select"
            id="select"
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
        <div className="errorField">
          {errors.ventor && <p className="error">{errors.ventor}</p>}
        </div>
        <div className="orderSelect">
          <h3>choose a driver : </h3>
          <select
            name="select"
            id="selectvendor"
            onChange={(e) => setSelecteddriver(e.target.value)}
          >
            <option >
              Select a vendor
            </option>
            {driver?.map((item) => (
              <option key={item._id} id={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="errorField">
          {errors.driver && <p className="error">{errors.driver}</p>}
        </div>
        <div className="table">
          <h3>choose product</h3>
          <div className="tablehead">
            <h5>select</h5>
            <h5>product</h5>
            <h5>price</h5>
            <h5>quantity</h5>
          </div>
          {data?.map((item) => (
            <div className="table-row" key={item._id}>
              <div>
                <input className="product" type="checkbox" value={item._id} />
              </div>
              <div>
                <span>{item.name}</span>
              </div>
              <div>
                <span id={`price${item._id}`}>{item.price}</span>
              </div>
              <div>
                <input id={item._id} type="number" placeholder="Quantity" />
              </div>
            </div>
          ))}
        </div>
        <div className="errorField">
          {errors.product && <p className="error">{errors.product}</p>}
        </div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default AdminOrder;
