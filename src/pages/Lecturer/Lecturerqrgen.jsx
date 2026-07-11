import React, { useEffect, useState, useRef } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useContextData } from "../../ReloadContext.jsx";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import loadingimage from "../../../public/assets/load_img1.svg";
import QRCode from "react-qr-code";
import { jwtDecode } from "jwt-decode";
import { enqueueSnackbar } from "notistack";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { AiOutlineClose } from "react-icons/ai";

const LecturerQrgen = () => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [showAttendanceTable, setShowAttendanceTable] = useState(false);
  const navigate = useNavigate();
  const [
    SubjectTitleDescriptionShowModal,
    setSubjectTitleDescriptionShowModal,
  ] = useState(false);

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const [allsubjects, setallsubjects] = useState([]);
  const [allattendace, setallattendace] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const [loadingimg2, setloadingimg2] = useState(false);
  const { id } = useParams();
  const { reload, setReload } = useContextData();
  const [selectedindex, setselectedindex] = useState("");
  const [QRtext, setQRtext] = useState("");
  const [isBlurred, setIsBlurred] = useState(false);
  const [ClockDuration, setClockDuration] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [duration, setDuration] = useState(60000); // default 1 min
  const timerRef = useRef(null);

  const qrdata = new FormData();
  const [lecID, setlecID] = useState(0);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const [selectedYear, setselectedselectedYear] = useState("Select a Year");
  const [selectedsemversion, setselectedsemversion] = useState(
    "Select a Sem Version",
  );
  const [selectedfaculty, setselectedfaculty] = useState("Select a Faculty");
  const [selectedDepartment, setselectedDepartment] = useState(
    "Select a Department",
  );
  const [selectedAcademicYear, setselectedAcademicYear] = useState(
    "Select a Academic Year",
  );
  const [selectedSubject, setselectedselectedSubject] =
    useState("Select a Subject");
  const [selectedSemester, setselectedselectedSemester] =
    useState("Select a Semester");
  const [selectedDuration, setselectedselectedDuartion] =
    useState("Set a Duration");
  const durationOptions = ["1 Minute", "5 Minutes", "15 Minutes", "30 Minutes"];

  const [isHiddenCreateQrButton, setIsHiddenCreateQrButton] = useState(false);

  const [isOpenDuration, setisOpenDuration] = useState(false);

  const handleSelectDuration = (event, index) => {
    setselectedselectedDuartion(durationOptions[index]);
    setisOpenDuration(false);
    setOpen(false);
  };

  const handlebackbutton = () => {
    navigate("/lecturer");
  };

  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      setIsBlurred(true);
      return <span className="text-b">Time's up! ⏳</span>;
    } else {
      return (
        <div className="text-2xl font-bold">
          {minutes}:{seconds}
        </div>
      );
    }
  };

  const resetall = () => {
    setselectedindex("");
    setIsHiddenCreateQrButton(false);
    setselectedselectedYear("Select a Year");
    setselectedAcademicYear("Select a Academic Year");
    setselectedselectedSubject("Select a Subject");
    setselectedselectedSemester("Select a Semester");
    setselectedselectedDuartion("Set a Duration");
    setQRtext("");
  };

  const startCountdown = (customDuration) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setIsBlurred(false);
    let timeLeft = customDuration / 1000;
    setRemainingTime(timeLeft);

    timerRef.current = setInterval(() => {
      timeLeft -= 1;
      setRemainingTime(timeLeft);

      if (timeLeft <= 0) {
        clearInterval(timerRef.current);
        timerRef.current = null;
        setIsBlurred(true);
      }
    }, 1000);
  };

  const handleOpenPDF = () => {
    localStorage.setItem("attendanceData", JSON.stringify(allattendace));
    localStorage.setItem("subject_attendance", JSON.stringify(selectedSubject));
    localStorage.setItem(
      "department_attendance",
      JSON.stringify(selectedDepartment),
    );
    localStorage.setItem("faculty_attendance", JSON.stringify(selectedfaculty));
    localStorage.setItem(
      "university_attendance",
      JSON.stringify("SOUTH EASTERN UNIVERSITY OF SRI LANKA"),
    );
    localStorage.setItem(
      "academic_attendance",
      JSON.stringify(selectedAcademicYear),
    );
    localStorage.setItem(
      "semester_attendance",
      JSON.stringify(selectedSemester),
    );
    window.open(`${import.meta.env.VITE_API_BASE_URL}/lecturer/lecturer_attendence`, "_blank");
  };

  useEffect(() => {
    if (!isGenerating) return;
    const fetchAttendace = async () => {
      console.log("Fetching attendance...");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/lecturer/getattendance/${id}`,
          {
            params: {
              qrcode: QRtext,
              ac_year: selectedAcademicYear,
            },
          },
        );

        if (response.data.status === "ok") {
          console.log(
            "Attendance data received:",
            response.data.specificattendancedata,
          );
          setallattendace(response.data.specificattendancedata);
        } else {
          console.warn("No attendance data found");
        }
      } catch (error) {
        console.error("Error fetching attendance:", error);
      }
    };
    const interval = setInterval(() => {
      fetchAttendace();
    }, 3000);

    return () => clearInterval(interval);
  }, [isGenerating]);

  useEffect(() => {
    const fetchSubjects = async () => {
      const Lecturertoken = localStorage.getItem("lecturertoken");
      const decoded = jwtDecode(Lecturertoken);
      setlecID(decoded.id);
      setloadingimg2(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/lecturer/lecturer_qrgen/${id}`,
        );
        if (response.data.status === "ok") {
          setallsubjects(response.data.subjects);
          setselectedfaculty(response.data.faculty);
          setselectedDepartment(response.data.department);
          setlecID(response.data.idlec);
          console.log(allsubjects);
          console.log(selectedDepartment);
          setloadingimg2(false);
        } else if (response.data.status === "No subjects available") {
          setloadingimg2(false);
          setallsubjects("No subjects available");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSubjects();
  }, [reload]);

  const SubjectTitleDescription = ({ onClose }) => {
    return (
      <div
        className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-black/60"
        onClick={onClose}
      >
        <div
          onClick={(event) => event.stopPropagation()}
          className=" w-[600px] max-w-full h-fit bg-white rounded-xl p-4 flex-col relative"
        >
          <AiOutlineClose
            className="absolute p-1 text-3xl cursor-pointer rounded-xl right-6 hover: bg-slate-400 top-6 text-yellow-50"
            onClick={onClose}
          />
          <h2 className="mt-4 text-lg font-semibold">
            Add Lecture Title and Description
          </h2>
          <form
            className="flex flex-col gap-4 mt-4"
            noValidate
            onSubmit={(event) => {
              event.preventDefault();
              QrCodeGenerate(event, onClose);
            }}
          >
            <input
              type="text"
              ref={titleRef}
              id="subjectTitle"
              name="subjectTitle"
              placeholder="Lecture Title"
              className="p-2 border rounded"
            />

            <textarea
              ref={descRef}
              id="subjectDescription"
              name="subjectDescription"
              placeholder="Lecture Description"
              className="p-2 border rounded"
            />

            <Button color="info" type="submit" variant="contained">
              Create
            </Button>
          </form>
        </div>
      </div>
    );
  };

  const operationcheck = () => {
    if (
      [
        selectedDepartment,
        selectedAcademicYear,
        selectedYear,
        selectedSemester,
        selectedSubject,
        selectedDuration,
        selectedfaculty,
      ].every(
        (item) =>
          item !== "Select a Department" &&
          item !== "Select a Academic Year" &&
          item !== "Select a Year" &&
          item !== "Select a Semester" &&
          item !== "Select a Subject" &&
          item !== "Set a Duration" &&
          item !== "Select a Faculty",
      )
    ) {
      setSubjectTitleDescriptionShowModal(true);
    } else {
      enqueueSnackbar("Select All Options Before Generate", {
        variant: "error",
      });
    }
  };

  const sendNotification = async () => {
    try {
      const notifyData = {
        semester: selectedSemester.toString(),
        year: selectedAcademicYear.toString(),
        subject: selectedSubject.toString(),
      };

      console.log("Notification Data:", notifyData);

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/lecturer/create_lecture_notification`,
        notifyData,
        {
          headers: { "Content-Type": "application/json" }, // <- important
        },
      );

      console.log("Notification Response:", response.data);
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  const sendattendancecount = async () => {
    try {
      const countData = {
        semester: selectedSemester.toString(),
        year: selectedAcademicYear.toString(),
        subject: selectedSubject.toString(),
        semester_version: selectedsemversion.toString(),
      };

      console.log("Count Data:", countData);

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/lecturer/attendance_count_add`,
        countData,
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      console.log("Attendance Count Response:", response.data);
    } catch (error) {
      console.error("Error sending Attendance Count:", error);
    }
  };

  const LecturerAttendaceAdd = async () => {
    qrdata.append("lecID", lecID);
    qrdata.append("ac_year", selectedAcademicYear);
    qrdata.append("year", selectedYear);
    qrdata.append("semester", selectedSemester);
    qrdata.append("subject", selectedSubject);
    qrdata.append("sem_version", selectedsemversion);
    qrdata.append("subjectitle", titleRef.current.value);
    qrdata.append("subjectdescription", descRef.current.value);
    try {
      const response_dup = await axios
        .post(
          `${import.meta.env.VITE_API_BASE_URL}/lecturer/addattendance`,
          qrdata,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        )
        .then((response) => {
          if (response.data.status === "ok") {
            console.log("Attendance Added Successfully");
            sendNotification();
            sendattendancecount();
          } else {
            console.log("Error in Adding Attendance");
            return "Error in Adding Attendance";
          }
        });
    } catch (e) {
      console.log(e);
      return "Error in Adding Attendance";
    }
  };

  const QrCodeGenerate = async (event, onClose) => {
    event.preventDefault();
    if (
      [
        selectedDepartment,
        selectedAcademicYear,
        selectedYear,
        selectedSemester,
        selectedSubject,
        selectedDuration,
        selectedfaculty,
      ].every(
        (item) =>
          item !== "Select a Department" &&
          item !== "Select a Academic Year" &&
          item !== "Select a Year" &&
          item !== "Select a Semester" &&
          item !== "Select a Subject" &&
          item !== "Set a Duration" &&
          item !== "Select a Faculty" &&
          titleRef.current.value.length > 5 &&
          descRef.current.value.length > 5,
      )
    ) {
      setIsHiddenCreateQrButton(true);

      const department = selectedDepartment.replace(/\s+/g, "");
      const faculty = selectedfaculty.replace(/\s+/g, "");
      const academicYear = selectedAcademicYear.replace(/\s+/g, "");
      const year = selectedYear.replace(/\s+/g, "");
      const semester = selectedSemester.replace(/\s+/g, "");
      const subject = selectedSubject.replace(/\s+/g, "|");
      const subjectTitle = titleRef.current.value;
      const subjectDescription = descRef.current.value;
      const today = new Date();
      const date =
        today.getFullYear() +
        "-" +
        String(today.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(today.getDate()).padStart(2, "0");
      qrdata.append("date", date);

      const now = new Date();
      const startTime = now.toTimeString().split(" ")[0]; // HH:MM:SS
      qrdata.append("starttime", startTime);

      if (selectedDuration == "1 Minute") {
        const durationMinutes = parseInt("1"); // e.g., "5" from dropdown
        const end = new Date(now.getTime() + durationMinutes * 60000);
        const endTime = end.toTimeString().split(" ")[0]; // HH:MM:SS
        const qrString = `${lecID}_${faculty}_${department}_${academicYear}_${year}_${semester}_${subject}_${subjectTitle}_${subjectDescription}_${date}_S:${startTime}_E:${endTime}`;
        console.log(qrString);
        qrdata.append("qrcode", qrString);
        qrdata.append("endtime", endTime);
        setQRtext(qrString);
      } else if (selectedDuration == "5 Minutes") {
        const durationMinutes = parseInt("5"); // e.g., "5" from dropdown
        const end = new Date(now.getTime() + durationMinutes * 60000);
        const endTime = end.toTimeString().split(" ")[0]; // HH:MM:SS
        const qrString = `${lecID}_${faculty}_${department}_${academicYear}_${year}_${semester}_${subject}_${subjectTitle}_${subjectDescription}_${date}_S:${startTime}_E:${endTime}`;
        console.log(qrString);
        qrdata.append("qrcode", qrString);
        qrdata.append("endtime", endTime);
        setQRtext(qrString);
      } else if (selectedDuration == "15 Minutes") {
        const durationMinutes = parseInt("15"); // e.g., "5" from dropdown
        const end = new Date(now.getTime() + durationMinutes * 60000);
        const endTime = end.toTimeString().split(" ")[0]; // HH:MM:SS
        const qrString = `${lecID}_${faculty}_${department}_${academicYear}_${year}_${semester}_${subject}_${subjectTitle}_${subjectDescription}_${date}_S:${startTime}_E:${endTime}`;
        console.log(qrString);
        qrdata.append("qrcode", qrString);
        qrdata.append("endtime", endTime);
        setQRtext(qrString);
      } else if (selectedDuration == "30 Minutes") {
        const durationMinutes = parseInt("30"); // e.g., "5" from dropdown
        const end = new Date(now.getTime() + durationMinutes * 60000);
        const endTime = end.toTimeString().split(" ")[0]; // HH:MM:SS
        const qrString = `${lecID}_${faculty}_${department}_${academicYear}_${year}_${semester}_${subject}_${subjectTitle}_${subjectDescription}_${date}_S:${startTime}_E:${endTime}`;
        console.log(qrString);
        qrdata.append("qrcode", qrString);
        qrdata.append("endtime", endTime);
        setQRtext(qrString);
      }
      console.log(QRtext);
      let selectedValue;
      if (selectedDuration === "1 Minute") {
        selectedValue = 60000;
      } else if (selectedDuration === "5 Minutes") {
        selectedValue = 300000;
      } else if (selectedDuration === "15 Minutes") {
        selectedValue = 900000;
      } else if (selectedDuration === "30 Minutes") {
        selectedValue = 1800000;
      }

      setClockDuration(selectedValue);
      setDuration(selectedValue);
      startCountdown(selectedValue);
      setIsGenerating(true);
      setShowAttendanceTable(true);
      LecturerAttendaceAdd();
      onClose();
      console.log("QR Code Generated:", QRtext);
    } else {
      enqueueSnackbar("Fill All Options Before Generate", { variant: "error" });
    }
  };

  function selectsubjectdata(index) {
    setselectedindex(index);
    console.log("allattendace:", allattendace);
  }

return (
  <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#f0f5ff", fontFamily: "'Nunito', sans-serif" }}>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
    <style>{`
      * { box-sizing: border-box; }
      @keyframes spin    { to { transform: rotate(360deg); } }
      @keyframes fadeIn  { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
      @keyframes pulse   { 0%,100%{ opacity:1; } 50%{ opacity:.55; } }
      .qr-subj-row { transition: background .15s ease; cursor: pointer; }
      .qr-subj-row:hover { background: #eff6ff !important; }
      .back-btn {
        display: inline-flex; align-items: center; gap: 7px;
        padding: 8px 16px; border-radius: 10px; border: 1.5px solid #dbeafe;
        background: white; color: #1e40af; font-size: 13px; font-weight: 700;
        cursor: pointer; font-family: 'Nunito', sans-serif;
        transition: background .18s, box-shadow .18s;
      }
      .back-btn:hover { background: #eff6ff; box-shadow: 0 2px 10px rgba(37,99,235,.12); }
      .qr-card { background: white; border-radius: 18px; border: 1.5px solid #e2e8f0; box-shadow: 0 2px 16px rgba(30,64,175,.06); overflow: hidden; }
      .qr-section-title { font-size: 10px; font-weight: 800; color: #3b82f6; text-transform: uppercase; letter-spacing: .12em; margin-bottom: 3px; }
      @media (max-width: 768px) {
        .qr-main-grid { grid-template-columns: 1fr !important; }
        .qr-page-pad  { padding: 14px !important; }
        .qr-header-pad{ padding: 12px 16px !important; }
      }
    `}</style>

    <Header />

    <div className="qr-header-pad" style={{ background: "white", borderBottom: "1.5px solid #dbeafe", padding: "16px 28px", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", boxShadow: "0 2px 12px rgba(30,64,175,.05)" }}>
      <button className="back-btn" onClick={handlebackbutton}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 5l-7 7 7 7"/>
        </svg>
        Back
      </button>
      <div style={{ flex: 1 }}>
        <div className="qr-section-title">Lecturer Portal</div>
        <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a", margin: 0, letterSpacing: "-0.01em" }}>QR Code Generator</h2>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 7, background: "#eff6ff", border: "1.5px solid #dbeafe", borderRadius: 10, padding: "7px 14px" }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="5" height="5"/><rect x="16" y="3" width="5" height="5"/><rect x="3" y="16" width="5" height="5"/>
          <path d="M21 16h-3v3M21 21v.01M16 16v.01M13 13h3M13 3v3M13 8v3M8 13H3M13 13v3M13 16h3"/>
        </svg>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#1e40af" }}>Generate QR</span>
      </div>
    </div>

    <div className="qr-page-pad" style={{ flex: 1, padding: "24px 28px 40px" }}>
      <div className="qr-main-grid" style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 20 }}>

        <div className="qr-card">
          <div style={{ padding: "16px 18px", borderBottom: "1.5px solid #f1f5f9" }}>
            <div className="qr-section-title">Step 1</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#0f172a" }}>Select Subject</div>
          </div>

          <div style={{ overflowY: "auto", maxHeight: 420 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "#f8faff" }}>
                  {["Subject", "Sem Type"].map(h => (
                    <th key={h} style={{ padding: "10px 14px", textAlign: "left", color: "#94a3b8", fontWeight: 700, borderBottom: "1.5px solid #e2e8f0", fontSize: 11, textTransform: "uppercase", letterSpacing: ".07em", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>

              {loadingimg2 ? (
                <tbody><tr><td colSpan="2" style={{ padding: "2rem", textAlign: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                    <div style={{ width: 14, height: 14, borderRadius: "50%", border: "2.5px solid #dbeafe", borderTopColor: "#2563eb", animation: "spin .7s linear infinite" }} />
                    <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600 }}>Loading…</span>
                  </div>
                </td></tr></tbody>

              ) : allsubjects && allsubjects === "No subjects available" ? (
                <tbody><tr><td colSpan="2" style={{ padding: "2rem", textAlign: "center" }}>
                  <div style={{ fontSize: 13, color: "#94a3b8", fontWeight: 600 }}>No subjects available</div>
                </td></tr></tbody>

              ) : (
                <tbody>
                  {allsubjects.map((subjectSet, index) =>
                    subjectSet.map((subjectDetails, subIndex) => (
                      <tr key={`${index}-${subIndex}`} className="qr-subj-row"
                        onClick={() => {
                          setselectedAcademicYear(subjectDetails[1]);
                          setselectedselectedSemester(subjectDetails[2]);
                          setselectedselectedYear(subjectDetails[0]);
                          setselectedselectedSubject(subjectDetails[3]);
                          setselectedsemversion(subjectDetails[4]);
                          selectsubjectdata(index, subjectDetails);
                        }}
                        style={{ background: selectedindex === index ? "linear-gradient(135deg,#1e40af,#2563eb)" : "white" }}
                      >
                        <td style={{ padding: "11px 14px", fontSize: 12, fontWeight: 600, color: selectedindex === index ? "white" : "#1e293b", borderBottom: "1px solid #f1f5f9", wordBreak: "break-word" }}>
                          {selectedindex === index && <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#93c5fd", marginRight: 6, verticalAlign: "middle" }} />}
                          {subjectDetails[3]}
                        </td>
                        <td style={{ padding: "11px 14px", fontSize: 11, fontWeight: 600, color: selectedindex === index ? "rgba(255,255,255,.8)" : "#64748b", borderBottom: "1px solid #f1f5f9", whiteSpace: "nowrap" }}>
                          {subjectDetails[4]}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              )}
            </table>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="qr-card" style={{ padding: "14px 20px", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "#eff6ff", border: "1.5px solid #dbeafe", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
              </svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 2 }}>Selected Subject</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: selectedSubject === "Select a Subject" ? "#94a3b8" : "#0f172a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {selectedSubject === "Select a Subject" ? "No subject selected" : selectedSubject}
              </div>
            </div>
          </div>

          <div className="qr-card" style={{ padding: "18px 20px" }}>
            <div style={{ marginBottom: 14 }}>
              <div className="qr-section-title">Step 2</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#0f172a" }}>Configure Session</div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <React.Fragment>
                <ButtonGroup variant="contained" ref={anchorRef} aria-label="Button group with a nested menu">
                  <Button>{selectedDuration}</Button>
                  <Button size="small"
                    aria-controls={open ? "split-button-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleToggle}
                  >
                    <ArrowDropDownIcon />
                  </Button>
                </ButtonGroup>
                <Popper sx={{ zIndex: 1 }} open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                  {({ TransitionProps, placement }) => (
                    <Grow {...TransitionProps} style={{ transformOrigin: placement === "bottom" ? "center top" : "center bottom" }}>
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList id="split-button-menu" autoFocusItem>
                            {durationOptions.map((option, index) => (
                              <MenuItem key={option} onClick={(event) => handleSelectDuration(event, index)}>{option}</MenuItem>
                            ))}
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </React.Fragment>

              {isOpenDuration && (
                <div style={{ position: "absolute", zIndex: 10, background: "white", border: "1.5px solid #dbeafe", borderRadius: 10, boxShadow: "0 4px 16px rgba(30,64,175,.12)", minWidth: 140, marginTop: 4 }}>
                  <ul style={{ listStyle: "none", margin: 0, padding: "4px 0" }}>
                    {durationOptions.map((option, index) => (
                      <li key={index} onClick={() => handleSelectDuration(option)}
                        style={{ padding: "9px 14px", cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#334155", transition: "background .15s" }}
                        onMouseEnter={e => e.currentTarget.style.background = "#eff6ff"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                      >{option}</li>
                    ))}
                  </ul>
                </div>
              )}

              {!isHiddenCreateQrButton && (
                <Button onClick={operationcheck} color="success" variant="contained">Next</Button>
              )}
              <Button color="error" onClick={resetall} variant="contained">Reset</Button>
            </div>
          </div>

          <div className="qr-card" style={{ padding: "24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <div style={{ marginBottom: 4, textAlign: "center" }}>
              <div className="qr-section-title" style={{ textAlign: "center" }}>Step 3</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#0f172a" }}>QR Code</div>
            </div>

            {QRtext ? (
              <div style={{ filter: isBlurred ? "blur(5px)" : "none", padding: 12, background: "white", borderRadius: 14, border: "1.5px solid #dbeafe", boxShadow: "0 4px 20px rgba(30,64,175,.1)" }}>
                <QRCode value={QRtext} size={180} />
              </div>
            ) : (
              <div style={{ width: 180, height: 180, borderRadius: 14, border: "2px dashed #bfdbfe", background: "#f8faff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#bfdbfe" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="5" height="5"/><rect x="16" y="3" width="5" height="5"/><rect x="3" y="16" width="5" height="5"/>
                  <path d="M21 16h-3v3M21 21v.01M16 16v.01M13 13h3M13 8v3M8 13H3M13 13v3M13 16h3"/>
                </svg>
                <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600 }}>No QR Generated</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

    {QRtext && (
      <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(15,23,42,.75)", backdropFilter: "blur(6px)", gap: 20, flexWrap: "wrap", padding: "20px" }}>

        <div style={{ background: "white", borderRadius: 22, padding: "32px 28px", display: "flex", flexDirection: "column", alignItems: "center", gap: 18, boxShadow: "0 24px 64px rgba(0,0,0,.3)", animation: "fadeIn .3s ease forwards", minWidth: 280 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: "#3b82f6", textTransform: "uppercase", letterSpacing: ".12em", marginBottom: 4 }}>Scan to Mark Attendance</div>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>Scan Me</h2>
          </div>

          <div style={{ filter: isBlurred ? "blur(5px)" : "none", padding: 14, background: "white", borderRadius: 16, border: "2px solid #dbeafe", boxShadow: "0 4px 20px rgba(30,64,175,.12)" }}>
            <QRCode value={QRtext} size={260} />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#eff6ff", border: "1.5px solid #dbeafe", borderRadius: 100, padding: "8px 20px" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", display: "inline-block", animation: "pulse 1.2s ease-in-out infinite" }} />
            <span style={{ fontSize: 14, fontWeight: 800, color: "#1e40af" }}>{remainingTime}s remaining</span>
          </div>

          <div style={{ display: "flex", gap: 10, width: "100%" }}>
            <button onClick={handleOpenPDF} style={{
              flex: 1, padding: "11px", borderRadius: 11, border: "none", cursor: "pointer",
              background: "linear-gradient(135deg,#15803d,#22c55e)", color: "white",
              fontSize: 13, fontWeight: 700, fontFamily: "'Nunito',sans-serif",
              boxShadow: "0 4px 14px rgba(34,197,94,.3)"
            }}>
              Get PDF
            </button>
            <button onClick={() => { resetall(); setIsGenerating(false); setShowAttendanceTable(true); setQRtext(""); }}
              style={{
                flex: 1, padding: "11px", borderRadius: 11, border: "none", cursor: "pointer",
                background: "linear-gradient(135deg,#1e40af,#2563eb)", color: "white",
                fontSize: 13, fontWeight: 700, fontFamily: "'Nunito',sans-serif",
                boxShadow: "0 4px 14px rgba(37,99,235,.3)"
              }}>
              Done
            </button>
          </div>
        </div>

        <div style={{ background: "white", borderRadius: 22, overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,.25)", animation: "fadeIn .35s ease forwards", width: 300, maxHeight: 440, display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "16px 18px", borderBottom: "1.5px solid #f1f5f9", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", display: "inline-block", animation: "pulse 1.2s ease-in-out infinite" }} />
            <div style={{ fontSize: 13, fontWeight: 800, color: "#0f172a" }}>Live Attendance</div>
            {Array.isArray(allattendace) && (
              <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 700, background: "#f0fdf4", color: "#15803d", border: "1px solid #bbf7d0", borderRadius: 100, padding: "2px 9px" }}>
                {allattendace.length} present
              </span>
            )}
          </div>

          <div style={{ overflowY: "auto", flex: 1 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "#f8faff" }}>
                  {["Reg. No.", "Student Name"].map(h => (
                    <th key={h} style={{ padding: "10px 14px", textAlign: "left", color: "#94a3b8", fontWeight: 700, borderBottom: "1.5px solid #e2e8f0", fontSize: 10, textTransform: "uppercase", letterSpacing: ".07em", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.isArray(allattendace) && allattendace.map((student, index) => (
                  <tr key={index} style={{ background: index % 2 === 0 ? "white" : "#f8faff", transition: "background .15s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#eff6ff"}
                    onMouseLeave={e => e.currentTarget.style.background = index % 2 === 0 ? "white" : "#f8faff"}
                  >
                    <td style={{ padding: "10px 14px", fontSize: 12, fontWeight: 700, color: "#1e40af", borderBottom: "1px solid #f1f5f9", wordBreak: "break-word" }}>{student[0]}</td>
                    <td style={{ padding: "10px 14px", fontSize: 12, fontWeight: 600, color: "#1e293b", borderBottom: "1px solid #f1f5f9", wordBreak: "break-word" }}>{student[1]}</td>
                  </tr>
                ))}
                {(!Array.isArray(allattendace) || allattendace.length === 0) && (
                  <tr><td colSpan="2" style={{ padding: "2rem", textAlign: "center", fontSize: 12, color: "#94a3b8", fontWeight: 600 }}>Waiting for students…</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )}

    {SubjectTitleDescriptionShowModal && (
      <SubjectTitleDescription onClose={() => setSubjectTitleDescriptionShowModal(false)} />
    )}

    <Footer />
  </div>
);
};

export default LecturerQrgen;
