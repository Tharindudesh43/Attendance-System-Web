import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";
import { useContextData } from "../ReloadContext.jsx";
import LectureCard from "../components/lec_card.jsx";
import Reportcard from "../components/Report_card.jsx";
import Dashboard from "../pages/adminDashboard.jsx";

const departmentOptions = [
  "Information and Communication Technology",
  "Bio Sysetm Technology",
];
const facultyOptions = ["Faculty of Technology"];
const titleOptions = ["Mr.", "Mrs.", "Ms.", "Dr."];

const Sidebar = ({ onSelect, selected, isOpen, toggle }) => {
  const options = ["Dashboard","Add Lecturer", "View Lectures", "View Reports"];

  return (
    <>
      <div className="flex items-center justify-between p-4 text-white bg-gray-900 md:hidden">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <button onClick={toggle} className="text-white focus:outline-none">
          ☰
        </button>
      </div>

      <div
        className={`
          ${isOpen ? "block" : "hidden"} md:block
          fixed md:static
          top-0 left-0
          w-64
          h-screen
          bg-gray-900 text-white
          p-4 space-y-4
          z-20
          flex flex-col
          overflow-y-auto
        `}
      >
        <h2 className="hidden mb-6 text-xl font-bold md:block">Admin Panel</h2>
        {options.map((option) => (
          <div
            key={option}
            className={`cursor-pointer p-2 rounded hover:bg-gray-700 ${
              selected === option ? "bg-gray-700" : ""
            }`}
            onClick={() => {
              onSelect(option);
              if (isOpen) toggle();
            }}
          >
            {option}
          </div>
        ))}
      </div>
    </>
  );
};

