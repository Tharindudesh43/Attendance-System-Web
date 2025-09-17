import express from 'express';
import dotenv from 'dotenv';
import { v2 as cloudinary } from "cloudinary";
import jwt from 'jsonwebtoken';
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import bcrypt from 'bcryptjs';
import AdminUser from '../models/admin_user.js';
import LecturerUser from '../models/lecture_user.js';
import firebaseadmin from "firebase-admin";

dotenv.config();

const LecturerRouter = express.Router();

const uploadx = multer();


//Lecturer Loging Route
LecturerRouter.post('/lecturerlogin',uploadx.none(),async (req,res)=>{
    console.log(req.body.email);
    try{
        const lectureruser =  await LecturerUser.findOne({
            email: req.body.email
        });
        if(!lectureruser){
            return res.json({status: 'error',error: 'Lecturer Not Found'})
        }else{
            console.log(req.body.email)
            const isPasswordValid = await bcrypt.compare(req.body.password,lectureruser.password);

            if(isPasswordValid){
                const token = jwt.sign({
                    id:lectureruser.id,
                    email:lectureruser.email,
                    image:lectureruser.image,
                    name:lectureruser.name,
                    lecid:lectureruser.lecid,
                    gender:lectureruser.gender,
                    contactno:lectureruser.contactno,
                    title:lectureruser.title,
                    department:lectureruser.department,
                    faculty:lectureruser.faculty,
                },'secret123')
                return res.json({status:'ok',user: token})
            }
            else{
                return res.json({status:'error',user: false})
            }
        }
    }catch(error){
        console.log("Error while login lecturer user",error);
    }
});


//Lecturer Image
LecturerRouter.get('/lecturer_image',uploadx.none(),async (req,res)=>{
    const lecturetoken =  req.headers['x-access-token']
    try{
        const decoded =  jwt.verify(lecturetoken,'secret123')
        const email = decoded.email
        console.log(email);
        const lectureruser =  await LecturerUser.findOne({
            email: email
        });  
        console.log(lectureruser.image);
        return res.json({status:'ok',image: lectureruser.image});
    }catch(error){
        console.log("Error while login lecturer user",error);
    }
});


//Add attendance
LecturerRouter.post('/addattendance',uploadx.none(), async (req, res) => {
    try {
        let updated = false;
        const attendancedata = [];
        console.log(req.body.sem_version);
        //attendancedata.push(["2020/2021","1st Year","2nd Semester","SWT1221-ICT","Short Semester","2025-512","2:46:23","2:47:23",[]]); 
        attendancedata.push([req.body.qrcode,req.body.ac_year,req.body.year,req.body.semester,req.body.subject,req.body.sem_version,req.body.subjectitle,req.body.subjectdescription,req.body.date,req.body.starttime,req.body.endtime,[
            // ["SEU/IS/20/ICT/033","A.K.D Anura",3,"Good session but if slow the speed i would easy for understand"],
            // ["SEU/IS/20/ICT/057","W.D.T.D Himahansa",2,"Could improve on participation"]
        ]]); //
         const lecturer =  await LecturerUser.findById(req.body.lecID);
        if (!lecturer) {
            return res.status(404).json({ status: 'error', error: 'Lecturer not found' });
        } 
        
        // if (!lecturer.attendance || !Array.isArray(lecturer.attendance)) {
        // lecturer.attendance = [
        //     [], // 1st Year
        //     [], // 2nd Year
        //     [], // 3rd Year
        //     [], // 4th Year
        // ];
        // }
        if(req.body.ac_year=="1st Year"){
            lecturer.attendance[0].push(attendancedata);
        }else if(req.body.ac_year=="2nd Year"){
            lecturer.attendance[1].push(attendancedata);
        }else if(req.body.ac_year=="3rd Year"){
            lecturer.attendance[2].push(attendancedata);
        }else if(req.body.ac_year=="4th Year"){
            lecturer.attendance[3].push(attendancedata);
        }

        if(lecturer.subjects.length == 0){
            console.log("No Attendance Array");
        }else{
            for (const subject of lecturer.subjects) {
                if(req.body.subject ==  subject[0][3]){
                    console.log("Found matching subject");
                    subject[0][5][0] =  (subject[0][5][0] || 0) + 1;
                    updated = true; 
                }
                if (updated) {
                    // Update Firestore document
                    await LecturerUser.updateOne(
                        { _id: lecturer._id },                // Find the lecturer by ID
                        { $set: { subjects: lecturer.subjects } } // Replace subjects array
                    );
                    console.log("MongoDB document updated with new attendance count");
                }
            }
        }

        // Save the update
        await lecturer.save();

         //     const updatedLecturer = await LecturerUser.findByIdAndUpdate(
    //     req.body.lecID,
    //     // "682100aa609c7c0bc0878565",
    //     { $push: { attendance: attendancedata }  },
    //     { new: true }
    //   );
      res.json({ status: 'ok'});
    } catch (error) {
      console.error("Error while adding subjects", error);
      res.json({ status: 'error', error: 'Internal Problem Error' });
    }
});


