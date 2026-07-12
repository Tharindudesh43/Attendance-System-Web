import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  BlobProvider,
  Image
} from "@react-pdf/renderer";
import { useState, useEffect } from 'react'


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


function isMobileDevice() {
  if (typeof navigator === "undefined") return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

function LecAttendance() {
   const [allattendace, setAllAttendace] = useState([]);
   const [academic,setacademic]=useState("");
   const [university,setuniversity]=useState("");
   const [faculty,setfaculty]=useState("");
   const [semester,setsemester]=useState("");
   const [department,setdepartment]=useState("");
   const [coursecode,setcoursecode]=useState("");
   const [coursetitle,setcoursetitle]=useState("");
   const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

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

  const AttendanceDocument = (
    <Document>
      <Page size="A4" style={styles.page}>
         <Image src="/assets/Uni_Log.jpeg" style={styles.logo}/>
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
        </View>

        {allattendace.map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={styles.cell}>{item[1]}</Text>
            <Text style={styles.cell}>{item[0]}</Text>
          </View>
        ))}
        <View style={{ marginTop: 40 }}>
      <Text>Note: Please return to the Department of {department} on completion of the lecture or lab session.</Text>
</View>
<View style={{ marginTop: 30 ,marginLeft:50}}>
<Text>   Remarks: ......................................................................................................................</Text>
<Text>   ............................................................................................................................</Text>
<Text>   ............................................................................................................................</Text>
</View>

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

<View style={{ marginTop: 30 }}>
<Text>..........................................................</Text>
<Text>Head of The Department</Text>
<Text>(Dept.of.{department})</Text>
</View>

      </Page>
    </Document>
  );

  if (isMobile) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          padding: 24,
          fontFamily: "sans-serif",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: 15, color: "#334155", maxWidth: 320 }}>
          The attendance sheet is ready. Tap below to open or download the PDF.
        </p>
        <BlobProvider document={AttendanceDocument}>
          {({ url, loading, error }) => {
            if (loading) {
              return <span style={{ fontSize: 13, color: "#94a3b8" }}>Preparing PDF...</span>;
            }
            if (error) {
              return <span style={{ fontSize: 13, color: "#be123c" }}>Failed to generate PDF.</span>;
            }
            return (
              <a
                href={url}
                download="attendance-sheet.pdf"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-block",
                  padding: "12px 24px",
                  borderRadius: 10,
                  background: "#2563eb",
                  color: "white",
                  fontWeight: 700,
                  fontSize: 14,
                  textDecoration: "none",
                }}
              >
                Open / Download PDF
              </a>
            );
          }}
        </BlobProvider>
      </div>
    );
  }

  return (
    <PDFViewer style={styles.viewer}>
      {AttendanceDocument}
    </PDFViewer>
  );
}

export default LecAttendance;