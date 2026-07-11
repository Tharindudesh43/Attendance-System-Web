import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header";
import { useParams } from "react-router-dom";
import Footer from "../../components/footer";
import { PieChart, BarChart, LineChart } from "@mui/x-charts";
import { Card, CardContent, Typography, Box } from "@mui/material";
import axios from "axios";

const styles = {
  page: {
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "#f0f4ff",
  },

  hero: {
    background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 55%, #2563eb 100%)",
    padding: "0",
    position: "relative",
    overflow: "hidden",
  },
  heroInner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "28px 24px 24px",
    position: "relative",
    zIndex: 1,
  },
  heroDecor: {
    position: "absolute",
    top: "-60px",
    right: "-60px",
    width: "260px",
    height: "260px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.06)",
    pointerEvents: "none",
  },
  heroDecor2: {
    position: "absolute",
    bottom: "-80px",
    left: "10%",
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.04)",
    pointerEvents: "none",
  },
  backBtn: {
    position: "absolute",
    left: "24px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.25)",
    color: "#fff",
    padding: "8px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
    backdropFilter: "blur(6px)",
    transition: "background 0.2s",
    letterSpacing: "0.3px",
  },
  heroTitle: {
    color: "#fff",
    fontSize: "clamp(18px, 2.5vw, 26px)",
    fontWeight: "700",
    letterSpacing: "-0.5px",
    margin: 0,
  },
  heroSub: {
    color: "rgba(255,255,255,0.65)",
    fontSize: "12px",
    fontWeight: "400",
    textAlign: "center",
    marginTop: "2px",
    letterSpacing: "0.4px",
  },

  /* ── Section label ── */
  sectionLabel: {
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    color: "#6b7280",
    marginBottom: "12px",
  },

  /* ── Lecture progress cards strip ── */
  lectureStrip: {
    padding: "28px 28px 8px",
  },
  lectureScroll: {
    display: "flex",
    gap: "16px",
    overflowX: "auto",
    paddingBottom: "12px",
    scrollbarWidth: "thin",
    scrollbarColor: "#c7d2fe transparent",
    WebkitOverflowScrolling: "touch",
  },
  lectureCard: {
    minWidth: "230px",
    maxWidth: "230px",
    background: "#fff",
    borderRadius: "16px",
    padding: "18px 18px 14px",
    boxShadow: "0 2px 12px rgba(30,58,138,0.08)",
    border: "1px solid #e0e7ff",
    flexShrink: 0,
    transition: "transform 0.2s, box-shadow 0.2s",
    cursor: "default",
  },
  subjectName: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#1e3a8a",
    marginBottom: "10px",
    lineHeight: "1.3",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  badgeRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "5px",
    marginBottom: "12px",
  },
  badge: (color) => ({
    fontSize: "10px",
    fontWeight: "600",
    padding: "3px 9px",
    borderRadius: "20px",
    color: "#fff",
    background: color,
    letterSpacing: "0.3px",
  }),
  progressTrack: {
    height: "6px",
    background: "#e0e7ff",
    borderRadius: "99px",
    marginBottom: "8px",
    overflow: "hidden",
  },
  progressFill: (pct) => ({
    height: "100%",
    width: `${pct}%`,
    background: "linear-gradient(90deg, #2563eb, #60a5fa)",
    borderRadius: "99px",
    transition: "width 0.6s ease",
  }),
  progressMeta: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "11px",
    fontWeight: "600",
    color: "#6b7280",
  },
  progressDone: {
    color: "#2563eb",
  },
  progressRem: {
    color: "#f59e0b",
  },

  /* ── Charts grid ── */
  chartsSection: {
    padding: "8px 28px 28px",
    flex: 1,
  },
  chartsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    marginBottom: "20px",
  },
  chartCard: {
    background: "#fff",
    borderRadius: "18px",
    padding: "22px 20px 14px",
    boxShadow: "0 2px 16px rgba(30,58,138,0.08)",
    border: "1px solid #e0e7ff",
    minWidth: 0, // allow grid/flex children to shrink below content size
  },
  chartCardAccent: (color) => ({
    borderTop: `3px solid ${color}`,
  }),
  chartTitle: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#1e3a8a",
    marginBottom: "4px",
    letterSpacing: "-0.1px",
  },
  chartSubtitle: {
    fontSize: "11px",
    color: "#9ca3af",
    marginBottom: "14px",
    fontWeight: "500",
  },
  chartDivider: {
    height: "1px",
    background: "#f1f5f9",
    margin: "0 -20px 16px",
  },

  wideCard: {
    background: "#fff",
    borderRadius: "18px",
    padding: "22px 24px 18px",
    boxShadow: "0 2px 16px rgba(30,58,138,0.08)",
    border: "1px solid #e0e7ff",
    borderTop: "3px solid #2563eb",
    minWidth: 0,
  },

  stateBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "180px",
    gap: "10px",
  },
  spinner: {
    width: "32px",
    height: "32px",
    border: "3px solid #e0e7ff",
    borderTop: "3px solid #2563eb",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  stateText: {
    fontSize: "13px",
    color: "#9ca3af",
    fontWeight: "500",
  },
  errorText: {
    fontSize: "13px",
    color: "#ef4444",
    fontWeight: "500",
  },
};

