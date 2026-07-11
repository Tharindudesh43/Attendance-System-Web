import React, { useState, useEffect } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;

const Icon = ({ d, size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const Icons = {
  grid:    "M3 3h7v7H3zm11 0h7v7h-7zM3 14h7v7H3zm11 0h7v7h-7z",
  user:    "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
  calendar:"M3 4h18v18H3zM16 2v4M8 2v4M3 10h18",
  chart:   "M3 3v18h18M18 9l-5 5-4-4-3 3",
  alert:   "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01",
  refresh: "M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15",
};

const initials = (name = "") =>
  name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

const Badge = ({ label, color }) => {
  const colors = {
    blue:   { bg: "#eff6ff", text: "#1d4ed8", border: "#bfdbfe" },
    green:  { bg: "#f0fdf4", text: "#15803d", border: "#bbf7d0" },
    red:    { bg: "#fff1f2", text: "#be123c", border: "#fecdd3" },
    amber:  { bg: "#fffbeb", text: "#b45309", border: "#fde68a" },
    purple: { bg: "#faf5ff", text: "#7e22ce", border: "#e9d5ff" },
  };
  const c = colors[color] || colors.blue;
  return (
    <span style={{
      background: c.bg, color: c.text, border: `1px solid ${c.border}`,
      fontSize: 11, padding: "3px 10px", borderRadius: 100,
      fontWeight: 700, whiteSpace: "nowrap", fontFamily: "'Nunito',sans-serif",
    }}>{label}</span>
  );
};

const StatCard = ({ label, value, sub, accent, icon }) => (
  <div className="stat-card" style={{
    background: "white", borderRadius: 16, padding: "18px 20px",
    border: "1.5px solid #e2e8f0", flex: "1 1 160px",
    boxShadow: "0 2px 14px rgba(30,64,175,.06)",
    // borderTop: `3px solid ${accent}`,
  }}>
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
      <div style={{ fontSize: 10, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".7px", fontWeight: 700 }}>{label}</div>
      <div style={{ width: 30, height: 30, borderRadius: 8, background: `${accent}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon d={icon} size={14} color={accent} />
      </div>
    </div>
    <div style={{ fontSize: 28, fontWeight: 800, color: "#0f172a", lineHeight: 1, fontFamily: "'Nunito',sans-serif" }}>{value}</div>
    <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 5, fontWeight: 500 }}>{sub}</div>
  </div>
);

const ProgressRow = ({ label, rate }) => {
  const color = rate >= 80 ? "#22c55e" : rate >= 60 ? "#3b82f6" : "#ef4444";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: "1px solid #f1f5f9" }}>
      <span style={{ fontSize: 12, color: "#475569", width: 110, flexShrink: 0, fontWeight: 600 }}>{label}</span>
      <div style={{ flex: 1, height: 6, background: "#f1f5f9", borderRadius: 100, overflow: "hidden" }}>
        <div style={{ width: `${rate}%`, height: "100%", background: color, borderRadius: 100 }} />
      </div>
      <span style={{ fontSize: 12, color, width: 36, textAlign: "right", fontWeight: 700 }}>{rate}%</span>
    </div>
  );
};

const BarChart = ({ bars }) => (
  <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 120, paddingTop: 8 }}>
    {bars.map((b, i) => (
      <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <span style={{ fontSize: 10, color: "#64748b", fontWeight: 700 }}>{b.val}%</span>
        <div style={{ width: "100%", background: b.color || "#3b82f6", borderRadius: "5px 5px 0 0", height: `${b.val}%`, minHeight: 4, opacity: .85 }} />
        <span style={{ fontSize: 10, color: "#94a3b8", fontWeight: 600 }}>{b.label}</span>
      </div>
    ))}
  </div>
);

const Overview = ({ stats }) => {
  const recentActivity = [
    { title: "Mr.",  name: "John Maxwell", department: "Information and Communication Technology", faculty: "Faculty of Technology", contactno: "9434242344", subjects: ["SWT 40016","SWT 42016","SWT 41032"] },
    { title: "Mrs.",  name: "Keera Lexi", department: "Bio Sysetm Technology", faculty: "Faculty of Technology", contactno: "949348095890", subjects: ["SWT 40016","SWT 42016","SWT 41032"] },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      <div className="stats-grid" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
        <StatCard label="Total Lecturers" value={stats.totalLecturers ?? "1"}      sub="+2 this month"    accent="#2563eb" icon={Icons.user} />
        <StatCard label="Total Sessions"  value={stats.totalSessions  ?? "2"}      sub="This semester"    accent="#22c55e" icon={Icons.calendar} />
        <StatCard label="Attendance Rate" value={`${stats.overallRate ?? "87"}%`}  sub="Overall present"  accent="#f59e0b" icon={Icons.chart} />
        <StatCard label="Low Attendance"  value={stats.lowAttendance?.length ?? "0"} sub="Below 60%"      accent="#ef4444" icon={Icons.alert} />
      </div>

      <div className="charts-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16 }}>
        <div style={{ background: "white", borderRadius: 16, padding: 20, border: "1.5px solid #e2e8f0", boxShadow: "0 2px 14px rgba(30,64,175,.05)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#0f172a", fontFamily: "'Nunito',sans-serif" }}>Weekly Attendance</div>
            <Badge label="This Week" color="blue" />
          </div>
          <BarChart bars={[
            { label: "Mon", val: 82 },
            { label: "Tue", val: 75, color: "#22c55e" },
            { label: "Wed", val: 90 },
            { label: "Thu", val: 68, color: "#f59e0b" },
            { label: "Fri", val: 55, color: "#ef4444" },
          ]} />
        </div>

        <div style={{ background: "white", borderRadius: 16, padding: 20, border: "1.5px solid #e2e8f0", boxShadow: "0 2px 14px rgba(30,64,175,.05)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#0f172a", fontFamily: "'Nunito',sans-serif" }}>By Department</div>
            <Badge label="All Depts" color="purple" />
          </div>
          {(stats.departmentStats || [{ name: "ICT", rate: 77 }, { name: "BST", rate: 0 }])
            .map((d, i) => <ProgressRow key={i} label={d.name} rate={d.rate} />)}
        </div>
      </div>

      <div style={{ background: "white", borderRadius: 16, border: "1.5px solid #e2e8f0", boxShadow: "0 2px 14px rgba(30,64,175,.05)", overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1.5px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#0f172a", fontFamily: "'Nunito',sans-serif" }}>Recent Lecturers</div>
          <Badge label={`${recentActivity.length} records`} color="blue" />
        </div>

        <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 540 }}>
            <thead>
              <tr style={{ background: "#f8faff" }}>
                {["Name","Department","Faculty","Contact","Subjects"].map(h => (
                  <th key={h} style={{ textAlign: "left", padding: "11px 16px", color: "#94a3b8", fontWeight: 700, borderBottom: "1.5px solid #e2e8f0", fontSize: 10, textTransform: "uppercase", letterSpacing: ".08em", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentActivity.map((l, i) => (
                <tr key={i} className="table-row">
                  <td style={{ padding: "13px 16px", borderBottom: "1px solid #f1f5f9", whiteSpace: "nowrap" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                      <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg,#1e40af,#3b82f6)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, flexShrink: 0 }}>
                        {initials(l.name)}
                      </div>
                      <span style={{ fontWeight: 700, color: "#0f172a", fontSize: 13 }}>{l.title} {l.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: "13px 16px", color: "#64748b", borderBottom: "1px solid #f1f5f9" }}>{l.department}</td>
                  <td style={{ padding: "13px 16px", color: "#64748b", borderBottom: "1px solid #f1f5f9", whiteSpace: "nowrap" }}>{l.faculty}</td>
                  <td style={{ padding: "13px 16px", color: "#64748b", borderBottom: "1px solid #f1f5f9" }}>{l.contactno}</td>
                  <td style={{ padding: "13px 16px", borderBottom: "1px solid #f1f5f9" }}>
                    <Badge label={`${l.subjects?.length ?? 0} subjects`} color="blue" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab]   = useState("overview");
  const [lecturers, setLecturers]   = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [stats, setStats]           = useState({});
  const [loading, setLoading]       = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);

  useEffect(() => { fetchAll(); }, []);

  useEffect(() => {
    const close = () => setMenuOpen(false);
    if (menuOpen) window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [menuOpen]);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [lecRes, attRes, repRes] = await Promise.all([
        axios.get(`${API}/api/lecturers`),
        axios.get(`${API}/api/attendance`),
        axios.get(`${API}/api/reports`),
      ]);
      setLecturers(lecRes.data.data || []);
      setAttendance(attRes.data.data || []);
      setStats(repRes.data.data || {});
    } catch (err) {
      console.error("Failed to fetch:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddLecturer = async (form) => {
    try { await axios.post(`${API}/api/lecturers`, form); fetchAll(); }
    catch (err) { console.error("Add failed:", err); }
  };

  const handleDeleteLecturer = async (id) => {
    try { await axios.delete(`${API}/api/lecturers/${id}`); fetchAll(); }
    catch (err) { console.error("Delete failed:", err); }
  };

  const tabs = [{ key: "overview", label: "Overview", icon: Icons.grid }];

  const pageTitles = {
    overview: "Overview", lecturers: "Lecturer Management",
    attendance: "Attendance Records", reports: "Reports & Analytics",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8faff", fontFamily: "'Nunito',sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        .stat-card   { transition: transform .2s ease, box-shadow .2s ease; cursor: default; }
        .stat-card:hover { transform: translateY(-3px); box-shadow: 0 8px 28px rgba(30,64,175,.13) !important; }
        .table-row   { transition: background .15s ease; }
        .table-row:hover { background: #f8faff; }
        .tab-btn     { transition: background .18s ease, color .18s ease, box-shadow .18s ease; }
        .tab-btn:hover:not(.active-tab) { background: #eff6ff !important; color: #1d4ed8 !important; }
        .refresh-btn { transition: background .18s ease, box-shadow .18s ease; }
        .refresh-btn:hover { background: #eff6ff !important; }

        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        .page-content { animation: fadeIn .4s ease forwards; }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .dash-topbar-inner { padding: 0 14px !important; }
          .dash-brand-label  { display: none !important; }
          .dash-live-badge   { display: none !important; }
          .dash-tab-label    { display: none !important; }
          .dash-page-header  { flex-direction: column !important; align-items: flex-start !important; gap: 6px !important; }
          .dash-date-badge   { font-size: 11px !important; }
          .page-pad          { padding: 14px 14px 32px !important; }
          .stat-card         { flex: 1 1 calc(50% - 7px) !important; min-width: 0 !important; }
          .charts-grid       { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 641px) and (max-width: 900px) {
          .dash-topbar-inner { padding: 0 18px !important; }
          .page-pad          { padding: 20px 18px 36px !important; }
          .stat-card         { flex: 1 1 calc(50% - 8px) !important; }
        }
        @media (min-width: 901px) {
          .stat-card { flex: 1 1 160px !important; }
        }
      `}</style>

      <div style={{ background: "white", borderBottom: "1.5px solid #dbeafe", position: "sticky", top: 0, zIndex: 20, boxShadow: "0 2px 16px rgba(30,64,175,.06)" }}>
        <div className="dash-topbar-inner" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", height: 60 }}>

          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#1e3a8a,#2563eb)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 3px 12px rgba(37,99,235,.3)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="dash-brand-label">
              <div style={{ fontSize: 15, fontWeight: 800, color: "#1e3a8a", lineHeight: 1.1 }}>Marky</div>
              <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 600 }}>Admin Dashboard</div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <button className="refresh-btn" onClick={fetchAll} style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "white", border: "1.5px solid #dbeafe", color: "#1e40af",
              padding: "7px 13px", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer",
            }}>
              <Icon d={Icons.refresh} size={13} color="#2563eb" />
              <span className="dash-tab-label">Refresh</span>
            </button>
            <div className="dash-live-badge" style={{ display: "flex", alignItems: "center", gap: 5, background: "#f0fdf4", border: "1.5px solid #bbf7d0", borderRadius: 10, padding: "7px 12px" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: "#15803d" }}>Live</span>
            </div>
          </div>
        </div>
      </div>

      <div className="page-pad" style={{ padding: "24px 28px 40px" }}>

        <div className="dash-page-header" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginBottom: 22 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#3b82f6", textTransform: "uppercase", letterSpacing: ".12em", marginBottom: 3 }}>
              Admin Dashboard
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em" }}>
              {pageTitles[activeTab]}
            </div>
          </div>
          <div className="dash-date-badge" style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600, background: "white", border: "1.5px solid #e2e8f0", borderRadius: 10, padding: "7px 13px", whiteSpace: "nowrap" }}>
            Faculty of Technology &nbsp;·&nbsp; {new Date().toDateString()}
          </div>
        </div>

        {loading && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "5rem 0", gap: 12 }}>
            <div style={{ width: 18, height: 18, borderRadius: "50%", border: "2.5px solid #dbeafe", borderTopColor: "#2563eb", animation: "spin .7s linear infinite" }} />
            <span style={{ fontSize: 14, color: "#64748b", fontWeight: 600 }}>Loading data…</span>
          </div>
        )}

        {!loading && (
          <div className="page-content">
            {activeTab === "overview"   && <Overview   stats={stats} lecturers={lecturers} />}
            {activeTab === "lecturers"  && <Lecturers  lecturers={lecturers} onAdd={handleAddLecturer} onDelete={handleDeleteLecturer} loading={loading} />}
            {activeTab === "attendance" && <Attendance attendance={attendance} loading={loading} />}
            {activeTab === "reports"    && <Reports    stats={stats} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;