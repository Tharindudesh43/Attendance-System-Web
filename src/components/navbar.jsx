import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import AboutUsModal from '../components/AboutUs_modal';
import ConatctUsModal from '../components/ContactUs_modal';
import { useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';
import { jwtDecode } from "jwt-decode";
import { motion } from 'framer-motion';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Admin from '@mui/icons-material/AdminPanelSettingsSharp';
import { green } from '@mui/material/colors';
import icon from '/assets/NavIcon.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [AboutUsShowModal, setAboutUsShowModal] = useState(false);
  const [ContactUsShowModal, setContactUsShowModal] = useState(false);
  const navigate = useNavigate();
  const [UserStatus, setUserStatus] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [role, setrole] = useState('');
  const [navabarimage, setnavabarimage] = useState('');
  const [isloading, setloading] = useState(false);

  useEffect(() => {
    const fetchRole = async () => {
      setloading(true);
      const role = localStorage.getItem('role');
      setrole(role);
      if (role === 'admin') {
        const Admintoken = localStorage.getItem('admintoken');
        setUserStatus(true);
      } else if (role === 'lecturer') {
        const Lecturertoken = localStorage.getItem('lecturertoken');
        const decoded = jwtDecode(Lecturertoken);
        setnavabarimage(decoded.image);
        setloading(false);
        setUserStatus(true);
      } else {
        setUserStatus(false);
      }
    };
    fetchRole();
  }, [role]);

  async function logoutadmin() {
    localStorage.removeItem('admintoken');
    enqueueSnackbar("Logged out successfully!", { variant: "info", autoHideDuration: 3000 });
    localStorage.setItem('role', '');
    navigate('/');
  }
  async function logoutlecturer() {
    localStorage.removeItem('lecturertoken');
    enqueueSnackbar("Logged out successfully!", { variant: "info", autoHideDuration: 3000 });
    localStorage.setItem('role', '');
    navigate('/');
  }

  async function movehome() {
    navigate('/');
  }

  const navVariants = {
    hidden: { opacity: 0, y: -32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
    exit: { opacity: 0, y: -32, transition: { duration: 0.4, ease: "easeIn" } }
  };



return (
  <div>
    <link
      href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap"
      rel="stylesheet"
    />
    <style>{`
      .marky-nav *  { box-sizing: border-box; }
      .nav-btn {
        position: relative; background: none; border: none; cursor: pointer;
        font-family: 'Nunito', sans-serif; font-size: 15px; font-weight: 700;
        color: #334155; padding: 8px 14px; border-radius: 8px;
        transition: color .2s ease, background .2s ease;
      }
      .nav-btn::after {
        content: ''; position: absolute; left: 14px; bottom: 4px;
        width: 0; height: 2px; border-radius: 2px;
        background: #2563eb; transition: width .25s ease;
      }
      .nav-btn:hover { color: #1d4ed8; background: #eff6ff; }
      .nav-btn:hover::after { width: calc(100% - 28px); }
 
      .mobile-btn {
        display: block; width: 100%; text-align: left; background: none; border: none;
        cursor: pointer; font-family: 'Nunito', sans-serif; font-size: 15px;
        font-weight: 700; color: #1e40af; padding: 11px 16px; border-radius: 10px;
        transition: background .2s ease, color .2s ease;
      }
      .mobile-btn:hover { background: #dbeafe; color: #1d4ed8; }
 
      .avatar-ring-blue {
        padding: 2.5px; border-radius: 50%;
        background: linear-gradient(135deg, #1e40af, #60a5fa);
        display: inline-flex; align-items: center; justify-content: center;
        cursor: pointer; border: none; background-clip: padding-box;
        transition: box-shadow .2s ease;
      }
      .avatar-ring-blue:hover { box-shadow: 0 0 0 3px rgba(37,99,235,.25); }
 
      .avatar-ring-admin {
        padding: 2.5px; border-radius: 50%;
        background: linear-gradient(135deg, #1e3a8a, #3b82f6);
        display: inline-flex; align-items: center; justify-content: center;
        cursor: pointer; border: none;
        transition: box-shadow .2s ease;
      }
      .avatar-ring-admin:hover { box-shadow: 0 0 0 3px rgba(30,58,138,.25); }
 
      .dropdown-menu {
        position: absolute; right: 0; top: calc(100% + 10px); z-index: 50;
        min-width: 180px; background: white; border-radius: 12px;
        border: 1px solid #dbeafe;
        box-shadow: 0 8px 32px rgba(30,64,175,.14);
        overflow: hidden;
      }
      .dropdown-item {
        display: flex; align-items: center; gap: 8px;
        padding: 11px 16px; font-size: 14px; font-weight: 600;
        color: #ef4444; text-decoration: none; font-family: 'Nunito', sans-serif;
        transition: background .15s ease;
        border: none; background: none; cursor: pointer; width: 100%;
      }
      .dropdown-item:hover { background: #fff1f2; }
 
      .hamburger-btn {
        display: flex; align-items: center; justify-content: center;
        width: 38px; height: 38px; border-radius: 9px; border: 1.5px solid #dbeafe;
        background: #eff6ff; cursor: pointer; transition: background .2s ease;
      }
      .hamburger-btn:hover { background: #dbeafe; }
 
      @media (min-width: 640px) { .mobile-only { display: none !important; } }
      @media (max-width: 639px) { .desktop-only { display: none !important; } }
    `}</style>
 
    <AnimatePresence>
      {UserStatus ? (
 
        <motion.nav
          key="user-navbar"
          variants={navVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="marky-nav"
          style={{
            position: "sticky", top: 0, zIndex: 50,
            background: "rgba(255,255,255,0.97)",
            backdropFilter: "blur(16px)",
            borderBottom: "1.5px solid #dbeafe",
            boxShadow: "0 4px 24px rgba(30,64,175,.07)"
          }}
        >
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
 
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="hamburger-btn mobile-only"
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? (
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#1e40af" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#1e40af" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                )}
              </button>
 
              <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginRight: "6px", marginLeft: "6px" }}>
                  <img src={icon} alt="Marky" style={{ width: "38px", height: "38px", objectFit: "contain", flexShrink: 0 }} />
                  <span style={{ fontFamily: "'Nunito',sans-serif", fontWeight: 800, fontSize: "19px", color: "#1e3a8a", letterSpacing: "-0.01em" }}>
                    Marky
                  </span>
                </div>
 
                <div className="desktop-only" style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                  <button className="nav-btn" onClick={movehome}>Home</button>
                  <button className="nav-btn" onClick={() => setAboutUsShowModal(true)}>About Us</button>
                  <button className="nav-btn" onClick={() => setContactUsShowModal(true)}>Contact Us</button>
                </div>
              </div>
 
              {role === 'admin' ? (
                <div style={{ position: "relative" }}>
                  <button
                    type="button"
                    className="avatar-ring-admin"
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    aria-expanded={isUserDropdownOpen}
                    aria-haspopup="true"
                  >
                    <Avatar sx={{ bgcolor: "#1e40af", width: 36, height: 36 }}>
                      <Admin />
                    </Avatar>
                  </button>
                  <AnimatePresence>
                    {isUserDropdownOpen && (
                      <motion.div
                        className="dropdown-menu"
                        initial={{ opacity: 0, y: -8, scale: .97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: .97 }}
                        transition={{ duration: 0.18 }}
                      >
                        <div style={{ padding: "12px 16px 10px", borderBottom: "1px solid #f1f5f9" }}>
                          <div style={{ fontSize: "12px", color: "#94a3b8", fontFamily: "'Nunito',sans-serif", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em" }}>Signed in as</div>
                          <div style={{ fontSize: "14px", color: "#1e293b", fontFamily: "'Nunito',sans-serif", fontWeight: 700, marginTop: "2px" }}>Administrator</div>
                        </div>
                        <a href="#" onClick={logoutadmin} className="dropdown-item">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
                          </svg>
                          Sign out
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div style={{ position: "relative" }}>
                  <button
                    type="button"
                    className="avatar-ring-blue"
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    aria-expanded={isUserDropdownOpen}
                    aria-haspopup="true"
                  >
                    {isloading ? (
                      <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#dbeafe", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="2.5">
                          <circle cx="12" cy="12" r="10" strokeOpacity=".25"/>
                          <path d="M12 2a10 10 0 0110 10" strokeLinecap="round"/>
                        </svg>
                      </div>
                    ) : (
                      <div style={{ background: "white", borderRadius: "50%", padding: "1px" }}>
                        <Avatar alt="User" src={navabarimage} sx={{ width: 36, height: 36 }} />
                      </div>
                    )}
                  </button>
                  <AnimatePresence>
                    {isUserDropdownOpen && (
                      <motion.div
                        className="dropdown-menu"
                        initial={{ opacity: 0, y: -8, scale: .97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: .97 }}
                        transition={{ duration: 0.18 }}
                      >
                        <div style={{ padding: "12px 16px 10px", borderBottom: "1px solid #f1f5f9" }}>
                          <div style={{ fontSize: "12px", color: "#94a3b8", fontFamily: "'Nunito',sans-serif", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em" }}>Signed in as</div>
                          <div style={{ fontSize: "14px", color: "#1e293b", fontFamily: "'Nunito',sans-serif", fontWeight: 700, marginTop: "2px" }}>Lecturer</div>
                        </div>
                        <a href="#" onClick={logoutlecturer} className="dropdown-item">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
                          </svg>
                          Sign out
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
 
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                key="mobile-menu"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ overflow: "hidden", background: "#f8faff", borderTop: "1px solid #dbeafe" }}
                id="mobile-menu"
              >
                <div style={{ padding: "12px 16px 16px", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <button className="mobile-btn" onClick={movehome}>Home</button>
                  <button className="mobile-btn" onClick={() => setAboutUsShowModal(true)}>About Us</button>
                  <button className="mobile-btn" onClick={() => setContactUsShowModal(true)}>Contact Us</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
 
      ) : (
 
        <motion.nav
          key="guest-navbar"
          variants={navVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="marky-nav"
          style={{
            position: "sticky", top: 0, zIndex: 50,
            background: "rgba(255,255,255,0.97)",
            backdropFilter: "blur(16px)",
            borderBottom: "1.5px solid #dbeafe",
            boxShadow: "0 4px 24px rgba(30,64,175,.07)"
          }}
        >
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "68px" }}>
 
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="hamburger-btn mobile-only"
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? (
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#1e40af" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#1e40af" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                )}
              </button>
 
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}>
                <img src={icon} alt="Marky" style={{ width: "40px", height: "40px", objectFit: "contain", flexShrink: 0,marginLeft: "6px" }} />
                <span style={{ fontFamily: "'Nunito',sans-serif", fontWeight: 800, fontSize: "20px", color: "#1e3a8a", letterSpacing: "-0.01em" }}>
                  Marky
                </span>
 
                <div className="desktop-only" style={{ display: "flex", alignItems: "center", gap: "2px", marginLeft: "10px" }}>
                  <button className="nav-btn" onClick={movehome}>Home</button>
                  <button className="nav-btn" onClick={() => setAboutUsShowModal(true)}>About Us</button>
                  <button className="nav-btn" onClick={() => setContactUsShowModal(true)}>Contact Us</button>
                </div>
              </div>
 
              <div className="desktop-only" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{
                  fontSize: "13px", color: "#64748b", fontFamily: "'Nunito',sans-serif",
                  fontWeight: 600, padding: "7px 14px", borderRadius: "8px",
                  border: "1.5px solid #e2e8f0"
                }}>
                  Guest
                </div>
              </div>
 
            </div>
          </div>
 
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                key="mobile-menu"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ overflow: "hidden", background: "#f8faff", borderTop: "1px solid #dbeafe" }}
                id="mobile-menu"
              >
                <div style={{ padding: "12px 16px 16px", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <button className="mobile-btn" onClick={movehome}>Home</button>
                  <button className="mobile-btn" onClick={() => setAboutUsShowModal(true)}>About Us</button>
                  <button className="mobile-btn" onClick={() => setContactUsShowModal(true)}>Contact Us</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
 
    {AboutUsShowModal && (
      <AboutUsModal onClose={() => setAboutUsShowModal(false)} />
    )}
    {ContactUsShowModal && (
      <ConatctUsModal onClose={() => setContactUsShowModal(false)} />
    )}
  </div>
);
};

export default Navbar;
