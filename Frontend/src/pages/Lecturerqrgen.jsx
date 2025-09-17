import React, { cache, useEffect,useState,useRef  } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { useContextData } from "../ReloadContext.jsx"
import { useNavigate,useParams } from 'react-router-dom'
import axios from 'axios';
import loadingimage from '../assets/load_img1.svg'; 
import Countdown from "react-countdown";
import QRCode from "react-qr-code";
import { jwtDecode } from "jwt-decode";
import { SnackbarProvider, useSnackbar,enqueueSnackbar } from 'notistack';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import { FaBackspace} from "react-icons/fa";
import MenuList from '@mui/material/MenuList';
import {AiOutlineClose} from 'react-icons/ai';
import LecturerAttendace from '../pages/lecAttendance.jsx';



const lecturer_qrgen = () => {
  //------------------
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [showAttendanceTable, setShowAttendanceTable] = useState(false);
  const navigate = useNavigate();
  const [SubjectTitleDescriptionShowModal, setSubjectTitleDescriptionShowModal] = useState(false);
  // const handleClick = () => {
  //   console.info(`You clicked ${options[selectedIndex]}`);
  // };

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
  //------------------

     const [enableEffect, setEnableEffect] = useState(false);
     const [allsubjects, setallsubjects] = useState([]); 
     const [allattendace, setallattendace] = useState([]);
     const [isGenerating, setIsGenerating] = useState(false);
     const [reloadattendance, setReloadAttendance] = useState(0);
    // const [isBlurred, setIsBlurred] = useState(false);

 
     //const [reloadattendance, setreloadattendance] = useState(false);
     const [loadingimg2,setloadingimg2] = useState(false);
     const { id } = useParams();
     const {reload, setReload} = useContextData(); 
     const [selectedindex,setselectedindex] = useState('');
     const [QRtext, setQRtext] = useState("");
     const [isBlurred, setIsBlurred] = useState(false);
     const [ClockDuration, setClockDuration] = useState(0);
     const [remainingTime, setRemainingTime] = useState(0);
     const [duration, setDuration] = useState(60000); // default 1 min
     const timerRef = useRef(null); 

     const qrdata = new FormData();
     const [lecID,setlecID] = useState(0);
     const titleRef = useRef(null);
     const descRef = useRef(null);
     const [selectedYear, setselectedselectedYear] = useState("Select a Year");
     const [selectedsemversion, setselectedsemversion] = useState("Select a Sem Version");
     const [selectedfaculty,setselectedfaculty] = useState("Select a Faculty");
     const [selectedDepartment, setselectedDepartment] = useState("Select a Department");
     const [selectedAcademicYear, setselectedAcademicYear] = useState("Select a Academic Year");
     const [selectedSubject, setselectedselectedSubject] = useState("Select a Subject");
     const [selectedSemester, setselectedselectedSemester] = useState("Select a Semester");
     const [selectedDuration, setselectedselectedDuartion] = useState("Set a Duration");
     const [startTimes,setstartTimes]=useState("");
     const [endTime,setendTime]=useState("");
     const [date,setdate]=useState("");
     const durationOptions  = ['1 Minute' , '5 Minutes' , '15 Minutes' , '30 Minutes' ];

     const [isHiddenCreateQrButton, setIsHiddenCreateQrButton] = useState(false);

    const [isOpenDuration, setisOpenDuration] = useState(false);

    const toggleDropdownDuration = () => setisOpenDuration(!isOpenDuration);

    // const Testnotification = async ()=>{
    //     try{
    //        const response_dup = await axios.post('http://localhost:1337/lecturer/create_lecture_notification', {
    //                   headers: { "Content-Type": "multipart/form-data" },
    //         });
    //     }catch(e){
    //       console.log(e);
    //     }
    // }

    const handleSelectDuration = (event,index) => {
      setselectedselectedDuartion(durationOptions[index]);
      setisOpenDuration(false);
      setOpen(false);
    };

  const handlebackbutton = () => { 
    navigate('/lecturer')
  };
    const renderer = ({ hours, minutes, seconds, completed }) => {
      if (completed) {
          setIsBlurred(true);
          // setIsHiddenCreateQrButton(false);
          //setQRtext("");
        return <span className='text-b'>Time's up! ⏳</span>;
      } else {
        return (
          <div className="text-2xl font-bold">
            {minutes}:{seconds}
          </div>
        );
      }
    };
  const resetall = () => {
    setselectedindex('');
    //setIsBlurred(false);
    setIsHiddenCreateQrButton(false);
    setselectedselectedYear("Select a Year");
    setselectedAcademicYear("Select a Academic Year");
    setselectedselectedSubject("Select a Subject");
    setselectedselectedSemester("Select a Semester");
    setselectedselectedDuartion("Set a Duration");
    //setEnableEffect(!enableEffect);
    //fetchAttendace();
    //addtestdata();
    //setselectedfaculty("Select a Faculty")
    setQRtext('');
  }

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
    // console.log(allattendace);
    // if(allattendace.length === 0 ){
    //   enqueueSnackbar('No Attendance Marked yet',{variant: 'error'});    
    // }else{
      localStorage.setItem("attendanceData", JSON.stringify(allattendace));
      localStorage.setItem("subject_attendance", JSON.stringify(selectedSubject));
      localStorage.setItem("department_attendance", JSON.stringify(selectedDepartment));
      localStorage.setItem("faculty_attendance", JSON.stringify(selectedfaculty));
      localStorage.setItem("university_attendance", JSON.stringify("SOUTH EASTERN UNIVERSITY OF SRI LANKA"));
      localStorage.setItem("academic_attendance", JSON.stringify(selectedAcademicYear));
      localStorage.setItem("semester_attendance", JSON.stringify(selectedSemester));
      //selectedSubject
      window.open("/lecturer/lecturer_attendence", "_blank");
    // }
};

  
      // const addtestdata = async () =>{
      //   const testdata = new FormData();
      //   testdata.append("regno","SEU/IS/20/ICT/057");
      //   testdata.append("initialname","W.D.T.D Himahansa");
      //   testdata.append("lecID","6824587b8ce0c907ac5293c6");
      //   const response_dup = await axios.post('http://localhost:1337/lecturer/testadd',testdata, {
      //       headers: { "Content-Type": "multipart/form-data" },
      //   });
      // }

  useEffect(() => {
  if (!isGenerating) return;
      const fetchAttendace = async () => {
        console.log("Fetching attendance...");
        try {
          const response = await axios.get(`http://localhost:1337/lecturer/getattendance/${id}`, {
            params: {
              qrcode: QRtext,
              ac_year: selectedAcademicYear
              // qrcode: '6824587b8ce0c907ac5293c6_FacultyofTechnology_InformationandCommunicationTechnology_2ndYear_2015/2016_1stSemester_NST|21012|-|Network|Switching|and|Routing_2025-05-14_S:01:38:19_E:01:39:19',
              // ac_year: '2nd Year'
            },
        });

        if (response.data.status === 'ok') {
          console.log("Attendance data received:", response.data.specificattendancedata);
          setallattendace(response.data.specificattendancedata);
        } else {
          console.warn("No attendance data found");
        }
        }catch (error) {
          console.error("Error fetching attendance:", error);
        }
      };
  const interval = setInterval(() => {
    fetchAttendace(); // fetch every few seconds (e.g. every 3s)
  }, 3000); // adjust this value as needed

  return () => clearInterval(interval); // cleanup when stopped or component unmounts
}, [isGenerating]);

  
    useEffect(() => {
        const fetchSubjects = async () => {
          const Lecturertoken = localStorage.getItem('lecturertoken');
          const decoded = jwtDecode(Lecturertoken);
          setlecID(decoded.id);      
          setloadingimg2(true);
         try {
          const response = await axios.get(`http://localhost:1337/lecturer/lecturer_qrgen/${id}`);
          if(response.data.status==='ok'){
            setallsubjects(response.data.subjects);
            setselectedfaculty(response.data.faculty);
            setselectedDepartment(response.data.department);
            setlecID(response.data.idlec);
            console.log(allsubjects);
            console.log(selectedDepartment);
            setloadingimg2(false);
          }else if(response.data.status==='No subjects available'){
            setloadingimg2(false);
            setallsubjects('No subjects available');
          }
          } catch (error) {
            console.log(error);
         }
       };

       //if(reloadattendance==true){
        //fetchAttendace()
      // }

       fetchSubjects();
      },[reload]); 

      const SubjectTitleDescription = ({onClose}) => {
          return (
              <div className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-black/60"
              onClick={onClose}
              >
                
                  <div 
                  onClick={(event)=>event.stopPropagation()}
                  className=' w-[600px] max-w-full h-fit bg-white rounded-xl p-4 flex-col relative'
                  >
                      <AiOutlineClose className='absolute p-1 text-3xl cursor-pointer rounded-xl right-6 hover: bg-slate-400 top-6 text-yellow-50'
                      onClick={onClose}
                      />
                      <h2 className="mt-4 text-lg font-semibold">Add Lecture Title and Description</h2>
         <form className='flex flex-col gap-4 mt-4' noValidate onSubmit={(event) => {
           event.preventDefault();
           QrCodeGenerate(event,onClose);
         }}>
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

      const operationcheck = () =>{
        if (
            [selectedDepartment, selectedAcademicYear, selectedYear ,selectedSemester, selectedSubject,selectedDuration,selectedfaculty].every(
                (item) =>
                    item !== "Select a Department" &&
                    item !== "Select a Academic Year" &&
                    item !== "Select a Year" &&
                    item !== "Select a Semester" &&
                    item !== "Select a Subject" &&
                    item !== "Set a Duration" &&
                    item !== "Select a Faculty"
            )
        ) {
          setSubjectTitleDescriptionShowModal(true)
        }else{
          enqueueSnackbar('Select All Options Before Generate',{variant: 'error'});
        }

      }



      const sendNotification = async () => {
        try {
          const notifyData = {
            semester: selectedSemester.toString(),
            year: selectedAcademicYear.toString(),
            subject: selectedSubject.toString(),
          };

          console.log("Notification Data:", notifyData);

        const response = await axios.post(
            "http://localhost:1337/lecturer/create_lecture_notification",
            notifyData, // send JSON directly
          {
            headers: { "Content-Type": "application/json" } // <- important
          }
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
            "http://localhost:1337/lecturer/attendance_count_add",
            countData, // send JSON directly
          {
            headers: { "Content-Type": "application/json" } // <- important
          }
        );

        console.log("Attendance Count Response:", response.data);
      } catch (error) {
        console.error("Error sending Attendance Count:", error);
      }
    };



      const LecturerAttendaceAdd = async () =>{
        // qrdata.append("qrcode",QRtext)
        qrdata.append("lecID",lecID);
        qrdata.append("ac_year",selectedAcademicYear);
        qrdata.append("year",selectedYear);
        qrdata.append("semester",selectedSemester);
        qrdata.append("subject",selectedSubject);
        qrdata.append("sem_version",selectedsemversion);
        qrdata.append("subjectitle",titleRef.current.value);
        qrdata.append("subjectdescription",descRef.current.value);
        try{
           const response_dup = await axios.post('http://localhost:1337/lecturer/addattendance', qrdata, {
                      headers: { "Content-Type": "multipart/form-data" },
            }).then((response)=>{
              if(response.data.status==='ok'){
                console.log("Attendance Added Successfully");
                sendNotification();
                sendattendancecount();
              }else{
                console.log("Error in Adding Attendance");
                return "Error in Adding Attendance";
              }
            });
        }catch(e){
          console.log(e);
          return "Error in Adding Attendance";
        }
      }



      const QrCodeGenerate = async (event,onClose) => {      
        event.preventDefault();
        if (
            [selectedDepartment, selectedAcademicYear, selectedYear ,selectedSemester, selectedSubject,selectedDuration,selectedfaculty].every(
                (item) =>
                    item !== "Select a Department" &&
                    item !== "Select a Academic Year" &&
                    item !== "Select a Year" &&
                    item !== "Select a Semester" &&
                    item !== "Select a Subject" &&
                    item !== "Set a Duration" &&
                    item !== "Select a Faculty" &&
                    titleRef.current.value.length > 5 &&
                    descRef.current.value.length > 5
            )
        ) {
            setIsHiddenCreateQrButton(true);

  const department = selectedDepartment.replace(/\s+/g, '');
  const faculty = selectedfaculty.replace(/\s+/g, '');
  const academicYear = selectedAcademicYear.replace(/\s+/g, '');
  const year = selectedYear.replace(/\s+/g, '');
  const semester = selectedSemester.replace(/\s+/g, '');
  const subject = selectedSubject.replace(/\s+/g, '|');
  const subjectTitle = titleRef.current.value;
  const subjectDescription = descRef.current.value;
  const today = new Date();
const date = today.getFullYear() + "-" +
             String(today.getMonth() + 1).padStart(2, '0') + "-" +
             String(today.getDate()).padStart(2, '0');
  //const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  qrdata.append("date",date);


  // Get current time as start time
  const now = new Date();
  const startTime = now.toTimeString().split(' ')[0]; // HH:MM:SS
  qrdata.append("starttime",startTime);


  // Add duration to current time
  if(selectedDuration=="1 Minute"){
     const durationMinutes = parseInt("1"); // e.g., "5" from dropdown
     const end = new Date(now.getTime() + durationMinutes * 60000);
     const endTime = end.toTimeString().split(' ')[0]; // HH:MM:SS
     const qrString = `${lecID}_${faculty}_${department}_${academicYear}_${year}_${semester}_${subject}_${subjectTitle}_${subjectDescription}_${date}_S:${startTime}_E:${endTime}`;
     console.log(qrString);
     qrdata.append("qrcode",qrString);
     qrdata.append("endtime",endTime);
     setQRtext(qrString);
  }else if(selectedDuration=="5 Minutes"){
     const durationMinutes = parseInt("5"); // e.g., "5" from dropdown
     const end = new Date(now.getTime() + durationMinutes * 60000);
     const endTime = end.toTimeString().split(' ')[0]; // HH:MM:SS
     const qrString = `${lecID}_${faculty}_${department}_${academicYear}_${year}_${semester}_${subject}_${subjectTitle}_${subjectDescription}_${date}_S:${startTime}_E:${endTime}`;
     console.log(qrString);
     qrdata.append("qrcode",qrString);
     qrdata.append("endtime",endTime);
     setQRtext(qrString);
  }else if(selectedDuration=="15 Minutes"){
     const durationMinutes = parseInt("15"); // e.g., "5" from dropdown
     const end = new Date(now.getTime() + durationMinutes * 60000);
     const endTime = end.toTimeString().split(' ')[0]; // HH:MM:SS
     const qrString = `${lecID}_${faculty}_${department}_${academicYear}_${year}_${semester}_${subject}_${subjectTitle}_${subjectDescription}_${date}_S:${startTime}_E:${endTime}`;
     console.log(qrString);
     qrdata.append("qrcode",qrString);
     qrdata.append("endtime",endTime);
     setQRtext(qrString);
  }else if(selectedDuration=="30 Minutes"){
     const durationMinutes = parseInt("30"); // e.g., "5" from dropdown
     const end = new Date(now.getTime() + durationMinutes * 60000);
     const endTime = end.toTimeString().split(' ')[0]; // HH:MM:SS
     const qrString = `${lecID}_${faculty}_${department}_${academicYear}_${year}_${semester}_${subject}_${subjectTitle}_${subjectDescription}_${date}_S:${startTime}_E:${endTime}`;
     console.log(qrString);
     qrdata.append("qrcode",qrString);
     qrdata.append("endtime",endTime);
     setQRtext(qrString);
  }
  console.log(QRtext);
            let selectedValue;
if(selectedDuration === '1 Minute'){
  selectedValue = 60000;
} else if(selectedDuration === '5 Minutes'){
  selectedValue = 300000;
} else if(selectedDuration === '15 Minutes'){
  selectedValue = 900000;
} else if(selectedDuration === '30 Minutes'){
  selectedValue = 1800000;
}


            setClockDuration(selectedValue);
            setDuration(selectedValue);
            startCountdown(selectedValue);
            setIsGenerating(true);
            setShowAttendanceTable(true);
            LecturerAttendaceAdd();
            onClose();
        }else{
            enqueueSnackbar('Fill All Options Before Generate',{variant: 'error'});
        }
    }


      function selectsubjectdata (index,selectedsubject) {
        // event.preventDefault();
        // QrCodeGenerate();
        setselectedindex(index);
        console.log("allattendace:", allattendace);
      }

    
    return (
      <div className="flex flex-col min-h-screen ">
      <Header />
         {/* <div className="relative w-full h-auto p-4">
                    <button onClick={handlebackbutton} className="absolute top-0 right-0 items-center justify-center px-4 py-2 m-4 text-white bg-gray-600 cursor-pointer rounded-xl hover:bg-gray-500 focus:outline-none">
                    <div className="grid items-center justify-center grid-cols-2"> 
                      <div>
                      <FaBackspace size={15} />
                      </div>
                      <div className='text-sm'>
                          Back
                      </div>
                    </div>
                    </button>
                </div> */}
    
      <div className="flex flex-col items-center justify-center flex-grow bg-gray-200">
        {/* Main grid with 3 columns */}
                  <div className="relative w-full h-auto p-4">
                    <button onClick={handlebackbutton} className="absolute top-0 left-0 flex items-center justify-center px-4 py-2 m-4 text-black bg-transparent border-2 border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none">
                        <div className="grid items-center justify-center grid-cols-2"> 
                            <div>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  viewBox="0 0 16 16"
                                  style={{ marginRight: '8px' }}
                                >
                              <path
                                fillRule="evenodd"
                                  d="M15 8a.5.5 0 0 1-.5.5H2.707l4.147 4.146a.5.5 0 0 1-.708.708l-5-5a.5.5 0 0 1 0-.708l5-5a.5.5 0 1 1 .708.708L2.707 7.5H14.5a.5.5 0 0 1 .5.5z"
                              />
                                </svg>
                            </div>
                            <div className='text-sm'>
                                     Back
                            </div>
                        </div>
                    </button>
                </div>

        <div className="grid grid-cols-1 p-6 md:grid-cols-3 gap-7">



          {/* LEFT COLUMN - Profile + Calendar */}
          <div className="flex flex-col items-center justify-center w-full h-full">
  {/* Subject Part */}
  <div className="flex flex-col w-full max-w-xs p-2 mx-0 overflow-hidden bg-white shadow-lg sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl md:ml-4 rounded-2xl">
    
    <h3 className="px-4 mt-2 mb-4 text-lg font-semibold text-center">Subjects</h3>
    
    <div className="h-50 sm:h-60 md:h-80 lg:h-[330px] xl:h-[330px] overflow-auto px-4">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100 whitespace-nowrap">
          <tr>
            <th className="p-2 text-center text-[13px] font-semibold text-slate-900">
              Subject
            </th>
             <th className="p-2 text-[13px] font-semibold text-slate-900">
              Semester Type
            </th>
            {/* <th className="p-2 text-[13px] font-semibold text-slate-900">
              Actions
            </th> */}

          </tr>
        </thead>

        {loadingimg2 ? (
          <tbody>
            <tr>
              <td colSpan="2" className="p-4 text-center">
                <div className="flex items-center justify-center w-full h-30">
                  <img src={loadingimage} alt="Loading..." className="w-20 h-20" />
                </div>
              </td>
            </tr>
          </tbody>
        ) : allsubjects && allsubjects === 'No subjects available' ? (
          <tbody className="whitespace-nowrap">
            <tr className="hover:bg-gray-50">
              <td colSpan="2" className="p-4 text-[15px] text-slate-900 font-medium text-center">
                No Data Added Yet.
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody
          className="whitespace-nowrap">
            {allsubjects.map((subjectSet, index) =>
              subjectSet.map((subjectDetails, subIndex) => (

                <tr key={`${index}-${subIndex}`} 
                onClick={
                  (event)=>{ 
                    setselectedAcademicYear(subjectDetails[1]);
                    setselectedselectedSemester(subjectDetails[2]);
                    setselectedselectedYear(subjectDetails[0]);
                    setselectedselectedSubject(subjectDetails[3]);
                    console.log(subjectDetails[4])
                    setselectedsemversion(subjectDetails[4]);
                    selectsubjectdata(index,subjectDetails);
                  }
                }
                className={`text-left cursor-pointer ${selectedindex===index?'bg-black hover:bg-black':'bg:white hover:bg-blue-50'}`}>
                  <td className={`p-4 text-[13px]  ${selectedindex===index?'text-white':'text-slate-900'} font-medium whitespace-normal break-words max-w-[180px]`}>
                    {subjectDetails[3]}
                  </td><td className={`p-4 text-[13px]  ${selectedindex===index?'text-white':'text-slate-900'} font-medium whitespace-normal break-words max-w-[180px]`}>
                    {subjectDetails[4]}
                  </td>
                  {/* <td className="flex items-center justify-center p-4">
                    <div className="flex items-center justify-center">
                    <button title="Delete"  className="cursor-pointer"
                onClick={()=>{
                  <DeleteSubjectConfirmModal id={id} subjectIndex={index} subject={subjectDetails[3]}/>,
                  console.log(subjectDetails),  
                  console.log(index),         
                  setsubject(subjectDetails[3]);
                  setsubjectIndex(index);
                  setDeleteConfirmShowModal(true)
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-red-500 hover:fill-red-700" viewBox="0 0 24 24">
                    <path
                      d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                      data-original="#000000" />
                    <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                      data-original="#000000" />
                  </svg>
                </button>
                    </div>
                  </td> */}
                </tr>
              ))
            )}
          </tbody>
        )}
      </table>
    </div>
  </div>
</div>

    
          {/* RIGHT SIDE: Spanning 2 columns */}
  <div className="flex flex-col gap-6 md:col-span-2">
  {/* Row 1: Subject Display */}
  <div className="p-3 font-medium text-center bg-white rounded shadow sm:text-1xl lg:text-lg">
    {
      selectedSubject === 'Select a Subject'
        ? <div>No subject selected</div>
        : selectedSubject
    }
  </div>

  {/* Row 2: Controls and QR Code */}
  <div className="flex flex-col gap-1">
    {/* Controls: Duration, QR Generate, Reset */}
    <div className="flex flex-row items-center justify-center gap-3">
      {/* Duration select */}
      <div className="relative inline-block w-50">
      <React.Fragment>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="Button group with a nested menu"
      >
        <Button>{selectedDuration}</Button>
        <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{ zIndex: 1 }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {durationOptions.map((option, index) => (
                    <MenuItem
                      key={option}
                      onClick={(event) => handleSelectDuration(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
        {isOpenDuration && (
          <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
            <ul className="py-1">
              {durationOptions.map((option, index) => (
                <li key={index} onClick={() => handleSelectDuration(option)} className="px-4 py-2 cursor-pointer hover:bg-gray-100">
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* QR Generate Button */}
      {!isHiddenCreateQrButton && (
        // <button type="button" onClick={QrCodeGenerate}
        //   className="px-5 py-2.5 w-20-auto h-10 cursor-pointer rounded-full text-white text-sm tracking-wider font-medium border border-current outline-none bg-green-500 hover:bg-green-200 active:bg-blue-700">
        //   Create QR
        // </button>
        <Button  
        onClick={
          operationcheck
        }
        color='success' variant="contained">Next</Button>
      )}

      {/* Reset Button */}
      <div className="">
          {/* <button type="button" onClick={resetall}
              className="px-5 py-2.5 w-20-auto h-10 rounded-full cursor-pointer text-white text-sm tracking-wider font-medium border border-current outline-none bg-red-700 hover:bg-red-400 active:bg-blue-700">
            Reset all
          </button> */}
           <Button color='error' onClick={resetall}  variant="contained">Reset</Button>
        </div>
        {/* <div>
            <Button  
        onClick={
          ()=>{Testnotification()}
        }
        color='success' variant="contained">Test</Button>
        </div> */}
      </div>
    
  </div>

    {/* QR Code Display */}
<div className="flex items-center justify-center p-2 bg-white rounded-md">
  <div className="flex flex-col items-center p-4">
    <h2 className="mb-2 text-lg font-bold">QR Code</h2>
    <div className='qr-con'>
      {
      QRtext ? (
        <div style={{ filter: isBlurred ? "blur(5px)" : "none" }}>
          <QRCode value={QRtext} size={200} className="p-2 bg-white shadow-md" />
        </div>
      ) : (
        // Empty placeholder box when QRtext is not set
        <div
          className="flex items-center justify-center p-2 bg-gray-100 shadow-md"
          style={{
            width: 200,
            height: 200,
            borderRadius: '8px',
            border: '2px dashed #d1d5db', // Tailwind's gray-300
          }}
        >
          <span className="text-gray-400">No QR Generated</span>
        </div>
      )
      }
    </div>
    {QRtext && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="flex flex-col items-center p-8 bg-white shadow-lg rounded-2xl">
        <h2 className="mb-4 text-xl font-semibold">Scan Me</h2>
          <div style={{ filter: isBlurred ? "blur(5px)" : "none" }}>
          <QRCode value={QRtext} size={300} className="p-2 bg-white shadow-md" />
        </div>
            <p className="p-2 font-semibold text-center text-blue-600">{remainingTime}s remaining</p>
               <button
  onClick={handleOpenPDF}
  className="px-6 py-2 text-white bg-green-600 rounded-full hover:bg-green-700"
>
  Get PDF
</button>
      
        <button
          className="px-6 py-2 mt-6 text-white bg-blue-600 rounded-full cursor-pointer hover:bg-blue-700"
          onClick={() => {
            // fetchAttendace()
              resetall()
              setIsGenerating(false);
              setShowAttendanceTable(true);
              setQRtext("");
          }}
          >
          Done
        </button>
      </div>
      <div className="h-50 sm:h-60 md:h-80 lg:h-[330px] xl:h-[330px] overflow-auto px-4">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 whitespace-nowrap">
            <tr>
              <th className="p-2 text-center text-[13px] font-semibold text-slate-900">
                Registration Number
              </th>
              <th className="p-2 text-[13px] font-semibold text-slate-900">
                Student Name
              </th>
            </tr>
          </thead>
          <tbody className="whitespace-nowrap">
            {Array.isArray(allattendace) &&
              allattendace.map((student, index) => (
                <tr key={index} className="text-left bg-white cursor-pointer hover:bg-black">
                  <td className="p-4 text-[13px] text-slate-900 font-medium whitespace-normal break-words max-w-[180px]">
                    {student[0]}
                  </td>
                  <td className="p-4 text-[13px] text-blue font-medium whitespace-normal break-words max-w-[180px]">
                    {student[1]}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    
    </div>
    )}
  </div>
</div>

</div>

        </div>
      </div>
      {SubjectTitleDescriptionShowModal && (
            <SubjectTitleDescription onClose={() => setSubjectTitleDescriptionShowModal(false)} />
      )}
    
     <Footer />
    </div>
    );
};

export default lecturer_qrgen;