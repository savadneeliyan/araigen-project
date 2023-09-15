import express from "express";
import { UpdateDriver, createDriver, deleteDriver, getAllDriver, getDriver } from "../controlers/DriverController.js";

const router = express.Router();

router.post("/", createDriver);

router.put("/:id", UpdateDriver);

router.delete("/:id", deleteDriver);

router.get("/:id", getDriver);

router.get("/", getAllDriver);

export default router;