//Get attendance
LecturerRouter.get('/getattendance/:id', async (req, res) => {
    console.log(req.query.ac_year);
    try {
        const { id } = req.params;
         //console.log(req.query.id);
        // Find the lecturer by ID
        const lecturer = await LecturerUser.findById(id);

        // Check if lecturer exists
        if (!lecturer) {
            return res.status(404).json({ status: 'error', message: 'Lecturer not found' });
        }
        // Check if attendance exist for this lecturer

        if("1st Year" === req.query.ac_year){
             const attendance = lecturer.attendance && lecturer.attendance.length > 1 
                ? lecturer.attendance[0]
                : [];

            for (const option of attendance) {
                if (option[0][0] === req.query.qrcode) {
                    const specificattendancedata = option[0][11]; // This is an array like:
                    console.log(specificattendancedata);
                    // [ ['SEU/IS/20/ICT/033', 'A.K.D Anura'], ['SEU/IS/20/ICT/057', 'W.D.T.D Himahansa'] ]
                    return res.json({ status: 'ok', specificattendancedata });
                }
            }
            return res.status(404).json({ status: 'error', message: 'QR code not found in 2nd year attendance' });
            // const attendance = lecturer.attendance && lecturer.attendance.length > 0 
            //     ? lecturer.attendance[0]
            //     : 'No Attendance Data';
            // attendance.forEach((option, index) => {
            //     if ((option[0][0] === req.query.qrcode)) {
            //         //const specificattendancedata = lecturer.option[0][9];
            //         console.log(option[0][9]);
            //     } 
            // });
        }else if ("2nd Year" === req.query.ac_year) {
            const attendance = lecturer.attendance && lecturer.attendance.length > 1 
                ? lecturer.attendance[1]
                : [];

            for (const option of attendance) {
                if (option[0][0] === req.query.qrcode) {
                    const specificattendancedata = option[0][11]; // This is an array like:
                    console.log(specificattendancedata);
                    // [ ['SEU/IS/20/ICT/033', 'A.K.D Anura'], ['SEU/IS/20/ICT/057', 'W.D.T.D Himahansa'] ]
                    return res.json({ status: 'ok', specificattendancedata });
                }
            }
            return res.status(404).json({ status: 'error', message: 'QR code not found in 2nd year attendance' });
        }else  if("3rd Year" === req.query.ac_year){
             const attendance = lecturer.attendance && lecturer.attendance.length > 1 
                ? lecturer.attendance[2]
                : [];

            for (const option of attendance) {
                if (option[0][0] === req.query.qrcode) {
                    const specificattendancedata = option[0][11]; // This is an array like:
                    console.log(specificattendancedata);
                    // [ ['SEU/IS/20/ICT/033', 'A.K.D Anura'], ['SEU/IS/20/ICT/057', 'W.D.T.D Himahansa'] ]
                    return res.json({ status: 'ok', specificattendancedata });
                }
            }
            return res.status(404).json({ status: 'error', message: 'QR code not found in 2nd year attendance' });
            // const attendance = lecturer.attendance && lecturer.attendance.length > 0 
            //     ? lecturer.attendance[2]
            //     : 'No Attendance Data';
            // attendance.forEach((option, index) => {
            //     if ((option[0][0] === req.query.qrcode)) {
            //         //const specificattendancedata = lecturer.option[0][9];
            //         console.log(option[0][0]);
            //     } 
            // });
        }else  if("4th Year" === req.query.ac_year){
             const attendance = lecturer.attendance && lecturer.attendance.length > 1 
                ? lecturer.attendance[3]
                : [];

            for (const option of attendance) {
                if (option[0][0] === req.query.qrcode) {
                    const specificattendancedata = option[0][11]; // This is an array like:
                    console.log(specificattendancedata);
                    // [ ['SEU/IS/20/ICT/033', 'A.K.D Anura'], ['SEU/IS/20/ICT/057', 'W.D.T.D Himahansa'] ]
                    return res.json({ status: 'ok', specificattendancedata });
                }
            }
            return res.status(404).json({ status: 'error', message: 'QR code not found in 2nd year attendance' });
        //     const attendance = lecturer.attendance && lecturer.attendance.length > 0 
        //         ? lecturer.attendance[3]
        //         : 'No Attendance Data';
        //     attendance.forEach((option, index) => {
        //     if ((option[0][0] === req.query.qrcode)) {
        //         //const specificattendancedata = lecturer.option[0][9];
        //         console.log(option[0][9]);
        //     } 
        // });
        }
 
        
        // const department = lecturer.department;
        // const faculty = lecturer.faculty;
        // const idlec = lecturer.id;

        // Return the subjects
        //console.log(subjects)
        return res.json({ status: 'ok'});
    } catch (error) {
        console.error('Error fetching subjects:', error);
        return res.status(500).json({ status: 'error', message: error.message });
    }
});


