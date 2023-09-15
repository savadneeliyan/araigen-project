import express from "express";
import { deleteAdmin, getAllAdmin } from "../controlers/Admin.js";

const router = express.Router();

router.delete("/:id", deleteAdmin);

router.get("/", getAllAdmin);

export default router;
