import express from 'express';
import dotenv from 'dotenv';
import { v2 as cloudinary } from "cloudinary";
import jwt from 'jsonwebtoken';
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import bcrypt from 'bcryptjs';
import AdminUser from '../models/admin_user.js';
import LecturerUser from '../models/lecture_user.js';

dotenv.config();


const AdminRouter = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "lectures/profileimages", // Folder name in Cloudinary
        allowed_formats: ["jpg", "png", "jpeg"],
    },
});

const upload = multer({ storage: storage });
const uploadx = multer();

// Function to extract publicId from full Cloudinary URL
const extractPublicId = (url) => {
    try {
        const parts = url.split("/");
        const fileNameWithExt = parts.pop(); // Get last part (filename.extension)
        const fileName = fileNameWithExt.split(".")[0]; // Remove extension

        const versionIndex = parts.findIndex(part => part.startsWith("v")); // Find version part
        if (versionIndex !== -1) {
            parts.splice(versionIndex, 1); // Remove version
        }

        // Find the position where 'upload' exists and extract folder structure after it
        const uploadIndex = parts.indexOf("upload");
        if (uploadIndex === -1 || uploadIndex + 1 >= parts.length) {
            return null; // Invalid Cloudinary URL
        }

        // Extract folder path + filename
        return parts.slice(uploadIndex + 1).join("/") + "/" + fileName;
    } catch (error) {
        return null;
    }
};


//Delete Lecturer User
AdminRouter.delete('/deleteLecturer',uploadx.none(), async(req,res)=>{
    try{
        const id = req.body.id;
        const email =  req.body.email;
        const image = req.body.image;

        const publicId = extractPublicId(image);
        const imageresult = await cloudinary.uploader.destroy(publicId);
        const result = await LecturerUser.findOneAndDelete({ _id: id, email: email });
        if(!result){
            return res.json({status:'not found'})
        }
        else{
            return res.json({status:'ok'})
        }
    }catch(error){
        console.log(error.message);
        return error;
    }
})

//Delete ad Subject from Lecturer
AdminRouter.delete('/deleteSubject',uploadx.none(), async(req,res)=>{
    try{
        const id = req.body.id;
        const subjectIndex =  req.body.subjectIndex;
        const year = req.body.year_study;
        const subject = req.body.subject;

        console.log(subjectIndex);
        console.log(year);
        console.log(subject);
        console.log(id);

        const lecturer = await LecturerUser.findById(id);

        if (!lecturer) {
          return res.json({ status: 'error', message: 'Lecturer not found' });
        }
    
        // Remove the subject from the lecturer's subjects array
        if (subjectIndex >= 0 && subjectIndex < lecturer.subjects.length) {
            lecturer.subjects.splice(subjectIndex, 1); // Remove the subject at the provided index
            console.log("LLLLLLLLbbbbbbbbL",lecturer.subjects);
            console.log("SSSSSSSSbbbbbbbbS")
            
        if (year === "1st Year") {
            const originalList = lecturer.attendance[0];
    
            // Filter out all entries where subject matches
            const updatedList = originalList.filter(entry => entry[0][4] !== subject);

            const found = updatedList.length !== originalList.length;

            if(updatedList.length === 0){
               await lecturer.save();
               return res.json({ status: 'ok', message: 'All matching subjects deleted from 1 st year attendance' });
            }else{
                if (found) {
                    lecturer.attendance[0] = updatedList;
                    await lecturer.save();
                    return res.json({ status: 'ok', message: 'All matching subjects deleted from 1 st year attendance' });
                }
            }

            return res.status(404).json({ status: 'error', message: 'Subject not found in 1 st year attendance' });
        }if (year === "2nd Year") {
            const originalList = lecturer.attendance[1];
    
            // Filter out all entries where subject matches
            const updatedList = originalList.filter(entry => entry[0][4] !== subject);

            const found = updatedList.length !== originalList.length;

            if(updatedList.length === 0){
               await lecturer.save();
               return res.json({ status: 'ok', message: 'All matching subjects deleted from 2 nd year attendance' });
            }else{
                if (found) {
                    lecturer.attendance[1] = updatedList;
                    await lecturer.save();
                    return res.json({ status: 'ok', message: 'All matching subjects deleted from 2 nd year attendance' });
                }
            }

            return res.status(404).json({ status: 'error', message: 'Subject not found in 2 nd year attendance' });
        }if (year === "3rd Year") {
            const originalList = lecturer.attendance[2];
    
            // Filter out all entries where subject matches
            const updatedList = originalList.filter(entry => entry[0][4] !== subject);

            const found = updatedList.length !== originalList.length;
            
            if(updatedList.length === 0){
               await lecturer.save();
               return res.json({ status: 'ok', message: 'All matching subjects deleted from 3 rd year attendance' });
            }else{
                if (found) {
                    lecturer.attendance[2] = updatedList;
                    await lecturer.save();
                    return res.json({ status: 'ok', message: 'All matching subjects deleted from 3 rd year attendance' });
                }
            }
            
            return res.status(404).json({ status: 'error', message: 'Subject not found in 3 rd year attendance' });
        }if (year === "4th Year") {
            const originalList = lecturer.attendance[3];
    
            // Filter out all entries where subject matches
            const updatedList = originalList.filter(entry => entry[0][4] !== subject);

            const found = updatedList.length !== originalList.length;

            if(updatedList.length === 0){
               await lecturer.save();
               return res.json({ status: 'ok', message: 'All matching subjects deleted from 3 rd year attendance' });
            }else{
                if (found) {
                    lecturer.attendance[3] = updatedList;
                    await lecturer.save();
                    return res.json({ status: 'ok', message: 'All matching subjects deleted from 4th year attendance' });
                }
            }

            return res.status(404).json({ status: 'error', message: 'Subject not found in 4th year attendance' });
       }
             return res.json({ status: 'ok', message: 'Subject attendance deleted successfully' });
    
        }
    }catch(error){
        console.log(error.message);
        return error;
    }
})



