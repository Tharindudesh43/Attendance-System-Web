import React, { useState, useEffect } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;

// ── Icons (inline SVG) ────────────────────────────────────────────────────────
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
  plus:    "M12 5v14M5 12h14",
  trash:   "M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6",
  edit:    "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  search:  "M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z",
  close:   "M18 6L6 18M6 6l12 12",
  alert:   "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01",
  logout:  "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9",
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const initials = (name = "") =>
  name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

const Badge = ({ label, color }) => {
  const colors = {
    blue:   { bg: "#1e3a8a", text: "#93c5fd" },
    green:  { bg: "#14532d", text: "#86efac" },
    red:    { bg: "#450a0a", text: "#fca5a5" },
    amber:  { bg: "#451a03", text: "#fcd34d" },
    purple: { bg: "#2e1065", text: "#d8b4fe" },
  };
  const c = colors[color] || colors.blue;
  return (
    <span style={{
      background: c.bg, color: c.text, fontSize: 10, padding: "2px 8px",
      borderRadius: 10, fontWeight: 700, letterSpacing: ".3px", whiteSpace: "nowrap",
    }}>{label}</span>
  );
};

const StatCard = ({ label, value, sub, accent }) => (
  <div style={{
    background: "#1e293b", borderRadius: 12, padding: "16px 20px",
    borderLeft: `3px solid ${accent}`, flex: 1, minWidth: 0,
  }}>
    <div style={{ fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: ".6px", marginBottom: 6 }}>{label}</div>
    <div style={{ fontSize: 28, fontWeight: 800, color: "#f1f5f9", lineHeight: 1 }}>{value}</div>
    <div style={{ fontSize: 11, color: "#64748b", marginTop: 5 }}>{sub}</div>
  </div>
);

const ProgressRow = ({ label, rate }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: "1px solid #1e293b" }}>
    <span style={{ fontSize: 12, color: "#cbd5e1", width: 120, flexShrink: 0 }}>{label}</span>
    <div style={{ flex: 1, height: 5, background: "#334155", borderRadius: 3, overflow: "hidden" }}>
      <div style={{ width: `${rate}%`, height: "100%", background: "#3b82f6", borderRadius: 3 }} />
    </div>
    <span style={{ fontSize: 12, color: "#93c5fd", width: 36, textAlign: "right" }}>{rate}%</span>
  </div>
);

const BarChart = ({ bars }) => (
  <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 120, paddingTop: 10 }}>
    {bars.map((b, i) => (
      <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <span style={{ fontSize: 10, color: "#93c5fd" }}>{b.val}%</span>
        <div style={{
          width: "100%", background: b.color || "#3b82f6",
          borderRadius: "4px 4px 0 0", height: `${b.val}%`, minHeight: 4,
        }} />
        <span style={{ fontSize: 10, color: "#64748b" }}>{b.label}</span>
      </div>
    ))}
  </div>
);



