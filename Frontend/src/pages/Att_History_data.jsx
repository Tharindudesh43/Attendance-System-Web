import { useParams,useNavigate } from 'react-router-dom';
import Header from '../components/header';
import axios from 'axios';
import Footer from '../components/footer';
import { useContextData } from "../ReloadContext.jsx"
import React, { cache, useEffect,useState,useRef  } from 'react';
import loadingimage from '../assets/load_img1.svg'
import { FileText } from 'lucide-react';
import { SnackbarProvider, useSnackbar,enqueueSnackbar } from 'notistack';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import {AiOutlineClose} from 'react-icons/ai';


const Att_History_data = () => {
  const [loadingimg2,setloadingimg2] = useState(false);
  const [allattendace, setallattendace] = useState(null);
  const [allstudentsattendace, setallstudentsattendace] = useState(null);
  const {reload, setReload} = useContextData(); 
  const navigate = useNavigate();
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');

      const [selectedYear, setselectedselectedYear] = useState("Select a Year");
       const [selectedsemversion, setselectedsemversion] = useState("Select a Sem Version");
       const [selectedfaculty,setselectedfaculty] = useState("Select a Faculty");
       const [selectedDepartment, setselectedDepartment] = useState("Select a Department");
       const [selectedAcademicYear, setselectedAcademicYear] = useState("Select a Academic Year");
       const [selectedSubject, setselectedselectedSubject] = useState("Select a Subject");
       const [selectedSemester, setselectedselectedSemester] = useState("Select a Semester");
     
     
  const { id, subject,year } = useParams();
  const subjectpassed = decodeURIComponent(subject);
  const yearpassed = decodeURIComponent(year);
  const idpassed = id;

  const [selectedIndex, setSelectedIndex] = useState(null); 
  const [selectedAttendanceIndex, setSelectedAttendanceIndex] = useState(null);

  const handleRowClick = (index) => {
    setSelectedIndex(prev => (prev === index ? null : index)); // Toggle selection
  };

     
  const handleOpenPDF = (event) => {
    event.preventDefault();
    if(selectedAcademicYear=='Select a Academic Year'){
      enqueueSnackbar('No Data selected',{variant: 'error'});     
    }
    else if(allstudentsattendace.length > 0){
      localStorage.setItem("attendanceData", JSON.stringify(allstudentsattendace));
      localStorage.setItem("subject_attendance", JSON.stringify(selectedSubject));
      localStorage.setItem("department_attendance", JSON.stringify(selectedDepartment));
      localStorage.setItem("faculty_attendance", JSON.stringify(selectedfaculty));
      localStorage.setItem("university_attendance", JSON.stringify("SOUTH EASTERN UNIVERSITY OF SRI LANKA"));
      localStorage.setItem("academic_attendance", JSON.stringify(selectedAcademicYear));
      localStorage.setItem("semester_attendance", JSON.stringify(selectedSemester));
      //selectedSubject
      window.open("/lecturer/lecturer_attendence", "_blank"); 
    }else{
      enqueueSnackbar('No Data for Generate',{variant: 'error'});
    }
  };

  const handlebackbutton = () => { 
    navigate(`/lecturer/attendace_history/${id}`)
  };

   useEffect(() => {
    const fetchattendance = async () => {
        try {
            const response = await axios.get(`http://localhost:1337/lecturer/get_history_attendace/${idpassed}/${subjectpassed}/${yearpassed}`);
            if (response.data.status === 'ok') {
                setselectedfaculty(response.data.faculty)
                setselectedDepartment(response.data.department)
                setallattendace(response.data.specificattendancedata);  // updated key name
                console.log(allattendace[0]);
              } else if (response.data.status === 'empty') {
                setallattendace('No Attendance available');
            }
        } catch (error) {
            console.error(error.data);
        } finally {
            setloadingimg2(false);
        }
    };

    fetchattendance();
    }, []);

        const FeedbackModal = ({onClose,feedbacktext}) => {
          return (
              <div className="fixed bg-black/60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center" onClick={onClose}>
                  <div
                      onClick={(event)=>event.stopPropagation()}
                      className=' w-[600px] max-w-full h-fit bg-white rounded-xl p-4 flex-col relative'
                  >
                      <AiOutlineClose className='absolute   rounded-xl p-1 right-6 hover: bg-slate-400 top-6 text-3xl text-yellow-50 cursor-pointer'
                      onClick={onClose}
                      />
                      <h2 className="text-lg  mt-5 font-semibold ml-4">Feedback of student</h2>
                      <div className="mt-4 ml-4 mb-4">
                          <h2 className="text-[15px] text-gray-700">{feedbacktext}</h2>
                      </div>
                  </div>
              </div>
          );
        };


  
  return (
      <div class="flex flex-col min-h-screen">
        <Header/>
      {/* <h1>ID: {id}</h1>
      <h2>Subject: {decodeURIComponent(subject)}</h2> */}
               <div className="flex flex-col items-center justify-center flex-grow bg-gray-100 p-4">
                 {/* Main grid with 3 columns */}
                 <div className="flex items-center justify-between w-full">
                  {/* Back Button - Left Side */}
                  <button
                    onClick={handlebackbutton}
                    className="items-center justify-center px-4 py-2  text-black bg-transparent border-2 border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none"
                  >
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
                                     <div className='text-[13px]'>
                                              Back
                                     </div>
                                     </div>
                </button>

                {/* Generate Button - Right Side */}
                <div className="flex items-center justify-end w-full">
                <button
                  onClick={handleOpenPDF}
                  className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-white transition duration-200 bg-blue-600 rounded-md shadow-sm hover:bg-blue-700"
               >
              <FileText className="w-4 h-4" />
                Generate Attendance Sheet
              </button>
              </div>
              </div>
         
                 <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-3 ">

{/* LEFT COLUMN - Profile + Calendar */}
<div className="flex flex-col md:col-span-2 w-full">
  {/* Row 1: Subject Display */}
  <div className="p-3 font-medium text-center bg-white rounded shadow sm:text-1xl lg:text-lg rounded-2xl w-full">
    
    <h3 className="px-4 mt-2 mb-4 text-lg font-semibold text-center">Attendance Data of Subject</h3>

    <div className="h-50 sm:h-60 md:h-80 lg:h-[330px] xl:h-[330px] overflow-auto px-4 w-full">
      <table className="w-full bg-white text-[10px]">
        <thead className="bg-gray-100 whitespace-nowrap">
          <tr>
            <th className="p-2 text-center  text-[12px] font-semibold text-slate-900">
              Subject
            </th>
            <th className="p-2 text-[12px] font-semibold text-slate-900">
              Topic and Description
            </th>
            <th className="p-2 text-[12px] font-semibold text-slate-900">
              Date
            </th>
            <th className="p-2 text-[12px] font-semibold text-slate-900">
              Time
            </th>
          </tr>
        </thead>

        {loadingimg2 ? (
          <tbody>
            <tr>
              <td colSpan="4" className="p-4 text-center">
                <div className="flex items-center justify-center w-full h-30">
                  <img src={loadingimage} alt="Loading..." className="w-10 h-10" />
                </div>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody className="whitespace-nowrap">
            {Array.isArray(allattendace) && allattendace.length > 0 ? (
              allattendace.map((item, index) => {
                const isSelected = selectedAttendanceIndex === index;

                return (
                  <tr
                    key={index}
                    onClick={() => {
                      setselectedAcademicYear(item[2]);
                      setselectedselectedSubject(item[4]);
                      setselectedselectedSemester(item[3]);
                      setSelectedAttendanceIndex(index);
                      setallstudentsattendace(item[11]);
                    }}
                    className={`cursor-pointer transition duration-150 ${
                      isSelected ? 'bg-black text-white' : 'hover:bg-slate-200'
                    }`}
                  >
                  <td className={`p-4 text-[12px] font-medium break-words whitespace-normal leading-tight	 max-w-[180px] overflow-hidden ${
                     isSelected ? 'text-white' : 'text-slate-900'}`}>
                    {item[4]}
                  </td>
                   <td className={`p-4  text-[12px] font-medium break-words whitespace-normal leading-tight max-w-[180px] overflow-hidden ${
                     isSelected ? 'text-white' : 'text-slate-900'}`}>
                      {item[6]} - {item[7]}
                    </td>
                    <td className={`p-4  text-[12px] font-medium break-words max-w-[180px] ${
                      isSelected ? 'text-white' : 'text-slate-900'
                    }`}>
                      {item[8]}
                    </td>
                    <td className={`p-4 text-[12px] font-medium break-words max-w-[180px] ${
                      isSelected ? 'text-white' : 'text-slate-900'
                    }`}>
                      {item[9]} - {item[10]}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-[10px] text-center text-gray-500">
                  {allattendace === 'No Attendance available'
                    ? 'No Attendance Available'
                    : 'No Data Found'}
                </td>
              </tr>
            )}
          </tbody>
        )}
      </table>
    </div>
  </div>
</div>



         <div className="flex flex-col w-full h-full justify-content-center items-center">
           {/* Subject Part */}
           <div className="flex flex-col max-w-full  mx-0 overflow-hidden bg-white shadow-lg sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl md:ml-4 rounded-2xl p-5">
             <h3 className="px-4 text-lg font-semibold text-center">Students Data </h3>
                      <div className="h-50 sm:h-60 md:h-80 lg:h-flex xl:h-[330px] overflow-auto px-2 pt-3">
                           <table className="max-w-full text-[12px] bg-white">
  <thead className="bg-gray-100">
    <tr>
      <th className="p-2 font-semibold text-center text-slate-900">
        Registration Number
      </th>
      <th className="p-2 font-semibold text-slate-900">
        Student Name
      </th>
       <th className="p-2 font-semibold text-slate-900">
        Rating for session
      </th>
       <th className="p-2 font-semibold text-slate-900">
        Feedback
      </th>
    </tr>
  </thead>

  {Array.isArray(allstudentsattendace) && allstudentsattendace.length > 0 ? (
    <tbody className="whitespace-nowrap">
      {allstudentsattendace.map((student, index) => (
        <tr
          key={index}
          className="transition duration-150 hover:bg-gray-50"
        >
          <td className="p-2 text-slate-900 break-words whitespace-normal leading-tight	 font-medium max-w-[160px]">
            {student[0]}
          </td>
          <td className="p-2 text-slate-900 break-words whitespace-normal leading-tight	 font-medium max-w-[160px]">
            {student[1]}
          </td>
          <td className="p-2 text-slate-900 font-medium max-w-[160px]">
              <div className="flex justify-center items-center w-full">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Rating
                    name="text-feedback"
                    value={parseInt(student[2], 10)}
                    readOnly
                    precision={0.5}
                    sx={{ fontSize: 14 }}
                    emptyIcon={<StarIcon style={{ opacity: 0.4 }} fontSize="inherit" />}
                  />
                </Box>
              </div>
          </td>

          <td className="text-slate-900 font-medium max-w-[160px]">
            <div className="flex justify-center items-center h-full">
              {student[3] ? (
                <button
                  onClick={() => {
                  setFeedbackText(student[3]);
                  setShowFeedbackModal(true);
              }}
              className="cursor-pointer"
              title="Details"
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 text-blue-500 hover:text-blue-700"
            >
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.477 2 12s4.477 10  10 10 10-4.477 10-10S17.523 2 12 2zm0 14a1 1 0 100 2 1 1 0 000-2zm1-10h-2v8h2V6z"
              clipRule="evenodd"
            />
          </svg>
        </button>
          ) : (
          'No Feedback'
        )}
      </div>
  </td>

        </tr>
      ))}
    </tbody>
  ) : (
    <tbody>
      <tr>
        <td colSpan={4} className="p-4 text-center text-gray-500">
          <div className="flex items-center justify-center h-20 text-sm text-gray-500">
            No Attendance Data Available
          </div>
        </td>
      </tr>
    </tbody>
  )}
</table>

                            </div> 
                     </div>
                </div>
            </div>
                      {
                            showFeedbackModal&&(
                              <FeedbackModal onClose={()=>setShowFeedbackModal(false)} feedbacktext={feedbackText}/>
                            )
                        }
            </div>
        <Footer/>
    </div>
  );
};
export default Att_History_data;
