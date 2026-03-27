import { db } from "../firebase.js";

const lecturersRef = db.collection("lecturers");

export const getAttendance = async (req, res, next) => {
  try {
    const { year, semester, lecturerId } = req.query;

    const snapshot = lecturerId
      ? await lecturersRef.doc(lecturerId).get()
      : await lecturersRef.get();

    let records = [];

    if (lecturerId) {
      // Single lecturer
      if (!snapshot.exists) {
        return res.status(404).json({ success: false, message: "Lecturer not found" });
      }
      const data = snapshot.data();
      records = flattenAttendance(snapshot.id, data);
    } else {
      // All lecturers
      snapshot.docs.forEach((doc) => {
        records.push(...flattenAttendance(doc.id, doc.data()));
      });
    }

    // Filter by year
    if (year) {
      records = records.filter((r) => r.year === year);
    }

    // Filter by semester
    if (semester) {
      records = records.filter((r) => r.semester === semester);
    }

    res.json({ success: true, total: records.length, data: records });
  } catch (err) {
    next(err);
  }
};

// Helper — flatten nested attendance array from your DB structure:
// attendance: [ [ [sessionId, year, semester, subject, timeIn, timeOut, ...] ] ]
const flattenAttendance = (lecturerId, data) => {
  const records = [];
  const attendance = data.attendance || [];

  attendance.forEach((outerArr) => {
    if (!Array.isArray(outerArr)) return;
    outerArr.forEach((innerArr) => {
      if (!Array.isArray(innerArr)) return;
      innerArr.forEach((session) => {
        if (!Array.isArray(session)) return;
        records.push({
          lecturerId,
          lecturerName: data.name,
          faculty: data.faculty,
          department: data.department,
          sessionId: session[0] || "",
          year: session[1] || "",
          academicYear: session[2] || "",
          semester: session[3] || "",
          subject: session[4] || "",
          subjectShort: session[5] || "",
          topicDescription: session[6] || "",
          topicDescriptionAlt: session[7] || "",
          date: session[8] || "",
          timeIn: session[9] || "",
          timeOut: session[10] || "",
          students: Array.isArray(session[11]) ? session[11] : [],
        });
      });
    });
  });

  return records;
};

// GET attendance for a specific lecturer
export const getLecturerAttendance = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { year, semester } = req.query;

    const doc = await lecturersRef.doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ success: false, message: "Lecturer not found" });
    }

    let records = flattenAttendance(id, doc.data());

    if (year) records = records.filter((r) => r.year === year);
    if (semester) records = records.filter((r) => r.semester === semester);

    res.json({ success: true, total: records.length, data: records });
  } catch (err) {
    next(err);
  }
};