// Overview
const Overview = ({ stats, lecturers }) => {
  const recentActivity = [
  {
    title: "Dr.",
    name: "Alex Jones",
    department: "Information and Communication Technology",
    faculty: "Faculty of Technology",
    contactno: "949348095890",
    subjects: ["SWT 40016 - Final Research and Development Project", "SWT 42016 - Industrial Placement", "SWT 41032 - Advance Software Engineering"],
  },
    {
    title: "Mr.",
    name: "Tharindu Deshan Himahansa",
    department: "Information and Communication Technology",
    faculty: "Faculty of Technology",
    contactno: "710182874",
    subjects: ["SWT 32022 - Service Oriented Web Application"],
  },
];
  return (
    <div>
      <div style={{ display: "flex", gap: 14, marginBottom: 24, flexWrap: "wrap" }}>
        <StatCard label="Total Lecturers" value={stats.totalLecturers ?? "2"} sub="+2 this month" accent="#3b82f6" />
        <StatCard label="Total Sessions"  value={stats.totalSessions ?? "5"}  sub="This semester"  accent="#22c55e" />
        <StatCard label="Present"         value={`${stats.overallRate ?? "77"}%`} sub="Attendance rate" accent="#f59e0b" />
        <StatCard label="Low Attendance"  value={stats.lowAttendance?.length ?? "0"} sub="Below 60%" accent="#ef4444" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
        <div style={{ background: "#1e293b", borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#f1f5f9", marginBottom: 12 }}>Weekly Attendance</div>
          <BarChart bars={[
            { label: "Mon", val: 82 },
            { label: "Tue", val: 75, color: "#22c55e" },
            { label: "Wed", val: 90 },
            { label: "Thu", val: 68, color: "#f59e0b" },
            { label: "Fri", val: 55, color: "#ef4444" },
          ]} />
        </div>
        <div style={{ background: "#1e293b", borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#f1f5f9", marginBottom: 12 }}>By Department</div>
          {(stats.departmentStats || [
            { name: "ICT", rate: 77 }, { name: "BST", rate: 0 },
          ]).map((d, i) => <ProgressRow key={i} label={d.name} rate={d.rate} />)}
        </div>
      </div>

      <div style={{ background: "#1e293b", borderRadius: 12, padding: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#f1f5f9", marginBottom: 14 }}>Recent Lecturers</div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr>{["Name", "Department", "Faculty", "Contact", "Subjects"].map((h) => (
              <th key={h} style={{ textAlign: "left", padding: "8px 12px", color: "#64748b", fontWeight: 500, borderBottom: "1px solid #334155", fontSize: 11, textTransform: "uppercase" }}>{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {recentActivity.map((l, i) => (
              <tr key={i} style={{ cursor: "default" }}>
                <td style={{ padding: "10px 12px", color: "#cbd5e1", borderBottom: "1px solid #0f172a" }}>
                  <span style={{
                    width: 26, height: 26, borderRadius: "50%", background: "#1e3a8a",
                    color: "#93c5fd", display: "inline-flex", alignItems: "center",
                    justifyContent: "center", fontSize: 10, fontWeight: 700,
                    marginRight: 8, verticalAlign: "middle",
                  }}>{initials(l.name)}</span>
                  {l.title} {l.name}
                </td>
                <td style={{ padding: "10px 12px", color: "#94a3b8", borderBottom: "1px solid #0f172a" }}>{l.department}</td>
                <td style={{ padding: "10px 12px", color: "#94a3b8", borderBottom: "1px solid #0f172a" }}>{l.faculty}</td>
                <td style={{ padding: "10px 12px", color: "#94a3b8", borderBottom: "1px solid #0f172a" }}>{l.contactno}</td>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #0f172a" }}>
                  <Badge label={`${l.subjects?.length ?? 0} subjects`} color="blue" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};




// ── MAIN DASHBOARD ────────────────────────────────────────────────────────────
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [lecturers, setLecturers] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchAll(); }, []);

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
    try {
      await axios.post(`${API}/api/lecturers`, form);
      fetchAll();
    } catch (err) {
      console.error("Add failed:", err);
    }
  };

  const handleDeleteLecturer = async (id) => {
    try {
      await axios.delete(`${API}/api/lecturers/${id}`);
      fetchAll();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const tabs = [
    { key: "overview",    label: "Overview",    icon: Icons.grid },
  ];

  const pageTitles = {
    overview: "Overview", lecturers: "Lecturer Management",
    attendance: "Attendance Records", reports: "Reports & Analytics",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", fontFamily: "'Segoe UI', sans-serif" }}>

      {/* Top Navbar */}
      <div style={{ background: "#1e293b", borderBottom: "1px solid #334155", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", height: 58 }}>

          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>
              &#128203;
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#f1f5f9", lineHeight: 1 }}></div>
              <div style={{ fontSize: 10, color: "#475569", lineHeight: 1.4 }}></div>
            </div>
          </div>

          {/* Tab buttons */}
          <nav style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {tabs.map((t) => (
              <button key={t.key} onClick={() => setActiveTab(t.key)} style={{
                padding: "7px 16px",
                fontSize: 13,
                fontWeight: activeTab === t.key ? 700 : 400,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 7,
                color: activeTab === t.key ? "#fff" : "#94a3b8",
                background: activeTab === t.key ? "#2563eb" : "transparent",
                border: "none",
                borderRadius: 8,
                transition: "all .15s",
              }}
                onMouseEnter={(e) => { if (activeTab !== t.key) e.currentTarget.style.background = "#0f172a"; }}
                onMouseLeave={(e) => { if (activeTab !== t.key) e.currentTarget.style.background = "transparent"; }}
              >
                <Icon d={t.icon} size={14} color={activeTab === t.key ? "#fff" : "#64748b"} />
                {t.label}
              </button>
            ))}
          </nav>

          {/* Right — admin pill + refresh */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <button onClick={fetchAll} style={{
              background: "#0f172a", border: "1px solid #334155", color: "#94a3b8",
              padding: "6px 12px", borderRadius: 8, fontSize: 12, cursor: "pointer",
            }}>&#8635; Refresh</button>
           
          </div>
        </div>

        {/* Active tab underline indicator */}
        <div style={{ display: "flex", padding: "0 28px" }}>
          {tabs.map((t) => (
            <div key={t.key} style={{
              height: 2,
              flex: "none",
              width: 80,
              marginRight: 4,
              background: activeTab === t.key ? "#3b82f6" : "transparent",
              borderRadius: 2,
              transition: "background .2s",
            }} />
          ))}
        </div>
      </div>

      {/* Page content */}
      <div style={{ padding: 28 }}>
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#f1f5f9" }}>{pageTitles[activeTab]}</div>
          <div style={{ fontSize: 12, color: "#475569", marginTop: 2 }}>Faculty of Technology · {new Date().toDateString()}</div>
        </div>

        {activeTab === "overview"   && <Overview stats={stats} lecturers={lecturers} />}
        {activeTab === "lecturers"  && <Lecturers lecturers={lecturers} onAdd={handleAddLecturer} onDelete={handleDeleteLecturer} loading={loading} />}
        {activeTab === "attendance" && <Attendance attendance={attendance} loading={loading} />}
        {activeTab === "reports"    && <Reports stats={stats} />}
      </div>
    </div>
  );
};

export default AdminDashboard;
