import express from "express";
import { createCategory, deleteCategory, getAllCategory } from "../controlers/Category.js";

const router = express.Router();

router.post("/", createCategory);
router.delete("/:id", deleteCategory);
router.get("/", getAllCategory);

export default router;
