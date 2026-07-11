import React, { useEffect, useState } from "react";
import Header from "../../components/header.jsx";
import Footer from "../../components/footer.jsx";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useContextData } from "../../ReloadContext.jsx";
import loadingimage from "/assets/load_img1.svg";
import LecSubjectDeleteModal from "../../components/Lec_subjectDelete_modal.jsx";

const Lecturer_Attendance_History = () => {
  const { id } = useParams();
  const subjectqr = new FormData();
  const [allsubjects, setallsubjects] = useState([]);
  const [DeleteConfirmShowModal, setDeleteConfirmShowModal] = useState(false);
  const [subject, setsubject] = useState("");
  const [subjectIndex, setsubjectIndex] = useState();
  const [year, setyear] = useState("");
  const [selectedindex, setselectedindex] = useState("");
  const { reload, setReload } = useContextData();
  const navigate = useNavigate();
  const [loadingimg2, setloadingimg2] = useState(false);

  const navigateback = () => {
    navigate("/lecturer");
  };

  useEffect(() => {
    const fetchSubjects = async () => {
      setloadingimg2(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/lecturer/subjectsdetails/${id}`
        );
        if (response.data.status === "ok") {
          setallsubjects(response.data.subjects);
          console.log(allsubjects);
          setloadingimg2(false);
        } else if (response.data.subjects === "No subjects available") {
          setloadingimg2(false);
          setallsubjects("No subjects available");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchSubjects();
  }, [reload]);

 return (
  <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#f0f5ff", fontFamily: "'Nunito', sans-serif" }}>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
    <style>{`
      * { box-sizing: border-box; }
      .att-row { transition: background .15s ease; cursor: pointer; }
      .att-row:hover { background: #f0f5ff !important; }
      .att-action-btn {
        display: flex; align-items: center; justify-content: center;
        width: 32px; height: 32px; border-radius: 8px; border: none;
        cursor: pointer; transition: background .18s ease, transform .18s ease;
      }
      .att-action-btn:hover { transform: scale(1.1); }
      .back-btn {
        display: inline-flex; align-items: center; gap: 7px;
        padding: 8px 16px; border-radius: 10px; border: 1.5px solid #dbeafe;
        background: white; color: #1e40af; font-size: 13px; font-weight: 700;
        cursor: pointer; font-family: 'Nunito', sans-serif;
        transition: background .18s ease, box-shadow .18s ease;
      }
      .back-btn:hover { background: #eff6ff; box-shadow: 0 2px 10px rgba(37,99,235,.12); }
      @media (max-width: 640px) {
        .att-page-pad { padding: 14px !important; }
        .att-header-pad { padding: 12px 16px !important; }
      }
    `}</style>

    <Header />

    <div className="att-header-pad" style={{ background: "white", borderBottom: "1.5px solid #dbeafe", padding: "16px 28px", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", boxShadow: "0 2px 12px rgba(30,64,175,.05)" }}>
      <button className="back-btn" onClick={() => navigateback()}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 5l-7 7 7 7"/>
        </svg>
        Back
      </button>

      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: "#3b82f6", textTransform: "uppercase", letterSpacing: ".12em", marginBottom: 2 }}>Lecturer Portal</div>
        <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a", margin: 0, letterSpacing: "-0.01em" }}>Attendance History</h2>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 7, background: "#eff6ff", border: "1.5px solid #dbeafe", borderRadius: 10, padding: "7px 14px" }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
        </svg>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#1e40af" }}>My Subjects</span>
      </div>
    </div>

    <div className="att-page-pad" style={{ flex: 1, padding: "24px 28px 40px" }}>
      <div style={{ background: "white", borderRadius: 18, border: "1.5px solid #e2e8f0", boxShadow: "0 2px 16px rgba(30,64,175,.06)", overflow: "hidden" }}>

        <div style={{ padding: "16px 20px", borderBottom: "1.5px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: "#0f172a" }}>Subject Records</div>
          <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600 }}>
            Click a row to view details or use actions to manage
          </div>
        </div>

        <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 580 }}>
            <thead>
              <tr style={{ background: "#f8faff" }}>
                {["Academic Year", "Year", "Semester", "Subject", "Sem Version", "Actions"].map(h => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", color: "#94a3b8", fontWeight: 700, borderBottom: "1.5px solid #e2e8f0", fontSize: 11, textTransform: "uppercase", letterSpacing: ".07em", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>

            {loadingimg2 ? (
              <tbody>
                <tr>
                  <td colSpan="6" style={{ padding: "3rem", textAlign: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                      <div style={{ width: 16, height: 16, borderRadius: "50%", border: "2.5px solid #dbeafe", borderTopColor: "#2563eb", animation: "spin .7s linear infinite" }} />
                      <style>{`@keyframes spin { to { transform:rotate(360deg); } }`}</style>
                      <span style={{ fontSize: 13, color: "#94a3b8", fontWeight: 600 }}>Loading subjects…</span>
                    </div>
                  </td>
                </tr>
              </tbody>

            ) : allsubjects && allsubjects === "No subjects available" ? (
              <tbody>
                <tr>
                  <td colSpan="6" style={{ padding: "3.5rem", textAlign: "center" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#eff6ff", border: "2px solid #dbeafe", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
                        </svg>
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "#475569" }}>No subjects added yet</div>
                        <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 3 }}>Subjects assigned to you will appear here.</div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>

            ) : (
              <tbody>
                {allsubjects.map((subjectSet, index) =>
                  subjectSet.map((subjectDetails, subIndex) => (
                    <tr key={`${index}-${subIndex}`} className="att-row" style={{ background: "white" }}>

                      <td style={{ padding: "14px 16px", color: "#1e293b", fontWeight: 700, borderBottom: "1px solid #f1f5f9" }}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#2563eb", display: "inline-block", flexShrink: 0 }} />
                          {subjectDetails[1]}
                        </span>
                      </td>

                      <td style={{ padding: "14px 16px", borderBottom: "1px solid #f1f5f9" }}>
                        <span style={{ display: "inline-block", background: "#eff6ff", color: "#1d4ed8", border: "1px solid #bfdbfe", borderRadius: 100, padding: "3px 10px", fontSize: 12, fontWeight: 700 }}>
                          {subjectDetails[0]}
                        </span>
                      </td>

                      <td style={{ padding: "14px 16px", color: "#475569", fontWeight: 600, borderBottom: "1px solid #f1f5f9" }}>
                        {subjectDetails[2]}
                      </td>

                      <td style={{ padding: "14px 16px", color: "#0f172a", fontWeight: 700, borderBottom: "1px solid #f1f5f9", maxWidth: 220 }}>
                        <span style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {subjectDetails[3]}
                        </span>
                      </td>

                      <td style={{ padding: "14px 16px", borderBottom: "1px solid #f1f5f9" }}>
                        <span style={{ display: "inline-block", background: "#f0fdf4", color: "#15803d", border: "1px solid #bbf7d0", borderRadius: 100, padding: "3px 10px", fontSize: 12, fontWeight: 700 }}>
                          {subjectDetails[4]}
                        </span>
                      </td>

                      <td style={{ padding: "14px 16px", borderBottom: "1px solid #f1f5f9" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <button
                            className="att-action-btn"
                            title="View Details"
                            onClick={() => {
                              setselectedindex(index);
                              navigate(`/lecturer/att_history_data/${id}/${encodeURIComponent(subjectDetails[3])}/${encodeURIComponent(subjectDetails[1])}`);
                            }}
                            style={{ background: "#eff6ff", border: "1.5px solid #bfdbfe" }}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
                            </svg>
                          </button>

                          <button
                            className="att-action-btn"
                            title="Delete Subject"
                            onClick={(e) => {
                              e.stopPropagation();
                              setyear(subjectDetails[1]);
                              setsubject(subjectDetails[3]);
                              setsubjectIndex(index);
                              setDeleteConfirmShowModal(true);
                            }}
                            style={{ background: "#fff1f2", border: "1.5px solid #fecdd3" }}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#be123c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6"/>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>

    {DeleteConfirmShowModal && (
      <LecSubjectDeleteModal
        year_study={year}
        id={id}
        subject={subject}
        subjectIndex={subjectIndex}
        onClose={() => setDeleteConfirmShowModal(false)}
      />
    )}

    <Footer />
  </div>
);
};

export default Lecturer_Attendance_History;