//Admin Loging Route
AdminRouter.post('/adminlogin',uploadx.none(),async (req,res)=>{ 
    try{
        const adminuser =  await AdminUser.findOne({
            email: req.body.email
        });
        if(!adminuser){
            return res.json({status: 'error',error: 'Admin Not Found'})
        }else{
            console.log(req.body.email)
            const isPasswordValid = await bcrypt.compare(req.body.password,adminuser.password);

            if(isPasswordValid){
                const token = jwt.sign({
                    email:adminuser.email
                },'secret123')
                return res.json({status:'ok',user: token})
            }
            else{
                return res.json({status:'error',user: false})
            }
        }
    }catch(error){
        console.log("Error while login admin user",error);
    }
});


//Adding Lecturer to store
AdminRouter.post('/lectureadd',upload.single("image"),async (req,res)=>{
    try{
        const encryptedpassword = await bcrypt.hash(req.body.password,10);
        await LecturerUser.create({
            name: req.body.name,
            email: req.body.email,
            password: encryptedpassword,
            gender: req.body.gender,
            faculty: req.body.selectedFaculty,
            department: req.body.selectedDepartment,
            image: req.file.path,
            title: req.body.title,
            lecid: req.body.lecid,
            contactno: req.body.contactno,
            attendance: req.body.attendance
        })
        res.json({status:'ok'})
    }catch(error){
        res.json({status:'error',error:'Connection Problem Error'});
        console.log("Error while addinglecturers admin user",error);
    }
});

//Add subject for lecturer
AdminRouter.post('/addsubjects',uploadx.none(), async (req, res) => {
    //console.log("Subject to add:", re, "Lecturer ID:", id);
    try {
        const subjectdata = [];
        subjectdata.push([req.body.ac_year,req.body.year,req.body.semester,req.body.subject,req.body.sem_version,[0,req.body.sem_version==="Long Semester" ? 20 : 12 ]]); //
        const updatedLecturer = await LecturerUser.findByIdAndUpdate(
        req.body.id, // Use the ID from the request body
        { $push: { subjects: subjectdata }  },
        { new: true }
      );
      res.json({ status: 'ok'});
    } catch (error) {
      console.error("Error while adding subjects", error);
      res.json({ status: 'error', error: 'Internal Problem Error' });
    }
});


//populate all Lecturers
AdminRouter.get('/lectures',async (req,res)=>{
    const admintoken =  req.headers['x-access-token']
    try{
        // const decoded =  jwt.verify(admintoken,'secret123')
        // const email = decoded.email
        const lecture_user_data = await LecturerUser.find({});
        return res.json({status:'ok',lec_data:lecture_user_data})
    }catch(error){
        console.log(error);
        res.json({status:'error',error:'Connection Problem Error'});
    }
});





//populate specific lecturer subjects
AdminRouter.get('/subjectsdetails/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Find the lecturer by ID
        const lecturer = await LecturerUser.findById(id);

        // Check if lecturer exists
        if (!lecturer) {
            return res.status(404).json({ status: 'error', message: 'Lecturer not found' });
        }

        // Check if subjects exist for this lecturer
        const subjects = lecturer.subjects && lecturer.subjects.length > 0 
            ? lecturer.subjects 
            : 'No subjects available';

        // Return the subjects
        console.log(subjects);
        console.log("DDDDD")
        return res.json({ status: 'ok', subjects });
    } catch (error) {
        console.error('Error fetching subjects:', error);
        return res.status(500).json({ status: 'error', message: error.message });
    }
});



//findUp alreadty that adding subject stored or not
AdminRouter.post('/finddup',uploadx.none(), async (req, res) => {
    try {
      let sum = 0
      const finddup = await LecturerUser.findOne(
        { _id: req.body.id }
      );
      if(finddup!==null){
            for (let index = 0; index < finddup.subjects.length; index++) {
                for (let index2 = 0; index2 < finddup.subjects[index].length; index2++) {
                    if( finddup.subjects[index][0][3]===req.body.subject){
                        console.log(finddup.subjects[index][0][3])
                        sum = sum + 1;
                    }
                }
            }
        if(sum>0){
            res.json({ status: 'yes'});
        }else{
            res.json({ status: 'not'});
        }
      }else{
        res.json({ status: 'error', error: 'Internal Problem Error' });
      }
    } catch (error) {
      console.error("Error while adding subjects", error);
      res.json({ status: 'error', error: 'Internal Problem Error' });
    }
});

export default AdminRouter;