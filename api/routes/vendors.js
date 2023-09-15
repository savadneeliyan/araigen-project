import express from "express";
import { UpdateVendor, createVendor, deleteVendor, getAllVendor, getVendor } from "../controlers/VendorController.js";

const router = express.Router();

router.post("/", createVendor);

router.put("/:id", UpdateVendor);

router.delete("/:id", deleteVendor);

router.get("/:id", getVendor);

router.get("/", getAllVendor);

export default router;
