import Drivers from "../models/Driver.js";
import Driver from "../models/Driver.js";
import Admin from "../models/Admin.js";
import { createError } from "../utils/Errors.js";

export const register = async (req, res, next) => {
  try {
    const newDriver = new Driver({
      name: req.body.name,
      mobile: req.body.mobile,
      address: req.body.address,
      license: req.body.license,
      password: req.body.password, 
    });
    
    await newDriver.save();
    res.status(200).send("driver has been created");
  } catch (error) {
    next(error);
  }
};

export const registerAdmin = async (req, res, next) => {
  try {
    const newAdmin = new Admin({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password, 
    });
    
    await newAdmin.save();
    res.status(200).send("admin has been created");
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await Admin.findOne({ name: req.body.name });
    if (!user) return next(createError(404, "Admin not found"));
    const password = req.body.password;
    if (password === user.password) {
      res.status(200).send(user);
    } else {
      return next(createError(400, "Password does not match"));
    }
  } catch (error) {
    next(error);
  }
};

export const Driverlogin = async (req, res, next) => {
  try {
    const user = await Drivers.findOne({ mobile: req.body.mobile });
    if (!user) return next(createError(404, "number not found"));
    const password = req.body.password;
    if (password === user.password) {
      res.status(200).send(user);
    } else {
      return next(createError(400, "Password does not match"));
    }
  } catch (error) {
    next(error);
  }
};