//get attendance history
LecturerRouter.get('/get_history_attendace/:id/:subject/:year', async (req, res) => {
    try {
        const {id,subject,year} = req.params;
        // Find the lecturer by ID
        const lecturer = await LecturerUser.findById(id);

        // Check if lecturer exists
        if (!lecturer) {
            return res.status(404).json({ status: 'error', message: 'Lecturer not found' });
        }

if (year === "1st Year") {
    const attendance = lecturer.attendance && lecturer.attendance.length > 0
        ? lecturer.attendance[0]
        : null;

    if (!attendance) {
        return res.status(200).json({ status: 'empty', message: 'No Attendance available' });
    }

    
    const faculty  = lecturer.faculty;
    const department  = lecturer.department;

    // Collect all matching subject records
    const specificattendancedata = [];

    for (const option of attendance) {
        if (option[0][4] === subject) {
            specificattendancedata.push(option[0]);
        }
    }

    if (specificattendancedata.length > 0) {
        console.log(specificattendancedata)
        return res.status(200).json({ status: 'ok', specificattendancedata, department, faculty});
    } else {
        return res.status(404).json({ status: 'error', message: `No attendance found for subject: ${subject}` });
    }
}
else if (year === "2nd Year") {
    const attendance = lecturer.attendance && lecturer.attendance.length > 0
        ? lecturer.attendance[1]
        : null;

    if (!attendance) {
        return res.status(200).json({ status: 'empty', message: 'No Attendance available' });
    }

    const faculty  = lecturer.faculty;
    const department  = lecturer.department;

    // Collect all matching subject records
    const specificattendancedata = [];

    for (const option of attendance) {
        if (option[0][4] === subject) {
            specificattendancedata.push(option[0]);
        }
    }

    if (specificattendancedata.length > 0) {
        console.log("------")
        console.log(specificattendancedata)
        console.log("------")
                return res.status(200).json({ status: 'ok', specificattendancedata, department, faculty});
    } else {
        return res.status(404).json({ status: 'error', message: `No attendance found for subject: ${subject}` });
    }
}
else if (year === "3rd Year") {
    const attendance = lecturer.attendance && lecturer.attendance.length > 0
        ? lecturer.attendance[2]
        : null;

    if (!attendance) {
        return res.status(200).json({ status: 'empty', message: 'No Attendance available' });
    }

    const faculty  = lecturer.faculty;
    const department  = lecturer.department;

    // Collect all matching subject records
    const specificattendancedata = [];

    for (const option of attendance) {
        if (option[0][4] === subject) {
            specificattendancedata.push(option[0]);
        }
    }

    if (specificattendancedata.length > 0) {
        console.log(specificattendancedata)
                return res.status(200).json({ status: 'ok', specificattendancedata, department, faculty});
    } else {
        return res.status(404).json({ status: 'error', message: `No attendance found for subject: ${subject}` });
    }
}
else if (year === "4th Year") {
    const attendance = lecturer.attendance && lecturer.attendance.length > 0
        ? lecturer.attendance[3]
        : null;

    if (!attendance) {
        return res.status(200).json({ status: 'empty', message: 'No Attendance available' });
    }

    const faculty  = lecturer.faculty;
    const department  = lecturer.department;

    // Collect all matching subject records
    const specificattendancedata = [];

    for (const option of attendance) {
        if (option[0][4] === subject) {
            specificattendancedata.push(option[0]);
        }
    }

    if (specificattendancedata.length > 0) {
        console.log(specificattendancedata)
                return res.status(200).json({ status: 'ok', specificattendancedata, department, faculty});
    } else {
        return res.status(404).json({ status: 'error', message: `No attendance found for subject: ${subject}` });
    }
}

// if (year === "4th Year") {
//     const matchingRecords = [];
//     const attendace = lecturer.attendance && lecturer.attendance.length > 0
//         ? lecturer.attendance[3]
//         : [];
//     console.log("SSS:"+attendace);

//     // If no attendance at all
//     // if (attendace==[]) {
//     //     console.log('No aatendace')
//     //     // return res.json({  status: 'No Attendace available' });
//     // }

//     // Loop through each record and find matching subject
//     for (const option of attendace) {
//         if (option[0][3] === subject) {
//             matchingRecords.push(option);
//         }
//     }
//     if (matchingRecords.length > 0) {
//         return res.json({ status: 'ok', matchingRecords });
//     } else {
//         return res.json({ status: 'No Attendance available' });
//     }

//     // Subject not found in attendance
//     // return res.status(404).json({ status: 'error', message: `No attendance found for subject: ${subject}` });
// }

        // else  if("3rd Year" === req.query.ac_year){
        // //      const attendance = lecturer.attendance && lecturer.attendance.length > 1 
        //         ? lecturer.attendance[2]
        //         : [];

        //     for (const option of attendance) {
        //         if (option[0][0] === req.query.qrcode) {
        //             const specificattendancedata = option[0][9]; // This is an array like:
        //             console.log(specificattendancedata);
        //             // [ ['SEU/IS/20/ICT/033', 'A.K.D Anura'], ['SEU/IS/20/ICT/057', 'W.D.T.D Himahansa'] ]
        //             return res.json({ status: 'ok', specificattendancedata });
        //         }
        //     }
        //     return res.status(404).json({ status: 'error', message: 'QR code not found in 2nd year attendance' });
        //     // const attendance = lecturer.attendance && lecturer.attendance.length > 0 
        //     //     ? lecturer.attendance[2]
        //     //     : 'No Attendance Data';
        //     // attendance.forEach((option, index) => {
        //     //     if ((option[0][0] === req.query.qrcode)) {
        //     //         //const specificattendancedata = lecturer.option[0][9];
        //     //         console.log(option[0][0]);
        //     //     } 
        //     // });
        // }else  if("4th Year" === req.query.ac_year){
        //      const attendance = lecturer.attendance && lecturer.attendance.length > 1 
        //         ? lecturer.attendance[3]
        //         : [];

        //     for (const option of attendance) {
        //         if (option[0][0] === req.query.qrcode) {
        //             const specificattendancedata = option[0][9]; // This is an array like:
        //             console.log(specificattendancedata);
        //             // [ ['SEU/IS/20/ICT/033', 'A.K.D Anura'], ['SEU/IS/20/ICT/057', 'W.D.T.D Himahansa'] ]
        //             return res.json({ status: 'ok', specificattendancedata });
        //         }
        //     }
        //     return res.status(404).json({ status: 'error', message: 'QR code not found in 2nd year attendance' });
        //     const attendance = lecturer.attendance && lecturer.attendance.length > 0 
        //         ? lecturer.attendance[3]
        //         : 'No Attendance Data';
        //     attendance.forEach((option, index) => {
        //     if ((option[0][0] === req.query.qrcode)) {
        //         //const specificattendancedata = lecturer.option[0][9];
        //         console.log(option[0][9]);
        //     } 
        // });
    //    }
 
        
        // const department = lecturer.department;
        // const faculty = lecturer.faculty;
        // const idlec = lecturer.id;

        // Return the subjects
        //console.log(subjects)
        //return res.json({ status: 'ok'});
    } catch (error) {
        console.error('Error fetching subjects:', error);
        return res.status(500).json({ status: 'error', message: error.message });
    }
});





