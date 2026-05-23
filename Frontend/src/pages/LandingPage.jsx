import React, { useState,useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
import { styled } from "@mui/material/styles";
import Header from "../components/header";
import { green, pink, purple } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Footer from "../components/footer";

const LandingPage = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState({});
  const sectionRefs = useRef({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
 
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setVisible((v) => ({ ...v, [e.target.id]: true }));
        });
      },
      { threshold: 0.15 }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);
 
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
 
  const ref = (id) => (el) => {
    sectionRefs.current[id] = el;
  };
 
  const isVisible = (id) => visible[id];

  const navigateAdminLogin = () => {
    const role = localStorage.getItem("role");
    if (role === "admin") {
      navigate("/admin");
    } else {
      localStorage.clear();
      localStorage.setItem("role", "");
      navigate("/admin_Login");
    }
  };

  const navigateLecturerLogin = () => {
    const role = localStorage.getItem("role");
    if (role === "lecturer") {
      navigate("/lecturer");
    } else {
      localStorage.clear();
      localStorage.setItem("role", "");
      navigate("/lecturer_login");
    }
  };

  const AdminButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
    "&:hover": {
      backgroundColor: pink[700],
    },
  }));

  const LecturerButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  }));

     return (
    <div style={{ fontFamily: "'Nunito', sans-serif", background: "#f0f5ff", minHeight: "100vh", overflowX: "hidden" }}>
       <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=Nunito:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
 
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        @keyframes fadeUp   { from { opacity:0; transform:translateY(32px);  } to { opacity:1; transform:translateY(0);  } }
        @keyframes fadeRight{ from { opacity:0; transform:translateX(-40px); } to { opacity:1; transform:translateX(0); } }
        @keyframes fadeLeft { from { opacity:0; transform:translateX(40px);  } to { opacity:1; transform:translateX(0); } }
        @keyframes float    { 0%,100%{ transform:translateY(0);   } 50%{ transform:translateY(-10px); } }
        @keyframes pulse    { 0%,100%{ opacity:1; transform:scale(1); } 50%{ opacity:.7; transform:scale(1.15); } }
        .reveal-up    { opacity:0; }
        .reveal-right { opacity:0; }
        .reveal-left  { opacity:0; }
        .visible.reveal-up    { animation: fadeUp    0.75s cubic-bezier(.22,1,.36,1) forwards; }
        .visible.reveal-right { animation: fadeRight 0.75s cubic-bezier(.22,1,.36,1) forwards; }
        .visible.reveal-left  { animation: fadeLeft  0.75s cubic-bezier(.22,1,.36,1) forwards; }
        .delay-1 { animation-delay:.1s!important; }
        .delay-2 { animation-delay:.2s!important; }
        .delay-3 { animation-delay:.35s!important; }
        .float-card { animation: float 5s ease-in-out infinite; }
        .portal-card { transition: transform .3s ease, box-shadow .3s ease; cursor:pointer; }
        .portal-card:hover { transform: translateY(-8px); box-shadow: 0 20px 48px rgba(30,64,175,.18)!important; }
        .cta-btn { transition: transform .2s ease, box-shadow .2s ease; }
        .cta-btn:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(37,99,235,.45)!important; }
        .outline-btn { transition: background .2s ease, color .2s ease; }
        .outline-btn:hover { background:#dbeafe!important; }
        .nav-link { transition: color .2s ease; cursor:pointer; }
        input:focus, textarea:focus {
          outline:none!important;
          border-color:#3b82f6!important;
          box-shadow:0 0 0 3px rgba(59,130,246,.18)!important;
        }
        .feature-chip:hover { background:#dbeafe!important; }
        .footer-link:hover { color:#93c5fd!important; }
        .submit-btn { transition: opacity .2s ease, transform .2s ease; }
        .submit-btn:hover { opacity:.9; transform:translateY(-1px); }
        @media(max-width:768px){
          .hero-grid  { flex-direction:column!important; }
          .about-grid { grid-template-columns:1fr!important; }
          .portal-grid{ grid-template-columns:1fr!important; }
          .stats-row  { gap:1.5rem!important; }
          .footer-cols{ flex-direction:column!important; }
        }
      `}</style>
 
      <Header/>
      <section id="home" style={{ maxWidth: "1280px", margin: "0 auto", padding: "6rem 2.5rem 4rem" }}>
        <div className="hero-grid" style={{ display: "flex", alignItems: "center", gap: "4rem", justifyContent: "space-between" }}>
 
          <div id="hero-text" ref={ref("hero-text")} style={{ maxWidth: "580px", flex: "1 1 320px" }}
            className={`reveal-right ${isVisible("hero-text") ? "visible" : ""}`}>
 
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "white", border: "1px solid #bfdbfe",
              borderRadius: "100px", padding: "7px 16px", marginBottom: "1.75rem",
              boxShadow: "0 2px 12px rgba(37,99,235,.1)"
            }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#3b82f6", display:"inline-block", animation:"pulse 2s ease-in-out infinite" }}></span>
              <span style={{ fontSize: "13px", color: "#1d4ed8", fontWeight: 600 }}>University Attendance Platform</span>
            </div>
 
            <h1 style={{
              fontFamily: "'Nunito',serif", fontWeight: 800,
              fontSize: "clamp(2.4rem, 5.5vw, 3.75rem)", lineHeight: 1.08,
              color: "#0f172a", marginBottom: "1.4rem", letterSpacing: "-0.03em"
            }}>
              Welcome to<br />
              <span style={{
                background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 60%, #60a5fa 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}>
                Marky
              </span>
            </h1>
 
            <p style={{ fontSize: "17px", color: "#64748b", lineHeight: 1.75, marginBottom: "2.5rem", maxWidth: "460px" }}>
              Streamline attendance management for admins and lecturers with ease and efficiency real-time, reliable, and remarkably simple.
            </p>
 
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <button className="cta-btn" onClick={() => scrollTo("login")} style={{
                background: "linear-gradient(135deg, #1e40af, #2563eb)",
                color: "white", padding: "15px 30px", borderRadius: "12px",
                border: "none", cursor: "pointer", fontSize: "15px", fontWeight: 700,
                boxShadow: "0 6px 24px rgba(37,99,235,.38)", letterSpacing: "0.01em"
              }}>
                Get Started →
              </button>
              <button className="outline-btn" onClick={() => scrollTo("aboutus")} style={{
                background: "white", color: "#1e40af",
                padding: "15px 30px", borderRadius: "12px",
                border: "1.5px solid #bfdbfe", cursor: "pointer",
                fontSize: "15px", fontWeight: 600
              }}>
                Learn More
              </button>
            </div>
 
            <div className="stats-row" style={{
              display: "flex", gap: "2.5rem", marginTop: "3rem",
              paddingTop: "2rem", borderTop: "1px solid #dbeafe"
            }}>
              {[["98%","Accuracy Rate"],["500+","Students Tracked"],["24/7","System Access"]].map(([num, label]) => (
                <div key={label}>
                  <div style={{ fontFamily: "'Lora',serif", fontSize: "24px", fontWeight: 800, color: "#1e40af" }}>{num}</div>
                  <div style={{ fontSize: "13px", color: "#94a3b8", marginTop: "3px", fontWeight: 400 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
 
          <div id="hero-visual" ref={ref("hero-visual")} style={{ flex: "1 1 300px", maxWidth: "480px", display:"flex", justifyContent:"center" }}
            className={`reveal-left ${isVisible("hero-visual") ? "visible" : ""}`}>
            <div className="float-card" style={{
              width: "100%", maxWidth: "440px",
              background: "linear-gradient(145deg, #e0eaff 0%, #f0f5ff 100%)",
              borderRadius: "28px", border: "1px solid #c7d8f8",
              padding: "1.75rem", position: "relative", overflow: "hidden",
              boxShadow: "0 16px 48px rgba(30,64,175,.14)"
            }}>
              <div style={{ position:"absolute", top:"-40px", right:"-40px", width:"160px", height:"160px", borderRadius:"50%", background:"rgba(59,130,246,.1)", pointerEvents:"none" }}></div>
              <div style={{ position:"absolute", bottom:"-30px", left:"-20px", width:"110px", height:"110px", borderRadius:"50%", background:"rgba(37,99,235,.08)", pointerEvents:"none" }}></div>
 
              <div style={{ background:"white", borderRadius:"18px", padding:"1.25rem", boxShadow:"0 4px 24px rgba(30,64,175,.12)", position:"relative", zIndex:1 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"14px" }}>
                  <div>
                    <div style={{ fontSize:"11px", color:"#94a3b8", fontWeight:500, textTransform:"uppercase", letterSpacing:"0.08em" }}>Today</div>
                    <div style={{ fontFamily:"'Lora',serif", fontSize:"16px", fontWeight:700, color:"#0f172a" }}>Attendance Overview</div>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:"5px", background:"#dcfce7", padding:"5px 10px", borderRadius:"100px" }}>
                    <span style={{ width:"7px", height:"7px", borderRadius:"50%", background:"#16a34a", display:"inline-block", animation:"pulse 2s ease-in-out infinite" }}></span>
                    <span style={{ fontSize:"12px", color:"#15803d", fontWeight:600 }}>Live</span>
                  </div>
                </div>
 
                {[["IT301","Web Development","24/28","85",85],
                  ["IT205","Computer Networks","30/30","100",100],
                  ["IT410","AI & Machine Learning","18/25","72",72]
                ].map(([code, name, count, pct, bar]) => (
                  <div key={code} style={{ padding:"10px 0", borderTop:"1px solid #f1f5f9" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"6px" }}>
                      <div>
                        <div style={{ fontSize:"13px", fontWeight:600, color:"#1e293b" }}>{code}</div>
                        <div style={{ fontSize:"11px", color:"#94a3b8" }}>{name}</div>
                      </div>
                      <div style={{ textAlign:"right" }}>
                        <div style={{ fontSize:"13px", fontWeight:700, color:"#1e40af" }}>{count}</div>
                        <div style={{ fontSize:"11px", fontWeight:600, color: bar===100?"#16a34a":bar<75?"#ea580c":"#64748b" }}>{pct}%</div>
                      </div>
                    </div>
                    <div style={{ height:"4px", background:"#f1f5f9", borderRadius:"100px", overflow:"hidden" }}>
                      <div style={{ height:"100%", width:`${bar}%`, borderRadius:"100px",
                        background: bar===100?"#22c55e":bar<75?"#f97316":"#3b82f6", transition:"width .8s ease" }}></div>
                    </div>
                  </div>
                ))}
              </div>
 
              <div style={{ position:"absolute", top:"1rem", right:"-0.5rem", background:"linear-gradient(135deg,#1e40af,#2563eb)", color:"white", borderRadius:"12px", padding:"8px 14px", fontSize:"12px", fontWeight:700, boxShadow:"0 4px 16px rgba(37,99,235,.4)", zIndex:2 }}>
                3 Classes Today
              </div>
            </div>
          </div>
        </div>
      </section>
 
      <section id="login" style={{ background:"white", padding:"6rem 2.5rem" }}>
        <div style={{ maxWidth:"920px", margin:"0 auto" }}>
 
          <div id="portal-header" ref={ref("portal-header")} style={{ textAlign:"center", marginBottom:"3.5rem" }}
            className={`reveal-up ${isVisible("portal-header") ? "visible" : ""}`}>
            <span style={{ fontSize:"12px", fontWeight:700, color:"#3b82f6", textTransform:"uppercase", letterSpacing:"0.14em" }}>Access Portals</span>
            <h2 style={{ fontFamily:"'Lora',serif", fontSize:"clamp(1.9rem,4vw,2.75rem)", fontWeight:800, color:"#0f172a", marginTop:"10px", letterSpacing:"-0.02em" }}>
              Choose Your Portal
            </h2>
            <p style={{ color:"#64748b", marginTop:"14px", fontSize:"16px", maxWidth:"440px", margin:"14px auto 0" }}>
              Select the appropriate portal to access your dashboard and manage attendance records.
            </p>
          </div>
 
          <div className="portal-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(360px, 1fr))", gap:"1.75rem" }}>
 
            <div id="admin-card" ref={ref("admin-card")} onClick={() => navigateAdminLogin()}
              className={`portal-card reveal-right ${isVisible("admin-card") ? "visible" : ""}`}
              style={{ borderRadius:"22px", overflow:"hidden", border:"1px solid #dbeafe", boxShadow:"0 8px 32px rgba(30,64,175,.08)" }}>
              <div style={{ background:"linear-gradient(145deg, #1e3a8a 0%, #1e40af 60%, #2563eb 100%)", padding:"2rem 2rem 1.75rem", color:"white", position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", top:"-30px", right:"-30px", width:"130px", height:"130px", borderRadius:"50%", background:"rgba(255,255,255,.07)" }}></div>
                <div style={{ position:"absolute", bottom:"-20px", left:"-20px", width:"90px", height:"90px", borderRadius:"50%", background:"rgba(255,255,255,.05)" }}></div>
                <div style={{ width:"54px", height:"54px", borderRadius:"15px", background:"rgba(255,255,255,.15)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"1.25rem", backdropFilter:"blur(8px)", border:"1px solid rgba(255,255,255,.2)" }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="8" r="3.5" stroke="white" strokeWidth="2"/>
                    <path d="M5 20a7 7 0 0114 0" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M18 3l1.5 1.5L22 2" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18 7v3h3" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </div>
                <div style={{ fontFamily:"'Lora',serif", fontSize:"22px", fontWeight:800, marginBottom:"10px", position:"relative" }}>Admin Portal</div>
                <p style={{ fontSize:"14px", opacity:.85, lineHeight:1.65, position:"relative", maxWidth:"280px" }}>
                  Access the admin dashboard to manage users, attendance records, and comprehensive system settings.
                </p>
              </div>
              <div style={{ padding:"1.75rem 2rem", background:"white" }}>
                <div style={{ display:"flex", flexDirection:"column", gap:"10px", marginBottom:"1.75rem" }}>
                  {[["User Management","Manage lecturers and student accounts"],["Attendance Reports","Generate and export detailed reports"],["System Configuration","Control all platform settings"]].map(([title, desc]) => (
                    <div key={title} style={{ display:"flex", alignItems:"flex-start", gap:"10px" }}>
                      <div style={{ width:"20px", height:"20px", borderRadius:"6px", background:"#eff6ff", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"1px" }}>
                        <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#1e40af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                      <div>
                        <div style={{ fontSize:"14px", fontWeight:600, color:"#1e293b" }}>{title}</div>
                        <div style={{ fontSize:"12px", color:"#94a3b8", marginTop:"2px" }}>{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <button style={{
                  width:"100%", padding:"14px", borderRadius:"12px",
                  background:"linear-gradient(135deg, #1e3a8a, #2563eb)", color:"white",
                  border:"none", cursor:"pointer", fontSize:"15px", fontWeight:700,
                  boxShadow:"0 4px 18px rgba(30,64,175,.35)", letterSpacing:"0.01em",
                  transition:"opacity .2s"
                }}>
                  Log In as Admin
                </button>
              </div>
            </div>
 
            <div id="lecturer-card" ref={ref("lecturer-card")} onClick={() => navigateLecturerLogin()}
              className={`portal-card reveal-left ${isVisible("lecturer-card") ? "visible" : ""}`}
              style={{ borderRadius:"22px", overflow:"hidden", border:"1px solid #bae6fd", boxShadow:"0 8px 32px rgba(14,165,233,.08)" }}>
              <div style={{ background:"linear-gradient(145deg, #0369a1 0%, #0284c7 60%, #0ea5e9 100%)", padding:"2rem 2rem 1.75rem", color:"white", position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", top:"-30px", right:"-30px", width:"130px", height:"130px", borderRadius:"50%", background:"rgba(255,255,255,.07)" }}></div>
                <div style={{ position:"absolute", bottom:"-20px", left:"-20px", width:"90px", height:"90px", borderRadius:"50%", background:"rgba(255,255,255,.05)" }}></div>
                <div style={{ width:"54px", height:"54px", borderRadius:"15px", background:"rgba(255,255,255,.15)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"1.25rem", backdropFilter:"blur(8px)", border:"1px solid rgba(255,255,255,.2)" }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="9" cy="7" r="4" stroke="white" strokeWidth="2"/>
                    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div style={{ fontFamily:"'Lora',serif", fontSize:"22px", fontWeight:800, marginBottom:"10px", position:"relative" }}>Lecturer Portal</div>
                <p style={{ fontSize:"14px", opacity:.85, lineHeight:1.65, position:"relative", maxWidth:"280px" }}>
                  Log in to mark attendance, view your assigned classes, and manage student participation records.
                </p>
              </div>
              <div style={{ padding:"1.75rem 2rem", background:"white" }}>
                <div style={{ display:"flex", flexDirection:"column", gap:"10px", marginBottom:"1.75rem" }}>
                  {[["Mark Attendance","Quickly record student presence"],["Class Overview","View all your assigned modules"],["Student Records","Track individual student history"]].map(([title, desc]) => (
                    <div key={title} style={{ display:"flex", alignItems:"flex-start", gap:"10px" }}>
                      <div style={{ width:"20px", height:"20px", borderRadius:"6px", background:"#f0f9ff", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"1px" }}>
                        <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#0ea5e9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                      <div>
                        <div style={{ fontSize:"14px", fontWeight:600, color:"#1e293b" }}>{title}</div>
                        <div style={{ fontSize:"12px", color:"#94a3b8", marginTop:"2px" }}>{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <button style={{
                  width:"100%", padding:"14px", borderRadius:"12px",
                  background:"linear-gradient(135deg, #0369a1, #0ea5e9)", color:"white",
                  border:"none", cursor:"pointer", fontSize:"15px", fontWeight:700,
                  boxShadow:"0 4px 18px rgba(14,165,233,.35)", letterSpacing:"0.01em",
                  transition:"opacity .2s"
                }}>
                  Log In as Lecturer
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
 
      <section id="aboutus" style={{ padding:"6rem 2.5rem", background:"#f8faff" }}>
        <div className="about-grid" style={{ maxWidth:"1120px", margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"5rem", alignItems:"center" }}>
 
          <div id="about-visual" ref={ref("about-visual")} className={`reveal-right ${isVisible("about-visual") ? "visible" : ""}`}>
            <div style={{ position:"relative" }}>
              <div style={{
                width:"100%", maxWidth:"380px", aspectRatio:"1",
                background:"linear-gradient(145deg, #1e3a8a 0%, #1e40af 40%, #2563eb 100%)",
                borderRadius:"28px", display:"flex", flexDirection:"column",
                alignItems:"center", justifyContent:"center", gap:"1rem",
                color:"white", position:"relative", overflow:"hidden",
                boxShadow:"0 20px 60px rgba(30,64,175,.3)"
              }}>
                <div style={{ position:"absolute", top:"-50px", right:"-50px", width:"200px", height:"200px", borderRadius:"50%", background:"rgba(255,255,255,.06)" }}></div>
                <div style={{ position:"absolute", bottom:"-40px", left:"-40px", width:"160px", height:"160px", borderRadius:"50%", background:"rgba(255,255,255,.04)" }}></div>
                <svg width="72" height="72" viewBox="0 0 24 24" fill="none">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 12l2 2 4-4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div style={{ fontFamily:"'Lora',serif", fontSize:"24px", fontWeight:800, position:"relative" }}>Marky System</div>
                <div style={{ fontSize:"14px", opacity:.8, textAlign:"center", maxWidth:"220px", lineHeight:1.65, position:"relative" }}>
                  Smart digital attendance platform for modern university faculty
                </div>
                <div style={{ display:"flex", gap:"1rem", position:"relative" }}>
                  {[["500+","Students"],["50+","Lecturers"],["20+","Courses"]].map(([n,l]) => (
                    <div key={l} style={{ textAlign:"center", background:"rgba(255,255,255,.12)", borderRadius:"12px", padding:"10px 14px" }}>
                      <div style={{ fontFamily:"'Lora',serif", fontWeight:800, fontSize:"18px" }}>{n}</div>
                      <div style={{ fontSize:"11px", opacity:.75 }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
 
              <div style={{ position:"absolute", bottom:"-20px", right:"-20px", background:"white", borderRadius:"16px", padding:"14px 18px", boxShadow:"0 8px 32px rgba(30,64,175,.18)", display:"flex", alignItems:"center", gap:"12px" }}>
                <div style={{ width:"40px", height:"40px", borderRadius:"10px", background:"#dcfce7", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"/><path d="M22 4L12 14.01l-3-3" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <div style={{ fontSize:"13px", fontWeight:700, color:"#1e293b" }}>Attendance Marked</div>
                  <div style={{ fontSize:"11px", color:"#94a3b8" }}>IT301 — 24/28 present</div>
                </div>
              </div>
            </div>
          </div>
 
          <div id="about-text" ref={ref("about-text")} className={`reveal-left ${isVisible("about-text") ? "visible" : ""}`}>
            <span style={{ fontSize:"12px", fontWeight:700, color:"#3b82f6", textTransform:"uppercase", letterSpacing:"0.14em" }}>About the Platform</span>
            <h2 style={{ fontFamily:"'Lora',serif", fontSize:"clamp(1.9rem,3.5vw,2.5rem)", fontWeight:800, color:"#0f172a", marginTop:"12px", marginBottom:"1.25rem", lineHeight:1.15, letterSpacing:"-0.02em" }}>
              About Marky Attendance System
            </h2>
            <p style={{ color:"#64748b", lineHeight:1.8, marginBottom:"1.1rem", fontSize:"16px" }}>
              The Marky Attendance System is a smart digital platform designed to simplify and secure attendance tracking for university students and staff.
            </p>
            <p style={{ color:"#64748b", lineHeight:1.8, fontSize:"16px", marginBottom:"2.25rem" }}>
              It enhances academic management by offering real-time attendance monitoring, easy login portals, and detailed reports for admins and lecturers.
            </p>
 
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}>
              {[
                { icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#1e40af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>, label:"Real-time Updates", desc:"Instant attendance syncing" },
                { icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" stroke="#1e40af" strokeWidth="2"/><path d="M7 11V7a5 5 0 0110 0v4" stroke="#1e40af" strokeWidth="2" strokeLinecap="round"/></svg>, label:"Secure Access", desc:"Role-based control" },
                { icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M18 20V10M12 20V4M6 20v-6" stroke="#1e40af" strokeWidth="2" strokeLinecap="round"/></svg>, label:"Rich Analytics", desc:"Detailed attendance reports" },
                { icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="5" y="2" width="14" height="20" rx="2" stroke="#1e40af" strokeWidth="2"/><path d="M12 18h.01" stroke="#1e40af" strokeWidth="2" strokeLinecap="round"/></svg>, label:"Any Device", desc:"Mobile-friendly interface" },
              ].map(({ icon, label, desc }) => (
                <div key={label} className="feature-chip" style={{ background:"white", borderRadius:"14px", padding:"1.1rem 1.25rem", border:"1px solid #dbeafe", transition:"background .2s ease" }}>
                  <div style={{ marginBottom:"8px" }}>{icon}</div>
                  <div style={{ fontSize:"14px", fontWeight:700, color:"#1e293b" }}>{label}</div>
                  <div style={{ fontSize:"12px", color:"#94a3b8", marginTop:"3px" }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
 
      <section id="contact" style={{ background:"white", padding:"6rem 2.5rem" }}>
        <div style={{ maxWidth:"580px", margin:"0 auto" }}>
          <div id="contact-header" ref={ref("contact-header")} style={{ textAlign:"center", marginBottom:"2.75rem" }}
            className={`reveal-up ${isVisible("contact-header") ? "visible" : ""}`}>
            <span style={{ fontSize:"12px", fontWeight:700, color:"#3b82f6", textTransform:"uppercase", letterSpacing:"0.14em" }}>Get in Touch</span>
            <h2 style={{ fontFamily:"'Lora',serif", fontSize:"clamp(1.9rem,4vw,2.5rem)", fontWeight:800, color:"#0f172a", marginTop:"10px", letterSpacing:"-0.02em" }}>
              Contact Us
            </h2>
            <p style={{ color:"#64748b", marginTop:"12px", fontSize:"15px" }}>Have questions? We'd love to hear from you.</p>
          </div>
 
          <div id="contact-form" ref={ref("contact-form")} className={`reveal-up delay-1 ${isVisible("contact-form") ? "visible" : ""}`}
            style={{ background:"white", borderRadius:"24px", border:"1px solid #dbeafe", padding:"2.5rem", boxShadow:"0 12px 48px rgba(37,99,235,.09)" }}>
            <form style={{ display:"flex", flexDirection:"column", gap:"1.25rem" }}>
              {[{ label:"Full Name", type:"text", id:"name", placeholder:"Your full name" },
                { label:"Email Address", type:"email", id:"email", placeholder:"you@example.com" }
              ].map(({ label, type, id, placeholder }) => (
                <div key={id}>
                  <label htmlFor={id} style={{ display:"block", fontSize:"14px", fontWeight:600, color:"#334155", marginBottom:"7px" }}>{label}</label>
                  <input type={type} id={id} name={id} required placeholder={placeholder} style={{
                    width:"100%", padding:"13px 15px", borderRadius:"11px",
                    border:"1.5px solid #dbeafe", fontSize:"15px", color:"#1e293b",
                    background:"#f8faff", fontFamily:"inherit", transition:"all .2s"
                  }} />
                </div>
              ))}
              <div>
                <label htmlFor="message" style={{ display:"block", fontSize:"14px", fontWeight:600, color:"#334155", marginBottom:"7px" }}>Message</label>
                <textarea id="message" name="message" rows="4" required placeholder="Write your message here..." style={{
                  width:"100%", padding:"13px 15px", borderRadius:"11px",
                  border:"1.5px solid #dbeafe", fontSize:"15px", color:"#1e293b",
                  background:"#f8faff", resize:"vertical", fontFamily:"inherit", transition:"all .2s"
                }}></textarea>
              </div>
              <button type="submit" className="submit-btn" style={{
                width:"100%", padding:"15px", borderRadius:"12px",
                background:"linear-gradient(135deg, #1e40af, #2563eb)", color:"white",
                border:"none", cursor:"pointer", fontSize:"16px", fontWeight:700,
                boxShadow:"0 6px 24px rgba(37,99,235,.35)", letterSpacing:"0.01em"
              }}>
                Send Message →
              </button>
            </form>
          </div>
        </div>
      </section>
 
      <Footer/>
    </div>
  );
};

export default LandingPage;
