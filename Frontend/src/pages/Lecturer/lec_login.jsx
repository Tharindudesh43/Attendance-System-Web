import React, { useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useSnackbar } from "notistack";
import { green } from "@mui/material/colors";

const LecLogin = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setloading] = useState(false);

  const LogInButton = styled(Button)(({ theme }) => ({
    color: "white",
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  }));

  async function LoginLecturerUser(event) {
    event.preventDefault();
    setloading(true);
    if (email === "" || password === "") {
      enqueueSnackbar("Please Complete all fields !", {
        variant: "error",
        autoHideDuration: 3000,
      });
      setloading(false);
    } else {
      try {
        const LecturrLogingDetails = new FormData();
        LecturrLogingDetails.append("email", email);
        LecturrLogingDetails.append("password", password);
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/lecturer/lecturerlogin`,
          LecturrLogingDetails,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        );
        const data = await response.data;
        if (data.status === "ok") {
          localStorage.clear();
          localStorage.setItem("lecturertoken", data.user);
          localStorage.setItem("role", "lecturer");
          enqueueSnackbar("Lecturer Loging Successful !", {
            variant: "success",
            autoHideDuration: 3000,
          });
          setloading(true);
          navigate("/lecturer");
        } else {
          console.log(data);
          enqueueSnackbar("Lecturer Not Found !", {
            variant: "error",
            autoHideDuration: 3000,
          });
          console.log("Error with lecturer loging");
          setloading(false);
        }
      } catch (error) {
        console.log(error);
        setloading(false);
      }
    }
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        fontFamily: "'Nunito', sans-serif",
        background: "#f0f5ff",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <style>{`
      .lec-input {
        width: 100%; padding: 12px 16px; border-radius: 10px;
        border: 1.5px solid #bae6fd; background: white; font-size: 15px;
        color: #1e293b; font-family: 'Nunito', sans-serif; outline: none;
        transition: border-color .2s ease, box-shadow .2s ease; box-sizing: border-box;
      }
      .lec-input:focus {
        border-color: #0284c7;
        box-shadow: 0 0 0 3px rgba(2,132,199,.15);
      }
      .lec-input::placeholder { color: #94a3b8; }
    `}</style>

      <Header />

      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 1rem",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "960px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(2,132,199,.14)",
          }}
        >
          <div
            style={{
              background:
                "linear-gradient(145deg, #0369a1 0%, #0284c7 55%, #0ea5e9 100%)",
              padding: "3rem 2.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-60px",
                right: "-60px",
                width: "220px",
                height: "220px",
                borderRadius: "50%",
                background: "rgba(255,255,255,.06)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-40px",
                left: "-40px",
                width: "160px",
                height: "160px",
                borderRadius: "50%",
                background: "rgba(255,255,255,.04)",
              }}
            />

            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "14px",
                background: "rgba(255,255,255,.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.5rem",
                border: "1px solid rgba(255,255,255,.2)",
              }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path
                  d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="9" cy="7" r="4" stroke="white" strokeWidth="2" />
                <path
                  d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "rgba(255,255,255,.6)",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                marginBottom: "10px",
                position: "relative",
              }}
            >
              Marky Attendance
            </div>
            <h2
              style={{
                fontFamily: "'Nunito',sans-serif",
                fontSize: "clamp(1.7rem,3.5vw,2.4rem)",
                fontWeight: 800,
                color: "white",
                lineHeight: 1.2,
                marginBottom: "1rem",
                position: "relative",
              }}
            >
              Lecturer Portal
            </h2>
            <p
              style={{
                fontSize: "15px",
                color: "rgba(255,255,255,.72)",
                lineHeight: 1.7,
                position: "relative",
                maxWidth: "300px",
              }}
            >
              Mark attendance, view your assigned classes, and manage student
              participation records.
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginTop: "2.5rem",
                position: "relative",
              }}
            >
              {[
                [
                  "Mark Attendance",
                  "Quickly record student presence per session",
                ],
                [
                  "Class Overview",
                  "View all your assigned modules and schedules",
                ],
                [
                  "Student Records",
                  "Track individual attendance history and trends",
                ],
              ].map(([title, desc]) => (
                <div
                  key={title}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      width: "18px",
                      height: "18px",
                      borderRadius: "50%",
                      background: "rgba(255,255,255,.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  >
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6l3 3 5-5"
                        stroke="white"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "white",
                      }}
                    >
                      {title}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "rgba(255,255,255,.55)",
                        marginTop: "1px",
                      }}
                    >
                      {desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              background: "white",
              padding: "3rem 2.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div style={{ marginBottom: "2rem" }}>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#0284c7",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  marginBottom: "8px",
                }}
              >
                Welcome back
              </div>
              <h3
                style={{
                  fontFamily: "'Nunito',sans-serif",
                  fontSize: "1.9rem",
                  fontWeight: 800,
                  color: "#0f172a",
                  letterSpacing: "-0.02em",
                }}
              >
                Sign in
              </h3>
              <p
                style={{ color: "#64748b", fontSize: "14px", marginTop: "6px" }}
              >
                Enter your credentials to access the lecturer dashboard.
              </p>
            </div>

            <form
              onSubmit={LoginLecturerUser}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#334155",
                    marginBottom: "7px",
                  }}
                >
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  onChange={(e) => setemail(e.target.value)}
                  required
                  className="lec-input"
                  placeholder="lecturer@university.edu"
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#334155",
                    marginBottom: "7px",
                  }}
                >
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  onChange={(e) => setpassword(e.target.value)}
                  required
                  className="lec-input"
                  placeholder="Enter your password"
                />
              </div>

              <div style={{ marginTop: "0.5rem" }}>
                <LogInButton
                  loadingPosition="end"
                  onClick={LoginLecturerUser}
                  loading={loading}
                  fullWidth
                  style={{
                    width: "100%",
                    padding: "13px",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #0369a1, #0ea5e9)",
                    color: "white",
                    fontSize: "15px",
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'Nunito',sans-serif",
                    boxShadow: "0 6px 22px rgba(2,132,199,.35)",
                    transition: "opacity .2s ease, transform .2s ease",
                    letterSpacing: "0.01em",
                  }}
                  variant="contained"
                >
                  Log In
                </LogInButton>
              </div>
            </form>

            <div
              style={{
                marginTop: "2rem",
                padding: "1rem 1.25rem",
                background: "#f0f9ff",
                borderRadius: "12px",
                border: "1px solid #bae6fd",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: "#bae6fd",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                    stroke="#0369a1"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div
                style={{ fontSize: "12px", color: "#475569", lineHeight: 1.5 }}
              >
                <span style={{ fontWeight: 700, color: "#0284c7" }}>
                  Faculty access only.
                </span>{" "}
                This portal is restricted to registered university lecturers.
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LecLogin;
