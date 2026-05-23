import React, { useEffect, useState } from "react";
import Header from "../../components/header.jsx";
import Footer from "../../components/footer";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useContextData } from "../../ReloadContext.jsx";
import { useNavigate, useParams } from "react-router-dom";
import loadingimage from "../../../public/assets/load_img1.svg";
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
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#f0f5ff", fontFamily: "'Nunito', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; }
        .notif-table { width: 100%; border-collapse: collapse; font-family: 'Nunito', sans-serif; }
        .notif-table thead tr { background: #f8faff; }
        .notif-table thead th { padding: 11px 16px; font-size: 11px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: .08em; text-align: left; border-bottom: 1.5px solid #e2e8f0; white-space: nowrap; }
        .notif-table tbody tr { transition: background .15s ease; cursor: pointer; }
        .notif-table tbody td { padding: 12px 16px; font-size: 13px; font-weight: 600; border-bottom: 1px solid #f1f5f9; word-break: break-word; }
        .notif-row-default { background: white; }
        .notif-row-default td { color: #334155; }
        .notif-row-default:hover { background: #eff6ff; }
        .notif-row-selected { background: linear-gradient(90deg, #1e40af, #2563eb) !important; }
        .notif-row-selected td { color: white !important; }
        .notif-textarea {
          width: 100%; padding: 12px 14px; border-radius: 11px;
          border: 1.5px solid #dbeafe; background: #f8faff;
          font-size: 14px; color: #1e293b; font-family: 'Nunito', sans-serif;
          resize: none; outline: none; transition: border-color .2s, box-shadow .2s;
        }
        .notif-textarea:focus { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,.13); background: white; }
        .notif-textarea::placeholder { color: #94a3b8; }
        .back-btn { transition: background .18s ease, border-color .18s ease; }
        .back-btn:hover { background: #eff6ff !important; border-color: #bfdbfe !important; }
        @media (max-width: 768px) {
          .notif-grid { grid-template-columns: 1fr !important; }
          .notif-header { flex-direction: column !important; align-items: flex-start !important; gap: 10px !important; }
        }
      `}</style>

      <Header />

      <main style={{ flex: 1, padding: "1.75rem 1.25rem" }}>
        <div style={{ maxWidth: "1060px", margin: "0 auto" }}>

          <div className="notif-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <button
                onClick={handlebackbutton}
                className="back-btn"
                style={{
                  display: "flex", alignItems: "center", gap: 7,
                  padding: "9px 16px", borderRadius: 10,
                  background: "white", border: "1.5px solid #dbeafe",
                  cursor: "pointer", fontSize: 13, fontWeight: 700, color: "#1e40af",
                  fontFamily: "'Nunito',sans-serif"
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 5l-7 7 7 7"/>
                </svg>
                Back
              </button>
              <div>
                <div style={{ fontSize: 10, fontWeight: 800, color: "#3b82f6", textTransform: "uppercase", letterSpacing: ".12em", marginBottom: 3 }}>Lecturer Portal</div>
                <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#0f172a", margin: 0, letterSpacing: "-0.01em" }}>Send Notifications</h2>
              </div>
            </div>
            <p style={{ fontSize: 13, color: "#94a3b8", fontWeight: 500 }}>Select a subject then choose your message to notify students.</p>
          </div>

          <div className="notif-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

            <div style={{ background: "white", borderRadius: 18, border: "1.5px solid #e2e8f0", boxShadow: "0 2px 16px rgba(30,64,175,.06)", overflow: "hidden" }}>
              <div style={{ padding: "16px 20px", borderBottom: "1.5px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 800, color: "#3b82f6", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 3 }}>Step 1</div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: "#0f172a" }}>Select a Subject</div>
                </div>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e" }} />
              </div>

              <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
                <table className="notif-table" style={{ minWidth: 280 }}>
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Semester Type</th>
                    </tr>
                  </thead>

                  {loadingimg2 ? (
                    <tbody>
                      <tr>
                        <td colSpan="2" style={{ textAlign: "center", padding: "2rem" }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <img src={loadingimage} alt="Loading..." style={{ width: 72, height: 72 }} />
                          </div>
                        </td>
                      </tr>
                    </tbody>

                  ) : allsubjects && allsubjects === "No subjects available" ? (
                    <tbody>
                      <tr>
                        <td colSpan="2" style={{ padding: "2.5rem", textAlign: "center" }}>
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#eff6ff", border: "2px solid #dbeafe", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
                              </svg>
                            </div>
                            <span style={{ fontSize: 13, color: "#64748b", fontWeight: 600 }}>No subjects available</span>
                          </div>
                        </td>
                      </tr>
                    </tbody>

                  ) : (
                    <tbody>
                      {allsubjects.map((subjectSet, index) =>
                        subjectSet.map((subjectDetails, subIndex) => (
                          <tr
                            key={`${index}-${subIndex}`}
                            className={selectedindex === index ? "notif-row-selected" : "notif-row-default"}
                            onClick={() => {
                              setselectedAcademicYear(subjectDetails[1]);
                              setselectedselectedSemester(subjectDetails[2]);
                              setselectedselectedYear(subjectDetails[0]);
                              setselectedselectedSubject(subjectDetails[3]);
                              console.log(subjectDetails[4]);
                              setselectedsemversion(subjectDetails[4]);
                              selectsubjectdata(index, subjectDetails);
                            }}
                          >
                            <td>{subjectDetails[3]}</td>
                            <td style={{ textAlign: "center" }}>{subjectDetails[4]}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  )}
                </table>
              </div>
            </div>

            <div style={{ background: "white", borderRadius: 18, border: "1.5px solid #e2e8f0", boxShadow: "0 2px 16px rgba(30,64,175,.06)", display: "flex", flexDirection: "column" }}>
              <div style={{ padding: "16px 20px", borderBottom: "1.5px solid #f1f5f9" }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: "#3b82f6", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 3 }}>Step 2</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#0f172a" }}>Compose Message</div>
              </div>

              <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#334155", marginBottom: 8, textTransform: "uppercase", letterSpacing: ".07em" }}>
                    Message Template
                  </label>
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
                      sx={{ zIndex: 10 }}
                      open={open}
                      anchorEl={anchorRef.current}
                      role={undefined}
                      transition
                      disablePortal
                    >
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          style={{ transformOrigin: placement === "bottom" ? "center top" : "center bottom" }}
                        >
                          <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                              <MenuList id="split-button-menu" autoFocusItem>
                                {messageoptions.map((option) => (
                                  <MenuItem key={option} onClick={(event) => handlemessageoption(event, option)}>
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
                </div>

                {istypemessageenable && (
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#334155", marginBottom: 8, textTransform: "uppercase", letterSpacing: ".07em" }}>
                      Custom Message <span style={{ color: "#94a3b8", fontWeight: 500, textTransform: "none", letterSpacing: 0 }}>(max 60 chars)</span>
                    </label>
                    <textarea
                      rows={5}
                      maxLength={60}
                      onChange={(e) => setnotificationmessage(e.target.value)}
                      className="notif-textarea"
                      placeholder="Type your message here…"
                    />
                  </div>
                )}

                <div style={{ display: "flex", alignItems: "flex-start", gap: 9, background: "#f0f9ff", border: "1.5px solid #bae6fd", borderRadius: 10, padding: "10px 14px" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
                    <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
                  </svg>
                  <span style={{ fontSize: 12, color: "#0369a1", fontWeight: 600, lineHeight: 1.5 }}>
                    Notifications will be sent to all students enrolled in the selected subject.
                  </span>
                </div>

                <div style={{ marginTop: "auto", paddingTop: 8 }}>
                  <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    loading={isnotifysend ? true : false}
                    loadingIndicator="Sending…"
                    onClick={handleGenerateNotification}
                    style={{
                      padding: "12px", borderRadius: 12, fontSize: 14,
                      fontWeight: 700, fontFamily: "'Nunito',sans-serif",
                      background: "linear-gradient(135deg, #1e40af, #2563eb)",
                      boxShadow: "0 4px 16px rgba(37,99,235,.32)",
                      letterSpacing: ".02em", textTransform: "none"
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 8 }}>
                      <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 19-7z"/>
                    </svg>
                    Send Notification
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  </>
);
};
export default SendNotifications;
