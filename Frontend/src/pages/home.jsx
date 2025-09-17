import React, { useState } from "react";
import Header from "../components/header";
import LectureLogin from '../pages/lec_login';
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";
import { useContextData } from "../ReloadContext.jsx";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { green, pink, purple } from '@mui/material/colors';

const Home = () => {
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

  return (
    <div className="flex flex-col w-screen h-screen">
       <Header/>
      <div className="flex flex-col w-full h-screen md:flex-row">
      <div className="flex items-center justify-center flex-grow bg-gray-200">
        <div className="w-1/2 p-10 bg-white rounded-lg shadow-lg sm-h-1/2 md-h-1/2 lg-h-1/2">
          <h2 className="text-xl font-semibold">ADMIN</h2>
          <p className="pb-3 mt-2 text-gray-600">This window only for a admin.</p>
          <AdminButton className="font-medium tracking-wider bg-red-700 border border-current outline-none cursor-pointer hover:bg-green-500 active:bg-blue-700" onClick={() => navigateAdminLogin()} variant="contained">Log In</AdminButton>
        </div>
      </div>
      <div className="flex items-center justify-center flex-grow bg-gray-200">
        <div className="w-1/2 p-10 bg-white rounded-lg shadow-lg sm-h-1/2 md-h-1/2 lg-h-1/2">
          <h2 className="text-xl font-semibold">LECTURERS</h2>
          <p className="pb-3 mt-2 text-gray-600">This window for lecturers.</p>
          <LecturerButton className="font-medium tracking-wider border border-current outline-none cursor-pointer" onClick={() => navigateLecturerLogin()} variant="contained">Log In</LecturerButton>
        </div>
      </div>
</div>

      <Footer />
    </div>
  );
};

export default Home;
