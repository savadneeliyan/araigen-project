import express from "express";
import { createOrder, deleteOrder, getAllOrders, getOrder, getdriverOrder, updateOrder } from "../controlers/OrdertableController.js";


const router = express.Router();

router.post("/", createOrder);
router.put("/:id", updateOrder);
router.get("/driver/:id", getdriverOrder);
router.get("/:id", getOrder);
router.delete("/:id", deleteOrder);
router.get("/", getAllOrders);


export default router;
