import Admin from "../models/Admin.js";

// delete Driver
export const deleteAdmin = async (req, res, next) => {
  try {
    await Admin.findByIdAndDelete(req.params.id);
    res.status(200).json("Admin deleted");
  } catch (error) {
    next(error);
  }
};

// get all Driver
export const getAllAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.find();
    res.status(200).json(admin);
  } catch (error) {
    next(error);
  }
};
