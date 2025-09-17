import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image
} from "@react-pdf/renderer";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState,useEffect } from 'react'

// Sample Data
const attendanceData = [
  { name: "Tharindu", regNo: "ICT2021001", time: "10:30 AM" },
  { name: "Kasun", regNo: "ICT2021002", time: "10:35 AM" },
  { name: "Nimal", regNo: "ICT2021003", time: "10:38 AM" },
];

// Create styles
const styles = StyleSheet.create({
  viewer: {
    width: '100%',
    height: '100vh',
  },
  logo: {
    width: 80,    
    height: 80,    
    marginBottom: 10,
    alignSelf: 'center',
  },
  page: {
    padding: 30,
    fontSize: 12,
    flexDirection: 'column',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 1,
    fontWeight: 'bold',
  },
  secondsub:{
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 2,
    marginTop:13
  },
  subTitle: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 5,
    marginTop:3
  },
  tableHeader: {
    flexDirection: "row",
    borderBottom: "1pt solid #000",
    backgroundColor: "#f0f0f0",
    marginTop:20,
    padding: 5,
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "0.5pt solid #ccc",
    padding: 5,
  },
  cell: {
    flex: 1,
    fontSize: 12,
  },
  headerCell: {
    flex: 1,
    fontSize: 12,
    fontWeight: "bold",
  },
});


// Create Document Component
function LecAttendance() {
   const [allattendace, setAllAttendace] = useState([]);
   const [subject,setsubject]=useState("");
   const [academic,setacademic]=useState("");
   const [university,setuniversity]=useState("");
   const [faculty,setfaculty]=useState("");
   const [semester,setsemester]=useState("");
   const [department,setdepartment]=useState("");
   const [coursecode,setcoursecode]=useState("");
   const [coursetitle,setcoursetitle]=useState("");

  useEffect(() => {
    const storedData = localStorage.getItem("attendanceData");
    const subject = localStorage.getItem("subject_attendance");
    const semester = localStorage.getItem("semester_attendance");
    const academicyear = localStorage.getItem("academic_attendance");
    const university = localStorage.getItem("university_attendance");
    const deaprtment = localStorage.getItem("department_attendance");
    const faculty = localStorage.getItem("faculty_attendance");
    if (storedData) {
      setAllAttendace(JSON.parse(storedData));
      //--------------------------------------
      const coursecode = subject.split(" ");
      const parts = subject.split(" ").slice(3); // Remove first 3 items
      const joined_coursetitle = parts.join(" ").replace(/"/g, '');
      //const result =  subjectparts.slice(3);
      //const resultagain = result.replace(/"/g, '')
      setcoursetitle(joined_coursetitle);
      const newstring = coursecode[0]+coursecode[1]; 
      const modified_coursecode = newstring.replace(/"/g, '');
      setcoursecode(modified_coursecode);
      //-------------------------------------

      setacademic(JSON.parse(academicyear));
      setuniversity(JSON.parse(university));
      setfaculty(JSON.parse(faculty));
      setsemester(JSON.parse(semester));
      setdepartment(JSON.parse(deaprtment));
    }
  }, []);
  return (
    <PDFViewer style={styles.viewer}>
      <Document>
        <Page size="A4" style={styles.page}>
           <Image src="/src/assets/Uni_Log.jpeg" style={styles.logo}/>
          <Text style={styles.title}>{department}</Text>
          <Text style={styles.title}>{faculty}</Text>
          <Text style={styles.subTitle}>{university}</Text>
          <Text style={styles.subTitle}>Students Attendance Sheet</Text>
          <Text style={styles.subTitle}>Academic Year: {academic} | Semester: {semester}</Text>
          {/* <Text style={styles.title}>{subject}</Text> */}
          <Text style={styles.subTitle}>Course Code: {coursecode}  | Course Title: {coursetitle}</Text>

          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={styles.headerCell}>Student Name</Text>
            <Text style={styles.headerCell}>Registration No</Text>
            {/* <Text style={styles.headerCell}>Time</Text> */}
          </View>

          {/* Table Rows */}
          {allattendace.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.cell}>{item[1]}</Text>
              <Text style={styles.cell}>{item[0]}</Text>
              {/* <Text style={styles.cell}>{item.time}</Text> */}
            </View>
          ))}

          {/* Remarks Section */}
          <View style={{ marginTop: 40 }}>
        <Text>Note: Please return to the Department of {department} on completion of the lecture or lab session.</Text>
</View>
<View style={{ marginTop: 30 ,marginLeft:50}}>
  <Text>   Remarks: ......................................................................................................................</Text>
  <Text>   ............................................................................................................................</Text>
  <Text>   ............................................................................................................................</Text>
</View>

{/* Signature Section */}
<View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'space-between' }}>
  <View>
    <Text>Name(s) of the Lecturer/Instructor/Demonstrator</Text>
    <Text style={{ marginTop: 10 ,marginLeft:10}}>Name of the Lect. In Charge: ..................................</Text>
  </View>

  <View>
   <Text style={{ marginTop: 10 }}>..........................................................</Text>
    <Text>Signature</Text>
    <Text style={{ marginTop: 10 }}>..........................................................</Text>
    <Text>Signature</Text>
  </View>
</View>

{/* HOD Section */}
<View style={{ marginTop: 30 }}>
  <Text>..........................................................</Text>
  <Text>Head of The Department</Text>
  <Text>(Dept.of.{department})</Text>
</View>

        </Page>
      </Document>
    </PDFViewer>
  );
}

export default LecAttendance;
