import express from "express";
import { Driverlogin, login, register, registerAdmin } from "../controlers/auth.js";

const router = express.Router();
  
router.post('/register', register);  
router.post("/admin/register", registerAdmin);  
router.post('/login', login);  
router.post("/driver/login", Driverlogin);  


export default router;