//maek attendace test
LecturerRouter.post('/testadd',uploadx.none(), async (req, res) => {
    try {
        const testdata = ["SEU/IS/20/ICT/057","W.D.T.D Himahansa"];
        console.log(req.body.lecID);
        //attendancedata.push(["2020/2021","1st Year","2nd Semester","SWT1221-ICT","Short Semester","2025-512","2:46:23","2:47:23",[]]); 
        //testdata.push([req.body.regno,req.body.initialname]); //
        console.log(testdata)
         const lecturer =  await LecturerUser.findById(req.body.lecID);
        if (!lecturer) {
            return res.status(404).json({ status: 'error', error: 'Lecturer not found' });
        } 
        // lecturer.attendance[1][0][0][9].push(testdata);

        const attendance = lecturer.attendance && lecturer.attendance.length > 0 
                ? lecturer.attendance[1]
                : 'No Attendance Data';
        // attendance.forEach((option, index) => {
        //     // if ((option[0][0] === req.query.qrcode)) {
        //     //     console.log(option[0][0]);
        //     // } 
        //     option[0][9].push(testdata);
        // });
        lecturer.attendance[1][0].push(testdata);
        // attendance[0][9].
        // if (!lecturer.attendance || !Array.isArray(lecturer.attendance)) {
        // lecturer.attendance = [
        //     [], // 1st Year
        //     [], // 2nd Year
        //     [], // 3rd Year
        //     [], // 4th Year
        // ];
        // }
        // if(req.body.ac_year=="1st Year"){
        //     lecturer.attendance[0].push(attendancedata);
        // }else if(req.body.ac_year=="2nd Year"){
        //     lecturer.attendance[1].push(attendancedata);
        // }else if(req.body.ac_year=="3rd Year"){
        //     lecturer.attendance[2].push(attendancedata);
        // }else if(req.body.ac_year=="4th Year"){
        //     lecturer.attendance[3].push(attendancedata);
        // }

        // Save the update
        await lecturer.save();

         //     const updatedLecturer = await LecturerUser.findByIdAndUpdate(
    //     req.body.lecID,
    //     // "682100aa609c7c0bc0878565",
    //     { $push: { attendance: attendancedata }  },
    //     { new: true }
    //   );
      res.json({ status: 'ok'});
    } catch (error) {
      console.error("Error while adding subjects", error);
      res.json({ status: 'error', error: 'Internal Problem Error' });
    }
});




