import Header from "../../components/header";
import Footer from "../../components/footer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { purple } from "@mui/material/colors";

const AdminLogin = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setloading] = useState(false);

  const LogInButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  }));

  async function LoginAdminUser(event) {
    event.preventDefault();
    setloading(true);
    if (email === "" || password === " ") {
      enqueueSnackbar("Please Complete all fields !", {
        variant: "error",
        autoHideDuration: 3000,
      });
      setloading(false);
    } else {
      try {
        const AdminLogingDetails = new FormData();
        AdminLogingDetails.append("email", email);
        AdminLogingDetails.append("password", password);
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/admin/adminlogin`,
          AdminLogingDetails,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        );
        const data = await response.data;
        if (data.status === "ok") {
          localStorage.clear();
          localStorage.setItem("admintoken", data.user);
          localStorage.setItem("role", "admin");
          enqueueSnackbar("Admin Loging Successful !", {
            variant: "success",
            autoHideDuration: 3000,
          });
          setloading(true);
          navigate("/admin");
        } else {
          console.log(data);
          enqueueSnackbar("Admin Not Found !", {
            variant: "error",
            autoHideDuration: 3000,
          });
          console.log("Error with admin loging");
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
      .admin-input {
        width: 100%; padding: 12px 16px; border-radius: 10px;
        border: 1.5px solid #dbeafe; background: white; font-size: 15px;
        color: #1e293b; font-family: 'Nunito', sans-serif; outline: none;
        transition: border-color .2s ease, box-shadow .2s ease; box-sizing: border-box;
      }
      .admin-input:focus {
        border-color: #2563eb;
        box-shadow: 0 0 0 3px rgba(37,99,235,.15);
      }
      .admin-input::placeholder { color: #94a3b8; }
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
            gap: "0",
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(30,64,175,.13)",
          }}
        >
          <div
            style={{
              background:
                "linear-gradient(145deg, #1e3a8a 0%, #1e40af 55%, #2563eb 100%)",
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
                <circle cx="12" cy="8" r="3.5" stroke="white" strokeWidth="2" />
                <path
                  d="M5 20a7 7 0 0114 0"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M18 3l1.5 1.5L22 2"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
              Admin Portal
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
              Manage users, attendance records, and system settings from your
              secure dashboard.
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
                ["User Management", "Manage all lecturer and student accounts"],
                ["Attendance Reports", "Generate and export detailed reports"],
                ["System Settings", "Configure platform preferences"],
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
                  color: "#3b82f6",
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
                Enter your credentials to access the admin dashboard.
              </p>
            </div>

            <form
              onSubmit={LoginAdminUser}
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
                  className="admin-input"
                  placeholder="admin@university.edu"
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
                  className="admin-input"
                  placeholder="Enter your password"
                />
              </div>

              <div style={{ marginTop: "0.5rem" }}>
                <LogInButton
                  loadingPosition="end"
                  onClick={LoginAdminUser}
                  loading={loading}
                  fullWidth
                  style={{
                    width: "100%",
                    padding: "13px",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #1e40af, #2563eb)",
                    color: "white",
                    fontSize: "15px",
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'Nunito',sans-serif",
                    boxShadow: "0 6px 22px rgba(37,99,235,.35)",
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
                background: "#f8faff",
                borderRadius: "12px",
                border: "1px solid #dbeafe",
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
                  background: "#dbeafe",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect
                    x="3"
                    y="11"
                    width="18"
                    height="11"
                    rx="2"
                    stroke="#1e40af"
                    strokeWidth="2"
                  />
                  <path
                    d="M7 11V7a5 5 0 0110 0v4"
                    stroke="#1e40af"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div
                style={{ fontSize: "12px", color: "#475569", lineHeight: 1.5 }}
              >
                <span style={{ fontWeight: 700, color: "#1e40af" }}>
                  Secure access only.
                </span>{" "}
                This portal is restricted to authorized administrators.
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminLogin;
