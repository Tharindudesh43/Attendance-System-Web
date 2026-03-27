import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useContextData } from "../ReloadContext.jsx";
import { useNavigate, useParams } from "react-router-dom";
import loadingimage from "../assets/load_img1.svg";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import { enqueueSnackbar } from "notistack";

const SendNotifications = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [istypemessageenable, setistypemessageenable] = useState(false);
  const [isOpenMessageOption, setIsOpenMessageOption] = useState(false);
  const [isnotifysend, setisnotifysend] = useState(false);
  const [notificationmessage, setnotificationmessage] = useState("");
  const [selectedMessage, setselectedMessage] = useState("Select Message");
  const [selectedfaculty, setselectedfaculty] = useState("Select a Faculty");
  const [selectedDepartment, setselectedDepartment] = useState(
    "Select a Department",
  );
  const [selectedsemversion, setselectedsemversion] = useState(
    "Select a Sem Version",
  );
  const [selectedAcademicYear, setselectedAcademicYear] = useState(
    "Select a Academic Year",
  );
  const [selectedSemester, setselectedselectedSemester] =
    useState("Select a Semester");
  const [selectedYear, setselectedselectedYear] = useState("Select a Year");
  const [selectedSubject, setselectedselectedSubject] =
    useState("Select a Subject");
  const [selectedindex, setselectedindex] = useState("");
  const [allsubjects, setallsubjects] = useState([]);
  const [loadingimg2, setloadingimg2] = useState(false);
  const { reload, setReload } = useContextData();
  const [lecID, setlecID] = useState(0);
  const { id } = useParams();
  const anchorRef = React.useRef(null);
  const messageoptions = [
    '"No Lecture Today"',
    '"Unfortunately, I am unavailable. Lecture postposned"',
    "Type Message",
  ];

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const sendCustomNotification = async (event) => {
    if (event) event.preventDefault();

    setisnotifysend(true);
    try {
      const notifyData = {
        semester: selectedSemester.toString(),
        year: selectedAcademicYear.toString(),
        subject: selectedSubject.toString(),
        custommessage: notificationmessage.toString(),
      };

      console.log("Notification Data:", notifyData);

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/lecturer/create_lec_custom_notification`,
        notifyData, 
        {
          headers: { "Content-Type": "application/json" }, 
        },
      );

      console.log("Notification Response:", response.data);
      setisnotifysend(false);
      enqueueSnackbar("Send Successful!", { variant: "success" });
    } catch (error) {
      setisnotifysend(false);
      enqueueSnackbar("Send Failed!", { variant: "error" });
      console.error("Error sending notification:", error);
    }
  };

  const handleGenerateNotification = async () => {
    if (selectedMessage !== "Select Message") {
      console.log(selectedMessage);
      sendCustomNotification();
    } else {
      enqueueSnackbar("Select message and subject", { variant: "error" });
    }
  };

  const handleToggle = () => {
    if (
      [
        selectedAcademicYear,
        selectedYear,
        selectedSemester,
        selectedSubject,
      ].every(
        (item) =>
          item !== "Select a Academic Year" &&
          item !== "Select a Year" &&
          item !== "Select a Semester" &&
          item !== "Select a Subject",
      )
    ) {
      setOpen((prevOpen) => !prevOpen);
    } else {
      enqueueSnackbar("Select a Subject", { variant: "error" });
    }
  };

  const handlebackbutton = () => {
    navigate(`/lecturer`);
  };

  function selectsubjectdata(index) {
    setselectedindex(index);
  }

  const handlemessageoption = (event, option) => {
    console.log(option);
    if (option === "Type Message") {
      setistypemessageenable(true);
    } else {
      setnotificationmessage(option);
      setistypemessageenable(false);
    }
    setselectedMessage(option);
    setIsOpenMessageOption(false);
    setOpen(false);
  };

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

  return (
    <>
      <div className="flex flex-col min-h-screen ">
        <Header />

        <div className="flex flex-col flex-grow bg-gray-200">
          <div className="relative w-full h-auto p-4">
            <button
              onClick={handlebackbutton}
              className="absolute top-0 left-0 flex items-center justify-center px-4 py-2 m-4 text-black bg-transparent border-2 border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none"
            >
              <div className="grid items-center justify-center grid-cols-2">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    style={{ marginRight: "8px" }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M15 8a.5.5 0 0 1-.5.5H2.707l4.147 4.146a.5.5 0 0 1-.708.708l-5-5a.5.5 0 0 1 0-.708l5-5a.5.5 0 1 1 .708.708L2.707 7.5H14.5a.5.5 0 0 1 .5.5z"
                    />
                  </svg>
                </div>
                <div className="text-sm">Back</div>
              </div>
            </button>
          </div>

          <div className="grid grid-cols-1 p-6 md:grid-cols-3 gap-7">
            <div className="col-span-1 md:col-span-3">
              <h2
                className="text-3xl mt-3 font-bold text-center text-gray-800"
                style={{ fontFamily: "Poppins" }}
              >
                Send Notifications
              </h2>
              <p className="mt-2 mb-4 text-center text-gray-600">
                Use the form below to send notifications to students.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 mb-6">
                <div className="bg-white p-4 rounded-2xl shadow-md">
                  <div className="flex flex-col w-full p-2 mx-0 overflow-hidden bg-white shadow-lg rounded-2xl">
                    <div className="overflow-x-auto">
                      <table className="w-full bg-white border rounded-lg">
                        <thead className="bg-gray-100 whitespace-nowrap">
                          <tr>
                            <th className="p-2 text-center text-[13px] font-semibold text-slate-900">
                              Subject
                            </th>
                            <th className="p-2 text-center text-[13px] font-semibold text-slate-900">
                              Semester Type
                            </th>
                          </tr>
                        </thead>

                        {loadingimg2 ? (
                          <tbody>
                            <tr>
                              <td colSpan="2" className="p-4 text-center">
                                <div className="flex items-center justify-center w-full h-30">
                                  <img
                                    src={loadingimage}
                                    alt="Loading..."
                                    className="w-20 h-20"
                                  />
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        ) : allsubjects &&
                          allsubjects === "No subjects available" ? (
                          <tbody>
                            <tr className="hover:bg-gray-50">
                              <td
                                colSpan="2"
                                className="p-4 text-[15px] text-slate-900 font-medium text-center"
                              >
                                No Data Added Yet.
                              </td>
                            </tr>
                          </tbody>
                        ) : (
                          <tbody>
                            {allsubjects.map((subjectSet, index) =>
                              subjectSet.map((subjectDetails, subIndex) => (
                                <tr
                                  key={`${index}-${subIndex}`}
                                  onClick={() => {
                                    setselectedAcademicYear(subjectDetails[1]);
                                    setselectedselectedSemester(
                                      subjectDetails[2],
                                    );
                                    setselectedselectedYear(subjectDetails[0]);
                                    setselectedselectedSubject(
                                      subjectDetails[3],
                                    );
                                    console.log(subjectDetails[4]);
                                    setselectedsemversion(subjectDetails[4]);
                                    selectsubjectdata(index, subjectDetails);
                                  }}
                                  className={`cursor-pointer ${
                                    selectedindex === index
                                      ? "bg-black hover:bg-black"
                                      : "bg-white hover:bg-blue-50"
                                  }`}
                                >
                                  <td
                                    className={`p-4 text-[13px] ${
                                      selectedindex === index
                                        ? "text-white"
                                        : "text-slate-900"
                                    } font-medium break-words`}
                                  >
                                    {subjectDetails[3]}
                                  </td>
                                  <td
                                    className={`p-4 text-[13px] text-center ${
                                      selectedindex === index
                                        ? "text-white"
                                        : "text-slate-900"
                                    } font-medium break-words`}
                                  >
                                    {subjectDetails[4]}
                                  </td>
                                </tr>
                              )),
                            )}
                          </tbody>
                        )}
                      </table>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl shadow-md flex flex-col min-h-[300px]">
                  <div className="relative inline-block w-full flex-1">
                    <React.Fragment>
                      <ButtonGroup
                        variant="contained"
                        ref={anchorRef}
                        aria-label="Button group with a nested menu"
                      >
                        <Button>{selectedMessage}</Button>
                        <Button
                          size="small"
                          aria-controls={open ? "split-button-menu" : undefined}
                          aria-expanded={open ? "true" : undefined}
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
                                placement === "bottom"
                                  ? "center top"
                                  : "center bottom",
                            }}
                          >
                            <Paper>
                              <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu" autoFocusItem>
                                  {messageoptions.map((option) => (
                                    <MenuItem
                                      key={option}
                                      onClick={(event) =>
                                        handlemessageoption(event, option)
                                      }
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

                    {istypemessageenable && (
                      <div className="mt-3 w-full">
                        <textarea
                          rows={5}
                          maxLength={60}
                          onChange={(e) =>
                            setnotificationmessage(e.target.value)
                          }
                          className="w-full h-full p-3 border border-gray-300 rounded-md resize-none"
                          placeholder="Type your message here..."
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end mt-auto pt-4">
                    <Button
                      color="success"
                      variant="contained"
                      loading={isnotifysend ? true : false}
                      loadingIndicator="Sending..."
                      onClick={handleGenerateNotification}
                    >
                      SEND NOTIFICATION
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};
export default SendNotifications;
