import { useState,useEffect } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import LecOption from '../components/lecturerOpCard';
import { blue } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { jwtDecode } from "jwt-decode";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import SimpleProfileCard from '../components/profile_card';
import { FaBackspace} from "react-icons/fa";
import { useNavigate } from 'react-router-dom'


// const lecturer = () => {
  //       const [id, setid] = useState('');
  //       const [image,setimage] = useState('');
  //       const [title, settitle] = useState('');
  //       const [email, setemail] = useState('');
  //       const [name,setname] = useState('');
  //       const [gender,setgender] = useState('');
  //       const [contactno,setcontactno] = useState('');
  //       const [faculty,setfaculty] = useState('');
  //       const [department,setdepartment] = useState('');
  //       const [lecid,setlecid] = useState('');

       
  //       const LogInButton = styled(Button)(({ theme }) => ({
  //        color: theme.palette.getContrastText(blue[500]),
  //        backgroundColor: blue[500],
  //        '&:hover': {
  //          backgroundColor: blue[700],
  //        },
  //      }));
       
  //   useEffect(() => {
  //       const Lecturertoken = localStorage.getItem('lecturertoken');
  //       const decoded = jwtDecode(Lecturertoken);
  //       setid(decoded.id)
  //       settitle(decoded.title);
  //       setname(decoded.name);    
  //       setemail(decoded.email);    
  //       setcontactno(decoded.contactno);
  //       setfaculty(decoded.faculty);  
  //       setdepartment(decoded.department); 
  //       setlecid(decoded.lecid);
  //       setgender(decoded.gender);
  //       setimage(decoded.image)
  //       console.log("runnn!")     
  //   }, [name]);

  // const handlebackbutton = () => { 
  //   navigate('/admin')
  // };
          

//     return(
//       <div className="flex flex-col min-h-screen">
//   <Header />

//   <div className="flex flex-col flex-grow bg-gray-200">
//     {/* Main grid with 3 columns */}
//     <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-3">
//       {/* LEFT COLUMN - Profile + Calendar */}
//       <div className="flex flex-col w-full h-full gap-4">
//         {/* <button onClick={handlebackbutton} className="absolute top-0 right-0 items-center justify-center px-4 py-2 m-4 text-white bg-gray-600 cursor-pointer rounded-xl hover:bg-gray-500 focus:outline-none"> */}
//                             {/* <div className="grid items-center justify-center grid-cols-2"> 
//                               <div>
//                               <FaBackspace size={15} />
//                               </div>
//                               <div className='text-sm'>
//                                   Back
//                               </div>
//                             </div> */}
//          {/* </button> */}
//         {/* Profile Card */}
//         {/* <div className="flex flex-col items-center p-3 text-center bg-blue-100 rounded-lg shadow-md">
//           <img 
//             src="https://res.cloudinary.com/dgtshju6u/image/upload/v1744319196/lectures/profileimages/gmqqxrfgvv9lnghmy6gd.jpg" 
//             alt="lecturer profile" 
//             className="object-cover w-24 h-24 mb-3 border rounded-full"
//           />
//           <h2 className="text-sm font-semibold">{title}{name}</h2>
//           <p className="text-xs"><strong>Email:</strong> {email}</p>
//           <p className="text-xs"><strong>Lec ID:</strong> {lecid}</p>
//           <p className="text-xs"><strong>Department:</strong> {department}</p>
//           <p className="text-xs"><strong>Faculty:</strong> {faculty}</p>
//           <p className="text-xs"><strong>Gender:</strong> {gender}</p>
//           <p className="mb-3 text-xs"><strong>Contact No:</strong> 0710182874</p>
//           <LogInButton
//             loadingPosition="end"
//             className="w-20 shadow-xl py-2.5 px-4 text-xs font-semibold rounded text-white bg-red-600 hover:bg-blue-700"
//             variant="contained"
//           >
//             Edit
//           </LogInButton>
//         </div> */}
        
//          <SimpleProfileCard
//           department={department}
//           title={title}
//           name={name}
//           contactno={contactno}
//           faculty={faculty}
//           lecId={lecid}
//           gender={gender}
//           email={email}
//           profilePic={image}
//       />