const AddLectures = () => {
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
      <div className="flex items-center justify-center w-full h-64 col-span-full">
        <img
          src="../src/assets/load_img2.svg"
          alt="Loading..."
          className="w-60 h-60"
        />
      </div>
    ) : (
      <div
        className="flex items-center justify-center p-4 text-sm"
        key="add-lecturer-form"
      >
        <form
          onSubmit={handleSubmit}
          className="grid w-full grid-cols-1 gap-8 p-10 text-gray-300 bg-gray-800 shadow-2xl text- bg-opacity-90 backdrop-blur-md rounded-3xl max-w-7xl md:grid-cols-3"
          noValidate
        >
          {/* Column 1 */}
          <div className="space-y-3">
            <div>
              <label htmlFor="fullname" className="block mb-2 font-semibold">
                Full Name
              </label>
              <input
                onChange={(e) => setname(e.target.value)}
                id="fullname"
                type="text"
                placeholder="John Doe"
                className="w-full px-5 py-3 text-sm text-gray-200 transition bg-gray-700 border border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 font-semibold">
                Email Address
              </label>
              <input
                id="email"
                onChange={(e) => setemail(e.target.value)}
                type="email"
                placeholder="john@example.com"
                className="w-full px-5 py-3 text-sm text-gray-200 transition bg-gray-700 border border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="profile"
                className="block mb-2 font-semibold text-gray-300"
              >
                Profile Picture
              </label>

              <label
                htmlFor="profile"
                className="flex flex-col items-center justify-center w-full h-32 text-sm text-indigo-400 transition border-2 border-indigo-500 border-dashed cursor-pointer rounded-xl hover:bg-indigo-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M16 12l-4-4m0 0l-4 4m4-4v12"
                  />
                </svg>

                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="object-cover w-12 h-12 mb-2 border border-gray-300 rounded-full"
                  />
                )}

                <span className="text-sm">Click to upload</span>
                <input
                  id="profile"
                  type="file"
                  className="hidden"
                  onChange={handleimagechanges}
                />
              </label>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label htmlFor="password" className="block mb-2 font-semibold">
                Password
              </label>
              <input
                id="password"
                type="password"
                onChange={(e) => setpassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full px-5 py-3 text-sm text-gray-200 transition bg-gray-700 border border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirmpassword"
                className="block mb-2 text-sm font-semibold"
              >
                Confirm Password
              </label>
              <input
                id="confirmpassword"
                onChange={(e) => setconfirmpassword(e.target.value)}
                type="password"
                placeholder="Confirm Password"
                className="w-full px-5 py-3 text-sm text-gray-200 transition bg-gray-700 border border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="confirmpassword"
                className="block mb-2 font-semibold"
              >
                Contact Number
              </label>
              <input
                id="contactnumber"
                onChange={(e) => setContactNumber(e.target.value)}
                type="number"
                placeholder="07X XXX XXXX"
                className="w-full px-5 py-3 text-sm text-gray-200 transition bg-gray-700 border border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="faculty"
                className="block mb-2 font-semibold text-white"
              >
                Faculty
              </label>
              <select
                id="faculty"
                value={selectedFaculty}
                onChange={(e) => setSelectedFaculty(e.target.value)}
                className="w-full px-5 py-3 text-sm text-gray-300 transition bg-gray-700 border border-gray-600 appearance-none cursor-pointer rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500"
                required
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3csvg fill='none' stroke='%239ca3af' stroke-width='2' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3e%3c/path%3e%3c/svg%3e\")",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 1.25rem center",
                  backgroundSize: "1.25rem",
                  paddingRight: "3rem",
                }}
              >
                {selectedFaculty == "Select a Faculty" ? (
                  <option value="">Select a Faculty</option>
                ) : (
                  <div></div>
                )}
                {facultyOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label htmlFor="lecturerid" className="block mb-2 font-semibold">
                Lecturer ID
              </label>
              <input
                id="lecturerid"
                type="text"
                onChange={(e) => setLecturerID(e.target.value)}
                placeholder="Enter Lecturer ID"
                className="w-full px-5 py-3 text-sm text-gray-200 transition bg-gray-700 border border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Gender</label>
              <div className="flex space-x-8">
                {["male", "female"].map((gender) => (
                  <label
                    key={gender}
                    className="flex items-center space-x-2 text-sm cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-6 h-6 text-sm text-indigo-500 focus:ring-indigo-400"
                      required
                    />
                    <span className="text-sm font-medium text-gray-300 capitalize">
                      {gender}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="department"
                className="block mb-2 font-semibold text-white"
              >
                Department
              </label>
              <select
                id="department"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full px-5 py-3 text-sm text-gray-300 transition bg-gray-700 border border-gray-600 appearance-none cursor-pointer rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500"
                required
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3csvg fill='none' stroke='%239ca3af' stroke-width='2' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3e%3c/path%3e%3c/svg%3e\")",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 1.25rem center",
                  backgroundSize: "1.25rem",
                  paddingRight: "3rem",
                }}
              >
                {selectedDepartment == "Select a Department" ? (
                  <option value="">Select a Department</option>
                ) : (
                  <div></div>
                )}
                {departmentOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="faculty"
                className="block mb-2 font-semibold text-white"
              >
                Title
              </label>
              <select
                id="faculty"
                value={selectedTitle}
                onChange={(e) => setSelectedTitle(e.target.value)}
                className="w-full px-5 py-3 text-sm text-gray-300 transition bg-gray-700 border border-gray-600 appearance-none cursor-pointer rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500"
                required
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3csvg fill='none' stroke='%239ca3af' stroke-width='2' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3e%3c/path%3e%3c/svg%3e\")",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 1.25rem center",
                  backgroundSize: "1.25rem",
                  paddingRight: "3rem",
                }}
              >
                {selectedTitle == "Select a Title" ? (
                  <option value="">Select a Title</option>
                ) : (
                  <div></div>
                )}
                {titleOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex pt-3 space-x-4">
              <button
                type="submit"
                className="flex-1 py-2 text-sm font-medium text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700"
              >
                Submit
              </button>
              <button
                type="reset"
                onClick={handleclear}
                className="flex-1 py-2 text-sm font-medium text-indigo-400 transition border border-indigo-600 rounded-lg hover:bg-indigo-900"
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    ),
  ];
};

