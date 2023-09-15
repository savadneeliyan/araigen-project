import express from "express";
import { deleteAdmin, getAllAdmin } from "../controlers/Admin.js";
import { registerAdmin } from "../controlers/auth.js";

const router = express.Router();

router.post("/register", registerAdmin);  
router.delete("/:id", deleteAdmin);

router.get("/", getAllAdmin);

export default router;
