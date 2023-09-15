import Category from "../models/Category.js";

export const createCategory = async (req, res, next) => {
  const newCategory = new Category(req.body);
  try {
    const savedCategory = await newCategory.save();
    res.status(200).json(savedCategory);
  } catch (error) {
    next(error);
  }
};


// get all product
export const getAllCategory = async (req, res, next) => {
  try {
    const category = await Category.find();
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

// delete product
export const deleteCategory = async (req, res, next) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json("Category deleted");
  } catch (error) {
    next(error);
  }
};
