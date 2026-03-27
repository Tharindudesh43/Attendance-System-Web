import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import AdminUserReports from "../models/admin_user_reports.js";
import { dbfirebase } from "../firebase.js";
import {
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import admin from "firebase-admin";

dotenv.config();
const AdminReportRoute = express.Router();
const uploadx = multer();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to extract publicId from full Cloudinary URL
const extractPublicId = (imageUrl) => {
  const parts = imageUrl.split("/");
  const fileName = parts[parts.length - 1];
  return fileName.split(".")[0];
};

//delete report firebase
AdminReportRoute.delete(
  "/deletereport_firebase",
  uploadx.none(),
  async (req, res) => {
    try {
      const reportid = req.body.reportid;
      const userid = req.body.userId;

      // Validate inputs
      if (!userid || !reportid) {
        console.error("User ID and Report ID are required");
        return;
      }

      const userRef = doc(dbfirebase, "users", userid);

      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const reports = userSnap.data().reports || [];

        const reportToDelete = reports.find((r) => r.report_id === reportid);

        if (!reportToDelete) {
          console.log("Report not found ❌");
          return;
        }

        await updateDoc(userRef, {
          reports: arrayRemove(reportToDelete),
        });

        return res.json({
          status: "ok",
          message: "Report and images deleted successfully",
        });
      } else {
        return res.json({ status: "error", message: "User not found" });
      }
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ status: "error", message: error.message });
    }
  },
);

//populate all Admin Reports
AdminReportRoute.get("/get_reports", async (req, res) => {
  const admintoken = req.headers["x-access-token"];
  try {
    const Admin_Reports = await AdminUserReports.find({});
    return res.json({ status: "ok", reports: Admin_Reports });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "Connection Problem Error" });
  }
});

//delete report
AdminReportRoute.delete("/deletereport", uploadx.none(), async (req, res) => {
  try {
    const reportid = req.body.reportid;

    // Validate inputs
    if (!reportid) {
      return res
        .status(400)
        .json({ status: "error", message: "Report ID is required" });
    }

    // Delete images from Cloudinary if any
    req.body.reportimages.forEach(async (item) => {
      const publicId = extractPublicId(item);
      const imageresult = await cloudinary.uploader.destroy(publicId);
    });

    // Delete report from MongoDB
    const result = await AdminUserReports.findOneAndDelete({
      reportId: reportid,
    });
    if (!result) {
      return res
        .status(404)
        .json({ status: "not found", message: "Report not found" });
    }

    return res.json({
      status: "ok",
      message: "Report and images deleted successfully",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ status: "error", message: error.message });
  }
});

//change report status
AdminReportRoute.post("/change_status", uploadx.none(), async (req, res) => {
  console.log(req.body.id);
  console.log(req.body.status);
  try {
    const report = await AdminUserReports.findById(req.body.id);
    if (!report) {
      // Handle not found
      return res.status(404).json({ message: "Report not found" });
    }
    if (report.status === req.body.status) {
      // Status is the same, do nothing
      return res.status(200).json({ message: "Status unchanged", report });
    }

    report.status = req.body.status;
    await report.save();

    res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "Connection Problem Error" });
  }
});

//change report status firebase
AdminReportRoute.post(
  "/change_status_firebase",
  uploadx.none(),
  async (req, res) => {
    try {
      const db = admin.firestore();
      const { reportid, userId, status: newStatus } = req.body;

      if (!userId || !reportid || !newStatus) {
        return res
          .status(400)
          .json({
            status: "error",
            message: "User ID, Report ID, and Status are required",
          });
      }

      const userRef = db.collection("users").doc(userId);
      const userSnap = await userRef.get();

      if (!userSnap.exists) {
        return res
          .status(404)
          .json({ status: "error", message: "User not found" });
      }

      const reports = userSnap.data().reports || [];
      const reportIndex = reports.findIndex((r) => r.report_id === reportid);

      if (reportIndex === -1) {
        return res
          .status(404)
          .json({ status: "error", message: "Report not found" });
      }

      // Update status
      reports[reportIndex].status = newStatus;

      await userRef.update({ reports });

      console.log("✅ Report status updated in Firestore");
      return res.json({
        status: "ok",
        message: "Report status updated successfully",
      });
    } catch (error) {
      console.error("🔥 Firestore update error:", error.message);
      return res.status(500).json({ status: "error", message: error.message });
    }
  },
);

export default AdminReportRoute;
