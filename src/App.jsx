import './App.css'
import { Route, Routes } from 'react-router-dom'
import Admin from './pages/Admin/Admin_Panel.jsx';
import Lecture from './pages/Lecturer/lecturer.jsx';
import LecturerQRGen from './pages/Lecturer/Lecturerqrgen.jsx';
import LectureLogin from './pages/Lecturer/lec_login.jsx';
import AdminLogin from './pages/Admin/admin_login.jsx';
import AdminSubject from './pages/Admin/admin_subject';
import Subjectsdetails from './pages/subjectsdetails';
import LecturerAttendence from './pages/Lecturer/lecAttendance.jsx';
import LandingPage from './pages/LandingPage';
import AttendanceHistory from './pages/Lecturer/Lecturer_Attendance_History.jsx';
import {ReloadProvider } from './ReloadContext'
import AttHistoryData from './pages/Lecturer/Att_History_data.jsx';
import LecAttAnalysis from './pages/Lecturer/Lec_Att_Analysis.jsx';
import SendNotification from './pages/Lecturer/send_notifications';
import PrivacyPolicy from './pages/privacy-policy.jsx';
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
          <Route path='/lecturer/attendace_analysis/:id' element={<LecAttAnalysis/>}></Route>
          <Route path='/lecturer/send_notification/:id' element={<SendNotification/>}></Route>
          <Route path='/privacy-policy' element={<PrivacyPolicy/>}></Route>
      </Routes>
    </ReloadProvider>
    </>
  )
}

export default App
