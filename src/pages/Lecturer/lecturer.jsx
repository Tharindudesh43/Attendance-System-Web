import { useState, useEffect } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
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
  <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#f0f5ff", fontFamily: "'Nunito', sans-serif" }}>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
    <style>{`
      * { box-sizing: border-box; }
      @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
      .lec-home-wrap { animation: fadeUp .5s cubic-bezier(.22,1,.36,1) forwards; }
      .action-card {
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        gap: 14px; padding: 24px 16px; border-radius: 18px; cursor: pointer;
        background: white; border: 1.5px solid #e2e8f0;
        box-shadow: 0 2px 16px rgba(30,64,175,.06);
        transition: transform .22s ease, box-shadow .22s ease, border-color .22s ease;
        flex: 1 1 160px; min-width: 140px; max-width: 200px;
      }
      .action-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 14px 36px rgba(30,64,175,.15);
        border-color: #bfdbfe;
      }
      .action-card:focus { outline: none; box-shadow: 0 0 0 3px rgba(37,99,235,.2); }
      .info-pill {
        display: flex; align-items: center; gap: 8px;
        background: rgba(255,255,255,.15); border-radius: 100px;
        padding: 9px 16px; width: 100%; border: 1px solid rgba(255,255,255,.2);
        transition: background .18s ease;
      }
      .info-pill:hover { background: rgba(255,255,255,.22); }
      @media (max-width: 768px) {
        .lec-main-grid { grid-template-columns: 1fr !important; }
        .actions-flex  { justify-content: center !important; }
        .action-card   { max-width: 160px !important; }
      }
      @media (max-width: 480px) {
        .action-card { flex: 1 1 130px !important; min-width: 120px !important; }
        .lec-outer-pad { padding: 16px !important; }
      }
    `}</style>

    <Header />

    <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem 1.25rem" }}>
      <div className="lec-home-wrap lec-outer-pad" style={{ width: "100%", maxWidth: "1060px" }}>

        <div className="lec-main-grid" style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 24 }}>

          <section style={{
            background: "linear-gradient(160deg, #1e3a8a 0%, #1e40af 55%, #2563eb 100%)",
            borderRadius: 22, padding: "32px 22px", display: "flex",
            flexDirection: "column", alignItems: "center", gap: 14,
            position: "relative", overflow: "hidden",
            boxShadow: "0 12px 40px rgba(30,64,175,.28)"
          }}>
            <div style={{ position:"absolute", top:-40, right:-40, width:150, height:150, borderRadius:"50%", background:"rgba(255,255,255,.07)", pointerEvents:"none" }} />
            <div style={{ position:"absolute", bottom:-30, left:-30, width:110, height:110, borderRadius:"50%", background:"rgba(255,255,255,.05)", pointerEvents:"none" }} />

            <div style={{ position: "relative" }}>
              <div style={{ width: 90, height: 90, borderRadius: "50%", border: "3px solid rgba(255,255,255,.8)", overflow: "hidden", boxShadow: "0 6px 20px rgba(0,0,0,.25)" }}>
                <img src={image} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <button
                aria-label="Edit profile"
                title="Edit Profile"
                style={{
                  position: "absolute", bottom: 0, right: 0,
                  width: 28, height: 28, borderRadius: "50%",
                  background: "white", border: "2px solid #dbeafe",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,.15)",
                  transition: "background .18s"
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#eff6ff"}
                onMouseLeave={e => e.currentTarget.style.background = "white"}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </button>
            </div>

            <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,.6)", textTransform: "uppercase", letterSpacing: ".12em", marginBottom: 5 }}>
                Lecturer
              </div>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: "white", margin: 0, lineHeight: 1.2 }}>
                {title} {name}
              </h2>
            </div>

            <div style={{ background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.18)", borderRadius: 12, padding: "10px 14px", width: "100%", position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,.55)", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 5 }}>Academic Info</div>
              <div style={{ fontSize: 12, color: "white", fontWeight: 700, marginBottom: 3 }}>{faculty}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.7)", fontWeight: 500 }}>{department}</div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%", position: "relative", zIndex: 1 }}>
              <div className="info-pill">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6"/>
                </svg>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,.85)", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{email}</span>
              </div>
              <div className="info-pill">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013 11.87a19.79 19.79 0 01-2.79-8.65A2 2 0 012.22 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l.66-.66a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 15.92v1z"/>
                </svg>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,.85)", fontWeight: 600 }}>{contactno}</span>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(34,197,94,.2)", border: "1px solid rgba(34,197,94,.35)", borderRadius: 100, padding: "5px 14px", position: "relative", zIndex: 1 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
              <span style={{ fontSize: 11, color: "#86efac", fontWeight: 700 }}>Active Session</span>
            </div>
          </section>

          <section style={{
            background: "white", borderRadius: 22, padding: "28px 26px",
            border: "1.5px solid #e2e8f0", boxShadow: "0 4px 24px rgba(30,64,175,.06)",
            display: "flex", flexDirection: "column"
          }}>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: "#3b82f6", textTransform: "uppercase", letterSpacing: ".12em", marginBottom: 4 }}>
                Lecturer Portal
              </div>
              <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#0f172a", margin: 0, letterSpacing: "-0.01em" }}>
                Manage Options
              </h3>
              <p style={{ fontSize: 13, color: "#94a3b8", marginTop: 5, fontWeight: 500 }}>
                Select an option to manage your classes and students.
              </p>
            </div>

            <div className="actions-flex" style={{ display: "flex", flexWrap: "wrap", gap: 16, flex: 1, alignContent: "flex-start" }}>

              <button className="action-card" onClick={navigateLecgenerateQR} aria-label="QR Code Generator" title="QR Code Generator">
                <div style={{ width: 60, height: 60, borderRadius: 16, background: "linear-gradient(135deg,#eff6ff,#dbeafe)", border: "1.5px solid #bfdbfe", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="5" height="5"/><rect x="16" y="3" width="5" height="5"/>
                    <rect x="3" y="16" width="5" height="5"/>
                    <path d="M21 16h-3v3M21 21v.01M16 16v.01M13 13h3M13 3v3M13 8v3M8 13H3M13 13v3M13 16h3"/>
                  </svg>
                </div>
                <span style={{ fontSize: 13, fontWeight: 800, color: "#1e40af", textAlign: "center", lineHeight: 1.3 }}>QR Code Generator</span>
                <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500, textAlign: "center" }}>Generate session QR</span>
              </button>

              <button className="action-card" onClick={attendace_history} aria-label="Attendance History" title="Attendance History">
                <div style={{ width: 60, height: 60, borderRadius: 16, background: "linear-gradient(135deg,#f0fdf4,#dcfce7)", border: "1.5px solid #bbf7d0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 8v4l3 3M3.05 11a9 9 0 109.9-7.92"/>
                    <path d="M3 4v4h4"/>
                  </svg>
                </div>
                <span style={{ fontSize: 13, fontWeight: 800, color: "#15803d", textAlign: "center", lineHeight: 1.3 }}>Attendance History</span>
                <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500, textAlign: "center" }}>View past records</span>
              </button>

              <button className="action-card" onClick={attendance_analysis} aria-label="Attendance Analysis" title="Attendance Analysis">
                <div style={{ width: 60, height: 60, borderRadius: 16, background: "linear-gradient(135deg,#fffbeb,#fef9c3)", border: "1.5px solid #fde68a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3v18h18M18 9l-5 5-4-4-3 3"/>
                  </svg>
                </div>
                <span style={{ fontSize: 13, fontWeight: 800, color: "#b45309", textAlign: "center", lineHeight: 1.3 }}>Attendance Analysis</span>
                <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500, textAlign: "center" }}>Charts & insights</span>
              </button>

              <button className="action-card" onClick={send_notification} aria-label="Send Messages" title="Send Messages">
                <div style={{ width: 60, height: 60, borderRadius: 16, background: "linear-gradient(135deg,#faf5ff,#ede9fe)", border: "1.5px solid #ddd6fe", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                  </svg>
                </div>
                <span style={{ fontSize: 13, fontWeight: 800, color: "#7c3aed", textAlign: "center", lineHeight: 1.3 }}>Send Messages</span>
                <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500, textAlign: "center" }}>Notify students</span>
              </button>

            </div>
          </section>

        </div>
      </div>
    </main>

    <Footer />
  </div>
);
};

export default AttendanceDashboard;