//populate specific lecturer subjects
LecturerRouter.get('/lecturer_qrgen/:id', async (req, res) => {
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
        const department = lecturer.department;
        const faculty = lecturer.faculty;
        const idlec = lecturer.id;

        // Return the subjects
        console.log(subjects)
        return res.json({ status: 'ok', subjects ,department,faculty,idlec});
    } catch (error) {
        console.error('Error fetching subjects:', error);
        return res.status(500).json({ status: 'error', message: error.message });
    }
});


//populate specific lecturer subjects
LecturerRouter.get('/subjectsdetails/:id', async (req, res) => {
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
        console.log("DDDDD");
        return res.json({ status: 'ok', subjects });
    } catch (error) {
        console.error('Error fetching subjects:', error);
        return res.status(500).json({ status: 'error', message: error.message });
    }
});


//lecture create notification
LecturerRouter.post('/create_lecture_notification', async (req, res) => {
    const { semester, year, subject } = req.body;  // get from frontend

    try {
        const db = firebaseadmin.firestore();
        const messaging = firebaseadmin.messaging();

        const snapshot = await db.collection('users')
            .where('year', '==', year)
            .where('semester', '==', semester)
            .get();

        if (snapshot.empty) {
            return res.status(404).json({ status: 'error', message: 'No users found' });
        }

        const tokens = snapshot.docs.map(doc => doc.data().fcmToken);

        const message = {
            notification: {
                title: "Lecture Started",
                body: `Your ${subject} lecture has started.`,
            },
            tokens
        };

        const response = await messaging.sendEachForMulticast(message);
        console.log("✅ Notifications sent:", response.successCount);

        return res.json({ status: 'success', message: 'Notification sent', response });
    } catch (error) {
        console.error('Error creating notification:', error);
        return res.status(500).json({ status: 'error', message: error.message });
    }
});