//         {/* Calendar Card */}
//         {/* <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md"> */}
//           <div className='flex flex-col items-center w-full max-w-xs mx-auto overflow-hidden bg-white shadow-lg rounded-2xl'>
//           <h3 className="mt-2 mb-4 text-lg font-semibold">Time Table </h3>
//           <div className="p-2 text-sm text-gray-600">
//             <Box
//               sx={{
//                 width: { xs: '100%', sm: 260, md: 300 },
//                 transform: {
//                   xs: "scale(1.0)",
//                   sm: "scale(0.9)",
//                   md: "scale(0.9)",
//                 },
//                 height: { xs: 250 },
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <LocalizationProvider dateAdapter={AdapterDayjs}>
//                 <DateCalendar />
//               </LocalizationProvider>
//             </Box>
//           </div>
//         </div>
//       </div>

//       {/* RIGHT SIDE: Spanning 2 columns */}
//       <div className="flex flex-col gap-4 md:col-span-2">
//         {/* First Row: Description or Title */}
//         <div className="p-4 text-lg font-medium text-center bg-white rounded shadow">
//           Manage Attendance Options
//         </div>

//         {/* Second Row: LecOption Cards (wrapped flex row) */}
//         <div className="flex flex-wrap justify-center gap-4">
//           <LecOption
//             id={id}
//             imageselection={1}
//             Descrption={"This Option for Generating QR Code for collect attendace in specific time period."}
//             title={"QR Code Generator"}
//           />
//           <LecOption
//           id={id}
//             imageselection={0}
//             Descrption={"Statistically knowledge about attendace data"}
//             title={"Attendace History"}
//           />
          
//           {/* Add more LecOption cards here, they will auto-wrap */}
//         </div>
//       </div>
//     </div>
//   </div>

//   <Footer />
// </div>

//     );
// };

// export default lecturer;

import React from 'react';



const AttendanceDashboard = () => {
        const [id, setid] = useState('');
        const [image,setimage] = useState('');
        const [title, settitle] = useState('');
        const [email, setemail] = useState('');
        const [name,setname] = useState('');
        const [gender,setgender] = useState('');
        const [contactno,setcontactno] = useState('');
        const [faculty,setfaculty] = useState('');
        const [department,setdepartment] = useState('');
        const [lecid,setlecid] = useState('');
        const navigate = useNavigate();
        
        const navigateLecgenerateQR = () => { 
          navigate(`/lecturer/lecturer_qrgen/${id}`);
        };

        const attendace_history = () => { 
           navigate(`/lecturer/attendace_history/${id}`)
        };

        const attendance_analysis = () => {
          navigate(`/lecturer/attendace_analysis`);
        }
       
        const LogInButton = styled(Button)(({ theme }) => ({
         color: theme.palette.getContrastText(blue[500]),
         backgroundColor: blue[500],
         '&:hover': {
           backgroundColor: blue[700],
         },
       }));
       
    useEffect(() => {
        const Lecturertoken = localStorage.getItem('lecturertoken');
        const decoded = jwtDecode(Lecturertoken);
        setid(decoded.id)
        settitle(decoded.title);
        setname(decoded.name);    
        setemail(decoded.email);    
        setcontactno(decoded.contactno);
        setfaculty(decoded.faculty);  
        setdepartment(decoded.department); 
        setlecid(decoded.lecid);
        setgender(decoded.gender);
        setimage(decoded.image)
        console.log("runnn!")     
    }, [name]);

  const handlebackbutton = () => { 
    navigate('/admin')
  };
          

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
        <div className='p-3'>
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
              {title}{name}
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
>     <svg xmlns="http://www.w3.org/2000/svg" 
     class="w-20 h-20 text-indigo-600" 
     fill="none" viewBox="0 0 24 24" 
     stroke="currentColor" stroke-width="1.8">
  <path stroke-linecap="round" stroke-linejoin="round" 
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 
           6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 
           8.388 6 11v3.159c0 .538-.214 1.055-.595 
           1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
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
