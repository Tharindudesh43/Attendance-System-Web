import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import { PieChart, BarChart, LineChart } from '@mui/x-charts';
import { Card, CardContent, Typography, Box } from '@mui/material';

const LecAttAnalysis = () => {
  const navigate = useNavigate();

  const handlebackbutton = () => {
    navigate(`/lecturer`);
  };

  const chartList = [1, 2, 3, 4, 5];
  

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      {/* Top Section with Back Button */}
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
            style={{ fontFamily: 'Poppins' }}
          className="+text-sm font-semibold">Back</span>
        </button>
        <h2
           style={{ fontFamily: 'Poppins' }}
        className="text-3xl font-bold text-center text-blue-800 pt-6 pb-1">
          Attendance Analysis Dashboard
        </h2>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow px-2 py-4">
        <div className="flex flex-col md:flex-row w-full max-w-6xl gap-6">
          {/* Left Column */}
          <div className="md:w-1/2 flex flex-col gap-6">
            {/* Pie Chart Card */}
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: 3,
                transition: 'box-shadow 0.2s',
                '&:hover': { boxShadow: 6 },
              }}
            >
              <CardContent>
                <Typography variant="h6"   style={{ fontFamily: 'Poppins' }} className="font-semibold mb-2">
                  Students % (By Year)
                </Typography>
                <PieChart
                  series={[
                    {
                      data: [
                        { id: 0, value: 10, label: '1st Year' },
                        { id: 1, value: 20, label: '2nd Year' },
                        { id: 2, value: 30, label: '3rd Year' },
                        { id: 3, value: 30, label: '4th Year' },
                      ],
                    },
                  ]}
                  width={300}
                  height={200}
                />
              </CardContent>
            </Card>

            {/* Bar Chart Card */}
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: 3,
                transition: 'box-shadow 0.2s',
                '&:hover': { boxShadow: 6 },
              }}
            >
              <CardContent>
                <Typography variant="h6" className="font-semibold mb-2"   style={{ fontFamily: 'Poppins' }}>
                  Attendance by Day
                </Typography>
                <BarChart
                  xAxis={[{ scaleType: 'band', data: ['Mon', 'Tue', 'Wed'] }]}
                  series={[{ data: [50, 30, 60] }]}
                  width={300}
                  height={200}
                />
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="md:w-1/2 flex flex-col gap-6">
            {/* Line Chart Card */}
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: 3,
                transition: 'box-shadow 0.2s',
                '&:hover': { boxShadow: 6 },
              }}
            >
              <CardContent>
                <Typography variant="h6" className="font-semibold mb-2"   style={{ fontFamily: 'Poppins' }}>
                  Yearly Attendance Trend (Monthly)
                </Typography>
                <LineChart
                  xAxis={[
                    {
                      data: [
                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
                      ],
                    },
                  ]}
                  series={[
                    {
                      data: [
                        10, 20, 30, 25, 40, 10, 20, 30, 25, 40,
                        20, 10,
                      ],
                    },
                  ]}
                  width={500}
                  height={250}
                />
              </CardContent>
            </Card>

            {/* Scrollable Row of Subject Charts */}
            <div className="bg-white rounded-2xl shadow-lg p-4 overflow-x-auto">
              <Typography
                variant="h6"
                className="mb-3 font-semibold text-blue-700"
                  style={{ fontFamily: 'Poppins' }}
              >
                Subjects Attendance Snapshot
              </Typography>
              <div className="flex gap-4 w-max">
                {chartList.map((_, index) => (
                  <Card
                    key={index}
                    className="min-w-[220px] rounded-xl"
                    sx={{
                      borderRadius: 4,
                      boxShadow: 2,
                      transition: 'box-shadow 0.2s',
                      '&:hover': { boxShadow: 6 },
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="body1"
                        className="font-semibold text-blue-600 mb-2"
                      >
                        SWT1202{index + 1}
                      </Typography>
                      <BarChart
                        xAxis={[
                          {
                            scaleType: 'band',
                            data: ['W1', 'W2', 'W3', 'W4'],
                          },
                        ]}
                        series={[{ data: [20, 35, 25, 30] }]}
                        width={200}
                        height={130}
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LecAttAnalysis;
