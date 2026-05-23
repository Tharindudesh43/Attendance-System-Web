import React, { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

const AboutUsModal = ({ onClose }) => {
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

if (typeof document !== "undefined" && !document.getElementById("__about-modal-styles")) {
  const s = document.createElement("style");
  s.id = "__about-modal-styles";
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

    @keyframes modalFadeIn {
      from { opacity: 0; transform: translateY(16px) scale(0.98); }
      to   { opacity: 1; transform: translateY(0)   scale(1);    }
    }
    @keyframes overlayIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }

    .__about-overlay {
      animation: overlayIn 0.2s ease forwards;
    }
    .__about-panel {
      animation: modalFadeIn 0.28s cubic-bezier(0.22,1,0.36,1) forwards;
    }
    .__about-close-btn:hover {
      background: #eff6ff !important;
      border-color: #93c5fd !important;
      color: #1d4ed8 !important;
    }
    .__about-icon-wrap {
      transition: transform 0.2s;
    }
    .__about-icon-wrap:hover {
      transform: rotate(90deg);
    }
    .__about-tag {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      color: #3b82f6;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      padding: 3px 10px;
      border-radius: 99px;
      margin-bottom: 16px;
    }
    .__value-item {
      display: flex;
      align-items: flex-start;
      gap: 9px;
      font-size: 13.5px;
      color: #374151;
      padding: 4px 0;
      font-weight: 500;
    }
    .__value-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #3b82f6;
      margin-top: 6px;
      flex-shrink: 0;
    }
  `;
  document.head.appendChild(s);
}

return (
  <div
    className="__about-overlay"
    style={{
      fontFamily: "'DM Sans', 'Poppins', sans-serif",
      position: "fixed",
      inset: 0,
      zIndex: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "16px",
      background: "rgba(15, 23, 42, 0.55)",
      backdropFilter: "blur(4px)",
    }}
    onClick={onClose}
  >
    <div
      className="__about-panel"
      onClick={(e) => e.stopPropagation()}
      style={{
        width: "100%",
        maxWidth: "620px",
        background: "#fff",
        borderRadius: "20px",
        boxShadow: "0 24px 60px rgba(30,58,138,0.18), 0 4px 16px rgba(0,0,0,0.08)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 60%, #3b82f6 100%)",
          padding: "26px 28px 22px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{
          position: "absolute", top: "-40px", right: "-40px",
          width: "160px", height: "160px", borderRadius: "50%",
          background: "rgba(255,255,255,0.07)", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "-50px", left: "30%",
          width: "130px", height: "130px", borderRadius: "50%",
          background: "rgba(255,255,255,0.05)", pointerEvents: "none",
        }} />

        <div style={{ display: "flex", alignItems: "center", gap: "12px", zIndex: 1, position: "relative" }}>
          <div style={{
            width: "44px", height: "44px", borderRadius: "12px",
            background: "rgba(255,255,255,0.18)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "22px",
          }}>🎓</div>
          <div>
            <h2 style={{ color: "#fff", fontSize: "20px", fontWeight: "700", margin: 0, letterSpacing: "-0.3px" }}>
              About Us
            </h2>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "12px", margin: "2px 0 0", fontWeight: "500" }}>
              Faculty Attendance Management System
            </p>
          </div>
        </div>
      </div>

      <div style={{ padding: "24px 28px" }}>

        <div className="__about-tag">
          Our Mission
        </div>
        <div style={{
          background: "#f8faff",
          border: "1px solid #dbeafe",
          borderRadius: "12px",
          padding: "16px 18px",
          marginBottom: "16px",
          fontSize: "13.5px",
          color: "#374151",
          lineHeight: "1.65",
          fontWeight: "500",
        }}>
          We build simple and reliable solutions that help university faculty manage
          student attendance effectively with a focus on clean UI, speed, and
          real world usability.
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
          <div style={{
            borderRadius: "12px",
            border: "1px solid #e0e7ff",
            padding: "16px",
            background: "#fafbff",
          }}>
            <p style={{ fontSize: "12px", fontWeight: "700", color: "#1d4ed8", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: "10px" }}>
              What We Do
            </p>
            {["Modern web & mobile apps", "User-friendly UI design", "Performance & scalability"].map((item) => (
              <div className="__value-item" key={item}>
                <span className="__value-dot" />
                {item}
              </div>
            ))}
          </div>

          <div style={{
            borderRadius: "12px",
            border: "1px solid #e0e7ff",
            padding: "16px",
            background: "#fafbff",
          }}>
            <p style={{ fontSize: "12px", fontWeight: "700", color: "#1d4ed8", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: "10px" }}>
              Our Values
            </p>
            {["Quality over shortcuts", "Simple, clean experiences", "Continuous improvement"].map((item) => (
              <div className="__value-item" key={item}>
                <span className="__value-dot" style={{ background: "#6366f1" }} />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div style={{
          background: "linear-gradient(135deg, #eff6ff, #f0f9ff)",
          border: "1px solid #bfdbfe",
          borderRadius: "12px",
          padding: "14px 18px",
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
        }}>
          <div>
            <p style={{ fontSize: "13px", fontWeight: "700", color: "#1d4ed8", margin: "0 0 3px" }}>Need Support?</p>
            <p style={{ fontSize: "13px", color: "#6b7280", margin: 0, lineHeight: "1.55", fontWeight: "500" }}>
              Have questions or feedback? Reach out anytime through the Contact page,  we're happy to help.
            </p>
          </div>
        </div>

        <div style={{
          display: "flex",
          justifyContent: "flex-end",
          paddingTop: "20px",
        }}>
          <button
            className="__about-close-btn"
            type="button"
            onClick={onClose}
            style={{
              padding: "9px 22px",
              borderRadius: "10px",
              border: "1.5px solid #dbeafe",
              background: "#fff",
              color: "#374151",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.18s",
              letterSpacing: "0.2px",
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
);
};

export default AboutUsModal;