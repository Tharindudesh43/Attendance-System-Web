import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { styled } from '@mui/material/styles';
import Header from "../components/header";
import { green, pink, purple } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Footer from '../components/footer';

const LandingPage = () => {
  const navigate = useNavigate();
  
  
    const navigateAdminLogin = () => {
     const role = localStorage.getItem('role');
      if(role==='admin'){
        navigate('/admin');
      }else{
        localStorage.clear();
        localStorage.setItem('role','');
        navigate("/admin_Login");
      }
    }
  
    const navigateLecturerLogin = () => {
      const role = localStorage.getItem('role');
      if(role==='lecturer'){
        navigate('/lecturer');
      }else{
        localStorage.clear();
        localStorage.setItem('role','');
        navigate("/lecturer_login");
      }
    }
  
    const AdminButton = styled(Button)(({ theme }) => ({
      color: theme.palette.getContrastText(pink[500]),
      backgroundColor: pink[500],
      '&:hover': {
        backgroundColor: pink[700],
      },
    }));
  
    const LecturerButton = styled(Button)(({ theme }) => ({
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
      },
    }));
    
 const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

 return (
     <div className="bg-gradient-to-b from-[#f0f4f8] to-[#d9e2ec] min-h-screen flex flex-col font-['Inter']">

       <Header/>
      {/* Hero Section */}
         <section className="flex flex-col-reverse items-center justify-between gap-12 px-6 py-20 mx-auto md:flex-row max-w-7xl">
        <motion.div
          className="max-w-lg text-center md:text-left"
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 
          style={{ fontFamily: 'Poppins' }}
          className="text-4xl md:text-5xl font-extrabold text-[#1e293b] leading-tight mb-6">
            Welcome to SEUSL Attendance System
          </h1>
          <p 
          style={{ fontFamily: 'Poppins' }}
          className="text-lg text-[#475569] mb-8">
            Streamline attendance management for admins and lecturers with ease and efficiency.
          </p>
          <div className="flex justify-center gap-6 md:justify-start">
            <Link
              to="login"
              smooth={true}
              duration={600}
              style={{ fontFamily: 'Poppins' }}
              offset={-80} // Adjust for sticky navbar height if needed
              className="cursor-pointer bg-[#2563eb] text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-[#1e40af] transition"
            >
              Get Started
            </Link>
            <Link
              to="aboutus"
              smooth={true}
              duration={600}
              offset={-80}
              style={{ fontFamily: 'Poppins' }}
              className="cursor-pointer border border-[#2563eb] text-[#2563eb] px-6 py-3 rounded-lg font-semibold hover:bg-[#e0e7ff] transition"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
        <motion.img
          className="w-full max-w-xl rounded-lg shadow-lg"
          src="../src/assets/ladndinpage_img1.png"
          alt="Illustration"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </section>
      
       <section id="login" className="grid max-w-5xl grid-cols-1 gap-12 p-12 mx-auto mb-20 bg-white shadow-xl rounded-xl md:grid-cols-2">
  {[
    {
      title: "Admin Portal",
      description: "Access the admin dashboard to manage users, attendance records, and system settings.",
      color: "bg-[#dc2626]",
      hover: "hover:bg-[#b91c1c]",
      onClick: () => navigateAdminLogin()
    },
    {
      title: "Lecturer Portal",
      description: "Log in to mark attendance, view your classes, and manage student records.",
      color: "bg-[#22c55e]",
      hover: "hover:bg-[#16a34a]",
      onClick: () => navigateLecturerLogin()
    }
  ].map((portal, i) => (
    <div key={i} className="flex flex-col justify-between p-8 transition border rounded-lg shadow-md cursor-pointer hover:shadow-lg">
      <div>
        <h2 
        style={{ fontFamily: 'Poppins' }}
        className="text-2xl font-bold text-[#1e293b] mb-3">{portal.title}</h2>
        <p 
        style={{ fontFamily: 'Poppins' }}
        className="text-[#475569] mb-6">{portal.description}</p>
      </div>
      <button
        style={{ fontFamily: 'Poppins' }}
        className={`Poppins-font self-start text-white px-5 py-3 rounded-md font-semibold shadow-md ${portal.color} ${portal.hover} transition`}
        onClick={portal.onClick}
      >
        Log In
      </button>
    </div>
  ))}
</section>


      {/* About Section */}
      <section id="aboutus" className="grid items-center gap-10 px-6 py-20 mx-auto text-center max-w-7xl md:text-left md:grid-cols-2">
       <img
  className="w-full max-w-sm mx-auto rounded-lg shadow-lg md:mx-0"
  src="https://storage.googleapis.com/a1aa/image/029a8638-5e3f-4118-d138-8ca5bfc23a14.jpg"
  alt="About"
/>

        <div>
          <h3 
          style={{ fontFamily: 'Poppins' }}
          className="text-3xl font-extrabold text-[#1e293b] mb-6">
            About SEUSL Attendance System
          </h3>
          <p 
          style={{ fontFamily: 'Poppins' }}
          className="text-[#475569] mb-4 leading-relaxed">
            The SEUSL Attendance System is a smart digital platform designed to simplify and secure attendance tracking for university students and staff.
          </p>
          <p 
          style={{ fontFamily: 'Poppins' }}
          className="text-[#475569] leading-relaxed">
            It enhances academic management by offering real-time attendance monitoring, easy login portals, and detailed reports for admins and lecturers.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-4xl p-12 mx-auto mb-20 bg-white shadow-xl rounded-xl">
        <h3 
        style={{ fontFamily: 'Poppins' }}
        className="text-3xl font-extrabold text-center text-[#1e293b] mb-8">Contact Us</h3>
        <form className="max-w-xl mx-auto space-y-6">
          {[
            { label: "Name", type: "text", id: "name", placeholder: "Your full name" },
            { label: "Email", type: "email", id: "email", placeholder: "you@example.com" }
          ].map((input, i) => (
            <div key={i}>
              <label 
              style={{ fontFamily: 'Poppins' }}
              htmlFor={input.id} className="block text-sm font-semibold text-[#334155] mb-2">
                {input.label}
              </label>
              <input
              style={{ fontFamily: 'Poppins' }}
                type={input.type}
                id={input.id}
                name={input.id}
                required
                placeholder={input.placeholder}
                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb] transition"
              />
            </div>
          ))}
          <div>
            <label 
            style={{ fontFamily: 'Poppins' }}
            htmlFor="message" className="block text-sm font-semibold text-[#334155] mb-2">
              Message
            </label>
            <textarea
            style={{ fontFamily: 'Poppins' }}
              id="message"
              name="message"
              rows="4"
              required
              placeholder="Write your message here..."
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb] transition"
            ></textarea>
          </div>
          <button 
          style={{ fontFamily: 'Poppins' }}
          type="submit" className="bg-[#2563eb] text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-[#1e40af] transition w-full">
            Send Message
          </button>
        </form>
      </section>

      {/* Footer */}
         <Footer />
    </div>
  );
};

export default LandingPage;
