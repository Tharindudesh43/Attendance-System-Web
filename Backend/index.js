import express from 'express';
import mongoose from 'mongoose';
import adminfirebase from 'firebase-admin';
import cors from 'cors';
const app =  express();
import AdminRoute from './routes/admin_routes.js';
import LecturerRoute from './routes/lecturer_routes.js';
import AdminReportRoute from './routes/admin_report_routes.js'
import { readFileSync } from "fs";
import dotenv from 'dotenv';
// import FirebaseRoute from './routes/firebase_roues.js';
// import "./firebase.js";

dotenv.config();
//MongoDB Connection URL
//const MongoURL = process.env.MONGODB_URL;
 const  MongoURL = 'mongodb+srv://tharindudeshanhimahansa43:TfA6q3iUaaI8Tdw9@atsyscluster0.zzmn1.mongodb.net/?retryWrites=true&w=majority&appName=AtSysCluster0';

// ✅ Load service account with ESM-friendly way
// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

const connectDB = require("./db/db");
const errorHandler = require("./middlewares/errorhandler");
const userRoutes = require("./routes/userRoutes");

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

//connect to the database
connectDB();

//routes
app.use("/api/users", userRoutes);

app.use("/api/products", (req, res) => {
  return res.status(200).json({
    message: "This is new feature change, a new route for products samin",
  });
});

//error handler
app.use(errorHandler);

//listen to the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
