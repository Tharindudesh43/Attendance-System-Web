import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SnackbarProvider, useSnackbar } from "notistack";
import { useContextData } from "../ReloadContext";
import axios from "axios";

const DeleteConfirmModal = ({ email, onClose, name, id, image }) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { setReload } = useContextData();
  const [isDeleting, setIsDeleting] = useState(false);

  async function deletelecturer(event) {
    setIsDeleting(true);
    event.preventDefault();
    const DeleteLecturerDetails = new FormData();
    DeleteLecturerDetails.append("email", email);
    DeleteLecturerDetails.append("id", id);
    DeleteLecturerDetails.append("image", image);
    const response = await axios.delete(
      `${import.meta.env.VITE_API_BASE_URL}/admin/deleteLecturer`,
      {
        data: DeleteLecturerDetails,
        headers: { "Content-Type": "multipart/form-data" },
      },
    );

    const data = await response.data;
    if (data.status === "ok") {
      enqueueSnackbar("Lecturer Delete Successfully!", {
        variant: "success",
        autoHideDuration: 3000,
      });
      navigate("/admin");
      setReload((prev) => !prev);
    } else if (data.status === "not found") {
      enqueueSnackbar("Lecturer Not Found", {
        variant: "error",
        autoHideDuration: 3000,
      });
      setIsDeleting(false);
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        background: "rgba(15,23,42,.6)",
        backdropFilter: "blur(4px)",
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      
      <link
        href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <style>{`
      @keyframes modalIn { from { opacity:0; transform:scale(.95) translateY(10px); } to { opacity:1; transform:scale(1) translateY(0); } }
      .del-modal { animation: modalIn .22s cubic-bezier(.22,1,.36,1) forwards; }
      .del-cancel-btn { transition: background .18s ease; }
      .del-cancel-btn:hover { background: #f1f5f9 !important; }
      .del-confirm-btn { transition: background .18s ease, transform .18s ease, box-shadow .18s ease; }
      .del-confirm-btn:hover:not(:disabled) { background: #b91c1c !important; transform: translateY(-1px); box-shadow: 0 6px 18px rgba(185,28,28,.35) !important; }
      .del-confirm-btn:disabled { opacity: .7; cursor: not-allowed; }
    `}</style>

      <div
        className="del-modal"
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "white",
          borderRadius: 20,
          boxShadow: "0 24px 64px rgba(15,23,42,.25)",
          border: "1.5px solid #e2e8f0",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            width: 32,
            height: 32,
            borderRadius: 9,
            background: "#f8faff",
            border: "1.5px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "background .18s ease, border-color .18s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#fff1f2";
            e.currentTarget.style.borderColor = "#fecdd3";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#f8faff";
            e.currentTarget.style.borderColor = "#e2e8f0";
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* <div style={{ height: 5, background: "linear-gradient(90deg, #dc2626, #ef4444)" }} /> */}

        <div style={{ padding: "32px 28px 28px", textAlign: "center" }}>
          <div
            style={{
              width: 68,
              height: 68,
              borderRadius: "50%",
              background: "#fff1f2",
              border: "2px solid #fecdd3",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
            }}
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#dc2626"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6" />
            </svg>
          </div>

          <h4
            style={{
              fontSize: 17,
              fontWeight: 800,
              color: "#0f172a",
              margin: "0 0 8px",
              letterSpacing: "-0.01em",
            }}
          >
            Delete Lecturer?
          </h4>
          <p
            style={{
              fontSize: 13,
              color: "#64748b",
              margin: "0 0 6px",
              lineHeight: 1.6,
            }}
          >
            This action cannot be undone. You are about to permanently delete:
          </p>
          <div
            style={{
              display: "inline-block",
              background: "#fff1f2",
              border: "1.5px solid #fecdd3",
              borderRadius: 10,
              padding: "8px 20px",
              margin: "4px 0 0",
            }}
          >
            <span style={{ fontSize: 15, fontWeight: 800, color: "#be123c" }}>
              {name}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              background: "#fffbeb",
              border: "1.5px solid #fde68a",
              borderRadius: 10,
              padding: "10px 14px",
              margin: "20px 0 24px",
              textAlign: "left",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#b45309"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ flexShrink: 0 }}
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01" />
            </svg>
            <span
              style={{
                fontSize: 12,
                color: "#92400e",
                fontWeight: 600,
                lineHeight: 1.5,
              }}
            >
              All associated data including subjects and attendance records will
              be removed.
            </span>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button
              type="button"
              onClick={onClose}
              className="del-cancel-btn"
              style={{
                flex: 1,
                padding: "12px",
                borderRadius: 11,
                background: "#f8faff",
                color: "#475569",
                border: "1.5px solid #e2e8f0",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 700,
                fontFamily: "'Nunito',sans-serif",
              }}
            >
              No, Cancel
            </button>

            <button
              type="button"
              onClick={deletelecturer}
              disabled={isDeleting}
              className="del-confirm-btn"
              style={{
                flex: 1,
                padding: "12px",
                borderRadius: 11,
                background: "#dc2626",
                color: "white",
                border: "none",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 700,
                fontFamily: "'Nunito',sans-serif",
                boxShadow: "0 4px 16px rgba(220,38,38,.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 7,
              }}
            >
              {isDeleting ? (
                <>
                  <svg
                    style={{ animation: "spin .7s linear infinite" }}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="rgba(255,255,255,.3)"
                      strokeWidth="3"
                    />
                    <path
                      d="M12 2a10 10 0 0110 10"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                  Deleting…
                </>
              ) : (
                <>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
                  </svg>
                  Yes, Delete
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
