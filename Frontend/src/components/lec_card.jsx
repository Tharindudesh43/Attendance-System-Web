import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteConfirm from "./delete_confirm_modal";
import Lecturermodal from "./Lecturer_modal";

const LecCard = ({
  name,
  email,
  gender,
  id,
  faculty,
  department,
  image,
  title,
  contactno,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLecModal, setShowLecModal] = useState(false);
  const navigate = useNavigate();

  const handleAdminSubject = () => {
    navigate("/admin/admin_dashboard", {
      state: { faculty, department, image, name, id, title },
    });
  };

  const handleShowAllSubject = () => {
    navigate(`/admin/subjectsdetails/${id}`);
  };

  const initials = name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      <div className="w-[260px] rounded-2xl overflow-hidden bg-[#0f172a] font-poppins">
        {/* Banner */}
        <div className="h-16 bg-blue-700 relative">
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#0f172a] rounded-t-2xl" />
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[-32px]">
            {image ? (
              <img
                src={image}
                alt={name}
                className="w-16 h-16 rounded-full border-[3px] border-blue-700 object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full border-[3px] border-blue-700 bg-blue-900 flex items-center justify-center text-blue-300 font-bold text-xl">
                {initials}
              </div>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="px-5 pt-10 pb-4 text-center">
          {/* Faculty Badge */}
          <span className="inline-block bg-blue-900 text-blue-300 text-[10px] px-3 py-0.5 rounded-full mb-1 tracking-wide">
            {faculty}
          </span>

          <h3 className="text-slate-100 font-bold text-[15px] mb-0.5">
            {title} {name}
          </h3>
          <p className="text-blue-400 text-[11px] mb-3">{department}</p>

          <div className="h-px bg-slate-800 mb-3" />

          {/* Info rows */}
          <div className="flex flex-col gap-1.5 mb-4 text-left">
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span className="w-5 h-5 bg-slate-800 rounded-md flex items-center justify-center text-[11px]">
                ✉
              </span>
              {email.length > 20 ? email.slice(0, 17) + "..." : email}
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span className="w-5 h-5 bg-slate-800 rounded-md flex items-center justify-center text-[11px]">
                ☎
              </span>
              {contactno}
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => setShowLecModal(true)}
              className="flex items-center justify-center gap-1.5 bg-green-950 text-green-300 text-[11px] font-semibold py-2 rounded-xl hover:opacity-80 transition"
            >
              <i className="fas fa-user-circle" /> Details
            </button>
            <button
              onClick={handleShowAllSubject}
              className="flex items-center justify-center gap-1.5 bg-lime-950 text-lime-300 text-[11px] font-semibold py-2 rounded-xl hover:opacity-80 transition"
            >
              <i className="fas fa-book" /> Subjects
            </button>
            <button
              onClick={handleAdminSubject}
              className="flex items-center justify-center gap-1.5 bg-blue-950 text-blue-300 text-[11px] font-semibold py-2 rounded-xl hover:opacity-80 transition"
            >
              <i className="fas fa-plus-circle" /> Add Subject
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="flex items-center justify-center gap-1.5 bg-red-950 text-red-300 text-[11px] font-semibold py-2 rounded-xl hover:opacity-80 transition"
            >
              <i className="fas fa-trash-alt" /> Delete
            </button>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <DeleteConfirm
          name={name}
          email={email}
          id={id}
          image={image}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
      {showLecModal && (
        <Lecturermodal
          image={image}
          title={title}
          department={department}
          contactNumber={contactno}
          email={email}
          name={name}
          faculty={faculty}
          gender={gender}
          onClose={() => setShowLecModal(false)}
        />
      )}
    </>
  );
};

export default LecCard;