if (typeof document !== "undefined") {
  const existing = document.getElementById("__lec-spin");
  if (!existing) {
    const s = document.createElement("style");
    s.id = "__lec-spin";
    s.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
      @keyframes spin { to { transform: rotate(360deg); } }
      .__lec-card:hover { transform: translateY(-3px) !important; box-shadow: 0 8px 28px rgba(30,58,138,0.13) !important; }
      .__back-btn:hover { background: rgba(255,255,255,0.2) !important; }

      /* ── Responsive tweaks (mobile-first, same theme/colors) ── */
      @media (max-width: 640px) {
        .__lec-hero-inner { flex-direction: column !important; padding: 16px 16px 18px !important; gap: 10px !important; }
        .__back-btn { position: static !important; align-self: flex-start !important; }
        .__lec-strip { padding: 18px 16px 6px !important; }
        .__lec-charts-section { padding: 6px 16px 20px !important; }
        .__lec-chart-card { padding: 16px 14px 12px !important; }
        .__lec-wide-card { padding: 16px 14px 14px !important; }
        .__lec-card { min-width: 200px !important; max-width: 200px !important; padding: 14px 14px 12px !important; }
        .__lec-charts-grid { grid-template-columns: 1fr !important; gap: 14px !important; }
      }

      @media (max-width: 400px) {
        .__lec-card { min-width: 175px !important; max-width: 175px !important; }
      }
    `;
    document.head.appendChild(s);
  }
}

const useContainerWidth = (fallback) => {
  const ref = useRef(null);
  const [width, setWidth] = useState(fallback);

  useEffect(() => {
    if (!ref.current || typeof ResizeObserver === "undefined") return;
    const el = ref.current;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = Math.floor(entry.contentRect.width);
        if (w > 0) setWidth(w);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, width];
};

const SectionLabel = ({ children }) => (
  <p style={styles.sectionLabel}>{children}</p>
);

const ChartCard = ({ title, subtitle, accentColor, innerRef, children }) => (
  <div
    ref={innerRef}
    className="__lec-chart-card"
    style={{ ...styles.chartCard, ...styles.chartCardAccent(accentColor) }}
  >
    <p style={styles.chartTitle}>{title}</p>
    <p style={styles.chartSubtitle}>{subtitle}</p>
    <div style={styles.chartDivider} />
    {children}
  </div>
);

const LoadingState = () => (
  <div style={styles.stateBox}>
    <div style={styles.spinner} />
    <span style={styles.stateText}>Loading data…</span>
  </div>
);

const ErrorState = ({ message = "Failed to load data" }) => (
  <div style={styles.stateBox}>
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="#fca5a5" strokeWidth="2" />
      <path d="M12 8v4M12 16h.01" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
    </svg>
    <span style={styles.errorText}>{message}</span>
  </div>
);

const LecAttAnalysis = () => {
  const navigate = useNavigate();
  const [pieChartLoader, setPieChartLoader] = React.useState(false);
  const [remaininglecturecount, setRemainingLectureCount] = React.useState(false);

  const [firstyearcount, setFirstyearcount] = React.useState(0);
  const [secondyearcount, setSecondyearcount] = React.useState(0);
  const [thirdyearcount, setThirdyearcount] = React.useState(0);
  const [fourthyearcount, setFourthyearcount] = React.useState(0);
  const [lectureData, setLectureData] = React.useState([]);

  const [studentscounterror, setstudentscounterror] = React.useState(false);
  const [Remaininglectureerror, setRemaininglectureerror] = React.useState(false);

  const { id } = useParams();

  const handlebackbutton = () => navigate(`/lecturer`);


  const [pieRef, pieWidth] = useContainerWidth(300);
  const [lineRef, lineWidth] = useContainerWidth(340);
  const [barRef, barWidth] = useContainerWidth(300);
  const [wideRef, wideWidth] = useContainerWidth(700);

  const CARD_H_PADDING = 40; 
  const WIDE_H_PADDING = 48; 

  const pieChartWidth = Math.max(220, pieWidth - CARD_H_PADDING);
  const lineChartWidth = Math.max(220, lineWidth - CARD_H_PADDING);
  const barChartWidth = Math.max(220, barWidth - CARD_H_PADDING);
  const wideChartWidth = Math.max(260, wideWidth - WIDE_H_PADDING);

  const chartHeight = pieChartWidth < 260 ? 190 : 210;
  const wideChartHeight = wideChartWidth < 400 ? 190 : 220;

  useEffect(() => {
    handlepiechartload();
    handleremaininglectures();
  }, []);

  const handlepiechartload = async () => {
    setPieChartLoader(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/lecturer/getstudent_count_by_year/${id}`,
        { params: { id } }
      );
      if (response.data.status === "got") {
        setPieChartLoader(false);
        setFirstyearcount(response.data.first.length);
        setSecondyearcount(response.data.second.length);
        setThirdyearcount(response.data.third.length);
        setFourthyearcount(response.data.fourth.length);
      } else {
        setPieChartLoader(false);
        setstudentscounterror(true);
      }
    } catch {
      setPieChartLoader(false);
      setstudentscounterror(true);
    }
  };

  const handleremaininglectures = async () => {
    setRemainingLectureCount(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/lecturer/remaining_lectures/${id}`,
        { params: { id } }
      );
      if (response.data.status === "got") {
        setRemainingLectureCount(false);
        setLectureData(response.data.data);
      } else {
        setRemainingLectureCount(false);
        setRemaininglectureerror(true);
      }
    } catch {
      setRemainingLectureCount(false);
      setRemaininglectureerror(true);
    }
  };

  const pct = (done, total) =>
    total > 0 ? parseFloat(((done / total) * 100).toFixed(1)) : 0;

  return (
    <div style={styles.page}>
      <Header />

      <div style={styles.hero}>
        <div style={styles.heroDecor} />
        <div style={styles.heroDecor2} />
        <div className="__lec-hero-inner" style={styles.heroInner}>
          <button
            className="__back-btn"
            style={styles.backBtn}
            onClick={handlebackbutton}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M15 8a.5.5 0 0 1-.5.5H2.707l4.147 4.146a.5.5 0 0 1-.708.708l-5-5a.5.5 0 0 1 0-.708l5-5a.5.5 0 1 1 .708.708L2.707 7.5H14.5A.5.5 0 0 1 15 8z"
              />
            </svg>
            Back
          </button>

          <div style={{ textAlign: "center" }}>
            <h2 style={styles.heroTitle}>Attendance Analysis Dashboard</h2>
            <p style={styles.heroSub}>Lecturer overview · Real-time data</p>
          </div>
        </div>
      </div>

      <div className="__lec-strip" style={styles.lectureStrip}>
        <SectionLabel>Subject Progress</SectionLabel>

        {remaininglecturecount ? (
          <LoadingState />
        ) : Remaininglectureerror ? (
          <ErrorState message="Could not load lecture data" />
        ) : (
          <div style={styles.lectureScroll}>
            {lectureData.map((lecture, index) => (
              <div
                key={index}
                className="__lec-card"
                style={styles.lectureCard}
              >
                <p style={styles.subjectName} title={lecture.subject}>
                  {lecture.subject}
                </p>

                <div style={styles.badgeRow}>
                  <span style={styles.badge("#2563eb")}>{lecture.academicYear}</span>
                  <span style={styles.badge("#059669")}>{lecture.yearOfStudy}</span>
                  <span style={styles.badge("#7c3aed")}>{lecture.semesterVersion}</span>
                  <span style={styles.badge("#0891b2")}>{lecture.semester}</span>
                </div>

                <div style={styles.progressTrack}>
                  <div style={styles.progressFill(pct(lecture.done, lecture.total))} />
                </div>

                <div style={styles.progressMeta}>
                  <span style={styles.progressDone}>✓ Done: {lecture.done}</span>
                  <span style={styles.progressRem}>
                    ⏳ Left: {lecture.total - lecture.done}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="__lec-charts-section" style={styles.chartsSection}>
        <SectionLabel>Analytics Overview</SectionLabel>

        <div className="__lec-charts-grid" style={styles.chartsGrid}>

          <ChartCard
            innerRef={pieRef}
            title="Students by Year"
            subtitle="Enrollment distribution across academic years"
            accentColor="#2563eb"
          >
            {pieChartLoader ? (
              <LoadingState />
            ) : studentscounterror ? (
              <ErrorState />
            ) : (
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: firstyearcount, label: `1st (${firstyearcount})` },
                      { id: 1, value: secondyearcount, label: `2nd (${secondyearcount})` },
                      { id: 2, value: thirdyearcount, label: `3rd (${thirdyearcount})` },
                      { id: 3, value: fourthyearcount, label: `4th (${fourthyearcount})` },
                    ],
                    innerRadius: 30,
                    paddingAngle: 3,
                    cornerRadius: 4,
                  },
                ]}
                colors={["#1d4ed8", "#3b82f6", "#60a5fa", "#bfdbfe"]}
                width={pieChartWidth}
                height={chartHeight}
              />
            )}
          </ChartCard>

          <ChartCard
            innerRef={lineRef}
            title="Yearly Attendance Trend"
            subtitle="Monthly attendance rate across the academic year"
            accentColor="#0891b2"
          >
            <LineChart
              xAxis={[{ data: [1,2,3,4,5,6,7,8,9,10,11,12], label: "Month" }]}
              series={[
                {
                  data: [10,20,30,25,40,10,20,30,25,40,20,10],
                  color: "#2563eb",
                  area: true,
                },
              ]}
              sx={{
                "& .MuiAreaElement-root": { fill: "url(#lineGrad)", opacity: 0.2 },
              }}
              width={lineChartWidth}
              height={chartHeight}
            />
          </ChartCard>

          <ChartCard
            innerRef={barRef}
            title="Monthly Attendance"
            subtitle="Headcount per month (Jan – Jun)"
            accentColor="#7c3aed"
          >
            <BarChart
              xAxis={[{
                scaleType: "band",
                data: ["Jan","Feb","Mar","Apr","May","Jun"],
              }]}
              series={[{ data: [50,45,60,70,55,65], color: "#2563eb" }]}
              borderRadius={6}
              width={barChartWidth}
              height={chartHeight}
            />
          </ChartCard>
        </div>

        <div ref={wideRef} className="__lec-wide-card" style={styles.wideCard}>
          <p style={styles.chartTitle}>Attendance by Day of Week</p>
          <p style={styles.chartSubtitle}>
            Average student attendance per weekday
          </p>
          <div style={styles.chartDivider} />
          <BarChart
            xAxis={[{
              scaleType: "band",
              data: ["Mon","Tue","Wed","Thu","Fri"],
            }]}
            series={[{
              data: [50,30,60,45,55],
              color: "#1d4ed8",
            }]}
            borderRadius={6}
            width={wideChartWidth}
            height={wideChartHeight}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LecAttAnalysis;