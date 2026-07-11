import React, { useState } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";

const departmentOptions = [
  "Information and Communication Technology",
  "Bio Sysetm Technology",
];
const facultyOptions = ["Faculty of Technology"];
const titleOptions = ["Mr.", "Mrs.", "Ms.", "Dr."];

export default function AddLectures() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [lecturerID, setLecturerID] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(
    "Select a Department",
  );
  const [selectedFaculty, setSelectedFaculty] = useState("Select a Faculty");
  const [selectedTitle, setSelectedTitle] = useState("Select a Title");
  const [gender, setGender] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [preview, setPreview] = useState(null);
  const [ischeckedmale, setIsCheckedMale] = useState(false);
  const [ischeckedfemale, setIsCheckedFemale] = useState(false);
  const [loadingimg2, setloadingimg2] = useState(false);

  const [reload, setReload] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleimagechanges = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUpload(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleclear = () => {
    setname("");
    setemail("");
    setpassword("");
    setconfirmpassword("");
    setContactNumber("");
    setLecturerID("");
    setSelectedDepartment("Select a Department");
    setSelectedFaculty("Select a Faculty");
    setSelectedTitle("Select a Title");
    setGender("");
    setIsCheckedMale(false);
    setIsCheckedFemale(false);
    setImageUpload(null);
    setPreview(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !name ||
      !email ||
      !password ||
      !confirmpassword ||
      !contactNumber ||
      !lecturerID ||
      selectedFaculty === "Select a Faculty" ||
      selectedDepartment === "Select a Department" ||
      selectedTitle === "Select a Title"
    ) {
      enqueueSnackbar("All fields need to be filled!", {
        variant: "error",
        autoHideDuration: 3000,
      });
      return;
    }

    if (password !== confirmpassword) {
      enqueueSnackbar("Passwords do not match!", {
        variant: "error",
        autoHideDuration: 3000,
      });
      return;
    }

    const lecturerData = new FormData();
    lecturerData.append("name", name);
    lecturerData.append("email", email);
    lecturerData.append("password", password);
    lecturerData.append("selectedDepartment", selectedDepartment);
    lecturerData.append("selectedFaculty", selectedFaculty);
    lecturerData.append("gender", gender);
    lecturerData.append("image", imageUpload);
    lecturerData.append("lecid", lecturerID);
    lecturerData.append("contactno", contactNumber);
    lecturerData.append("title", selectedTitle);

    try {
      setloadingimg2(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/admin/lectureadd`,
        lecturerData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      if (response.data.status === "ok") {
        setloadingimg2(false);
        handleclear();
        enqueueSnackbar("Lecturer Added Successfull!", {
          variant: "success",
          autoHideDuration: 3000,
        });
        setReload((prev) => !prev);
      } else {
        setloadingimg2(false);
        enqueueSnackbar("Failed to add lecturer", {
          variant: "error",
          autoHideDuration: 3000,
        });
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Problem with image saving!", {
        variant: "error",
        autoHideDuration: 3000,
      });
    } finally {
      setloadingimg2(false);
    }
  };

return [
  loadingimg2 ? (
    <div key="loading" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "260px" }}>
      <img src="/assets/load_img2.svg" alt="Loading..." style={{ width: "220px", height: "220px" }} />
    </div>
  ) : (
    <div key="add-lecturer-form" style={{ padding: "1.5rem 0" }}>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <style>{`
        .lec-field-input {
          width: 100%; padding: 11px 14px; border-radius: 10px;
          border: 1.5px solid #dbeafe; background: #f8faff;
          font-size: 14px; color: #1e293b; font-family: 'Nunito', sans-serif;
          outline: none; transition: border-color .2s, box-shadow .2s; box-sizing: border-box;
        }
        .lec-field-input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37,99,235,.14);
          background: white;
        }
        .lec-field-input::placeholder { color: #94a3b8; }
        .lec-select {
          width: 100%; padding: 11px 40px 11px 14px; border-radius: 10px;
          border: 1.5px solid #dbeafe; background: #f8faff;
          font-size: 14px; color: #1e293b; font-family: 'Nunito', sans-serif;
          outline: none; appearance: none; cursor: pointer;
          transition: border-color .2s, box-shadow .2s; box-sizing: border-box;
          background-image: url("data:image/svg+xml,%3csvg fill='none' stroke='%232563eb' stroke-width='2' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3e%3c/path%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 14px center;
          background-size: 16px;
        }
        .lec-select:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37,99,235,.14);
          background-color: white;
        }
        .lec-label {
          display: block; font-size: 13px; font-weight: 700;
          color: #334155; margin-bottom: 6px; font-family: 'Nunito', sans-serif;
        }
        .lec-field { display: flex; flex-direction: column; }
        .upload-zone {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          width: 100%; height: 110px; border-radius: 10px;
          border: 2px dashed #93c5fd; background: #f0f9ff; cursor: pointer;
          transition: border-color .2s, background .2s; gap: 6px;
        }
        .upload-zone:hover { border-color: #2563eb; background: #eff6ff; }
        .radio-option {
          display: flex; align-items: center; gap: 8px; cursor: pointer;
          padding: 10px 16px; border-radius: 10px; border: 1.5px solid #dbeafe;
          background: #f8faff; transition: border-color .2s, background .2s; flex: 1;
        }
        .radio-option:has(input:checked) {
          border-color: #2563eb; background: #eff6ff;
        }
        .submit-btn {
          flex: 1; padding: 13px; border-radius: 11px; border: none; cursor: pointer;
          font-size: 14px; font-weight: 700; font-family: 'Nunito', sans-serif;
          background: linear-gradient(135deg, #1e40af, #2563eb); color: white;
          box-shadow: 0 4px 16px rgba(37,99,235,.32);
          transition: opacity .2s, transform .2s;
        }
        .submit-btn:hover { opacity: .92; transform: translateY(-1px); }
        .reset-btn {
          flex: 1; padding: 13px; border-radius: 11px; cursor: pointer;
          font-size: 14px; font-weight: 700; font-family: 'Nunito', sans-serif;
          background: white; color: #1e40af;
          border: 1.5px solid #bfdbfe;
          transition: background .2s, color .2s;
        }
        .reset-btn:hover { background: #eff6ff; }
        .form-section-title {
          font-size: 11px; font-weight: 800; color: #3b82f6;
          text-transform: uppercase; letter-spacing: .1em;
          margin-bottom: 14px; padding-bottom: 8px;
          border-bottom: 1.5px solid #dbeafe;
          font-family: 'Nunito', sans-serif;
        }
        .lec-form-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 900px) {
          .lec-form-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 580px) {
          .lec-form-grid { grid-template-columns: 1fr !important; }
          .lec-form-outer { padding: 20px 16px !important; }
        }
      `}</style>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="lec-form-outer"
        style={{
          background: "white", borderRadius: 20, border: "1.5px solid #dbeafe",
          boxShadow: "0 8px 40px rgba(30,64,175,.09)", padding: "32px 28px",
          maxWidth: "1100px", width: "100%", margin: "0 auto",
          fontFamily: "'Nunito', sans-serif",
        }}
      >
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: "#3b82f6", textTransform: "uppercase", letterSpacing: ".12em", marginBottom: 4 }}>Admin Panel</div>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#0f172a", margin: 0, letterSpacing: "-0.01em" }}>Add New Lecturer</h2>
          <p style={{ fontSize: 13, color: "#94a3b8", marginTop: 5, fontWeight: 500 }}>Fill in all fields to register a new lecturer account.</p>
        </div>

        <div className="lec-form-grid">

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="form-section-title">Personal Info</div>

            <div className="lec-field">
              <label htmlFor="fullname" className="lec-label">Full Name</label>
              <input id="fullname" type="text" placeholder="John Doe" required
                onChange={(e) => setname(e.target.value)}
                className="lec-field-input" />
            </div>

            <div className="lec-field">
              <label htmlFor="email" className="lec-label">Email Address</label>
              <input id="email" type="email" placeholder="john@example.com" required
                onChange={(e) => setemail(e.target.value)}
                className="lec-field-input" />
            </div>

            <div className="lec-field">
              <label className="lec-label">Profile Picture</label>
              <label htmlFor="profile" className="upload-zone">
                {preview ? (
                  <img src={preview} alt="Preview" style={{ width: 52, height: 52, borderRadius: "50%", objectFit: "cover", border: "2px solid #bfdbfe" }} />
                ) : (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M16 12l-4-4m0 0l-4 4m4-4v12"/>
                  </svg>
                )}
                <span style={{ fontSize: 12, color: "#2563eb", fontWeight: 700 }}>
                  {preview ? "Change photo" : "Click to upload"}
                </span>
                <span style={{ fontSize: 11, color: "#94a3b8" }}>PNG, JPG up to 5MB</span>
                <input id="profile" type="file" style={{ display: "none" }} onChange={handleimagechanges} />
              </label>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="form-section-title">Account & Contact</div>

            <div className="lec-field">
              <label htmlFor="password" className="lec-label">Password</label>
              <input id="password" type="password" placeholder="Enter password" required
                onChange={(e) => setpassword(e.target.value)}
                className="lec-field-input" />
            </div>

            <div className="lec-field">
              <label htmlFor="confirmpassword" className="lec-label">Confirm Password</label>
              <input id="confirmpassword" type="password" placeholder="Confirm password" required
                onChange={(e) => setconfirmpassword(e.target.value)}
                className="lec-field-input" />
            </div>

            <div className="lec-field">
              <label htmlFor="contactnumber" className="lec-label">Contact Number</label>
              <input id="contactnumber" type="number" placeholder="07X XXX XXXX" required
                onChange={(e) => setContactNumber(e.target.value)}
                className="lec-field-input" />
            </div>

            <div className="lec-field">
              <label htmlFor="faculty" className="lec-label">Faculty</label>
              <select id="faculty" required value={selectedFaculty}
                onChange={(e) => setSelectedFaculty(e.target.value)}
                className="lec-select">
                {selectedFaculty === "Select a Faculty" && <option value="">Select a Faculty</option>}
                {facultyOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="form-section-title">Academic Details</div>

            <div className="lec-field">
              <label htmlFor="lecturerid" className="lec-label">Lecturer ID</label>
              <input id="lecturerid" type="text" placeholder="Enter Lecturer ID" required
                onChange={(e) => setLecturerID(e.target.value)}
                className="lec-field-input" />
            </div>

            <div className="lec-field">
              <label className="lec-label">Gender</label>
              <div style={{ display: "flex", gap: 10 }}>
                {["male", "female"].map((gender) => (
                  <label key={gender} className="radio-option">
                    <input type="radio" name="gender" value={gender} required
                      onChange={(e) => setGender(e.target.value)}
                      style={{ accentColor: "#2563eb", width: 16, height: 16 }} />
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#334155", textTransform: "capitalize" }}>{gender}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="lec-field">
              <label htmlFor="department" className="lec-label">Department</label>
              <select id="department" required value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="lec-select">
                {selectedDepartment === "Select a Department" && <option value="">Select a Department</option>}
                {departmentOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="lec-field">
              <label htmlFor="title" className="lec-label">Title</label>
              <select id="title" required value={selectedTitle}
                onChange={(e) => setSelectedTitle(e.target.value)}
                className="lec-select">
                {selectedTitle === "Select a Title" && <option value="">Select a Title</option>}
                {titleOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div style={{ display: "flex", gap: 12, paddingTop: 8 }}>
              <button type="submit" className="submit-btn">Submit</button>
              <button type="reset" onClick={handleclear} className="reset-btn">Reset</button>
            </div>
          </div>

        </div>
      </form>
    </div>
  ),
];
};