import Drivers from "../models/Driver.js";

// create Driver
export const createDriver = async (req, res, next) => {
  const newDriver = new Drivers(req.body);
  try {
    const savedDriver = await newDriver.save();
    res.status(200).json(savedDriver); 
  } catch (error) {
    next(error);
  }
};

// Update Driver
export const UpdateDriver = async (req, res, next) => {
  try {
    const UpdatedDriver = await Drivers.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(UpdatedDriver);
  } catch (error) {
    next(error);
  }
};

// delete Driver
export const deleteDriver = async (req, res, next) => {
  try {
    await Drivers.findByIdAndDelete(req.params.id);
    res.status(200).json("driver deleted");
  } catch (error) {
    next(error);
  }
};

// get Driver
export const getDriver = async (req, res, next) => {
  try {
    const driver = await Drivers.findById(req.params.id);
    res.status(200).json(driver);
  } catch (error) {
    next(error);
  }
};

// get all Driver
export const getAllDriver = async (req, res, next) => {
  try {
    const drivers = await Drivers.find();
    res.status(200).json(drivers);
  } catch (error) {
    next(error);
  }
};
