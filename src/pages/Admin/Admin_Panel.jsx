import React, { useEffect, useState } from "react";
import Header from "../../components/header.jsx";
import Footer from "../../components/footer.jsx";
import { useNavigate } from "react-router-dom";
import LectureCard from "../../components/lec_card.jsx";
import Dashboard from "./DashboardPages/AdminDashboard.jsx";
import AddLectures from "./DashboardPages/AddLecturers.jsx";
import ViewLectures from "./DashboardPages/ViewLectures.jsx";
import ViewReports from "./DashboardPages/ViewReports.jsx";
import { useSnackbar } from "notistack";

const ICONS = {
  Home: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 21V12h6v9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Dashboard: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect
        x="3"
        y="3"
        width="7"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect
        x="14"
        y="3"
        width="7"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect
        x="3"
        y="14"
        width="7"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect
        x="14"
        y="14"
        width="7"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  ),
  "Add Lecturer": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
      <path
        d="M19 8v6M16 11h6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  "View Lectures": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  "View Reports": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 2v6h6M8 13h8M8 17h5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
};

const Sidebar = ({ onSelect, selected, isOpen, toggle, onHome, onLogout }) => {
  const options = [
    "Dashboard",
    "Add Lecturer",
    "View Lectures",
    "View Reports",
  ];

  return (
    <>
      <style>{`
        .sb-item {
          display: flex; align-items: center; gap: 11px;
          padding: 11px 14px; border-radius: 11px; cursor: pointer;
          font-family: 'Nunito', sans-serif; font-size: 14px; font-weight: 600;
          color: #64748b; transition: background .18s ease, color .18s ease;
          border: none; background: none; width: 100%; text-align: left;
        }
        .sb-item:hover { background: #eff6ff; color: #1e40af; }
        .sb-item.active {
          background: linear-gradient(135deg, #1e40af, #2563eb);
          color: white; box-shadow: 0 4px 14px rgba(37,99,235,.3);
        }
        .sb-item.active svg { color: white; }
      `}</style>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 1.25rem",
          height: "54px",
          background: "white",
          borderBottom: "1.5px solid #dbeafe",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
        className="md:hidden"
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "8px",
              background: "linear-gradient(135deg,#1e3a8a,#2563eb)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 12l2 2 4-4"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span
            style={{
              fontFamily: "'Nunito',sans-serif",
              fontWeight: 800,
              fontSize: "16px",
              color: "#1e3a8a",
            }}
          >
            Admin Panel
          </span>
        </div>
        <button
          onClick={toggle}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "36px",
            height: "36px",
            borderRadius: "9px",
            background: "#eff6ff",
            border: "1.5px solid #dbeafe",
            cursor: "pointer",
          }}
        >
          <svg
            width="17"
            height="17"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#1e40af"
            strokeWidth="2.2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          padding: "1.25rem 1rem",
          gap: "4px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "0 6px",
            marginBottom: "1.25rem",
          }}
          className="hidden md:flex"
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "linear-gradient(135deg,#1e3a8a,#2563eb)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: "0 3px 12px rgba(37,99,235,.3)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 12l2 2 4-4"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Nunito',sans-serif",
                fontWeight: 800,
                fontSize: "16px",
                color: "#1e3a8a",
                lineHeight: 1.2,
              }}
            >
              Marky
            </div>
            <div
              style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 600 }}
            >
              Admin Panel
            </div>
          </div>
        </div>

        <div
          style={{
            fontSize: "10px",
            fontWeight: 800,
            color: "#cbd5e1",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            padding: "0 6px",
            marginBottom: "6px",
          }}
        >
          Navigation
        </div>

        {options.map((option) => (
          <button
            key={option}
            className={`sb-item${selected === option ? " active" : ""}`}
            onClick={() => {
              onSelect(option);
              if (isOpen) toggle();
            }}
          >
            <span
              style={{ flexShrink: 0, opacity: selected === option ? 1 : 0.7 }}
            >
              {ICONS[option]}
            </span>
            {option}
          </button>
        ))}

        <div
          style={{
            marginTop: "auto",
            paddingTop: "1.5rem",
            borderTop: "1px solid #f1f5f9",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <button
            className="sb-item"
            onClick={() => {
              if (onHome) onHome();
              if (isOpen) toggle();
            }}
            style={{
              color: "#1e40af",
              background: "#eff6ff",
              border: "1.5px solid #dbeafe",
            }}
          >
            <span style={{ flexShrink: 0 }}>{ICONS.Home}</span>
            Back to Home
          </button>

          <button
            className="sb-item"
            onClick={() => {
              if (onLogout) onLogout();
              if (isOpen) toggle();
            }}
            style={{
              color: "#be123c",
              background: "#fff1f2",
              border: "1.5px solid #fecdd3",
            }}
          >
            <span style={{ flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 17l5-5-5-5M21 12H9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            Log Out
          </button>
          <div
            style={{
              padding: "12px 14px",
              background: "#f8faff",
              borderRadius: "12px",
              border: "1px solid #dbeafe",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "#3b82f6",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "3px",
              }}
            >
              Logged in as
            </div>
            <div
              style={{ fontSize: "13px", fontWeight: 700, color: "#1e293b" }}
            >
              Administrator
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                marginTop: "5px",
              }}
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "#22c55e",
                  display: "inline-block",
                }}
              />
              <span
                style={{ fontSize: "12px", color: "#64748b", fontWeight: 600 }}
              >
                Active session
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderContent = () => {
    switch (selected) {
      case "Add Lecturer":
        return <AddLectures />;
      case "View Lectures":
        return <ViewLectures />;
      case "View Reports":
        return <ViewReports />;
      case "Dashboard":
        return <Dashboard />;
      default:
        return <Dashboard />;
    }
  };

  const handleSelect = (item) => {
    setSelected(item);
    if (isMobile) setSidebarOpen(false);
  };

  const toggle = () => setSidebarOpen((prev) => !prev);

  const moveHome = () => {
    navigate("/");
  };

  async function logoutadmin() {
    localStorage.removeItem("admintoken");
    enqueueSnackbar("Logged out successfully!", {
      variant: "info",
      autoHideDuration: 3000,
    });
    localStorage.setItem("role", "");
    navigate("/");
  }

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; }
        .adm-sidebar {
          width: 240px; flex-shrink: 0;
          background: white;
          border-right: 1.5px solid #dbeafe;
          box-shadow: 4px 0 24px rgba(30,64,175,.08);
          overflow-y: auto;
          transition: transform .28s cubic-bezier(.22,1,.36,1);
          z-index: 130;
        }
        @media (min-width: 768px) {
          .adm-sidebar {
            position: sticky !important;
            top: 0 !important;
            height: 100vh !important;
            transform: none !important;
          }
          .adm-topbar { display: none !important; }
        }
        @media (max-width: 767px) {
          .adm-sidebar {
            position: fixed !important;
            top: 0 !important; left: 0 !important; bottom: 0 !important;
            height: 100vh !important;
          }
        }
        .hidden { display: none; }
        .md\\:flex { display: flex; }
        @media (max-width: 767px) { .md\\:flex { display: none !important; } }
        @media (min-width: 768px)  { .md\\:hidden { display: none !important; } }
      `}</style>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          background: "#f0f5ff",
          fontFamily: "'Nunito',sans-serif",
        }}
      >
        {isMobile && (
          <div
            className="adm-topbar"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 1.25rem",
              height: "54px",
              background: "white",
              borderBottom: "1.5px solid #dbeafe",
              boxShadow: "0 2px 12px rgba(30,64,175,.07)",
              position: "sticky",
              top: 0,
              zIndex: 30,
            }}
          >
            <button
              onClick={toggle}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "38px",
                height: "38px",
                borderRadius: "10px",
                background: "#eff6ff",
                border: "1.5px solid #dbeafe",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              {sidebarOpen ? (
                <svg
                  width="17"
                  height="17"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#1e40af"
                  strokeWidth="2.2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  width="17"
                  height="17"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#1e40af"
                  strokeWidth="2.2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
            <span
              style={{
                fontFamily: "'Nunito',sans-serif",
                fontWeight: 800,
                fontSize: "16px",
                color: "#1e3a8a",
              }}
            >
              {selected}
            </span>
            <div style={{ width: "38px" }} />
          </div>
        )}

        <div
          style={{
            display: "flex",
            flex: 1,
            minHeight: 0,
            position: "relative",
          }}
        >
          {isMobile && sidebarOpen && (
            <div
              onClick={() => setSidebarOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(15,23,42,.5)",
                zIndex: 120,
                backdropFilter: "blur(3px)",
                cursor: "pointer",
              }}
            />
          )}

          <div
            className="adm-sidebar"
            style={{
              transform: isMobile
                ? sidebarOpen
                  ? "translateX(0)"
                  : "translateX(-100%)"
                : "none",
            }}
          >
            <Sidebar
              onSelect={handleSelect}
              selected={selected}
              isOpen={sidebarOpen}
              toggle={toggle}
              onHome={moveHome}
              onLogout={logoutadmin}
            />
          </div>

          <div
            style={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              overflow: "auto",
            }}
          >
            <div
              style={{
                padding: "1.25rem 2rem",
                background: "white",
                borderBottom: "1.5px solid #e2e8f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "0.75rem",
                position: "sticky",
                top: 0,
                zIndex: 20,
                boxShadow: "0 2px 12px rgba(30,64,175,.05)",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#3b82f6",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    marginBottom: "3px",
                  }}
                >
                  Admin Dashboard
                </div>
                <h1
                  style={{
                    fontFamily: "'Nunito',sans-serif",
                    fontSize: "1.4rem",
                    fontWeight: 800,
                    color: "#0f172a",
                    letterSpacing: "-0.02em",
                    margin: 0,
                  }}
                >
                  {selected}
                </h1>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                    background: "#f0fdf4",
                    border: "1.5px solid #bbf7d0",
                    borderRadius: "10px",
                    padding: "7px 14px",
                  }}
                >
                  <span
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      background: "#22c55e",
                      display: "inline-block",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#15803d",
                    }}
                  >
                    System Active
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                    background: "#eff6ff",
                    border: "1.5px solid #dbeafe",
                    borderRadius: "10px",
                    padding: "7px 14px",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12"
                      cy="8"
                      r="3.5"
                      stroke="#1e40af"
                      strokeWidth="2"
                    />
                    <path
                      d="M5 20a7 7 0 0114 0"
                      stroke="#1e40af"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#1e40af",
                    }}
                  >
                    Administrator
                  </span>
                </div>
              </div>
            </div>

            <div style={{ flex: 1, padding: "2rem", background: "#f8faff" }}>
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
