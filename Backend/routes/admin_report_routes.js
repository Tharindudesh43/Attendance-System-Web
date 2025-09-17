import express from 'express';
import multer from "multer";
import dotenv from 'dotenv';
import { v2 as cloudinary } from "cloudinary";
import bcrypt from 'bcryptjs';
import { CloudinaryStorage } from "multer-storage-cloudinary";
import AdminUserReports from '../models/admin_user_reports.js';
import { dbfirebase } from "../firebase.js";
import { doc, deleteDoc ,getDoc,updateDoc ,arrayRemove } from "firebase/firestore";

dotenv.config();
const AdminReportRoute = express.Router();
// const upload = multer({ storage: storage });
const uploadx = multer();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to extract publicId from full Cloudinary URL
const extractPublicId = (imageUrl) => {
  const parts = imageUrl.split('/');
  const fileName = parts[parts.length - 1];
  return fileName.split('.')[0]; // Remove extension (e.g., .jpg)
};


//delete report firebase
AdminReportRoute.delete('/deletereport_firebase',uploadx.none(), async(req,res)=>{
    try {

    const reportid = req.body.reportid;
    const userid = req.body.userId;


    console.log(reportid, userid);

    // Validate inputs
    if (!userid || !reportid) {
      console.error("User ID and Report ID are required");
      return;
    }

    const userRef = doc(dbfirebase, "users", userid);

    const userSnap = await getDoc(userRef);

   if (userSnap.exists()) {
        const reports = userSnap.data().reports || [];

        // Find the exact report object by report_id
        const reportToDelete = reports.find(r => r.report_id === reportid);

        if (!reportToDelete) {
          console.log("Report not found ❌");
          return;
        }

        await updateDoc(userRef, {
          reports: arrayRemove(reportToDelete),
        });

        return res.json({ status: 'ok', message: 'Report and images deleted successfully' });
    }else{
      return res.json({ status: 'error', message: 'User not found' });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ status: 'error', message: error.message });
  }
})



//populate all Admin Reports
AdminReportRoute.get('/get_reports',async (req,res)=>{
    const admintoken =  req.headers['x-access-token']
    try{
        const Admin_Reports = await AdminUserReports.find({});
        return res.json({status:'ok',reports: Admin_Reports})
    }catch(error){
        console.log(error);
        res.json({status:'error',error:'Connection Problem Error'});
    }
});

//delete report
AdminReportRoute.delete('/deletereport',uploadx.none(), async(req,res)=>{
    try {

    const reportid = req.body.reportid;

    // Validate inputs
    if (!reportid) {
      return res.status(400).json({ status: 'error', message: 'Report ID is required' });
    }

    // Delete images from Cloudinary if any
     req.body.reportimages.forEach(async (item) => {
        const publicId = extractPublicId(item);
        const imageresult = await cloudinary.uploader.destroy(publicId);
    });

    // Delete report from MongoDB
    const result = await AdminUserReports.findOneAndDelete({ reportId: reportid });
    if (!result) {
      return res.status(404).json({ status: 'not found', message: 'Report not found' });
    }

    return res.json({ status: 'ok', message: 'Report and images deleted successfully' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ status: 'error', message: error.message });
  }
})


//change report status
AdminReportRoute.post('/change_status',uploadx.none(),async (req,res)=>{
    console.log(req.body.id);
    console.log(req.body.status);
    try{
        const report = await AdminUserReports.findById(req.body.id);
        if (!report) {
            // Handle not found
            return res.status(404).json({ message: 'Report not found' });
        }
        if (report.status === req.body.status) {
            // Status is the same, do nothing
            return res.status(200).json({ message: 'Status unchanged', report });
        }

        report.status = req.body.status;
        await report.save();
      
        res.json({ status: 'ok'});
    }catch(error){
        console.log(error);
        res.json({status:'error',error:'Connection Problem Error'});
    }
});

//change report status firebase
AdminReportRoute.post('/change_status_firebase',uploadx.none(),async (req,res)=>{
        try {
    const reportid = req.body.reportid;
    const userId = req.body.userId;
    const newStatus =req.body.status;


    console.log(reportid, userId,newStatus);

    // Validate inputs
    if (!userId || !reportid) {
      console.error("User ID and Report ID are required");
      return;
    }

    const userRef = doc(dbfirebase, "users", userId);

    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    const reports = userSnap.data().reports || [];
    const reportIndex = reports.findIndex(r => r.report_id === reportid);

    if (reportIndex === -1) {
      console.log("Report not found ❌");
      return res.status(404).json({ status: 'error', message: 'Report not found' });
    }

    // Update the status
    reports[reportIndex].status = newStatus;

    // Save back to Firestore
    await updateDoc(userRef, { reports });

    return res.json({ status: 'ok', message: 'Report status updated successfully' });

 
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ status: 'error', message: error.message });
  }
});


// AdminRouter.post('/addsubjects',uploadx.none(), async (req, res) => {
//     //console.log("Subject to add:", re, "Lecturer ID:", id);
//     try {
//         const subjectdata = [];
//         subjectdata.push([req.body.ac_year,req.body.year,req.body.semester,req.body.subject,req.body.sem_version]); //
//         const updatedLecturer = await LecturerUser.findByIdAndUpdate(
//         req.body.id, // Use the ID from the request body
//         { $push: { subjects: subjectdata }  },
//         { new: true }
//       );
//       res.json({ status: 'ok'});
//     } catch (error) {
//       console.error("Error while adding subjects", error);
//       res.json({ status: 'error', error: 'Internal Problem Error' });
//     }
// });



export default AdminReportRoute;