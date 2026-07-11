import React, { useState } from "react";
import anonymousimage from "../../public/assets/anonymous.png";
import userimage from "../../public/assets/user.png";
import axios from "axios";
import { useEffect } from "react";
import { useContextData } from "../ReloadContext.jsx";
import ReportDeleteConfirm from "./reportcard_delete_modal.jsx";
import ReportInfoModal from "./reportcad_info_modal.jsx";
import { enqueueSnackbar } from "notistack";

const Report_card = ({
  _id,
  reportId,
  reportType,
  date,
  user,
  time,
  statuspassed,
  reportTitle,
  reportDescription,
  reportImages,
  user_id,
}) => {
  const [DeleteConfirmShowModal, setDeleteConfirmShowModal] = useState(false);
  const [ReportInfoShowModal, setReportInfoShowModal] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [status, setStatus] = useState("Not Watched");
  const { reload, setReload } = useContextData();

  useEffect(() => {
    setStatus(statuspassed);
  }, [reload]);

  const statusIcons = [
    {
      name: "Watching",
      icon: "fas fa-eye",
      color: "text-yellow-500",
      bg: "bg-yellow-100",
      hover: "hover:bg-yellow-200",
    },
    {
      name: "Mark as Done",
      icon: "fas fa-check-circle",
      color: "text-green-600",
      bg: "bg-green-100",
      hover: "hover:bg-green-200",
    },
    {
      name: "Not Watched",
      icon: "fas fa-eye-slash",
      color: "text-gray-400",
      bg: "bg-gray-100",
      hover: "hover:bg-gray-200",
    },
  ];

  const statusStyles = {
    Watching: "bg-yellow-500 text-white",
    "Mark as Done": "bg-green-600 text-white",
    "Not Watched": "bg-gray-400 text-white",
  };

  async function changereport_Status(statusname) {
    const ChangeReportStatus = new FormData();
    const ChangeReportStatusFirebase = new FormData();
    ChangeReportStatus.append("status", statusname);
    ChangeReportStatus.append("id", _id);
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/admin_report/change_status`,
      ChangeReportStatus,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    if (response.data.status === "ok") {
      ChangeReportStatusFirebase.append("status", statusname);
      ChangeReportStatusFirebase.append("reportid", reportId);
      ChangeReportStatusFirebase.append("userId", user_id);
      const reply = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/admin_report/change_status_firebase`,
        ChangeReportStatusFirebase,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      if (reply.data.status === "ok") {
        setReload((prev) => !prev);
        enqueueSnackbar("Report Status Updated Successfully!", {
          variant: "success",
          autoHideDuration: 3000,
        });
      } else {
        setReload((prev) => !prev);
        enqueueSnackbar("Report Status Update Failed! (User)", {
          variant: "error",
          autoHideDuration: 3000,
        });
      }
    } else {
      setReload((prev) => !prev);
      enqueueSnackbar("Report Status Update Unsuccessful!", {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  }

return (
  <>
    <style>{`
      .rcard-wrap {
        display: flex; flex-direction: row; width: 100%;
        background: white; border-radius: 16px;
        border: 1.5px solid #e2e8f0;
        box-shadow: 0 2px 16px rgba(30,64,175,.07);
        overflow: hidden; font-family: 'Nunito', sans-serif;
        transition: transform .22s ease, box-shadow .22s ease;
      }
      .rcard-wrap:hover {
        transform: translateY(-3px);
        box-shadow: 0 12px 32px rgba(30,64,175,.14);
      }
      .rcard-action-btn {
        display: flex; align-items: center; justify-content: center;
        width: 34px; height: 34px; border-radius: 9px; border: none;
        cursor: pointer; transition: opacity .18s ease, transform .18s ease;
        flex-shrink: 0;
      }
      .rcard-action-btn:hover { opacity: .82; transform: translateY(-1px); }
      .rcard-status-btn {
        display: flex; align-items: center; justify-content: center;
        width: 36px; height: 36px; border-radius: 10px; border: 1.5px solid transparent;
        cursor: pointer; transition: all .18s ease; flex-shrink: 0;
      }
      .rcard-status-btn:hover { transform: translateY(-1px); }
      .rcard-img-thumb {
        width: 46px; height: 46px; border-radius: 9px; object-fit: cover;
        border: 1.5px solid #dbeafe; cursor: pointer;
        transition: transform .18s ease, box-shadow .18s ease;
        flex-shrink: 0;
      }
      .rcard-img-thumb:hover { transform: scale(1.07); box-shadow: 0 4px 14px rgba(30,64,175,.18); }
    `}</style>

    <div className="rcard-wrap">

      <div style={{ width: 120, flexShrink: 0, background: "linear-gradient(170deg, #1e3a8a 0%, #1e40af 60%, #2563eb 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, padding: "16px 10px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,.07)" }} />
        <div style={{ position: "absolute", bottom: -16, left: -16, width: 60, height: 60, borderRadius: "50%", background: "rgba(255,255,255,.05)" }} />

        <img
          src={user === "Anonymous" ? anonymousimage : userimage}
          alt="Reporter"
          style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", border: "2.5px solid rgba(255,255,255,.8)", boxShadow: "0 3px 12px rgba(0,0,0,.25)", position: "relative", zIndex: 1 }}
        />

        <span style={{ fontSize: 11, fontWeight: 800, color: "white", textAlign: "center", lineHeight: 1.3, position: "relative", zIndex: 1, wordBreak: "break-word" }}>
          {user === "Anonymous" ? "Anonymous" : user}
        </span>

        <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 100, background: "rgba(255,255,255,.18)", color: "white", position: "relative", zIndex: 1, textAlign: "center" }}>
          {reportType}
        </span>

        <span style={{ fontSize: 10, color: "rgba(255,255,255,.65)", textAlign: "center", lineHeight: 1.5, position: "relative", zIndex: 1 }}>
          {date}<br />{time}
        </span>

        <span style={{
          fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 100, position: "relative", zIndex: 1, textAlign: "center",
          ...(statuspassed?.toLowerCase() === "not watched"  ? { background: "#fff1f2", color: "#be123c" } :
             statuspassed?.toLowerCase() === "watching"     ? { background: "#fffbeb", color: "#b45309" } :
             statuspassed?.toLowerCase() === "mark as done" ? { background: "#dcfce7", color: "#15803d" } :
                                           { background: "rgba(255,255,255,.15)", color: "white" })
        }}>
          {statuspassed}
        </span>
      </div>

      <div style={{ flex: 1, padding: "14px 16px", display: "flex", flexDirection: "column", justifyContent: "space-between", minWidth: 0 }}>
        <div>
          <h3 style={{ fontSize: 13, fontWeight: 800, color: "#0f172a", margin: "0 0 8px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {reportTitle}
          </h3>

          <button
            onClick={() => setReportInfoShowModal(true)}
            style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 700, padding: "4px 11px", borderRadius: 100, background: "#f0fdf4", color: "#15803d", border: "1.5px solid #bbf7d0", cursor: "pointer", marginBottom: 10, transition: "background .18s" }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
            </svg>
            Info
          </button>

          {reportImages && reportImages.length > 0 && (
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {reportImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Report Image ${idx + 1}`}
                  className="rcard-img-thumb"
                  onClick={() => setPreviewImage(img)}
                />
              ))}
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <button
            className="rcard-action-btn"
            title="Delete"
            onClick={() => setDeleteConfirmShowModal(true)}
            style={{ background: "#fff1f2", border: "1.5px solid #fecdd3" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#be123c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>
            </svg>
          </button>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px 10px", borderLeft: "1.5px solid #f1f5f9", background: "#f8faff" }}>
        {statusIcons.map((stat) => {
          const isActive = statuspassed?.toLowerCase() === stat.name?.toLowerCase();
          return (
            <button
              key={stat.name}
              className="rcard-status-btn"
              onClick={() => changereport_Status(stat.name)}
              title={stat.name}
              style={{
                background: isActive ? (
                  stat.name?.toLowerCase() === "not watched"  ? "#fff1f2" :
                  stat.name?.toLowerCase() === "watching"     ? "#fffbeb" :
                  stat.name?.toLowerCase() === "mark as done" ? "#dcfce7" : "#f1f5f9"
                ) : "white",
                borderColor: isActive ? (
                  stat.name?.toLowerCase() === "not watched"  ? "#fecdd3" :
                  stat.name?.toLowerCase() === "watching"     ? "#fde68a" :
                  stat.name?.toLowerCase() === "mark as done" ? "#bbf7d0" : "#e2e8f0"
                ) : "#e2e8f0",
                boxShadow: isActive ? "0 2px 10px rgba(30,64,175,.12)" : "none",
              }}
            >
              <i className={stat.icon} style={{
                fontSize: 14,
                color: isActive ? (
                  stat.name?.toLowerCase() === "not watched"  ? "#be123c" :
                  stat.name?.toLowerCase() === "watching"     ? "#b45309" :
                  stat.name?.toLowerCase() === "mark as done" ? "#15803d" : "#475569"
                ) : "#94a3b8"
              }} />
            </button>
          );
        })}
      </div>
    </div>

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
        onClick={() => setPreviewImage(null)}
        style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(15,23,42,.85)", backdropFilter: "blur(4px)" }}
      >
        <div style={{ position: "relative" }} onClick={(e) => e.stopPropagation()}>
          <img
            src={previewImage}
            alt="Full Preview"
            style={{ maxWidth: "90vw", maxHeight: "90vh", borderRadius: 14, boxShadow: "0 24px 64px rgba(0,0,0,.5)" }}
          />
          <button
            onClick={() => setPreviewImage(null)}
            style={{ position: "absolute", top: 12, right: 12, width: 34, height: 34, borderRadius: "50%", background: "white", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 14px rgba(0,0,0,.25)", fontSize: 14, color: "#475569", fontWeight: 700 }}
            aria-label="Close Preview"
          >
            ✕
          </button>
        </div>
      </div>
    )}
  </>
);
};

export default Report_card;
