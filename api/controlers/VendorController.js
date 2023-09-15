import Vendor from "../models/Vendors.js";


// create Vendor
export const createVendor = async (req, res, next) => {
  const newVendor = new Vendor(req.body);
  try {
    const savedVendor = await newVendor.save();
    res.status(200).json(savedVendor);
  } catch (error) {
    next(error);
  }
};

// Update Vendor
export const UpdateVendor = async (req, res, next) => {
  try {
    const UpdatedVendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(UpdatedVendor);
  } catch (error) {
    next(error);
  }
};

// delete Vendor
export const deleteVendor = async (req, res, next) => {
  try {
    await Vendor.findByIdAndDelete(req.params.id);
    res.status(200).json("Vendor deleted");
  } catch (error) {
    next(error);
  }
};

// get Vendor
export const getVendor = async (req, res, next) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    res.status(200).json(vendor);
  } catch (error) {
    next(error);
  }
};

// get all Vendor
export const getAllVendor = async (req, res, next) => {
  try {
    const vendors = await Vendor.find();
    res.status(200).json(vendors);
  } catch (error) {
    next(error);
  }
};