//lecture attendance count add
LecturerRouter.post('/attendance_count_add', async (req, res) => {
    const { semester, year, subject, semester_version } = req.body;

    try {
        const db = firebaseadmin.firestore();

        const snapshot = await db.collection('users')
            .where('year', '==', year)
            .where('semester', '==', semester)
            .get();

        if (snapshot.empty) {
            return res.status(404).json({ status: 'error', message: 'No users found' });
        }

        for (const doc of snapshot.docs) {
            const userRef = db.collection('users').doc(doc.id);
            const userData = doc.data();

            const semversion = semester_version === "Long Semester" ? 20 : 12;

            // Ensure Count_Attendance is an array
            let attendanceArray = [];
            if (Array.isArray(userData.Count_Attendance)) {
                attendanceArray = userData.Count_Attendance;
            } else if (userData.Count_Attendance && typeof userData.Count_Attendance === "object") {
                // convert old object to array
                attendanceArray = [userData.Count_Attendance];
            }

            // Find if subject already exists
            const index = attendanceArray.findIndex(
                item =>
                    item.subject === subject &&
                    item.semester === semester &&
                    item.year === year
            );

            if (index !== -1) {
                // Increment existing subject count
                attendanceArray[index].lectures_count += 1;
            } else {
                // Add new subject entry
                attendanceArray.push({
                    subject: subject,
                    semester: semester,
                    year: year,
                    semversion_count: semversion,
                    lectures_count: 1,
                    student_count: 0
                });
                console.log("Added new subject to attendance array");
            }

            // Update document with new array
            await userRef.update({ Count_Attendance: attendanceArray });
        }

        return res.status(200).json({ status: 'success', message: 'Attendance count updated successfully' });

    } catch (error) {
        console.error("Error updating attendance:", error);
        return res.status(500).json({ status: 'error', message: 'Server error', error });
    }
});







export default LecturerRouter;