const Reports = () => {
  const { reload, setReload } = useContextData();
  const [loadingimg1, setloadingimg1] = useState(false);
  const [reportsData, setreportsData] = useState([]);
  const navigate = useNavigate();

  async function populateReports() {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/admin_report/get_reports`,
      {
        headers: { "x-access-token": localStorage.getItem("admintoken") },
      },
    );

    if (response.data.status === "ok") {
      setreportsData(response.data.reports);
      setloadingimg1(false);
    } else {
      alert(response.data.status);
      setloadingimg1(false);
    }
  }

  useEffect(() => {
    const fecthlectures = async () => {
      setloadingimg1(true);
      const admintoken = localStorage.getItem("admintoken");
      if (!admintoken) {
        localStorage.removeItem("admintoken");
        navigate("/");
      } else {
        populateReports();
      }
    };
    fecthlectures();
  }, [reload]);

  return (
    <div className="min-h-screen p-6 bg-white">
      <h2 className="mb-4 text-2xl font-bold text-gray-700">Student Reports</h2>

      {loadingimg1 ? (
        <div className="flex items-center justify-center w-full h-64">
          <img
            src="../src/assets/load_img1.svg"
            alt="Loading..."
            className="w-24 h-24"
          />
        </div>
      ) : reportsData.length === 0 ? (
        <div className="flex items-center justify-center w-full h-64">
          <p className="text-gray-600 text-[15px] font-medium">
            No Reports Available.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {reportsData.map((report) => (
            <Reportcard
              key={report._id}
              _id={report._id} //
              reportId={report.reportId} //
              date={report.date_of_report} //
              user={report.user} //
              statuspassed={report.status} //
              time={report.time_of_report} //
              student_email={report.student_email} //
              reportTitle={report.report_title} //
              reportDescription={report.report_description} //
              reportType={report.report_type} //
              reportImages={report.images} //
              user_id={report.user_id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const ViewLectures = () => {
  const { reload, setReload } = useContextData();
  const [loadingimg1, setloadingimg1] = useState(false);
  const [lecturerData, setlecturerData] = useState([]);
  const navigate = useNavigate();

  async function populateLec() {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/admin/lectures`,
      {
        headers: { "x-access-token": localStorage.getItem("admintoken") },
      },
    );

    if (response.data.status === "ok") {
      setlecturerData(response.data.lec_data);
      setloadingimg1(false);
      navigate("/admin");
    } else {
      alert(response.data.status);
      setloadingimg1(false);
    }
  }

  useEffect(() => {
    const fecthreports = async () => {
      setloadingimg1(true);
      const admintoken = localStorage.getItem("admintoken");
      if (!admintoken) {
        localStorage.removeItem("admintoken");
        navigate("/");
      } else {
        populateLec();
      }
    };
    fecthreports();
  }, [reload]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow p-4 overflow-y-auto">
        {loadingimg1 ? (
          <div className="flex items-center justify-center w-full h-64">
            <img
              src="../src/assets/load_img1.svg"
              alt="Loading..."
              className="w-24 h-24"
            />
          </div>
        ) : lecturerData.length === 0 ? (
          <div className="flex items-center justify-center w-full h-64">
            <p className="text-gray-600 text-[15px] font-medium">
              No lecturers added yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {lecturerData.map((lecturer) => (
              <LectureCard
                key={lecturer._id}
                id={lecturer._id}
                name={lecturer.name}
                image={lecturer.image}
                email={lecturer.email}
                password={lecturer.password}
                gender={lecturer.gender}
                department={lecturer.department}
                faculty={lecturer.faculty}
                title={lecturer.title}
                contactno={lecturer.contactno}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default function AdminDashboard() {
  const [selected, setSelected] = useState("Add Lecturer");
  //  const options = [ 'Add Lecture', 'View Lectures','Reports'];
  const renderContent = () => {
    switch (selected) {
      case "Add Lecturer":
        return <AddLectures />;
      case "View Lectures":
        return <ViewLectures />;
      case "View Reports":
        return <Reports />;
      case "Dashboard":
        return <Dashboard />;
      default:
        return <AddLectures />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Header />

      <div className="flex">
        <Sidebar
          onSelect={setSelected}
          selected={selected}
          className="sticky top-0 h-screen"
        />

        <div className="flex-1 min-h-full bg-white">{renderContent()}</div>
      </div>

      <Footer />
    </div>
  );
}
