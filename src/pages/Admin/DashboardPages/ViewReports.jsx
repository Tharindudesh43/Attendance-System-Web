import React, { useState, useEffect } from "react";
import axios from "axios";
import { useContextData } from "../../../ReloadContext.jsx";
import { useNavigate } from "react-router-dom";
import Reportcard from "../../../components/Report_card.jsx";

export default function ViewReports() {
  const { reload, setReload } = useContextData();
  const [loadingimg1, setloadingimg1] = useState(false);
  const [reportsData, setreportsData] = useState([]);
  const [search, setSearch]           = useState("");
const [filterStatus, setFilterStatus] = useState("All");
const [filterType, setFilterType]     = useState("All");
  const navigate = useNavigate();

 const statusOptions = ["All", "Not Watched", "Watching", "Mark as Done"];
 
const typeOptions = ["All", ...Array.from(new Set(reportsData.map(r => r.report_type).filter(Boolean)))];
 
const filtered = reportsData.filter((report) => {
  const matchStatus = filterStatus === "All" || report.status?.toLowerCase() === filterStatus.toLowerCase();
  const matchType   = filterType   === "All" || report.report_type === filterType;
  const matchSearch = search === "" ||
    report.report_title?.toLowerCase().includes(search.toLowerCase()) ||
    report.user?.toLowerCase().includes(search.toLowerCase()) ||
    report.student_email?.toLowerCase().includes(search.toLowerCase());
  return matchStatus && matchType && matchSearch;
});
 
const statusCount = (s) => reportsData.filter(r => r.status?.toLowerCase() === s.toLowerCase()).length;

  async function populateReports() {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/admin_report/get_reports`,
      {
        headers: { "x-access-token": localStorage.getItem("admintoken") },
      },
    );
    if (response.data.status === "ok") {
      setreportsData(response.data.reports);
      setloadingimg1(false);
    } else {
      alert(response.data.status);
      setloadingimg1(false);
    }
  }

  useEffect(() => {
    const fecthlectures = async () => {
      setloadingimg1(true);
      const admintoken = localStorage.getItem("admintoken");
      if (!admintoken) {
        localStorage.removeItem("admintoken");
        navigate("/");
      } else {
        populateReports();
      }
    };
    fecthlectures();
  }, [reload]);

return (
  <div style={{ minHeight: "100%", fontFamily: "'Nunito', sans-serif", padding: "0 4px" }}>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
    <style>{`
      .rep-search-input {
        width: 100%; padding: 10px 14px 10px 38px;
        border-radius: 10px; border: 1.5px solid #dbeafe;
        background: #f8faff; font-size: 14px; color: #1e293b;
        font-family: 'Nunito', sans-serif; outline: none;
        transition: border-color .2s, box-shadow .2s; box-sizing: border-box;
      }
      .rep-search-input:focus { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,.13); background: white; }
      .rep-search-input::placeholder { color: #94a3b8; }
      .status-pill {
        padding: 7px 16px; border-radius: 100px; border: 1.5px solid #e2e8f0;
        font-size: 12px; font-weight: 700; cursor: pointer; background: white;
        font-family: 'Nunito', sans-serif; transition: all .18s ease; white-space: nowrap;
        flex-shrink: 0;
      }
      .status-pill:hover { border-color: #2563eb; color: #1d4ed8; background: #eff6ff; }
      .type-select {
        padding: 9px 36px 9px 14px; border-radius: 10px; border: 1.5px solid #dbeafe;
        background: #f8faff; font-size: 13px; font-weight: 700; color: #334155;
        font-family: 'Nunito', sans-serif; outline: none; cursor: pointer; appearance: none;
        background-image: url("data:image/svg+xml,%3csvg fill='none' stroke='%232563eb' stroke-width='2' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3e%3c/path%3e%3c/svg%3e");
        background-repeat: no-repeat; background-position: right 10px center; background-size: 15px;
        transition: border-color .2s, box-shadow .2s;
        box-sizing: border-box;
      }
      .type-select:focus { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,.13); background-color: white; }
      .stat-chip {
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        padding: 12px 16px; border-radius: 12px; border: 1.5px solid #e2e8f0;
        background: white; cursor: pointer; transition: all .18s ease; min-width: 80px;
        flex-shrink: 0;
      }
      .stat-chip:hover { border-color: #2563eb; box-shadow: 0 4px 14px rgba(37,99,235,.1); }
      .rep-clear-btn { flex-shrink: 0; }

      @media (max-width: 640px) {
        .rep-filter-row { flex-direction: column !important; align-items: stretch !important; }
        .rep-filter-row > div { min-width: 0 !important; flex: 1 1 auto !important; width: 100%; }
        .type-select { width: 100%; }
        .rep-clear-btn { width: 100%; text-align: center; }
        .rep-pills-row  { flex-wrap: nowrap !important; overflow-x: auto; padding-bottom: 6px; -webkit-overflow-scrolling: touch; }
        .rep-stat-chips { flex-wrap: nowrap !important; overflow-x: auto; padding-bottom: 6px; -webkit-overflow-scrolling: touch; }
        .rep-header-row { align-items: flex-start !important; }
      }
    `}</style>
 
    <div style={{ marginBottom: 22 }}>
      <div style={{ fontSize: 10, fontWeight: 800, color: "#3b82f6", textTransform: "uppercase", letterSpacing: ".12em", marginBottom: 3 }}>Admin Panel</div>
      <div className="rep-header-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
        <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#0f172a", margin: 0, letterSpacing: "-0.01em" }}>Student Reports</h2>
        <div style={{ display: "flex", alignItems: "center", gap: 7, background: "#eff6ff", border: "1.5px solid #dbeafe", borderRadius: 10, padding: "7px 14px" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
          </svg>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#1e40af" }}>{reportsData.length} Reports</span>
        </div>
      </div>
    </div>
 
    <div className="rep-stat-chips" style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
      {[
        { label: "Total",        value: reportsData.length,               bg: "#eff6ff",  border: "#dbeafe",  text: "#1e40af"  },
        { label: "Not Watched",  value: statusCount("Not Watched"),       bg: "#fff1f2",  border: "#fecdd3",  text: "#be123c"  },
        { label: "Watching",     value: statusCount("Watching"),          bg: "#fffbeb",  border: "#fde68a",  text: "#b45309"  },
        { label: "Mark as Done", value: statusCount("Mark as Done"),      bg: "#f0fdf4",  border: "#bbf7d0",  text: "#15803d"  },
      ].map(({ label, value, bg, border, text }) => (
        <div key={label} className="stat-chip" style={{ background: bg, borderColor: border }}
          onClick={() => setFilterStatus(label === "Total" ? "All" : label)}>
          <span style={{ fontSize: 22, fontWeight: 800, color: text, lineHeight: 1 }}>{value}</span>
          <span style={{ fontSize: 11, color: "#64748b", fontWeight: 600, marginTop: 3 }}>{label}</span>
        </div>
      ))}
    </div>
 
    <div style={{ background: "white", borderRadius: 14, border: "1.5px solid #e2e8f0", padding: "16px 18px", marginBottom: 20, boxShadow: "0 2px 12px rgba(30,64,175,.05)" }}>
 
      <div className="rep-filter-row" style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: "1 1 220px", minWidth: 180 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            type="text" placeholder="Search by title, user or email…"
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="rep-search-input"
          />
        </div>
 
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="type-select">
          {typeOptions.map(t => <option key={t} value={t}>{t === "All" ? "All Types" : t}</option>)}
        </select>
 
        {(search || filterStatus !== "All" || filterType !== "All") && (
          <button
            className="rep-clear-btn"
            onClick={() => { setSearch(""); setFilterStatus("All"); setFilterType("All"); }}
            style={{ padding: "9px 16px", borderRadius: 10, border: "1.5px solid #fecdd3", background: "#fff1f2", color: "#be123c", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "'Nunito',sans-serif", whiteSpace: "nowrap" }}>
            Clear Filters
          </button>
        )}
      </div>
 
      <div className="rep-pills-row" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {statusOptions.map((s) => {
          const active = filterStatus.toLowerCase() === s.toLowerCase();
          const colors = {
            All:            { bg: "#1e40af", border: "#1e40af",  text: "white" },
            "Not Watched":  { bg: "#be123c", border: "#fecdd3",  text: "white" },
            Watching:       { bg: "#b45309", border: "#fde68a",  text: "white" },
            "Mark as Done": { bg: "#15803d", border: "#bbf7d0",  text: "white" },
          };
          return (
            <button key={s} className="status-pill"
              onClick={() => setFilterStatus(s)}
              style={active ? { background: colors[s].bg, borderColor: colors[s].border, color: colors[s].text, boxShadow: "0 3px 10px rgba(30,64,175,.2)" } : {}}>
              {s}
              <span style={{ marginLeft: 6, fontSize: 10, opacity: .75 }}>
                ({s === "All" ? reportsData.length : statusCount(s)})
              </span>
            </button>
          );
        })}
      </div>
    </div>
 
    {loadingimg1 ? (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 260 }}>
        <img src="/assets/load_img1.svg" alt="Loading..." style={{ width: 96, height: 96 }} />
      </div>
 
    ) : reportsData.length === 0 ? (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 280, gap: 14, padding: "0 16px", textAlign: "center" }}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#eff6ff", border: "2px solid #dbeafe", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
          </svg>
        </div>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: "#475569", margin: 0 }}>No Reports Available</p>
          <p style={{ fontSize: 13, color: "#94a3b8", marginTop: 4 }}>Reports submitted by students will appear here.</p>
        </div>
      </div>
 
    ) : filtered.length === 0 ? (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 220, gap: 12, padding: "0 16px", textAlign: "center" }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#fffbeb", border: "2px solid #fde68a", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
        </div>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: "#475569", margin: 0 }}>No results found</p>
          <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>Try adjusting your search or filters.</p>
        </div>
      </div>
 
    ) : (
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600, marginBottom: 2 }}>
          Showing <span style={{ color: "#1e40af", fontWeight: 800 }}>{filtered.length}</span> of {reportsData.length} reports
        </div>
        {filtered.map((report) => (
          <Reportcard
            key={report._id}
            _id={report._id}
            reportId={report.reportId}
            date={report.date_of_report}
            user={report.user}
            statuspassed={report.status}
            time={report.time_of_report}
            student_email={report.student_email}
            reportTitle={report.report_title}
            reportDescription={report.report_description}
            reportType={report.report_type}
            reportImages={report.images}
            user_id={report.user_id}
          />
        ))}
      </div>
    )}
  </div>
);
}