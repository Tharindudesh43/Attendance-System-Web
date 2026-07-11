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
      <style>{`
      .lcard-wrap {
        width: 100%; border-radius: 18px; overflow: hidden;
        background: white; border: 1.5px solid #e2e8f0;
        box-shadow: 0 2px 16px rgba(30,64,175,.07);
        font-family: 'Nunito', sans-serif;
        display: flex; flex-direction: column;
        transition: transform .22s ease, box-shadow .22s ease;
      }
      .lcard-wrap:hover {
        transform: translateY(-4px);
        box-shadow: 0 14px 36px rgba(30,64,175,.15);
      }
      .lcard-action-btn {
        display: flex; align-items: center; justify-content: center; gap: 6px;
        padding: 9px 6px; border-radius: 10px; border: none; cursor: pointer;
        font-size: 12px; font-weight: 700; font-family: 'Nunito', sans-serif;
        transition: opacity .18s ease, transform .18s ease;
      }
      .lcard-action-btn:hover { opacity: .85; transform: translateY(-1px); }
      .lcard-info-row {
        display: flex; align-items: center; gap: 9px; padding: 7px 0;
        border-bottom: 1px solid #f1f5f9;
      }
      .lcard-info-row:last-child { border-bottom: none; }
    `}</style>

      <div className="lcard-wrap">
        <div
          style={{
            height: 58,
            background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)",
            position: "relative",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -14,
              right: -14,
              width: 90,
              height: 90,
              borderRadius: "50%",
              background: "rgba(255,255,255,.07)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 8,
              left: 14,
              fontSize: 10,
              fontWeight: 700,
              color: "rgba(255,255,255,.65)",
              textTransform: "uppercase",
              letterSpacing: ".1em",
            }}
          >
            {faculty}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: -26,
            marginBottom: 6,
            position: "relative",
            zIndex: 1,
          }}
        >
          {image ? (
            <img
              src={image}
              alt={name}
              style={{
                width: 58,
                height: 58,
                borderRadius: "50%",
                objectFit: "cover",
                border: "3px solid white",
                boxShadow: "0 4px 14px rgba(30,64,175,.22)",
              }}
            />
          ) : (
            <div
              style={{
                width: 58,
                height: 58,
                borderRadius: "50%",
                border: "3px solid white",
                background: "linear-gradient(135deg, #1e40af, #3b82f6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                fontWeight: 800,
                color: "white",
                boxShadow: "0 4px 14px rgba(30,64,175,.25)",
              }}
            >
              {initials}
            </div>
          )}
        </div>

        <div
          style={{
            padding: "0 16px 16px",
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 10 }}>
            <h3
              style={{
                fontSize: 14,
                fontWeight: 800,
                color: "#0f172a",
                margin: "0 0 3px",
              }}
            >
              <span style={{ color: "#2563eb" }}>{title} </span>
              {name}
            </h3>
            <p
              style={{
                fontSize: 11,
                color: "#64748b",
                margin: 0,
                fontWeight: 600,
              }}
            >
              {department}
            </p>
          </div>

          <div style={{ height: 1, background: "#f1f5f9", marginBottom: 10 }} />

          <div style={{ marginBottom: 12 }}>
            <div className="lcard-info-row">
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 7,
                  background: "#eff6ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6" />
                </svg>
              </div>
              <span
                style={{
                  fontSize: 11,
                  color: "#475569",
                  fontWeight: 500,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {email.length > 22 ? email.slice(0, 20) + "…" : email}
              </span>
            </div>

            <div className="lcard-info-row">
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 7,
                  background: "#eff6ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013 11.87a19.79 19.79 0 01-2.79-8.65A2 2 0 012.22 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l.66-.66a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 15.92v1z" />
                </svg>
              </div>
              <span style={{ fontSize: 11, color: "#475569", fontWeight: 500 }}>
                {contactno}
              </span>
            </div>
          </div>

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}
          >
            <button
              className="lcard-action-btn"
              onClick={() => setShowLecModal(true)}
              style={{
                background: "#f0fdf4",
                color: "#15803d",
                border: "1.5px solid #bbf7d0",
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20a8 8 0 0116 0" />
              </svg>
              Details
            </button>

            <button
              className="lcard-action-btn"
              onClick={handleShowAllSubject}
              style={{
                background: "#fefce8",
                color: "#854d0e",
                border: "1.5px solid #fde68a",
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
              </svg>
              Subjects
            </button>

            <button
              className="lcard-action-btn"
              onClick={handleAdminSubject}
              style={{
                background: "#eff6ff",
                color: "#1d4ed8",
                border: "1.5px solid #bfdbfe",
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              Add Subject
            </button>

            <button
              className="lcard-action-btn"
              onClick={() => setShowDeleteModal(true)}
              style={{
                background: "#fff1f2",
                color: "#be123c",
                border: "1.5px solid #fecdd3",
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
              </svg>
              Delete
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
