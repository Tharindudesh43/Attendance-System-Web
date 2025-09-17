import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home';
import Admin from './pages/admin';
import Lecture from './pages/lecturer';
import LecturerQRGen from './pages/Lecturerqrgen';
import AdminDashboard from './pages/adminDashboard';
import LectureLogin from './pages/lec_login';
import AdminLogin from './pages/admin_login';
import AdminSubject from './pages/admin_subject';
import Subjectsdetails from './pages/subjectsdetails';
import LecturerAttendence from './pages/lecAttendance';
import LandingPage from './pages/LandingPage';
import AttendanceHistory from './pages/Lecturer_Attendance_History';
import {ReloadProvider } from './ReloadContext'
import AttHistoryData from './pages/Att_History_data';
import LecAttAnalysis from './pages/Lec_Att_Analysis';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {

  return (
    <>
    <ReloadProvider>
    <Routes>
          <Route path='/' element={<LandingPage/>}></Route>
          <Route path='/admin' element={<Admin/>}></Route>
          <Route path='/lecturer' element={<Lecture/>}></Route>
          <Route path='/lecturer/lecturer_attendence' element={<LecturerAttendence/>}></Route>
          <Route path='/lecturer/lecturer_qrgen/:id' element={<LecturerQRGen/>}></Route>
          <Route path='/admin/admin_dashboard' element={<AdminSubject/>}></Route>
          <Route path='/lecturer_login' element={<LectureLogin/>}></Route>
          <Route path='/admin_Login' element={<AdminLogin/>}></Route>
          <Route path='/lecturer/att_history_data/:id/:subject/:year' element={<AttHistoryData />} />
          <Route path='/lecturer/attendace_history/:id' element={<AttendanceHistory/>}></Route>
          <Route path='/admin/subjectsdetails/:id' element={<Subjectsdetails/>}></Route>
          <Route path='/lecturer/attendace_analysis' element={<LecAttAnalysis/>}></Route>
      </Routes>
    </ReloadProvider>
    </>
  )
}

export default App
