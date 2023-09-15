import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authroute from "./routes/auth.js";
import vendorroute from "./routes/vendors.js";
import driverroute from "./routes/drivers.js";
import orderroute from "./routes/order.js";
import productroute from "./routes/product.js";
import adminroute from "./routes/admin.js";
import categoryroute from "./routes/category.js";

const app = express();
app.use(cors({
    origin:"http://localhost:3000",
}))
dotenv.config();

import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
app.use("/images", express.static(path.join(__dirname, "public/images")));
// console.log(__dirname);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }, 
});

const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("file uploaded sucessfully");
  } catch (error) {
    console.log("error infile uploading backend");
  }
});


// mongoose connection
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGOURL);
        console.log("connected to mongoDB")
    } catch (error) {
        throw(error)
    }
}

// mongoose disconnection
mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected")
});
mongoose.connection.on("connected", () => {
    console.log("mongoDB connected")
});

// middleware
app.use(express.json()); 

app.use("/api/auth",authroute)
app.use("/api/order",orderroute)
app.use("/api/driver",driverroute)
app.use("/api/product",productroute)
app.use("/api/vendor",vendorroute)
app.use("/api/admin",adminroute)
app.use("/api/category", categoryroute);

app.use((err, req, res, next) => { 
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack:err.stack
    });
})

// port connection
app.listen(8900, () => {
    connect();
    console.log('listening on 8900, connected to backend server.');
})