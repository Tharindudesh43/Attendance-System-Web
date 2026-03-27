import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import { useParams } from "react-router-dom";
import Footer from "../components/footer";
import { PieChart, BarChart, LineChart } from "@mui/x-charts";
import { Card, CardContent, Typography, Box } from "@mui/material";
import axios from "axios";

const LecAttAnalysis = () => {
  const navigate = useNavigate();
  const [pieChartLoader, setPieChartLoader] = React.useState(false);
  const [remaininglecturecount, setRemainingLectureCount] =
    React.useState(false);

  const [firstyearcount, setFirstyearcount] = React.useState(0);
  const [secondyearcount, setSecondyearcount] = React.useState(0);
  const [thirdyearcount, setThirdyearcount] = React.useState(0);
  const [fourthyearcount, setFourthyearcount] = React.useState(0);
  const [lectureData, setLectureData] = React.useState([]);

  const [studentscounterror, setstudentscounterror] = React.useState(false);
  const [Remaininglectureerror, setRemaininglectureerror] =
    React.useState(false);

  const { id } = useParams();

  const handlebackbutton = () => {
    navigate(`/lecturer`);
  };

  const chartList = [1, 2, 3, 4, 5];

  useEffect(() => {
    handlepiechartload();
    handleremaininglectures();
  }, []);

  const handlepiechartload = async () => {
    setPieChartLoader(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/lecturer/getstudent_count_by_year/${id}`,
        {
          params: {
            id: id,
          },
        },
      );

      if (response.data.status === "got") {
        setPieChartLoader(false);
        setFirstyearcount(response.data.first.length);
        setSecondyearcount(response.data.second.length);
        setThirdyearcount(response.data.third.length);
        setFourthyearcount(response.data.fourth.length);
      } else {
        setPieChartLoader(false);
        setstudentscounterror(true);
        console.error("Failed to fetch student count: ", response.data.message);
      }
    } catch (error) {
      setPieChartLoader(false);
      setstudentscounterror(true);
      console.error("Error fetching student count:", error);
    }
  };

  const handleremaininglectures = async () => {
    setRemainingLectureCount(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/lecturer/remaining_lectures/${id}`,
        {
          params: {
            id: id,
          },
        },
      );

      if (response.data.status === "got") {
        setRemainingLectureCount(false);
        setLectureData(response.data.data);
      } else {
        setRemainingLectureCount(false);
        setRemaininglectureerror(true);
        console.error("Failed to fetch student count: ", response.data.message);
      }
    } catch (error) {
      setRemainingLectureCount(false);
      setRemaininglectureerror(true);
      console.error("Error fetching student count:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />

      <div className="relative pb-5 bg-gradient-to-r from-blue-100 to-blue-200 shadow">
        <button
          onClick={handlebackbutton}
          className="absolute top-4 left-4 flex items-center px-4 py-2 text-blue-700 bg-white border border-blue-200 rounded-lg shadow hover:bg-blue-50 hover:border-blue-300 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="mr-2"
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 1-.5.5H2.707l4.147 4.146a.5.5 0 0 1-.708.708l-5-5a.5.5 0 0 1 0-.708l5-5a.5.5 0 1 1 .708.708L2.707 7.5H14.5a.5.5 0 0 1 .5.5z"
            />
          </svg>
          <span
            style={{ fontFamily: "Poppins" }}
            className="text-sm font-semibold"
          >
            Back
          </span>
        </button>

        {/* Page Title */}
        <h2
          style={{ fontFamily: "Poppins" }}
          className="text-3xl font-bold text-center text-blue-800 pt-6 pb-1"
        >
          Attendance Analysis Dashboard
        </h2>
      </div>

      <div className="flex justify-center overflow-x-auto gap-4 mt-4 pb-4 px-4">
        {remaininglecturecount == true ? (
          <Box className="flex items-center justify-center h-48">
            <Typography variant="h6" className="text-gray-500">
              Loading...
            </Typography>
          </Box>
        ) : Remaininglectureerror == true ? (
          <Box className="flex items-center justify-center h-48">
            <Typography variant="h6" className="text-gray-500">
              Error loading data
            </Typography>
          </Box>
        ) : (
          lectureData.map((lecture, index) => (
            <Card
              key={index}
              sx={{
                minWidth: 240,
                borderRadius: 3,
                boxShadow: 4,
                transition: "all 0.3s",
                "&:hover": { transform: "translateY(-5px)", boxShadow: 6 },
                background: "linear-gradient(to bottom, #ffffff, #f0f4ff)",
              }}
            >
              <CardContent className="flex flex-col gap-2">
                {/* Subject Name */}
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, mb: 1 }}
                  className="text-blue-800"
                >
                  {lecture.subject}
                </Typography>

                {/* Academic Year & Year of Study */}
                <div className="flex flex-wrap gap-2 mb-1">
                  <span className="px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full">
                    {lecture.academicYear}
                  </span>
                  <span className="px-2 py-1 text-xs font-semibold text-white bg-green-500 rounded-full">
                    {lecture.yearOfStudy}
                  </span>
                </div>

                {/* Semester Info */}
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="px-2 py-1 text-xs font-semibold text-white bg-purple-500 rounded-full">
                    {lecture.semesterVersion}
                  </span>
                  <span className="px-2 py-1 text-xs font-semibold text-white bg-indigo-500 rounded-full">
                    {lecture.semester}
                  </span>
                </div>

                {/* Progress Bar for Lectures */}
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div
                    className="bg-blue-600 h-3 rounded-full"
                    style={{
                      width: `${((lecture.done / lecture.total) * 100).toFixed(1)}%`,
                    }}
                  ></div>
                </div>

                {/* Lectures Done / Remaining */}
                <div className="flex justify-between text-sm font-medium text-gray-700">
                  <span>Done: {lecture.done}</span>
                  <span>Remaining: {lecture.total - lecture.done}</span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow px-2 py-4">
        <div className="flex flex-col lg:flex-row w-full gap-6 mb-6 px-4">
          <div className="lg:w-1/3 w-full">
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: 6,
                transition: "box-shadow 0.3s",
                background: "linear-gradient(135deg, #6EE7B7, #3B82F6)", // Gradient
                color: "white",
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  className="font-semibold mb-4 "
                  style={{
                    fontFamily: "Poppins",
                    color: "black",
                    fontWeight: "600",
                  }}
                >
                  Students (By Year)
                </Typography>
                <PieChart
                  series={[
                    {
                      data: [
                        {
                          id: 0,
                          value: firstyearcount,
                          label: `1st Year (${firstyearcount})`,
                        },
                        {
                          id: 1,
                          value: secondyearcount,
                          label: `2nd Year (${secondyearcount})`,
                        },
                        {
                          id: 2,
                          value: thirdyearcount,
                          label: `3rd Year (${thirdyearcount})`,
                        },
                        {
                          id: 3,
                          value: fourthyearcount,
                          label: `4th Year (${fourthyearcount})`,
                        },
                      ],
                    },
                  ]}
                  width={300}
                  height={200}
                />
              </CardContent>
            </Card>
          </div>

          <div className="lg:w-1/3 w-full">
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: 6,
                transition: "box-shadow 0.3s",
                background: "linear-gradient(135deg, #FBBF24, #EF4444)", // Gradient
                color: "white",
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  className="font-semibold mb-2"
                  style={{
                    fontFamily: "Poppins",
                    color: "black",
                    fontWeight: "600",
                  }}
                >
                  Yearly Attendance Trend (Monthly)
                </Typography>
                <LineChart
                  xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }]}
                  series={[
                    { data: [10, 20, 30, 25, 40, 10, 20, 30, 25, 40, 20, 10] },
                  ]}
                  width={500}
                  height={250}
                />
              </CardContent>
            </Card>
          </div>

          <div className="lg:w-1/3 w-full">
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: 6,
                transition: "box-shadow 0.3s",
                background: "linear-gradient(135deg, #A78BFA, #8B5CF6)", // Gradient
                color: "white",
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  className="font-semibold mb-2"
                  style={{
                    fontFamily: "Poppins",
                    color: "black",
                    fontWeight: "600",
                  }}
                >
                  Monthly Attendance
                </Typography>
                <BarChart
                  xAxis={[
                    {
                      scaleType: "band",
                      data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                    },
                  ]}
                  series={[{ data: [50, 45, 60, 70, 55, 65] }]}
                  width={300}
                  height={200}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="w-full px-4">
          <Card
            sx={{
              borderRadius: 4,
              boxShadow: 6,
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": { transform: "translateY(-5px)", boxShadow: 10 },
              background: "linear-gradient(135deg, #10B981, #3B82F6)", // Green to Blue gradient
              color: "white",
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                className="font-semibold mb-2"
                style={{
                  fontFamily: "Poppins",
                  color: "black",
                  fontWeight: "600",
                }}
              >
                Attendance by Day
              </Typography>

              <BarChart
                xAxis={[{ scaleType: "band", data: ["Mon", "Tue", "Wed"] }]}
                series={[
                  {
                    data: [50, 30, 60],
                    color: "#FFF",
                  },
                ]}
                width={400}
                height={220}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LecAttAnalysis;
