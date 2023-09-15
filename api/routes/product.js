import express from "express";
import { UpdateProduct, createProduct, deleteProduct, getAllProduct, getProduct } from "../controlers/ProductController.js";

const router = express.Router();


router.post("/", createProduct);

router.put("/:id", UpdateProduct);

router.delete("/:id", deleteProduct);

router.get("/:id", getProduct);

router.get("/", getAllProduct);

export default router;
