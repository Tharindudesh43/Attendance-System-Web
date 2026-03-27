import { useState, useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { blue } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AttendanceDashboard = () => {
  const [id, setid] = useState("");
  const [image, setimage] = useState("");
  const [title, settitle] = useState("");
  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [gender, setgender] = useState("");
  const [contactno, setcontactno] = useState("");
  const [faculty, setfaculty] = useState("");
  const [department, setdepartment] = useState("");
  const [lecid, setlecid] = useState("");
  const navigate = useNavigate();

  const navigateLecgenerateQR = () => {
    navigate(`/lecturer/lecturer_qrgen/${id}`);
  };

  const attendace_history = () => {
    navigate(`/lecturer/attendace_history/${id}`);
  };

  const attendance_analysis = () => {
    navigate(`/lecturer/attendace_analysis/${id}`);
  };

  const send_notification = () => {
    navigate(`/lecturer/send_notification/${id}`);
  };

  const LogInButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
    "&:hover": {
      backgroundColor: blue[700],
    },
  }));

  useEffect(() => {
    const Lecturertoken = localStorage.getItem("lecturertoken");
    const decoded = jwtDecode(Lecturertoken);
    setid(decoded.id);
    settitle(decoded.title);
    setname(decoded.name);
    setemail(decoded.email);
    setcontactno(decoded.contactno);
    setfaculty(decoded.faculty);
    setdepartment(decoded.department);
    setlecid(decoded.lecid);
    setgender(decoded.gender);
    setimage(decoded.image);
    console.log("runnn!");
  }, [name]);

  return (
    <div className="flex flex-col min-h-screen font-[Poppins]">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-1 p-3 bg-gray-100">
        <div className="grid w-full grid-cols-1 gap-10 p-4 bg-white shadow-2xl max-w- rounded-3xl md:grid-cols-3">
          {/* Profile Section */}
          <section
            className="relative flex flex-col items-center p-8 overflow-hidden text-white shadow-lg bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-2xl"
            aria-label="User Profile"
          >
            <div className="relative w-32 h-32 mb-6 overflow-hidden border-4 border-white rounded-full shadow-lg">
              {/* Profile Image */}
              <img
                src={image}
                alt="Student Profile"
                className="object-cover w-full h-full"
              />

              {/* Edit Button */}
              <div className="p-3">
                <button
                  aria-label="Edit profile"
                  title="Edit Profile"
                  className="absolute p-2 text-indigo-700 transition duration-200 bg-white rounded-full shadow-md bottom-2 right-2 hover:bg-opacity-100 bg-opacity-80"
                >
                  <i className="fas fa-pencil-alt" />
                </button>
              </div>
            </div>

            <h2 className="flex items-center gap-3 text-2xl font-bold">
              {title}
              {name}
              <i className="text-yellow-300 fas fa-mars" />
            </h2>
            <p className="max-w-xs mt-3 text-sm leading-relaxed text-center">
              {faculty}| {department}
            </p>
            <div className="flex flex-col w-full max-w-xs gap-3 mt-6">
              <a
                href="mailto:xxxx@gmail.com"
                className="block px-4 py-2 text-sm font-semibold text-center text-white transition bg-white rounded-full md:py-3 md:text-sm bg-opacity-20 hover:bg-opacity-30"
              >
                {email}
              </a>

              <span className="block py-2 font-semibold text-center text-white bg-white rounded-full bg-opacity-20">
                {contactno}
              </span>
            </div>
          </section>

          {/* Attendance Options */}
          <section
            className="flex flex-col col-span-1 gap-10 p-10 bg-gray-100 shadow-lg md:col-span-2 rounded-2xl"
            aria-label="Manage Attendance Options"
          >
            <h3 className="items-center justify-center mb-6 text-3xl font-extrabold text-center text-indigo-700 md:text-left">
              Manage Options
            </h3>

            <div className="flex flex-wrap justify-center gap-10 md:justify-start">
              {/* QR Code Generator */}
              <button
                className="flex flex-col items-center justify-center w-48 p-4 transition-transform bg-white shadow-xl cursor-pointer h-52 rounded-3xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300"
                aria-label="QR Code Generator"
                title="QR Code Generator"
                onClick={navigateLecgenerateQR}
              >
                <img
                  src="https://storage.googleapis.com/a1aa/image/41e7744e-1431-497e-f980-0ee0d17e1a58.jpg"
                  alt="QR Code"
                  className="w-24 h-24 mb-3 rounded-full"
                />
                <span className="text-lg font-semibold text-center text-indigo-700">
                  QR Code Generator
                </span>
              </button>

              {/* Attendance History */}
              <button
                className="flex flex-col items-center justify-center w-48 p-4 transition-transform bg-white shadow-xl cursor-pointer h-52 rounded-3xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300"
                aria-label="Attendance History"
                title="Attendance History"
                onClick={attendace_history}
              >
                <img
                  src="https://storage.googleapis.com/a1aa/image/aeb83de5-28d4-4771-b6c9-b945fe92ea64.jpg"
                  alt="Attendance History"
                  className="w-20 rounded-full rounh-20"
                />
                <span className="text-lg font-semibold text-center text-indigo-700">
                  Attendance History
                </span>
              </button>

              {/* Attendance Analysis*/}
              <button
                className="flex flex-col items-center justify-center w-48 p-4 transition-transform bg-white shadow-xl cursor-pointer h-52 rounded-3xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300"
                aria-label="Attendance Analysis"
                title="Attendance Analysis"
                onClick={attendance_analysis}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4149/4149640.png"
                  alt="Attendance Analysis"
                  className="w-20 h-20 rounded-full"
                />
                <span className="text-lg font-semibold text-center text-indigo-700">
                  Attendance Analysis
                </span>
              </button>

              <button
                className="flex flex-col items-center justify-center w-48 p-4 transition-transform bg-white shadow-xl cursor-pointer h-52 rounded-3xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300"
                aria-label="Time Table"
                title="Time Table"
                onClick={send_notification}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-20 h-20 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 
           6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 
           8.388 6 11v3.159c0 .538-.214 1.055-.595 
           1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>

                <span className="text-lg font-semibold text-center text-indigo-700">
                  Send Messages
                </span>
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AttendanceDashboard;
