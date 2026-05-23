import { useContextData } from "../../../ReloadContext.jsx";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LectureCard from "../../../components/lec_card.jsx";

export default function ViewLectures() {
  const { reload, setReload } = useContextData();
  const [loadingimg1, setloadingimg1] = useState(false);
  const [lecturerData, setlecturerData] = useState([]);
  const navigate = useNavigate();

  async function populateLec() {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/admin/lectures`,
      {
        headers: { "x-access-token": localStorage.getItem("admintoken") },
      },
    );

    if (response.data.status === "ok") {
      setlecturerData(response.data.lec_data);
      setloadingimg1(false);
      navigate("/admin");
    } else {
      alert(response.data.status);
      setloadingimg1(false);
    }
  }

  useEffect(() => {
    const fecthreports = async () => {
      setloadingimg1(true);
      const admintoken = localStorage.getItem("admintoken");
      if (!admintoken) {
        localStorage.removeItem("admintoken");
        navigate("/");
      } else {
        populateLec();
      }
    };
    fecthreports();
  }, [reload]);

return (
  <div style={{ display: "flex", flexDirection: "column", minHeight: "100%", fontFamily: "'Nunito', sans-serif" }}>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
    <style>{`
      .lec-card * { box-sizing: border-box; }
      .lec-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
        gap: 20px;
      }
      @media (max-width: 480px) {
        .lec-grid { grid-template-columns: 1fr !important; }
      }
    `}</style>
 
    <div style={{ flex: 1, padding: "8px 4px", overflowY: "auto" }}>
 
      {loadingimg1 ? (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "260px" }}>
          <img src="../src/assets/load_img1.svg" alt="Loading..." style={{ width: "96px", height: "96px" }} />
        </div>
 
      ) : lecturerData.length === 0 ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "280px", gap: 14 }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#eff6ff", border: "2px solid #dbeafe", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
            </svg>
          </div>
          <div>
            <p style={{ fontSize: 15, fontWeight: 700, color: "#475569", margin: 0, textAlign: "center" }}>No lecturers added yet</p>
            <p style={{ fontSize: 13, color: "#94a3b8", marginTop: 4, textAlign: "center" }}>Add a lecturer to see them appear here.</p>
          </div>
        </div>
 
      ) : (
        <>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: "#3b82f6", textTransform: "uppercase", letterSpacing: ".12em", marginBottom: 2 }}>Management</div>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a", margin: 0, letterSpacing: "-0.01em" }}>All Lecturers</h2>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, background: "#eff6ff", border: "1.5px solid #dbeafe", borderRadius: 10, padding: "7px 14px" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
              </svg>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#1e40af" }}>{lecturerData.length} Lecturers</span>
            </div>
          </div>
 
          <div className="lec-grid">
            {lecturerData.map((lecturer) => (
              <LectureCard
                key={lecturer._id}
                id={lecturer._id}
                name={lecturer.name}
                image={lecturer.image}
                email={lecturer.email}
                password={lecturer.password}
                gender={lecturer.gender}
                department={lecturer.department}
                faculty={lecturer.faculty}
                title={lecturer.title}
                contactno={lecturer.contactno}
              />
            ))}
          </div>
        </>
      )}
    </div>
  </div>
);
};