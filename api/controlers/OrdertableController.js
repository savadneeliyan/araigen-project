import OrderTable from "../models/OrderTable.js";

// create orderTable 
export const createOrder = async (req, res, next) => {
    try {
        const {
          products,
          driver,
          vendor,
          total,
          collected,
          price,
          status,
          quantities,
      } = req.body;
      
        const newOrder = new OrderTable({
          products,
          quantities,
          driver,
          price,
          vendor,
          total,
          collected,
          status,
        });

        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
         
    } catch (error) {
        console.log(error);
      next(error);
    }
};


// update orderTable
export const updateOrder = async (req, res, next) => {
    try {
        const UpdatedOrder = await OrderTable.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(UpdatedOrder);
        
    } catch (error) {
        console.log(error);
      next(error);
    }
};

// delete Driver
export const deleteOrder = async (req, res, next) => {
  try {
    await OrderTable.findByIdAndDelete(req.params.id);
    res.status(200).json("Order deleted");
  } catch (error) {
    next(error);
  }
};

// get Driver
export const getdriverOrder = async (req, res, next) => {
  try {
    const order = await OrderTable.find({ driver: req.params.id })
      .populate("vendor")
      .populate("products")
      ;
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

// get single order
export const getOrder = async (req, res, next) => {
  try {
    const order = await OrderTable.findById( req.params.id )
      .populate("vendor")
      .populate("products")
      .populate("driver");
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

// get all order

export const getAllOrders = async (req, res, next) => {
  try {
      const orders = await OrderTable.find()
        .populate("vendor")
        .populate("driver")
        .populate("products");
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};