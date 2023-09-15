import Product from "../models/Product.js";


// create product
export const createProduct = async (req, res, next) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    next(error);
  }
};

// Update product
export const UpdateProduct = async (req, res, next) => {
  try {
    const UpdatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(UpdatedProduct);
  } catch (error) {
    next(error);
  }
};

// delete product
export const deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product deleted");
  } catch (error) {
    next(error);
  }
};

// get product
export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

// get all product
export const getAllProduct = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
