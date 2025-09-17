import React, { useState } from "react";
import anonymousimage from '../assets/anonymous.png';
import userimage from '../assets/user.png';
import axios from "axios";
import { useEffect } from "react";
import { useContextData } from "../ReloadContext.jsx";
import  ReportDeleteConfirm from "./reportcard_delete_modal.jsx";
import  ReportInfoModal from "./reportcad_info_modal.jsx";

const Report_card = ({
    _id,
    reportId,
    reportType,
    date,
    user,
    student_email,
    time,
    statuspassed,
    reportTitle,
    reportDescription,
    reportImages,
    user_id
}) => {
    const [DeleteConfirmShowModal, setDeleteConfirmShowModal] = useState(false);
    const [ReportInfoShowModal, setReportInfoShowModal] = useState(false);
    const [ReportDetailsModal, setReportDetailsModal] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [status, setStatus] = useState("Not Watched");
    const {reload, setReload} = useContextData();
    const [expanded, setExpanded] = useState(false);


      useEffect(()=>{
        setStatus(statuspassed)
      },[reload])

    const statusIcons = [
  {
    name: "Watching",
    icon: "fas fa-eye",
    color: "text-yellow-500",
    bg: "bg-yellow-100",
    hover: "hover:bg-yellow-200"
  },
  {
    name: "Mark as Done",
    icon: "fas fa-check-circle",
    color: "text-green-600",
    bg: "bg-green-100",
    hover: "hover:bg-green-200"
  },
  {
    name: "Not Watched",
    icon: "fas fa-eye-slash",
    color: "text-gray-400",
    bg: "bg-gray-100",
    hover: "hover:bg-gray-200"
  }
];

    const statusStyles = {
      Watching: "bg-yellow-500 text-white",
      "Mark as Done": "bg-green-600 text-white",
      "Not Watched": "bg-gray-400 text-white",
    };

    async function changereport_Status (statusname) {
      console.log(statusname)
      console.log(_id)
      const ChangeReportStatus = new FormData();
      const ChangeReportStatusFirebase = new FormData();
      ChangeReportStatus.append("status", statusname);
      ChangeReportStatus.append("id", _id);
      const response = await axios.post('http://localhost:1337/admin_report/change_status', ChangeReportStatus, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if(response.data.status==='ok'){
            ChangeReportStatusFirebase.append("status", statusname);
            ChangeReportStatusFirebase.append("reportid", reportId);
            ChangeReportStatusFirebase.append("userId", user_id);
            const reply = await axios.post('http://localhost:1337/admin_report/change_status_firebase',ChangeReportStatusFirebase, {
              headers: { "Content-Type": "multipart/form-data" },
            });

            if(reply.data.status==='ok'){
              setReload(prev => !prev);
              enqueueSnackbar("Report Status Updated Successfully!", { 
                  variant: "success", 
                  autoHideDuration: 3000 
              });
            }else{
              setReload(prev => !prev);
               enqueueSnackbar("Report Status Update Failed! (User)", { 
                  variant: "error", 
                  autoHideDuration: 3000 
                });
            }
        // setreportsData(response.data.reports)
        // setloadingimg1(false);
        // navigate('/admin')
      }else{
         setReload(prev => !prev);
         enqueueSnackbar("Report Delete Unsuccessful!", { 
                  variant: "error", 
                  autoHideDuration: 3000 
          });
        // alert(response.data.status)
        // setReload(!reload)
        // setloadingimg1(false);
      }
    }


    return (
    <div className="relative flex flex-row w-full max-w-full mx-auto overflow-hidden transition-all duration-300 bg-gray-700 shadow-lg rounded-2xl hover:shadow-2xl">
      {/* Reporter Info (Left Side) */}
      <div className="flex flex-col items-center justify-center w-40 gap-1 p-3 bg-gray-800">
        <img
          src={user === "Anonymous" ? anonymousimage : userimage}
          alt="Reporter"
          className="object-cover w-10 h-10 border-2 border-white rounded-full shadow-md"
        />
        <span className="mt-2 text-xs font-bold text-center text-white">
          {user === "Anonymous" ? "Anonymous" : user}
        </span>
        <span className="px-2 py-1 mt-1 text-xs font-semibold text-white bg-blue-600 rounded-full">
          {reportType}
        </span>
        <span className="mt-1 text-xs text-center text-gray-300">
          {date}
          <br />
          {time}
        </span>
        {/* Status Badge */}
        <span
          className={`mt-1 px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[statuspassed]}`}
        >
          {statuspassed}
        </span>
      </div>

      {/* Report Content (Middle) */}
      <div className="flex flex-col justify-between flex-1 px-6 py-3 w-64">
        <div>
          {/* Title */}
          <h3 className="mb-2 text-sm font-extrabold text-left text-white line-clamp-1">
            {reportTitle}
          </h3>

          {/* Description */}
         {/* <p className="mb-3 text-xs text-gray-300 text-justify max-h-20 overflow-y-auto"> {reportDescription} </p> */}
          <button
            className="mt-1 mb-1 pt-1 pb-1 pl-2 pr-2 text-green-600 transition-all duration-200 bg-green-100 text-xs rounded-full shadow-md hover:bg-green-200 hover:scale-105"
            title="Info"
            onClick={() => setReportInfoShowModal(true)}
          >
            Info
          </button>

          {/* Images */}
          {reportImages && reportImages.length > 0 && (
            <div className="flex gap-1 mb-1 mt-2">
              {reportImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Report Image ${idx + 1}`}
                  className="object-cover border-2 border-gray-400 rounded-lg cursor-pointer h-11 w-11"
                  onClick={() => setPreviewImage(img)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-3">
          <button
            className="pt-2 pb-2 pl-3 pr-3 text-red-600 transition-all duration-200 bg-red-100 rounded-full shadow-md hover:bg-red-200 hover:scale-105"
            title="Delete"
            onClick={() => setDeleteConfirmShowModal(true)}
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>

      {/* Status Icons (Right Side) */}
      <div className="flex flex-col items-center justify-center gap-3 px-3 py-2">
        {statusIcons.map((stat) => (
          <button
            key={stat.name}
            onClick={() => changereport_Status(stat.name)}
            className={`p-2 rounded-full shadow-md transition-all duration-200
              ${stat.bg} ${stat.hover}
              ${
                statuspassed === stat.name
                  ? stat.color + " ring-2 ring-offset-2 ring-" + stat.color.split("-")[1] + "-400"
                  : "opacity-80"
              }
            `}
            title={stat.name}
          >
            <i className={stat.icon + " text-lg"}></i>
          </button>
        ))}
      </div>

      {/* Modals */}
      {DeleteConfirmShowModal && (
        <ReportDeleteConfirm
          userId={user_id}
          reportimages={reportImages}
          reportId={reportId}
          onClose={() => setDeleteConfirmShowModal(false)}
        />
      )}
        {ReportInfoShowModal && (
        <ReportInfoModal
          reportDescription={reportDescription}
          onClose={() => setReportInfoShowModal(false)}
        />
      )}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative">
            <img
              src={previewImage}
              alt="Full Preview"
              className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute p-3 bg-white rounded-full shadow top-4 right-4 hover:bg-gray-200"
              onClick={() => setPreviewImage(null)}
              aria-label="Close Preview"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Report_card;