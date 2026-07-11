import { React, useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { useNavigate, useParams } from "react-router-dom";
import { useContextData } from "../ReloadContext.jsx";
import axios from "axios";
import DeleteSubjectConfirmModal from "../components/SubjectDelete_modal.jsx";
import loadingimage from "/assets/load_img1.svg";

const SubjectsDetails = () => {
  const { reload, setReload } = useContextData();
  const navigate = useNavigate();
  const { id } = useParams();
  const [allsubjects, setallsubjects] = useState([]);
  const [DeleteConfirmShowModal, setDeleteConfirmShowModal] = useState(false);
  const [subject, setsubject] = useState("");
  const [year, setyear] = useState("");
  const [idpassed, setidpassed] = useState("");
  const [subjectIndex, setsubjectIndex] = useState();
  const [loadingimg2, setloadingimg2] = useState(false);

  const navigateback = () => {
    setReload((prev) => !prev);
    navigate("/admin");
  };

  useEffect(() => {
    const fetchSubjects = async () => {
      setloadingimg2(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/admin/subjectsdetails/${id}`,
        );
        if (response.data.status === "ok") {
          setallsubjects(response.data.subjects);
          setloadingimg2(false);
        } else if (response.data.status === "No subjects available") {
          setloadingimg2(false);
          setallsubjects("No subjects availabl");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchSubjects();
  }, [reload, id]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/30">
      <Header />
      
      <div className="w-full px-4 pt-6 pb-2 md:px-8">
        <button
          onClick={() => navigateback()}
          className="inline-flex items-center justify-center px-4 py-2 text-sm text-black transition-colors bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="mr-2"
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 1-.5.5H2.707l4.147 4.146a.5.5 0 0 1-.708.708l-5-5a.5.5 0 0 1 0-.708l5-5a.5.5 0 1 1 .708.708L2.707 7.5H14.5a.5.5 0 0 1 .5.5z"
            />
          </svg>
          Back
        </button>
      </div>

      <div className="flex flex-col flex-grow w-full px-4 pt-4 pb-10 mx-auto md:px-8 max-w-7xl">
        <div className="w-full overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
          <div className="w-full overflow-x-auto">
            <table className="min-w-full bg-white whitespace-nowrap">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="p-4 text-left text-[13px] font-semibold text-slate-900">
                    Academic Year
                  </th>
                  <th className="p-4 text-left text-[13px] font-semibold text-slate-900">
                    Year
                  </th>
                  <th className="p-4 text-left text-[13px] font-semibold text-slate-900">
                    Semester
                  </th>
                  <th className="p-4 text-left text-[13px] font-semibold text-slate-900">
                    Subject
                  </th>
                  <th className="p-4 text-left text-[13px] font-semibold text-slate-900">
                    Sem Version
                  </th>
                  <th className="p-4 text-left text-[13px] font-semibold text-slate-900">
                    Actions
                  </th>
                </tr>
              </thead>
              
              {loadingimg2 ? (
                <tbody>
                  <tr>
                    <td colSpan={6} className="p-8 text-center">
                      <div className="flex items-center justify-center w-full">
                        <img
                          src={loadingimage}
                          alt="Loading..."
                          className="w-16 h-16 md:w-20 md:h-20"
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              ) : allsubjects && allsubjects === "No subjects available" ? (
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td
                      colSpan={6}
                      className="p-8 text-[15px] text-slate-500 font-medium text-center"
                    >
                      No Data Added Yet.
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody className="divide-y divide-gray-100">
                  {allsubjects.map((subjectSet, index) =>
                    subjectSet.map((subjectDetails, subIndex) => (
                      <tr
                        key={`${index}-${subIndex}`}
                        className="transition-colors hover:bg-gray-50"
                      >
                        {subjectDetails.map((item, itemIndex) => (
                          <td
                            key={`${subIndex}-${itemIndex}`}
                            className="p-4 text-[14px] md:text-[15px] text-slate-800 font-medium"
                          >
                            {item}
                          </td>
                        ))}
                        <td className="p-4">
                          <div className="flex items-center justify-start">
                            <button
                              title="Delete"
                              className="p-2 transition-colors rounded-lg cursor-pointer hover:bg-red-50"
                              onClick={() => {
                                setyear(subjectDetails[1]);
                                setsubject(subjectDetails[3]);
                                setidpassed(id);
                                setsubjectIndex(index);
                                setDeleteConfirmShowModal(true);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 transition-colors fill-red-500 hover:fill-red-700"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                                  data-original="#000000"
                                />
                                <path
                                  d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                                  data-original="#000000"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    )),
                  )}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
      
      {DeleteConfirmShowModal && (
        <DeleteSubjectConfirmModal
          id={id}
          subject={subject}
          subjectIndex={subjectIndex}
          year_study={year}
          onClose={() => setDeleteConfirmShowModal(false)}
        />
      )}
      <Footer />
    </div>
  );
};

export default SubjectsDetails;