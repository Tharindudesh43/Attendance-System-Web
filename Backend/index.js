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
 const MongoUTL = 'mongodb+srv://tharindudeshanhimahansa43:TfA6q3iUaaI8Tdw9@atsyscluster0.zzmn1.mongodb.net/?retryWrites=true&w=majority&appName=AtSysCluster0';

// ✅ Load service account with ESM-friendly way
const serviceAccount = JSON.parse(
  readFileSync(new URL("./serviceAccountKey.json", import.meta.url), "utf8")
);

adminfirebase.initializeApp({
  credential: adminfirebase.credential.cert(serviceAccount),
});

const messaging = adminfirebase.messaging();

//middleware for handling CORS POLICY
//option 01: Allow All Origins with Default of cors(*)
app.use(cors());

//Middleware for parsing request body
app.use(express.json())

app.listen(8000,()=>{
    console.log('Server Started on 1337')
});

app.use('/admin_report',AdminReportRoute);
app.use('/admin',AdminRoute);
app.use('/lecturer',LecturerRoute);

//MongoDB Connection
mongoose.connect(MongoURL,{dbName:'AttendanceSystem'}).
then(()=>{
    console.log('Connected to Attendace System Database')
})
.catch(err=>{
    console.error('MongoDB Connection Error:',err);
})
