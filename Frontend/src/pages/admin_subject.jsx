// import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import React, { cache, useEffect,useState,useRef  } from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { useLocation } from 'react-router-dom';
import SubjectData  from '../data/subjectsdata'
import subjectsdata from '../data/subjectsdata';
import axios from "axios";
import { useContextData } from "../ReloadContext.jsx"
// import { FaBackspace} from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
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

const AcademicYearOptions = ["2015/2016", "2016/2017" , "2017/2018" , "2018/2019" , "2019/2020" , "2020/2020" ,"2021/2022 ","2022/2023"];
const YearOptions = ["1st Year" ,"2nd Year","3rd Year","4th Year"];
const SemesterOptions = ["1st Semester","2nd Semester"];
const SemVersionOptions = ["Short Semester","Long Semester"];
let SubjectOptions = [];


const admin_subject = () => {
    const {reload, setReload,findingDuplicateSubjects, setfindingDuplicateSubjects} = useContextData();

    const location = useLocation();
    const { faculty,department,image,name,id,title } = location.state || {}; 
    const navigate = useNavigate();

    const subjectDropdownRef = useRef(null);
    const YearDropdownRef = useRef(null);
    const AcademicYearDropdownRef = useRef(null);
    const SemesterversionDropdownRef = useRef(null);
    const anchorRef = React.useRef(null);
    const [dropdownPosition, setDropdownPosition] = useState("down");


    const [isOpenAc_Year, setisOpenAc_Year] = useState(false);
    const [isOpenYear, setisOpenYear] = useState(false);
    const [isOpenSemester, setisOpenSemester] = useState(false);
    const [isOpenSemVersion, setisOpenSemVersion] = useState(false);
    const [isOpenSubject, setisOpenSubject] = useState(false);
    const [loading,setloading] = useState(false);
    const [foundedduplicate,stefoundedduplicate] = useState(false);
    const [buttonDisable,setbuttonDisable] = useState(false)
    const [isAddingSubject,setisAddingSubject] = useState(false);
    const [savingsubject,setsavingsubject] = useState(false);
    const [completed,setcompleted] = useState(false);




    const [selectedYear, setselectedselectedYear] = useState("Select a Year");
    const [selectedDepartment, setselectedDepartment] = useState("Select a Department");
    const [selectedAcademicYear, setselectedAcademicYear] = useState("Select a Academic Year");
    const [selectedSubject, setselectedselectedSubject] = useState("Select a Subject");
    const [selectedSemester, setselectedselectedSemester] = useState("Select a Semester");
    const [selectedSemesterVersion, setselectedSemesterVersion] = useState("Select a Semester Version");

    const { enqueueSnackbar } = useSnackbar();
    
  //   const handleToggle = () => {
  //   setOpen((prevOpen) => !prevOpen);
  // };

      const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
          return;
        }

        setisOpenSemester(false);
        //setIsOpenDep(false);
        setisOpenSemVersion(false);
        setisOpenAc_Year(false);
        setisOpenYear(false);
      };
      const handelyearclose = (event) => {
        if (YearDropdownRef.current && YearDropdownRef.current.contains(event.target)) {
          return;
        }

        setisOpenSemester(false);
        //setIsOpenDep(false);
        setisOpenSemVersion(false);
        setisOpenAc_Year(false);
        setisOpenYear(false);
      };
       const handleacademicyearclose = (event) => {
        if (AcademicYearDropdownRef.current && AcademicYearDropdownRef.current.contains(event.target)) {
          return;
        }

        setisOpenSemester(false);
        //setIsOpenDep(false);
        setisOpenSemVersion(false);
        setisOpenAc_Year(false);
        setisOpenYear(false);
      };
        const handlesemesterversionclose = (event) => {
        if (SemesterversionDropdownRef.current && SemesterversionDropdownRef.current.contains(event.target)) {
          return;
        }

        setisOpenSemester(false);
        //setIsOpenDep(false);
        setisOpenSemVersion(false);
        setisOpenAc_Year(false);
        setisOpenYear(false);
      };
    const toggleDropdownDepartment = () => setIsOpenDep(!isOpenDep);
    const toggleDropdownSemVersion = () => setisOpenSemVersion(!isOpenSemVersion);
    const toggleDropdownAc_Year = () => setisOpenAc_Year(!isOpenAc_Year);
    const toggleDropdownYear = () => setisOpenYear(!isOpenYear);
    const toggleDropdownSemester = () => setisOpenSemester(!isOpenSemester);
    const toggleDropdownSubject = () => {
        if (
            [selectedAcademicYear, selectedSemester, selectedYear].every(
                (item) =>
                    item !== "Select a Academic Year" &&
                    item !== "Select a Semester" &&
                    item !== "Select a Year" &&
                    item !== "Select a Semester Version"
              )
        ) {
          const result = subjectsdata({faculty,department,selectedYear,selectedSemester})
          SubjectOptions = result.map((item) => item);
          setisOpenSubject(!isOpenSubject);
          console.log(SubjectOptions)
        }else{
            enqueueSnackbar('Select Previous All Options',{variant: 'error'});
        }
    };

    
    const handleSelectDepartment = (option) => { 
        setselectedDepartment(option);
        setIsOpenDep(false);
      };
    const handleSelectAc_Year = (option) => { 
        setselectedAcademicYear(option);
        setisOpenAc_Year(false);
    };
    const handleSelectYear = (option) => { 
        setselectedselectedYear(option);
        setisOpenYear(false);
    };
    const handleSelectSemester = (option) => { 
        setselectedselectedSemester(option);
        setisOpenSemester(false);
    };
    const handleSelectSubject = (option) => { 
        setselectedselectedSubject(option);
        setisOpenSubject(false);
    };
     const handleSelectSemVersion = (option) => { 
        setselectedSemesterVersion(option);
        setisOpenSemVersion(false);
    };

    const resetall = () => {
        setselectedselectedYear("Select a Year");
        setselectedDepartment("Select a Department");
        setselectedAcademicYear("Select a Academic Year");
        setselectedselectedSubject("Select a Subject");
        setselectedselectedSemester("Select a Semester");
        setselectedSemesterVersion("Select a Semester Version")
        setcompleted(false);
    }

    useEffect(() => {
        if (isOpenSubject && subjectDropdownRef.current) {
            const rect = subjectDropdownRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const spaceBelow = windowHeight - rect.bottom;
    
            if (spaceBelow < 200) {
                setDropdownPosition("up"); // Show dropdown above
            } else {
                setDropdownPosition("down"); 
            }
        }
    }, [isOpenSubject])
    
    async function addlec_subject (event) {
      event.preventDefault();
      if(selectedSubject==='Select a Subject'){
        enqueueSnackbar("Select a Subject first!", { 
          variant: "error", 
          autoHideDuration: 3000 
      });
      }else{
      setisAddingSubject(true);
      const subjectData = new FormData();
      subjectData.append("ac_year",selectedAcademicYear);
      subjectData.append("year",selectedYear);
      subjectData.append("semester",selectedSemester);
      subjectData.append("id",id);
      subjectData.append("subject",selectedSubject);
      subjectData.append("sem_version",selectedSemesterVersion);
          
      try{
          setbuttonDisable(true);
          setfindingDuplicateSubjects(true);
          const response_dup = await axios.post('http://localhost:1337/admin/finddup', subjectData, {
              headers: { "Content-Type": "multipart/form-data" },
          });
          // response_dup.data.status
          if( response_dup.data.status==='not'){
            setTimeout(async () => {
              setfindingDuplicateSubjects(false);
            },3000);
            setsavingsubject(true);
            const response = await axios.post('http://localhost:1337/admin/addsubjects', subjectData, {
              headers: { "Content-Type": "multipart/form-data" },
            });
            if(response.data.status==='ok'){
              setTimeout(() => {
                setsavingsubject(false);
                setcompleted(true);
                setbuttonDisable(false);
                setisAddingSubject(false);
              }, 6000);
              console.log("SUCCESS ADD SUBJECT!")
              setloading(false);
              resetall();
              
            } 
          }else{
            console.log('Duplicate Found');
            setTimeout(() => {
              setfindingDuplicateSubjects(false);
            }, 3000);
            stefoundedduplicate(true);
            setTimeout(() => {
              stefoundedduplicate(false);
              setisAddingSubject(false);
              resetall();
              setbuttonDisable(false);
            }, 6000);
            setloading(false);
            setcompleted(false);
            setsavingsubject(false);
            }
          }
      catch(error){
            console.log(error);
            enqueueSnackbar("Problem with adding subjects saving!", { 
                variant: "error", 
                autoHideDuration: 3000 
            });
            setloading(false);
            setfindingDuplicateSubjects(false);
            stefoundedduplicate(false);
            setbuttonDisable(false);
            setcompleted(false);
            setisAddingSubject(false);
            setsavingsubject(false);
      }
      }
  }
  const handlebackbutton = () => { 
    navigate('/admin')
  };


    return (
        <div class="flex flex-col min-h-screen">
             <Header/>
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
                    <div className="relative w-full h-auto p-4">
                    <button onClick={handlebackbutton} className="absolute top-0 left-0 flex items-center justify-center px-4 py-2 m-4 text-black bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none">
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
            <div className="flex items-center justify-center flex-grow">
              
            <div className="grid items-center justify-center grid-cols-2 gap-10 p-5 md:grid-cols-2 min-h-">
            <div className="grid w-full grid-rows-4 gap-y-9"> 


  {/* Sem Version select */}
   <div className="relative inline-block text-left w-flex">
           <React.Fragment>
          <ButtonGroup
            variant="contained"
            ref={SemesterversionDropdownRef}
            aria-label="Button group with a nested menu"
          >
            <Button className="flex items-center justify-between w-full px-4 py-2 text-white bg-blue-600 cursor-pointer hover:bg-blue-400 rounded-xl focus:outline-none">{selectedSemesterVersion}</Button>
            <Button
              size="small"
              aria-controls={isOpenSemVersion ? 'split-button-menu' : undefined}
              aria-expanded={isOpenSemVersion ? 'true' : undefined}
              aria-label="select merge strategy"
              aria-haspopup="menu"
              onClick={toggleDropdownSemVersion}
            >
              <ArrowDropDownIcon />
            </Button>
          </ButtonGroup>
          <Popper
  sx={{ zIndex: 1 }}
  open={isOpenSemVersion}
  anchorEl={SemesterversionDropdownRef.current}
  role={undefined}
  placement="bottom-start"   // 👈 force always down
  modifiers={[
    {
      name: "flip",
      enabled: true,  // 👈 disable flipping up
    },
  ]}
  transition
  disablePortal
>
  {({ TransitionProps }) => (
    <Grow {...TransitionProps} style={{ transformOrigin: "center top" }}>
      <Paper>
        <ClickAwayListener onClickAway={handlesemesterversionclose}>
          <MenuList
            id="split-button-menu"
            autoFocusItem
            sx={{ maxHeight: 200, overflowY: "auto", fontSize: "0.85rem" }}
          >
            {SemVersionOptions.map((option, index) => (
              <MenuItem
                key={option}
                onClick={() => handleSelectSemVersion(option)}
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
    {/* <button onClick={toggleDropdownSemVersion} className="flex items-center justify-between w-full px-4 py-2 text-white bg-blue-600 cursor-pointer hover:bg-blue-400 rounded-xl focus:outline-none">
      {selectedSemesterVersion}
      <span className={`ml-2 transform transition-transform ${isOpenSemVersion ? "rotate-180" : "rotate-0"}`}>&#9662;</span>
    </button>
    {isOpenSemVersion && (
      <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
        <ul className="py-1">
          {SemVersionOptions.map((option, index) => (
            <li key={index} onClick={() => handleSelectSemVersion(option)} className="px-4 py-2 cursor-pointer hover:bg-gray-100">
              {option}
            </li>
          ))}
        </ul>
      </div>
    )} */}
  </div>
{/* Academic Year select */}
  <div className="relative inline-block text-left w-70">
    <React.Fragment>
          <ButtonGroup
            variant="contained"
            ref={AcademicYearDropdownRef}
            aria-label="Button group with a nested menu"
          >
            <Button className="flex items-center justify-between w-full px-4 py-2 text-white bg-blue-600 cursor-pointer hover:bg-blue-400 rounded-xl focus:outline-none">{selectedAcademicYear}</Button>
            <Button
              size="small"
              aria-controls={isOpenAc_Year ? 'split-button-menu' : undefined}
              aria-expanded={isOpenAc_Year ? 'true' : undefined}
              aria-label="select merge strategy"
              aria-haspopup="menu"
              onClick={toggleDropdownAc_Year}
            >
              <ArrowDropDownIcon />
            </Button>
          </ButtonGroup>
          <Popper
            sx={{ zIndex: 1 }}
            open={isOpenAc_Year}
            anchorEl={AcademicYearDropdownRef.current}
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
                  <ClickAwayListener onClickAway={handleacademicyearclose}>
                    <MenuList id="split-button-menu" autoFocusItem>
                      {AcademicYearOptions.map((option, index) => (
                        <MenuItem
                          key={option}
                          onClick={(event) => handleSelectAc_Year(option)}
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
    {/* <button onClick={toggleDropdownAc_Year} className="flex items-center justify-between w-full px-4 py-2 text-white bg-blue-600 cursor-pointer hover:bg-blue-400 rounded-xl focus:outline-none">
      {selectedAcademicYear}
      <span className={`ml-2 transform transition-transform ${isOpenAc_Year ? "rotate-180" : "rotate-0"}`}>&#9662;</span>
    </button>
    {isOpenAc_Year && (
      <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
        <ul className="py-1">
          {AcademicYearOptions.map((option, index) => (
            <li key={index} onClick={() => handleSelectAc_Year(option)} className="px-4 py-2 cursor-pointer hover:bg-gray-100">
              {option}
            </li>
          ))}
        </ul>
      </div>
    )} */}
  </div>

  {/* Year select */}
  <div className="relative inline-block w-48 text-left">
      <React.Fragment>
          <ButtonGroup
            variant="contained"
            ref={YearDropdownRef}
            aria-label="Button group with a nested menu"
          >
            <Button className="flex items-center justify-between w-full px-4 py-2 text-white bg-blue-600 cursor-pointer hover:bg-blue-400 rounded-xl focus:outline-none">{selectedYear}</Button>
            <Button
              size="small"
              aria-controls={isOpenYear ? 'split-button-menu' : undefined}
              aria-expanded={isOpenYear ? 'true' : undefined}
              aria-label="select merge strategy"
              aria-haspopup="menu"
              onClick={toggleDropdownYear}
            >
              <ArrowDropDownIcon />
            </Button>
          </ButtonGroup>
          <Popper
            sx={{ zIndex: 1 }}
            open={isOpenYear}
            anchorEl={YearDropdownRef.current}
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
                  <ClickAwayListener onClickAway={handelyearclose}>
                    <MenuList id="split-button-menu" autoFocusItem>
                      {YearOptions.map((option, index) => (
                        <MenuItem
                          key={option}
                          onClick={(event) => handleSelectYear(option)}
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
    {/* <button onClick={toggleDropdownYear} className="flex items-center justify-between w-full px-4 py-2 text-white bg-blue-600 cursor-pointer hover:bg-blue-400 rounded-xl focus:outline-none">
      {selectedYear}
      <span className={`ml-2 transform transition-transform ${isOpenYear ? "rotate-180" : "rotate-0"}`}>&#9662;</span>
    </button>
    {isOpenYear && (
      <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
        <ul className="py-1">
          {YearOptions.map((option, index) => (
            <li key={index} onClick={() => handleSelectYear(option)} className="px-4 py-2 cursor-pointer hover:bg-gray-100">
              {option}
            </li>
          ))}
        </ul>
      </div>
    )} */}
  </div>

  {/* Semester select */}
  <div className="relative inline-block w-48 text-left">
     <React.Fragment>
          <ButtonGroup
            variant="contained"
            ref={anchorRef}
            aria-label="Button group with a nested menu"
          >
            <Button className="flex items-center justify-between w-full px-4 py-2 text-white bg-blue-600 cursor-pointer hover:bg-blue-400 rounded-xl focus:outline-none">{selectedSemester}</Button>
            <Button
              size="small"
              aria-controls={isOpenSemester ? 'split-button-menu' : undefined}
              aria-expanded={isOpenSemester ? 'true' : undefined}
              aria-label="select merge strategy"
              aria-haspopup="menu"
              onClick={toggleDropdownSemester}
            >
              <ArrowDropDownIcon />
            </Button>
          </ButtonGroup>
          <Popper
            sx={{ zIndex: 1 }}
            open={isOpenSemester}
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
                      {SemesterOptions.map((option, index) => (
                        <MenuItem
                          key={option}
                          onClick={(event) => handleSelectSemester(option)}
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
        {/* //---------------- */}
    {/* <button onClick={toggleDropdownSemester} className="flex items-center justify-between w-full px-4 py-2 text-white bg-blue-600 cursor-pointer hover:bg-blue-400 rounded-xl focus:outline-none">
      {selectedSemester}
      <span className={`ml-2 transform transition-transform ${isOpenSemester ? "rotate-180" : "rotate-0"}`}>&#9662;</span>
    </button>
    {isOpenSemester && (
      <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
        <ul className="py-1">
          {SemesterOptions.map((option, index) => {
              return (
                  <li key={index} onClick={() => handleSelectSemester(option)} className="px-4 py-2 cursor-pointer hover:bg-gray-100">
                      {option}
                  </li>
              );
          })}
        </ul>
      </div>
    )} */}
  </div>

   {/* Subject select */}
   <div className="relative inline-block text-left w-110">
         <React.Fragment>
          <ButtonGroup
            variant="contained"
            ref={subjectDropdownRef}
            aria-label="Button group with a nested menu"
          >
            <Button className="flex items-center justify-between w-full px-4 py-2 text-white bg-blue-600 cursor-pointer hover:bg-blue-400 rounded-xl focus:outline-none">{selectedSubject}</Button>
            <Button
              size="small"
              aria-controls={isOpenSubject ? 'split-button-menu' : undefined}
              aria-expanded={isOpenSubject ? 'true' : undefined}
              aria-label="select merge strategy"
              aria-haspopup="menu"
              onClick={toggleDropdownSubject}
            >
              <ArrowDropDownIcon />
            </Button>
          </ButtonGroup>
          <Popper
  sx={{ zIndex: 1 }}
  open={isOpenSubject}
  anchorEl={subjectDropdownRef.current}
  role={undefined}
  placement="bottom-start"   // 👈 force always down
  modifiers={[
    {
      name: "flip",
      enabled: true,  // 👈 disable flipping up
    },
  ]}
  transition
  disablePortal
>
  {({ TransitionProps }) => (
    <Grow {...TransitionProps} style={{ transformOrigin: "center top" }}>
      <Paper>
        <ClickAwayListener onClickAway={handleClose}>
          <MenuList
            id="split-button-menu"
            autoFocusItem
            sx={{ maxHeight: 200, overflowY: "auto", fontSize: "0.85rem" }}
          >
            {SubjectOptions.map((option, index) => (
              <MenuItem
                key={option}
                onClick={() => handleSelectSubject(option)}
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
        {/* <button
            ref={subjectDropdownRef}
            onClick={toggleDropdownSubject}
            className="flex items-center justify-between w-full px-4 py-2 text-sm text-white bg-blue-600 cursor-pointer hover:bg-blue-400 rounded-xl focus:outline-none">
            {selectedSubject}
            <span
                className={`ml-2 transform transition-transform ${
                    isOpenSubject ? "rotate-180" : "rotate-0"
                }`}
            >
                &#9662;
            </span>
        </button>
        {isOpenSubject && (
    <div className={`absolute ${
            dropdownPosition === "up" ? "bottom-full mb-1" : "mt-1"
        } w-full bg-white border rounded-md shadow-lg z-10`}
        style={{ maxHeight: "200px", overflowY: "auto" }} >
        <ul className="py-1">
            {SubjectOptions.map((option, index) => (
                <li
                    key={index}
                    onClick={() => handleSelectSubject(option)}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                    {option}
                </li>
            ))}
        </ul>
    </div>
)} */}
    </div>
</div>

<div className="grid grid-rows-2 gap-y-9 gap-x-20"> 
<div className="flex grid items-center w-full grid-rows-1 p-4 rounded-lg shadow-sm gap-y-2 gap-x-2">
  {
    findingDuplicateSubjects?(
      <div className="flex items-center justify-center col-span-full">
          <img src="../src/assets/search.gif" alt="Loading..." className="w-20 h-20"/>
          <img src="../src/assets/findingdup_text.svg" alt="Finding duplicates..." className="w-40 h-30"/>
      </div>
    ):foundedduplicate?(
        <div className="flex items-center justify-center col-span-full">
          <img src="../src/assets/duplicated.gif" alt="Duplicate text" className="w-30 h-30"/>
          <div className='font-semibold text-red-700'>
            Found Duplicate!
          </div>
        </div>
    ):savingsubject?(
      <div className="flex items-center justify-center col-span-full">
        <img src="../src/assets/saving.gif" alt="Saving Subject" className="w-20 h-20"/>
        <div className='font-semibold text-pink-700'>
            Subject Saving...
        </div>
      </div>
    ):completed?(
      <div className="flex items-center justify-center ">
        <img src="../src/assets/completed.gif" alt="Completed" className="w-20 h-20"/>
        <div className='font-semibold text-green-700'>
            Completed
        </div>
      </div>
    ):(
      <div>
      <div className='font-semibold'>
         Semester Version: {selectedSemesterVersion}
       </div>
      <div className='font-semibold'>
         Academic Year : {selectedAcademicYear}
       </div>
       <div className='font-semibold'>
         Year : {selectedYear}
       </div>
       <div className='font-semibold'>
         Semester: {selectedSemester}
       </div>
       <div className='font-semibold'>
         Subject: {selectedSubject}
       </div>
      </div>
    )
  }
</div>

<div className="flex items-center p-4 border rounded-lg shadow-sm">
  {/* Profile Section */}
  <div className="flex flex-col items-center">
    <img
      src={image} // replace with your profile image URL or state variable
      alt="Profile Image"
      className="object-cover w-20 h-20 rounded-full"
    />
    <p className="mt-2 text-lg font-semibold">{title}{name}</p>
  </div>

  {/* Buttons Section */}
  <div className="flex ml-auto space-x-4">
  <button

                                 type="button"
                                 onClick={addlec_subject}
                                 className="px-4 py-2 font-semibold text-green-700 bg-transparent border border-green-500 rounded cursor-pointer hover:bg-green-500 hover:text-white hover:border-transparent"
                                 disabled={isAddingSubject}>
                                   {isAddingSubject ? (
                                      <div className="flex items-center justify-center">
                                       <svg
                                         className="w-5 h-5 text-white animate-spin"
                                        viewBox="0 0 24 24">
                                         <circle
                                           className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                          ></circle>
                                         <path
                                            className="opacity-75"
                                           fill="currentColor"
                                            d="M4 12a8 8 0 018-8v8H4z"
                                          ></path>
                                        </svg>
                                      </div>
                                  ) : (
                                      "Add"
                                  )}
                                </button>
    {/* <button onClick={addlec_subject} disabled={buttonDisable} className="px-4 py-2 font-semibold text-green-700 bg-transparent border border-green-500 rounded cursor-pointer hover:bg-green-500 hover:text-white hover:border-transparent">
      Add
    </button> */}
    <button onClick={resetall} disabled={buttonDisable}  className="px-4 py-2 font-semibold text-red-700 bg-transparent border border-red-500 rounded cursor-pointer hover:bg-red-500 hover:text-white hover:border-transparent">
      Reset
    </button>
  </div>
</div>
</div>
    </div>
            </div>
            <Footer />
        </div>
    );
};

export default admin_subject;