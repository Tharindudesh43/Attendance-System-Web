import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AboutUsModal from '../components/AboutUs_modal';
import ConatctUsModal from '../components/ContactUs_modal';
import { useNavigate } from "react-router-dom";
import { SnackbarProvider, useSnackbar } from 'notistack';
import { jwtDecode } from "jwt-decode";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Admin from '@mui/icons-material/AdminPanelSettingsSharp';
import { green } from '@mui/material/colors';
import icon from '../assets/icon.png';

const navbar = () => {
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

  // Animation variants
  const navVariants = {
    hidden: { opacity: 0, y: -32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
    exit: { opacity: 0, y: -32, transition: { duration: 0.4, ease: "easeIn" } }
  };

  const linkVariants = {
    hover: {
      scale: 1.07,
      backgroundColor: "#2563eb",
      color: "#fff",
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  };

  return (
    <div>
      <AnimatePresence>
        {UserStatus ? (
          <motion.nav
            key="user-navbar"
            variants={navVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="sticky top-0 z-50 bg-white shadow-lg backdrop-blur-lg"
            style={{
              // borderRadius: "0 0 18px 18px",
              borderBottom: "2px solid #D9DEE8FF",
              boxShadow: "0 8px 24px rgba(30,41,59,0.08)"
            }}
          >
            <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                {/* Mobile menu button */}
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <button
                    type="button"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="relative inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset"
                    aria-controls="mobile-menu"
                    aria-expanded={isMenuOpen}
                  >
                    {isMenuOpen ? (
                      <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                  <div className="flex items-center shrink-0">
                      <img
                        src={icon}
                        alt="AttendanceSystem"
                        className="object-contain w-24 h-24"
                      />
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex mt-6 space-x-4">
                       <button
                       style={{ fontFamily: 'Poppins' }}
                          onClick={movehome}
                          className="relative px-3 py-2 text-xl font-bold text-blue-500 transition rounded-md text-xlfont-bold group hover:text-blue-400"
                        >
                        Home
                      <span className="absolute left-0 bottom-0 w-0 group-hover:w-full h-[2px] bg-blue-500 transition-all" />
                      </button>
                 
                       <button
                          style={{ fontFamily: 'Poppins' }}
                          onClick={() => setAboutUsShowModal(true)}
                           className="relative px-3 text-xl font-bold text-blue-500 transition rounded-md py2 group hover:text-blue-400"
                        >
                         About Us
                      <span className="absolute left-0 bottom-0 w-0 group-hover:w-full h-[2px] bg-blue-500 transition-all" />
                      </button>
                        <button
                          style={{ fontFamily: 'Poppins' }}
                          onClick={() => setContactUsShowModal(true)}
                          className="relative px-3 py-2 text-xl font-bold text-blue-500 transition rounded-md group hover:text-blue-400"
                        >
                        Contact Us
                      <span className="absolute left-0 bottom-0 w-0 group-hover:w-full h-[2px] bg-blue-500 transition-all" />
                      </button>
                      {/* <motion.a
                        whileHover="hover"
                        variants={linkVariants}
                        onClick={movehome}
                        className="cursor-pointer rounded-md bg-gray-600 px-3 py-2 text-sm font-medium text-white hover:bg-[#2563eb] hover:text-white transition-colors"
                        style={{ position: "relative", zIndex: 1 }}
                      >
                        Home
                      </motion.a> */}
                      {/* <motion.a
                        whileHover="hover"
                        variants={linkVariants}
                        onClick={() => setAboutUsShowModal(true)}
                        className="cursor-pointer rounded-md bg-gray-600 px-3 py-2 text-sm font-medium text-white hover:bg-[#2563eb] hover:text-white transition-colors"
                        style={{ position: "relative", zIndex: 1 }}
                      >
                        About Us
                      </motion.a> */}
                      {/* <motion.a
                        whileHover="hover"
                        variants={linkVariants}
                        onClick={() => setContactUsShowModal(true)}
                        className="cursor-pointer rounded-md bg-gray-600 px-3 py-2 text-sm font-medium text-white hover:bg-[#2563eb] hover:text-white transition-colors"
                        style={{ position: "relative", zIndex: 1 }}
                      >
                        Contact Us
                      </motion.a> */}
                    </div>
                  </div>
                </div>

                {/* User Profile Dropdown */}
                {role === 'admin' ? (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <div className="relative ml-3">
                      <button
                        type="button"
                        onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                        className="relative flex text-sm bg-gray-800 rounded-full cursor-pointer focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        id="user-menu-button"
                        aria-expanded={isUserDropdownOpen}
                        aria-haspopup="true"
                      >
                       <div style={{
                        padding: "3px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #141129FF, #7A2C32FF)", // Indigo to blue
                        display: "inline-block"
                      }}>
                    <Avatar sx={{ bgcolor: green[500], width: 40, height: 40 }}>
                     <Admin />
                   </Avatar>
                  </div>

                      </button>
                      <AnimatePresence>
                        {isUserDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black/5"
                          >
                            <a href="#" onClick={logoutadmin} className="block px-4 py-2 text-sm text-gray-700">Sign out</a>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <div className="relative ml-3">
                      <button
                        type="button"
                        onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                        className="relative flex text-sm bg-gray-800 rounded-full cursor-pointer focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        id="user-menu-button"
                        aria-expanded={isUserDropdownOpen}
                        aria-haspopup="true"
                      >
                        {isloading ? (
                          <div className='text-amber-50'>Load..</div>
                        ) : (
                          <Stack direction="row" spacing={0}>
                          <div className="flex items-center shrink-0 p-[3px] bg-gradient-to-tr from-indigo-500 to-blue-500 rounded-full">
                              <div className="bg-white p-[0px] rounded-full">
                              <Avatar alt="Remy Sharp" src={navabarimage} className="w-10 h-10" />
                               </div>
                        </div>
                          </Stack>
                        )}
                      </button>
                      <AnimatePresence>
                        {isUserDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black/5"
                          >
                            <a href="#" onClick={logoutlecturer} className="block px-4 py-2 text-sm text-gray-700">Sign out</a>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu (Animated) */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  key="mobile-menu"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="sm:hidden bg-gray-900/95"
                  id="mobile-menu"
                >
                  <div className="px-2 pt-2 pb-3 space-y-1">
                     <button
                          onClick={movehome}
                          className="relative  text-violet-500 group px-3 py-2 rounded-md hover:text-[#2563eb] transition"
                        >
                        Home
                      <span className="absolute left-0 bottom-0 w-0 group-hover:w-full h-[2px] bg-[#2563eb] transition-all" />
                      </button>
                 
                       <button
                          onClick={() => setAboutUsShowModal(true)}
                          className="relative text-violet-500 group px-3 py-2 rounded-md hover:text-[#2563eb] transition"
                        >
                         About Us
                      <span className="absolute left-0 bottom-0 w-0 group-hover:w-full h-[2px] bg-[#2563eb] transition-all" />
                      </button>
                        <button
                          onClick={() => setContactUsShowModal(true)}
                          className="relative text-violet-500 group px-3 py-2 rounded-md hover:text-[#2563eb] transition"
                        >
                        Contact Us
                       <span className="absolute left-0 bottom-0 w-0 group-hover:w-full h-[2px] bg-[#2563eb] transition-all" />
                      </button>
                    {/* <motion.a
                      whileHover="hover"
                      variants={linkVariants}
                      onClick={() => { setIsMenuOpen(false); navigate('/'); }}
                      className="cursor-pointer block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white hover:bg-[#2563eb] hover:text-white transition-colors"
                    >
                      Home
                    </motion.a>
                    <motion.a
                      whileHover="hover"
                      variants={linkVariants}
                      onClick={() => { setIsMenuOpen(false); setAboutUsShowModal(true); }}
                      className="cursor-pointer block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white hover:bg-[#2563eb] hover:text-white transition-colors"
                    >
                      About Us
                    </motion.a>
                    <motion.a
                      whileHover="hover"
                      variants={linkVariants}
                      onClick={() => { setIsMenuOpen(false); setContactUsShowModal(true); }}
                      className="cursor-pointer block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white hover:bg-[#2563eb] hover:text-white transition-colors"
                    >
                      Contact Us
                    </motion.a> */}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.nav>
        ) : (
          // Guest Navbar
          <motion.nav
            key="guest-navbar"
            variants={navVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="sticky top-0 z-50 shadow-lg bg-white-900/90 backdrop-blur-lg"
            style={{
              // borderRadius: "0 0 18px 18px",
              borderBottom: "2px solid #DBDCDDFF",
              boxShadow: "0 8px 24px rgba(30,41,59,0.08)"
            }}
          >
            <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                {/* Mobile menu button */}
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <button
                    type="button"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="relative inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:bg-gray-600 hover:text-white focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset"
                    aria-controls="mobile-menu"
                    aria-expanded={isMenuOpen}
                  >
                    {isMenuOpen ? (
                      <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                      </svg>
                    )}
                  </button>
                </div>
                {/* Navigation Links */}
                <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                  <div className="flex items-center shrink-0">
                      <img
                        src={icon}
                        alt="AttendanceSystem"
                        className="object-contain w-24 h-24"
                      />
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex mt-6 space-x-4">
                       <button
                       style={{ fontFamily: 'Poppins' }}
                          onClick={movehome}
                          className="relative px-3 py-2 text-xl font-bold transition rounded-md text-rose-600 group hover:text-rose-400"
                        >
                        Home
                      <span className="absolute left-0  bottom-0 w-0 group-hover:w-full h-[2px] bg-rose-600 transition-all" />
                      </button>
                 
                       <button
                       style={{ fontFamily: 'Poppins' }}
                          onClick={() => setAboutUsShowModal(true)}
                          className="relative px-3 py-2 text-xl font-bold transition rounded-md text-rose-600 group hover:text-rose-400"
                        >
                         About Us
                      <span className="absolute left-0 bottom-0 w-0 group-hover:w-full h-[2px] bg-rose-600 transition-all" />
                      </button>
                        <button
                        style={{ fontFamily: 'Poppins' }}
                          onClick={() => setContactUsShowModal(true)}
                          className="relative px-3 py-2 text-xl font-bold transition rounded-md text-rose-600 group hover:text-rose-400"
                        >
                        Contact Us
                      <span className="absolute left-0 bottom-0 w-0 group-hover:w-full h-[2px] bg-rose-600 transition-all" />
                      </button>
                      {/* <motion.a
                        whileHover="hover"
                        variants={linkVariants}
                        onClick={() => navigate('/')}
                        className="cursor-pointer bg-gray-500 rounded-md bg-# px-3 py-2 text-sm font-medium text-white hover:bg-[#8b95ab] hover:text-white transition-colors"
                        style={{ position: "relative", zIndex: 1 }}
                      >
                        Home
                      </motion.a>
                      <motion.a
                        whileHover="hover"
                        variants={linkVariants}
                        onClick={() => setAboutUsShowModal(true)}
                        className="cursor-pointer rounded-md bg-gray-500 px-3 py-2 text-sm font-medium text-white hover:bg-[#2563eb] hover:text-white transition-colors"
                        style={{ position: "relative", zIndex: 1 }}
                      >
                        About Us
                      </motion.a>
                      <motion.a
                        whileHover="hover"
                        variants={linkVariants}
                        onClick={() => setContactUsShowModal(true)}
                        className="cursor-pointer rounded-md bg-gray-500 px-3 py-2 text-sm font-medium text-white hover:bg-[#2563eb] hover:text-white transition-colors"
                        style={{ position: "relative", zIndex: 1 }}
                      >
                        Contact Us
                      </motion.a> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Mobile Menu (Animated) */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  key="mobile-menu"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="sm:hidden bg-gray-900/95"
                  id="mobile-menu"
                >
                  <div className="px-2 pt-2 pb-3 space-y-1">
                     <button
                     style={{ fontFamily: 'Poppins' }}
                          onClick={movehome}
                          className="relative text-violet-500 group px-3 py-2 rounded-md hover:text-[#2563eb] transition"
                        >
                        Home
                      <span className="absolute left-0 bottom-0 w-0 group-hover:w-full h-[2px] bg-[#2563eb] transition-all" />
                      </button>
                 
                       <button
                       style={{ fontFamily: 'Poppins' }}
                          onClick={() => setAboutUsShowModal(true)}
                          className="relative text-violet-500 group px-3 py-2 rounded-md hover:text-[#2563eb] transition"
                        >
                         About Us
                      <span className="absolute left-0 bottom-0 w-0 group-hover:w-full h-[2px] bg-[#2563eb] transition-all" />
                      </button>
                        <button
                        style={{ fontFamily: 'Poppins' }}
                          onClick={() => setContactUsShowModal(true)}
                          className="relative text-violet-500 group px-3 py-2 rounded-md hover:text-[#2563eb] transition"
                        >
                        Contact Us
                      <span className="absolute left-0 bottom-0 w-0 group-hover:w-full h-[2px] bg-[#2563eb] transition-all" />
                      </button>
                    {/* <motion.a
                      whileHover="hover"
                      variants={linkVariants}
                      onClick={() => { setIsMenuOpen(false); navigate('/'); }}
                      className="cursor-pointer block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white hover:bg-[#2563eb] hover:text-white transition-colors"
                    >
                      Home
                    </motion.a>
                    <motion.a
                      whileHover="hover"
                      variants={linkVariants}
                      onClick={() => { setIsMenuOpen(false); setAboutUsShowModal(true); }}
                      className="cursor-pointer block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white hover:bg-[#2563eb] hover:text-white transition-colors"
                    >
                      About Us
                    </motion.a>
                    <motion.a
                      whileHover="hover"
                      variants={linkVariants}
                      onClick={() => { setIsMenuOpen(false); setContactUsShowModal(true); }}
                      className="cursor-pointer block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white hover:bg-[#2563eb] hover:text-white transition-colors"
                    >
                      Contact Us
                    </motion.a> */}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.nav>
        )}
      </AnimatePresence>
      {/* Modals */}
      {AboutUsShowModal && (
        <AboutUsModal onClose={() => setAboutUsShowModal(false)} />
      )}
      {ContactUsShowModal && (
        <ConatctUsModal onClose={() => setContactUsShowModal(false)} />
      )}
    </div>
  );
};

export default navbar;
